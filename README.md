# Aleman_A1

App para que estudie .-.

**Alemán A1: lecciones 1 a 7** (Schritte international Neu 1, A1.1). App estática (HTML + JavaScript, sin dependencias ni compilación) para estudiar por niveles, con preguntas que se repiten hasta dominarlas, explicación de cada respuesta, pronunciación en letras del español, traducción y audio.

Sitio: **https://ferchito1974.github.io/Aleman_A1/**

## Qué contiene (v3)
- 55 niveles y 7393 preguntas (opción múltiple, escritura con corrector y ordenar frases).
- Lecciones 1 a 7 del Kursbuch, incluida la lección 7 completa (können, wollen, Perfekt con haben y sein, hobbys, lecturas).
- La Wortliste completa (Lernwortschatz LWS 1 a 26): 603 palabras con artículo, plural, pronunciación y traducción.
- Temas de la maestra con nivel propio: artículo definido y pronombres, nicht o kein, der o den, ja/nein/doch, hora formal e informal, verbos de la maestra, separables e irregulares, orden de palabras.
- Lecturas de las lecciones 4 a 6 (anuncios de vivienda, horarios de Berlín, Franziska, cómic, folleto D-A-CH).
- «Arbeitsbuch und Tests»: ejercicios con el formato del Arbeitsbuch (huecos, banco de palabras, «Was passt nicht?», «Schreiben Sie Sätze») y un «Test Lektion» por lección con puntos y semáforo.
- Portada en pestañas (Examen, Temas, Lecciones), tests acumulados, ejercicios con imágenes y relojes, y Hören (audios con richtig/falsch, dictados, números y horas de oído).
- Lesen (textos con richtig/falsch) y Schreiben desde cero (oraciones y textos cortos con corrección por puntos y texto modelo).
- Modo alemán: preguntas en alemán con botón «🌐 Übersetzen» (traducción y palabras clave). Grupo «Auf Deutsch: Verben anwenden» con verbos en frases, Perfekt, modales y situaciones; Konjugationstrainer.
- Modo claro y oscuro, racha de estudio y progreso por nivel.

## Publicar o actualizar en GitHub Pages
El código vive en la rama `main`, en la raíz (con `index.html` en la raíz).
1. En GitHub abre el repositorio y ve a **Settings > Pages**.
2. En «Build and deployment» elige **Source: Deploy from a branch**, **Branch: `main`**, carpeta **`/ (root)`** y pulsa **Save**.
3. En uno o dos minutos la app queda en https://ferchito1974.github.io/Aleman_A1/

Cada vez que subas un cambio a `main`, la página se actualiza sola.

## Agregar o corregir preguntas
Edita solo `mis-preguntas.js` (tiene instrucciones y ejemplos en comentarios). Las preguntas aparecen en el nivel «Mis preguntas».

## Progreso
El progreso se guarda en el navegador (localStorage, clave `aleman-a1-v2`), por dispositivo y por dirección web. La v3 usa la misma clave, así que no se pierde nada al actualizar. Si cambias de dispositivo o de dominio, usa Exportar/Importar progreso dentro de la app. Los identificadores de pregunta dependen del texto: si editas el texto de una pregunta, su progreso se reinicia.

## Audio y pronunciación
El botón 🔊 reproduce audios MP3 grabados con una voz alemana (Piper, voz «thorsten», dataset Thorsten-Voice con licencia CC0). Están en la carpeta `audio/`, así que suenan igual en cualquier computadora o teléfono sin instalar voces. Si un texto no tiene audio (por ejemplo, algo nuevo en `mis-preguntas.js`), la app usa la voz alemana del dispositivo; si el dispositivo no tiene voz alemana, no lee nada en lugar de leer con la voz en español.

Para generar los audios de contenido nuevo: `python tools/make_audio.py RUTA/de_DE-thorsten-medium.onnx` (requiere `pip install piper-tts`, ffmpeg y el modelo de https://huggingface.co/rhasspy/piper-voices). Solo crea los que faltan.

La pronunciación escrita es una aproximación con letras del español (reglas en `pron.js` más excepciones revisadas en `OVR`).

## Archivos
| Archivo | Contenido |
|---|---|
| `index.html`, `styles.css` | Página y estilos (modo claro y oscuro) |
| `app.js` | Interfaz, sesiones, repetición, progreso, racha y tema |
| `data.js` | Motor de datos y niveles de las lecciones 4 a 6 |
| `content123.js` | Lecciones 1 a 3 y generadores de preguntas |
| `content_wortliste.js` | Wortliste completa por lección |
| `content456.js` | Lecturas de las lecciones 4 a 6 y temas de la maestra |
| `content7.js` | Lección 7 |
| `content_contexto.js` | Frases con el vocabulario de la Wortliste |
| `content_deutsch.js` | Preguntas en alemán centradas en los verbos |
| `ui_de.js` | Presentación del quiz en alemán, traducción y glosario |
| `content_ab.js`, `content_ab57.js`, `content_ab_extra.js`, `ab_engine.js` | Ejercicios tipo Arbeitsbuch y «Test Lektion» |
| `content_ls.js` | Lesen y Schreiben |
| `content_bilder.js`, `content_hoeren.js`, `home_tabs.js` | Imágenes, Hören, más ja/nein/doch y der/den; portada en pestañas |
| `levels_v3.js` | Orden e iconos de todos los niveles |
| `lessons.js` | Textos de repaso de los niveles antiguos |
| `pron.js`, `check.js` | Pronunciación escrita y voz del dispositivo; corrector de respuestas |
| `audio.js`, `audio/` | Reproductor y audios MP3 en alemán (manifiesto en `audio/manifest.js`) |
| `mis-preguntas.js`, `custom.js` | Preguntas propias |
| `tools/` | Verificación (`verify.py`), auditoría de cobertura (`audit.py`, informe en `audit-report.md`) capturas (`screens.py`) y audios (`make_audio.py`) |

## Verificación (para quien mantenga la app)
Requiere Python con Playwright (`pip install playwright` y `python -m playwright install chromium`).
- `python tools/verify.py`: carga todos los niveles, revisa errores de consola, ids duplicados y que cada pregunta tenga explicación.
- `python tools/audit.py`: compara la Wortliste y las estructuras del libro con las preguntas.
- `python tools/screens.py carpeta`: capturas en 420 px y escritorio, modo claro y oscuro.

## Nota sobre el contenido del libro
Las listas de vocabulario y los temas siguen el libro. Los ejemplos, lecturas y explicaciones están redactados para la app; no se copian textos largos ni letras de canciones del libro.
