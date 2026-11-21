/* Construye el nivel «Mis preguntas» con lo que escribas en mis-preguntas.js */
'use strict';
(function () {
  if (typeof MIS_PREGUNTAS === 'undefined') return;
  const frases = MIS_PREGUNTAS.frases || [], palabras = MIS_PREGUNTAS.palabras || [], pregs = MIS_PREGUNTAS.preguntas || [];
  if (!frases.length && !palabras.length && !pregs.length) return;
  CATS.mias = { title: 'Mis palabras', items: palabras.map(p => NN(p[0], p[1], p[2], p[3] || null)) };
  const gen = () => {
    const out = [];
    if (palabras.length) nounQuestions('mias', ['mias']).forEach(q => out.push(q));
    if (frases.length >= 4) phraseQs('mias', frases, 'Mis frases').forEach(q => out.push(q));
    else frases.forEach(f => PHR.set(f[0], f[1]));
    pregs.forEach(p => {
      const id = 'mias:q:' + hash((p.q || p.es || '') + JSON.stringify(p));
      if (p.tipo === 'opcion') out.push(mc(id, 'mias', p.q, p.correcta, p.incorrectas || [], p.porque || '', 'Mis preguntas'));
      else if (p.tipo === 'escribir') out.push(ty(id, 'mias', p.q, p.respuestas || [], p.porque || '', 'Mis preguntas'));
      else if (p.tipo === 'ordenar') out.push(bd(id, 'mias', p.es, p.palabras || [], p.porque || '', p.alternativas || [], []));
    });
    return out;
  };
  LEVELS.push({ id: 'mias', group: 'Mis preguntas', exam: 0, n: LEVELS.length + 1, title: 'Mis preguntas', sub: 'Archivo mis-preguntas.js', cats: ['mias'], gen: uniq(gen) });
  LESSONS.mias = () => '<div class="box"><b>Tu contenido</b><p>Lo que añadas en <code>mis-preguntas.js</code> aparece aquí.</p></div>' +
    (palabras.length ? vocabTable('mias') : '') + (frases.length ? ph('Mis frases', frases.map(f => [f[0], f[1], f[2] || ''])) : '');
})();
