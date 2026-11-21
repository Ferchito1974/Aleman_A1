# Cambios

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
