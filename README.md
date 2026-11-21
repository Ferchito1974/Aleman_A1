# Alemán A1: lecciones 1 a 6 (Schritte international Neu 1)

App estática (HTML + JavaScript, sin dependencias) para estudiar por niveles, con preguntas que se repiten hasta dominarlas, explicación de cada respuesta, pronunciación y traducción.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo `aleman-a1`), público.
2. Sube TODOS los archivos de esta carpeta a la raíz del repositorio (Add file > Upload files). `index.html` debe quedar en la raíz.
3. Ve a Settings > Pages. En "Build and deployment" elige Source: Deploy from a branch, Branch: `main`, carpeta `/ (root)`. Guarda.
4. En uno o dos minutos la app queda en `https://TU_USUARIO.github.io/aleman-a1/`.

## Agregar o corregir preguntas
Edita solo `mis-preguntas.js` (tiene instrucciones y ejemplos en comentarios). Al subir el cambio al repositorio, la página se actualiza sola. Las preguntas aparecen en el nivel "Mis preguntas".

## Progreso
El progreso se guarda en el navegador (localStorage), por dispositivo y por dirección web. Si cambias de dispositivo o de dominio, usa Exportar/Importar progreso (JSON) dentro de la app. Los identificadores de pregunta dependen del texto: si editas el texto de una pregunta, su progreso se reinicia.

## Audio
El botón de altavoz usa la voz alemana del dispositivo (speechSynthesis, de-DE). Si no hay voz alemana instalada, el audio no suena y la pronunciación escrita sigue disponible. La pronunciación escrita es una aproximación con letras del español.

## Archivos
index.html, app.js (interfaz), data.js (datos y niveles de las lecciones 4 a 6), content123.js (lecciones 1 a 3 y generadores), lessons.js (textos de repaso), pron.js (pronunciación y voz), check.js (corrector), mis-preguntas.js y custom.js (preguntas propias).
