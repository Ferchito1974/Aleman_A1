# Cambios

## v3.5 (25/11/2026)
- Lesen: 14 textos nuevos (2 por lección: presentaciones, familia, notas, ofertas, anuncios, horarios, invitaciones, correos en Perfekt, cursos) con «Richtig oder falsch?», como en el examen.
- Schreiben desde cero: 33 preguntas para responder o traducir con una oración completa sin ayuda y 14 textos cortos (tipo «Schreiben, Teil 2») con puntos que se revisan uno por uno, contador de palabras y texto modelo con audio.
- Corrector flexible: acepta cualquier respuesta correcta (tu nombre, tu ciudad, tus hobbys) y avisa de errores típicos: sustantivo en minúscula, verbo fuera de la posición 2, «habe gegangen», «ich wohnen», «kann kocht».
- Cada Test Lektion incluye ahora Lesen (1 texto) y Schreiben (2 tareas). Botones «Schreiben von null» y «Lesen» en la portada.

## v3.4 (25/11/2026)
- Nuevo grupo «Arbeitsbuch und Tests» (primero en la portada): un «Arbeitsbuch-Training» por lección con 90 ejercicios y 485 huecos en el formato del Arbeitsbuch (diálogos con varios huecos, banco de palabras, «Was passt nicht?», «Schreiben Sie Sätze»), todos de redacción propia.
- «Test Lektion 1 a 7» como en el libro: 2 ejercicios de Wörter, 3 de Grammatik y 2 de Kommunikation, con puntos por hueco, resultado por sección y semáforo (🟢 80 % o más, 🟡 60 a 79 %, 🔴 menos de 60 %). Cada test sale distinto.
- Perfekt reforzado en la lección 7: participios (ge-t, ge-en, -iert), haben o sein, diálogos y correos en Perfekt, pasar del presente al Perfekt y escribir oraciones.
- Más práctica de las preposiciones de tiempo (im Sommer, in der Nacht, am, um, von ... bis).

## v3.3 (20/11/2026)
- La versión y la fecha de actualización se muestran al pie de la portada.

## v3.2
- Modo alemán (activado por defecto, se desactiva en Ajustes): consignas, botones y resultados en alemán; botón «🌐 Übersetzen» con la traducción y las palabras clave; la explicación en español queda plegada y se abre sola si fallas.
- Nuevo grupo «Auf Deutsch: Verben anwenden»: unas 860 preguntas en alemán con los verbos de las lecciones 1 a 7 en frases (todas las personas), pasar a Perfekt, añadir können o wollen, empezar con «Heute», hacer preguntas, cambiar la persona, tablas de conjugación completas y situaciones («Was sagst du?»).
- Portada: «Konjugationstrainer» y «Nur Deutsch». En los repasos mezclados, 40 % de preguntas de verbos y como máximo 15 % de «qué significa».
- Corregida la conjugación de zeichnen (du zeichnest, er zeichnet). Audios para las frases nuevas.

## v3.1
- Audio con voz alemana grabada (Piper «thorsten», licencia CC0) para todo el alemán de la app: suena bien en cualquier PC sin instalar voces de Windows.
- Si falta un audio, se usa la voz del dispositivo solo si es alemana (antes podía leer con la voz en español).
- `tools/make_audio.py` para generar los audios de contenido nuevo.

## v3
- Lección 7 completa: können, wollen, Perfekt con haben, Perfekt con sein y «schon mal / noch nie», hobbys y cursos, lecturas (historia de Walter, foro de consejos, correo en Perfekt) y small talk del Arbeitsbuch. Simulacro propio («Repaso lección 7», exam 3).
- Wortliste completa leída del PDF (LWS 1 a 26): 603 palabras con artículo, plural, pronunciación y traducción, con un nivel por lección y la lista «Meine Wörter im Kurs».
- Auditoría de cobertura (`tools/audit.py`): 0 palabras sin preguntas; 35 estructuras del libro cubiertas. Frases propias para el vocabulario que solo aparecía suelto.
- Lecciones 4 a 6: lecturas y comprensión (cuarto libre, abreviaturas de anuncios con Kaution y Nebenkosten, horarios de Berlín, Franziska, cómic, folleto D-A-CH, clubes y la película de Alma).
- Temas de la maestra con nivel propio y muchas preguntas: artículo definido y pronombres, nicht o kein, der o den, ja/nein/doch, hora formal e informal, verbos de la maestra, separables e irregulares, orden de palabras.
- Pronunciación: unas 200 excepciones nuevas en `OVR` revisadas con la lista completa de palabras.
- Rediseño: `styles.css`, modo claro y oscuro con interruptor, portada con anillo de progreso y racha de estudio, tarjetas de nivel con icono y estado, quiz con iconos, animaciones suaves y barra de sesión, tablas legibles en 420 px.
- Verificación automática con Playwright (`tools/verify.py`) y capturas (`tools/screens.py`).
- Total: 55 niveles y 7393 preguntas. La clave de progreso no cambia (`aleman-a1-v2`).

## v2
- Lecciones 1 a 3 agregadas (11 niveles nuevos), total 27 niveles y 3341 preguntas.
- Corrector inteligente: mayúsculas, ae/oe/ue, diéresis faltante, erratas, artículo, forma de otra persona, orden de palabras. La explicación aparece siempre.
- Pronunciación y traducción en lecciones y en la retroalimentación, con audio.
- Simulacros: lecciones 1-3, lecciones 4-6 y final.
- Preguntas propias en mis-preguntas.js; exportar/importar progreso.

## v1
- Lecciones 4 a 6.
