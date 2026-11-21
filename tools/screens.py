"""Capturas de pantalla para revisión visual: python tools/screens.py [carpeta_salida]
Genera portada, nivel, pregunta acertada y pregunta fallada, en 420 px y 1280 px, en modo claro y oscuro."""
import pathlib
import sys

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tools" / "screens"
OUT.mkdir(parents=True, exist_ok=True)

ANSWER_JS = """(ok) => {
  const q = S.quiz.queue[0].q;
  if (q.kind === 'mc') {
    const i = S.quiz.st.order.findIndex(o => ok ? o === q.ans : o !== q.ans);
    document.querySelector('[data-act="mc"][data-i="' + i + '"]').click();
  } else if (q.kind === 'type') {
    document.getElementById('ans').value = ok ? q.answers[0] : 'xyz';
    document.querySelector('[data-act="check"]').click();
  } else {
    document.querySelector('[data-act="idkb"]').click();
  }
}"""


def shots(page, tag):
    page.evaluate("() => go('home')")
    page.wait_for_timeout(1300)
    page.screenshot(path=str(OUT / f"{tag}-1-portada.png"), full_page=False)
    page.evaluate("() => go('level', { level: 'wl4', tab: 'learn' })")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT / f"{tag}-2-nivel.png"))
    # pregunta de opción múltiple acertada y fallada
    page.evaluate("() => { const l = LEVELS.find(x => x.id === 'gakk'); startQuiz('Nivel ' + l.n + ': ' + l.title, pool('gakk').filter(q => q.kind === 'mc'), 10, 'home'); }")
    page.wait_for_timeout(200)
    page.evaluate(ANSWER_JS, True)
    page.wait_for_timeout(500)
    page.screenshot(path=str(OUT / f"{tag}-3-acierto.png"))
    page.evaluate("() => next()")
    page.evaluate(ANSWER_JS, False)
    page.wait_for_timeout(500)
    page.screenshot(path=str(OUT / f"{tag}-4-fallo.png"))
    page.evaluate("() => { startQuiz('Escritura', pool('l7perfh').filter(q => q.kind === 'type'), 5, 'home'); }")
    page.evaluate(ANSWER_JS, False)
    page.wait_for_timeout(500)
    page.screenshot(path=str(OUT / f"{tag}-5-escritura-fallo.png"))


with sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ("light", "dark"):
        for name, vp in (("movil", {"width": 420, "height": 900}), ("escritorio", {"width": 1280, "height": 900})):
            ctx = b.new_context(viewport=vp, color_scheme=scheme, device_scale_factor=1)
            page = ctx.new_page()
            page.goto((ROOT / "index.html").as_uri())
            page.wait_for_timeout(300)
            shots(page, f"{scheme}-{name}")
            ctx.close()
    b.close()
print("Capturas en", OUT)
