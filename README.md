# Aleman_A1

App para que estudie .-.

**Alemán A1: lecciones 1 a 7** (Schritte international Neu 1, A1.1). App estática (HTML + JavaScript, sin dependencias ni compilación) para estudiar por niveles, con preguntas que se repiten hasta dominarlas, explicación de cada respuesta, pronunciación en letras del español, traducción y audio.

Sitio: **https://ferchito1974.github.io/Aleman_A1/**

## Qué contiene (v3)
- 55 niveles y 7386 preguntas (opción múltiple, escritura con corrector y ordenar frases).
- Lecciones 1 a 7 del Kursbuch, incluida la lección 7 completa (können, wollen, Perfekt con haben y sein, hobbys, lecturas).
- La Wortliste completa (Lernwortschatz LWS 1 a 26): 603 palabras con artículo, plural, pronunciación y traducción.
- Temas de la maestra con nivel propio: artículo definido y pronombres, nicht o kein, der o den, ja/nein/doch, hora formal e informal, verbos de la maestra, separables e irregulares, orden de palabras.
- Lecturas de las lecciones 4 a 6 (anuncios de vivienda, horarios de Berlín, Franziska, cómic, folleto D-A-CH).
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
El botón 🔊 usa la voz alemana del dispositivo (speechSynthesis, de-DE). Si no hay voz alemana instalada, el audio no suena y la pronunciación escrita sigue disponible. La pronunciación escrita es una aproximación con letras del español (reglas en `pron.js` más excepciones revisadas en `OVR`).

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
| `levels_v3.js` | Orden e iconos de todos los niveles |
| `lessons.js` | Textos de repaso de los niveles antiguos |
| `pron.js`, `check.js` | Pronunciación y audio; corrector de respuestas |
| `mis-preguntas.js`, `custom.js` | Preguntas propias |
| `tools/` | Verificación (`verify.py`), auditoría de cobertura (`audit.py`, informe en `audit-report.md`) y capturas (`screens.py`) |

## Verificación (para quien mantenga la app)
Requiere Python con Playwright (`pip install playwright` y `python -m playwright install chromium`).
- `python tools/verify.py`: carga todos los niveles, revisa errores de consola, ids duplicados y que cada pregunta tenga explicación.
- `python tools/audit.py`: compara la Wortliste y las estructuras del libro con las preguntas.
- `python tools/screens.py carpeta`: capturas en 420 px y escritorio, modo claro y oscuro.

## Nota sobre el contenido del libro
Las listas de vocabulario y los temas siguen el libro. Los ejemplos, lecturas y explicaciones están redactados para la app; no se copian textos largos ni letras de canciones del libro.
