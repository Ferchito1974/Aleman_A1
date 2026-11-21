"""Genera los audios MP3 de todo el alemán que la app puede pronunciar.

Voz: Piper «de_DE-thorsten-medium» (dataset Thorsten-Voice, licencia CC0).
Requisitos: pip install piper-tts playwright ; ffmpeg en el PATH ; el modelo .onnx y su .json.

Uso:  python tools/make_audio.py RUTA/de_DE-thorsten-medium.onnx
Solo genera los archivos que faltan y reescribe audio/manifest.js. Ejecútalo de nuevo
cuando agregues contenido (por ejemplo en mis-preguntas.js).
"""
import json
import pathlib
import re
import subprocess
import sys
import tempfile
import wave

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"

COLLECT_JS = r"""() => {
  const set = new Set();
  const grab = () => document.querySelectorAll('[data-say]').forEach(e => set.add(e.getAttribute('data-say')));
  LEVELS.forEach(l => { go('level', { level: l.id, tab: 'learn' }); grab(); });
  go('chuleta'); grab(); go('pron'); grab();
  allPool().forEach(q => { const f = infoOf(q); if (f && f.de) set.add(f.de); });
  go('home');
  return [...set].map(t => audioKey(t)).filter(Boolean);
}"""

DAYS = {"Mo": "Montag", "Di": "Dienstag", "Mi": "Mittwoch", "Do": "Donnerstag", "Fr": "Freitag", "Sa": "Samstag", "So": "Sonntag"}


def jshash(s):
    """Igual que hash() de content123.js (djb2 sobre unidades UTF-16, base 36)."""
    h = 5381
    b = s.encode("utf-16-le")
    for i in range(0, len(b), 2):
        h = ((h << 5) + h + (b[i] | (b[i + 1] << 8))) & 0xFFFFFFFF
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    out = ""
    while True:
        h, r = divmod(h, 36)
        out = digits[r] + out
        if h == 0:
            return out


def spoken(t):
    """Texto que se le da a la voz: resuelve símbolos y abreviaturas para que suene natural."""
    t = t.replace("/Monat", " pro Monat").replace(" / ", ", ").replace("/", ", ").replace("·", ",").replace("–", " bis ")
    t = re.sub(r"\b(Mo|Di|Mi|Do|Fr|Sa|So)\b(?=\s*(bis\b|\d|,|$))", lambda m: DAYS[m.group(1)], t)
    t = re.sub(r"(\d{1,3})\.(\d{3})\b", r"\1\2", t)                      # 200.000 -> 200000
    t = re.sub(r"\b(\d{1,2})[.:](\d{2})\b(?!\d)", lambda m: m.group(1) + " Uhr " + str(int(m.group(2))) if m.group(2) != "00" else m.group(1) + " Uhr", t)
    t = re.sub(r"Uhr (\d+) Uhr", r"Uhr \1", t).replace("Uhr Uhr", "Uhr")
    t = t.replace("m²", " Quadratmeter").replace("°C", " Grad").replace("€", " Euro").replace("+", "plus ")
    t = re.sub(r"[()«»„“\"]", "", t)
    return re.sub(r"\s+", " ", t).strip(" ,")


def main():
    model = sys.argv[1] if len(sys.argv) > 1 else None
    if not model:
        sys.exit("Falta la ruta del modelo .onnx de Piper")
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page()
        page.goto((ROOT / "index.html").as_uri())
        texts = sorted(set(page.evaluate(COLLECT_JS)))
        b.close()
    AUDIO.mkdir(exist_ok=True)
    keys = {}
    for t in texts:
        h = jshash(t)
        if h in keys and keys[h] != t:
            print("COLISIÓN de hash:", t, "/", keys[h])
        keys[h] = t
    todo = [(h, t) for h, t in keys.items() if not (AUDIO / (h + ".mp3")).exists()]
    print(f"Textos: {len(keys)} · por generar: {len(todo)}")
    if todo:
        from piper import PiperVoice
        voice = PiperVoice.load(model)
        tmp = pathlib.Path(tempfile.mkdtemp())
        for i, (h, t) in enumerate(todo, 1):
            wav = tmp / "a.wav"
            with wave.open(str(wav), "wb") as w:
                voice.synthesize_wav(spoken(t), w)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav), "-ac", "1", "-b:a", "32k", str(AUDIO / (h + ".mp3"))], check=True)
            if i % 200 == 0:
                print(f"  {i}/{len(todo)}")
    # borra audios que ya no se usan
    for f in AUDIO.glob("*.mp3"):
        if f.stem not in keys:
            f.unlink()
    (AUDIO / "manifest.js").write_text(
        "/* Generado por tools/make_audio.py: audios disponibles (hash del texto). Voz Piper thorsten, licencia CC0. */\n"
        "const AUDIO_FILES = new Set(" + json.dumps(sorted(keys)) + ");\n", encoding="utf-8")
    size = sum(f.stat().st_size for f in AUDIO.glob("*.mp3"))
    print(f"Listo: {len(keys)} audios, {size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
