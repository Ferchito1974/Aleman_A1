"""Verificación de la app con Playwright (Chromium sin interfaz).

Uso:  python tools/verify.py            (desde la raíz del repositorio)
Comprueba: que todos los niveles cargan sin errores de consola, que no hay ids
duplicados, que cada pregunta tiene explicación y que cada nivel tiene su texto.
El error de Google Fonts cuando no hay red se ignora.
"""
import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "index.html").as_uri()

CHECK_JS = r"""
() => {
  const res = { levels: [], dupIds: [], noWhy: [], noLesson: [], badMc: [], emptyAns: [], total: 0 };
  const seen = new Map();
  for (const l of LEVELS) {
    let qs = [];
    try { qs = pool(l.id); } catch (e) { res.levels.push({ id: l.id, error: String(e) }); continue; }
    let html = '';
    try { html = LESSONS[l.id] ? LESSONS[l.id]() : ''; } catch (e) { res.noLesson.push(l.id + ': ' + e); }
    if (!html) res.noLesson.push(l.id);
    res.levels.push({ id: l.id, group: l.group, exam: l.exam, title: l.title, n: qs.length });
    res.total += qs.length;
    for (const q of qs) {
      if (seen.has(q.id)) res.dupIds.push(q.id + ' (' + seen.get(q.id) + ' / ' + l.id + ')'); else seen.set(q.id, l.id);
      if (!q.why || !String(q.why).trim()) res.noWhy.push(q.id);
      if (q.kind === 'mc') {
        if (!q.opts.includes(q.ans) || q.opts.length < 2) res.badMc.push(q.id + ' opciones=' + q.opts.length);
        if (new Set(q.opts).size !== q.opts.length) res.badMc.push(q.id + ' opciones repetidas');
      }
      if (q.kind === 'type' && (!q.answers.length || q.answers.some(a => !String(a).trim()))) res.emptyAns.push(q.id);
      if (q.kind === 'build' && (!q.tokens || !q.tokens.length)) res.emptyAns.push(q.id);
      if (q.kind === 'free' && (!q.model || (q.mode === 'sentence' && !q.pats.length) || (q.mode === 'text' && !q.checks.length))) res.emptyAns.push(q.id);
      if (q.kind === 'cloze' && (!q.gaps || !q.gaps.length || q.gaps.some(g => !g.ans[0] || (g.opts && !g.opts.includes(g.ans[0]))))) res.emptyAns.push(q.id);
    }
  }
  return res;
}
"""


def main():
    errors = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
        page.goto(URL)
        page.wait_for_timeout(500)
        res = page.evaluate(CHECK_JS)
        # abrir cada nivel (pestaña Aprender) para detectar errores al dibujar
        ids = [l["id"] for l in res["levels"] if "error" not in l]
        for lid in ids:
            page.evaluate("id => { go('level', { level: id, tab: 'learn' }); }", lid)
        page.evaluate("() => go('chuleta')")
        page.evaluate("() => go('home')")
        b.close()
    errors = [e for e in errors if "fonts.g" not in e and "ERR_INTERNET_DISCONNECTED" not in e and "ERR_NAME_NOT_RESOLVED" not in e]
    print("Niveles:", len(res["levels"]), " Preguntas:", res["total"])
    for l in res["levels"]:
        print("  {:<10} {:<14} ex={} {:>5}  {}".format(l.get("id"), str(l.get("group")), l.get("exam"), l.get("n", "ERR"), l.get("title", l.get("error", ""))))
    probs = {k: res[k] for k in ("dupIds", "noWhy", "noLesson", "badMc", "emptyAns")}
    for k, v in probs.items():
        print(k, len(v), v[:15])
    print("Errores de consola:", len(errors), errors[:10])
    ok = not errors and not any(probs.values()) and not any("error" in l for l in res["levels"])
    print("RESULTADO:", "OK" if ok else "CON PROBLEMAS")
    (ROOT / "tools" / "last-verify.json").write_text(json.dumps(res["levels"], ensure_ascii=False, indent=1), encoding="utf-8")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
