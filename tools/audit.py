"""Auditoría de cobertura: Wortliste y estructuras frente a preguntas y lecciones.

Uso:  python tools/audit.py
Genera tools/audit-report.md con:
  1. Palabras de la Wortliste sin ninguna pregunta (debe quedar vacío).
  2. Palabras que solo aparecen en el nivel «Wortliste» (sin práctica en contexto). Es informativo.
  3. Estructuras gramaticales por lección y si tienen preguntas.
"""
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent

COLLECT_JS = r"""
() => {
  const strip = h => String(h || '').replace(/<[^>]+>/g, ' ');
  const textOf = q => [q.q, q.ans, (q.opts || []).join(' | '), (q.answers || []).join(' | '), (q.tokens || []).join(' '), q.es, q.why, q.info ? q.info.de : ''].map(strip).join(' \n ');
  const ctx = [], wlq = [];
  for (const l of LEVELS) {
    const qs = pool(l.id);
    const txt = qs.map(textOf).join('\n') + '\n' + strip(LESSONS[l.id] ? LESSONS[l.id]() : '');
    if (/^wl/.test(l.id)) wlq.push(txt); else ctx.push(txt);
  }
  return { ctx: ctx.join('\n'), wl: wlq.join('\n'), entries: WL_ALL.map(e => ({ t: e.t, w: e.w, lesson: e.lesson, es: e.es })) };
}
"""

# estructuras por lección: (lección, descripción, expresión regular que debe aparecer en las preguntas)
STRUCTS = [
    (1, "W-Frage: Wie heißen Sie? / Woher kommen Sie?", r"Woher komm"),
    (1, "Verbo sein (bin, bist, ist)", r"\bbist\b"),
    (1, "Deletrear (buchstabieren)", r"buchstabier"),
    (2, "Posesivos mein / dein / Ihr", r"\bdein(e)?\b"),
    (2, "Pronombres er / sie / wir / ihr", r"\bihr\b"),
    (2, "Números 0 a 20", r"\bzwanzig\b"),
    (3, "ein / kein (nominativo)", r"\bkein\b"),
    (3, "Ja/Nein-Frage (verbo en posición 1)", r"Ja/Nein"),
    (3, "Plural de sustantivos", r"Plural"),
    (3, "Precios y cantidades (Gramm, Liter, Kilo)", r"Gramm"),
    (4, "Artículo definido y pronombre der → er", r"der → er|der\s*→\s*er"),
    (4, "Negación nicht / kein", r"nicht.{0,40}kein|kein.{0,40}nicht"),
    (4, "Adjetivos con sein (Das Zimmer ist hell)", r"ist hell"),
    (4, "gefallen (gefällt / gefallen)", r"gefällt"),
    (4, "Anuncios: Kaution, Nebenkosten", r"Kaution"),
    (5, "Verbos separables (Satzklammer)", r"steht .{0,20}auf"),
    (5, "Hora informal (halb, Viertel)", r"\bhalb\b"),
    (5, "Hora oficial (siebzehn Uhr...)", r"zehn Uhr"),
    (5, "Preposiciones temporales am / um / von ... bis", r"von .{0,15}bis"),
    (5, "Inversión (Am Nachmittag macht Robert...)", r"Am Nachmittag"),
    (6, "Acusativo der → den, ein → einen", r"\beinen\b"),
    (6, "kein → keinen", r"\bkeinen\b"),
    (6, "ja / nein / doch", r"\bDoch\b"),
    (6, "Verbos con cambio vocálico (fährt, liest, nimmt)", r"\bfährt\b"),
    (6, "möchten", r"möchte"),
    (6, "Clima (Es regnet, Es ist sonnig)", r"regnet"),
    (6, "es gibt", r"[Ee]s gibt"),
    (7, "Modalverb können (kann, kannst)", r"\bkannst\b"),
    (7, "Modalverb wollen (will, willst)", r"\bwillst\b"),
    (7, "Modalverb im Satz (infinitivo al final)", r"kann .{0,25}(schwimmen|kochen|fahren)"),
    (7, "Perfekt con haben (hat ... gemacht)", r"hat .{0,30}gemacht"),
    (7, "Perfekt con sein (ist ... gegangen)", r"(ist|bin) .{0,30}gegangen"),
    (7, "Participios en -en (geschrieben, gesprochen)", r"geschrieben"),
    (7, "Verbos en -ieren sin ge- (telefoniert)", r"telefoniert"),
    (7, "schon einmal / noch nie / schon öfter", r"noch nie"),
]


def norm(s):
    return s.lower()


def present(word, text):
    if "..." in word:
        parts = [re.escape(x.strip().lower()) for x in word.split("...") if x.strip()]
        return re.search(r".{0,25}".join(parts), text) is not None
    w = word.strip().rstrip("-").strip()
    if not w:
        return True
    pat = r"(?<![a-zäöüß])" + re.escape(w.lower()) + (r"" if word.endswith("-") else r"(?![a-zäöüß])")
    return re.search(pat, text) is not None


def main():
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.goto((ROOT / "index.html").as_uri())
        page.wait_for_timeout(400)
        data = page.evaluate(COLLECT_JS)
        b.close()
    ctx, wl = norm(data["ctx"]), norm(data["wl"])
    missing, only_wl = [], []
    for e in data["entries"]:
        in_ctx, in_wl = present(e["w"], ctx), present(e["w"], wl)
        if not in_ctx and not in_wl:
            missing.append(e)
        elif not in_ctx:
            only_wl.append(e)
    raw = data["ctx"] + "\n" + data["wl"]
    struct_rows = [(l, d, bool(re.search(rx, raw))) for (l, d, rx) in STRUCTS]
    total = len(data["entries"])
    lines = ["# Auditoría de cobertura", "",
             f"Palabras en la Wortliste: **{total}**. Sin ninguna pregunta: **{len(missing)}**. "
             f"Solo en el nivel Wortliste (sin práctica en contexto): **{len(only_wl)}**.", ""]
    lines += ["## 1. Palabras sin preguntas", ""]
    lines += [f"- L{e['lesson']}: {e['w']} ({e['es']})" for e in missing] or ["Ninguna. La lista está vacía."]
    lines += ["", "## 2. Palabras practicadas solo en el nivel «Wortliste»", "",
              "Justificación: todas tienen preguntas de significado, traducción inversa y escritura (y artículo y plural si son sustantivos) "
              "en el nivel «Wortliste completa» de su lección. Son palabras sueltas o de uso puntual en el libro.", ""]
    by_l = {}
    for e in only_wl:
        by_l.setdefault(e["lesson"], []).append(e["w"])
    for l in sorted(by_l):
        lines.append(f"- **L{l}** ({len(by_l[l])}): " + ", ".join(by_l[l]))
    lines += ["", "## 3. Estructuras gramaticales", "", "| Lección | Estructura | ¿Con preguntas? |", "|---|---|---|"]
    lines += [f"| {l} | {d} | {'sí' if ok else 'NO'} |" for (l, d, ok) in struct_rows]
    report = "\n".join(lines) + "\n"
    (ROOT / "tools" / "audit-report.md").write_text(report, encoding="utf-8")
    print(f"Wortliste: {total} palabras · sin preguntas: {len(missing)} · solo en Wortliste: {len(only_wl)}")
    print("Estructuras sin preguntas:", [d for (_, d, ok) in struct_rows if not ok])
    for e in missing:
        print("  FALTA", e["lesson"], e["w"])
    sys.exit(0 if not missing and all(ok for (_, _, ok) in struct_rows) else 1)


if __name__ == "__main__":
    main()
