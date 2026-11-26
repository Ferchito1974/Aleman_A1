/* v3.6: portada en tres pestañas: Examen (práctica de examen), Temas y Lecciones. */
'use strict';

const HOME_TOPICS = [
  ['🗂️', 'Wortschatz (vocabulario)', ['wl0', 'wl1', 'wl2', 'wl3', 'wl4', 'wl5', 'wl6', 'wl7', 'ctx13', 'ctx46', 'ctx7', 'rooms', 'furniture', 'l3food', 'food', 'weather', 'hobby', 'l7hob', 'l2family']],
  ['🖼️', 'Bilder: palabras y actividades con imágenes', ['bild13', 'bild46', 'bild7']],
  ['🔵', 'Artikel (der, das, die · ein, eine)', ['art', 'gart', 'l3art']],
  ['🎯', 'der oder den (Nominativ / Akkusativ)', ['acc', 'gakk']],
  ['💬', 'ja / nein / doch', ['jandoch', 'gdoch']],
  ['🚫', 'Negation: nicht / kein', ['neg', 'gneg']],
  ['📝', 'Verben und Konjugation', ['verbs123', 'verbs', 'teacher', 'gteach', 'gsep', 'dv13', 'dv46', 'dv7', 'l7kann', 'l7will']],
  ['⏪', 'Perfekt', ['l7perfh', 'l7perfs']],
  ['🧩', 'Satzbau (orden de palabras)', ['order', 'gord']],
  ['⏰', 'Uhrzeit, Tage und Zeit', ['time', 'guhr', 'when']],
  ['💶', 'Zahlen, Preise, Farben, Adjektive', ['l2data', 'numbers', 'l3shop', 'adj']],
  ['🗣️', 'Kommunikation und Situationen', ['l1greet', 'l1name', 'l1abc', 'l2feel', 'l3eat', 'dsit13', 'dsit46', 'dsit7']],
  ['📖', 'Lesen (lectura)', ['r4', 'r5', 'r6', 'l7read']],
  ['🎧', 'Hören (escuchar)', ['hoer13', 'hoer46', 'hoer7']],
  ['✏️', 'Mis preguntas', ['mias']]
];

function levelCard(l) {
  const pp = prog(pool(l.id));
  return '<button class="lv" data-act="level" data-id="' + l.id + '"><span class="icon" aria-hidden="true">' + (l.icon || '📘') + '<span class="n">' + l.n + '</span></span><span class="lt"><b>' + esc(l.title) + '</b><small>' + esc(l.sub) + '</small>' + bar(pp.pct, pp.pct === 100 ? 'done' : '') +
    '<span class="meta"><span>' + pp.known + ' de ' + pp.total + ' bien · ' + pp.mastered + ' dominadas</span>' + levelStatus(pp) + '</span></span></button>';
}
function levelSection(title, ls, icon) {
  ls = ls.filter(Boolean); if (!ls.length) return '';
  const gp = prog(ls.flatMap(l => pool(l.id)));
  return '<h2 class="sec">' + (icon ? '<span aria-hidden="true">' + icon + '</span> ' : '') + esc(title) + ' <small>' + gp.pct + '%</small><span class="secbar">' + bar(gp.pct, gp.pct === 100 ? 'done' : '') + '</span></h2><div class="levels">' + ls.map(levelCard).join('') + '</div>';
}
function testCard(spec, title, sub) {
  const r = (store.tests || {})[spec];
  const tl = r ? trafficLight(r.p, r.m) : null;
  return '<button class="tcard" data-act="abtest" data-l="' + spec + '"><span class="tt">📝 ' + esc(title) + '</span><small>' + esc(sub) + '</small>' +
    '<span class="tres">' + (r ? tl[0] + ' Último: <b>' + r.p + ' / ' + r.m + '</b> · ' + esc(r.d) : 'Sin intentos todavía') + '</span></button>';
}

function homeTabs(qa, missed) {
  const tab = S.homeTab || 'exam';
  const tb = (id, label) => '<button class="htab' + (tab === id ? ' on' : '') + '" role="tab" aria-selected="' + (tab === id) + '" data-act="htab" data-t="' + id + '">' + label + '</button>';
  let h = '<nav class="htabs" role="tablist" aria-label="Secciones">' + tb('exam', '🎯 Examen') + tb('topics', '📚 Temas') + tb('lessons', '📖 Lecciones') + '</nav>';
  if (tab === 'exam') {
    h += '<p class="lead small">Práctica con el formato del examen y del Arbeitsbuch: tests por lección con puntos y semáforo, y las partes Lesen, Hören y Schreiben.</p>';
    h += '<h2 class="sec">📝 Tests (como en el libro)</h2><div class="tgrid">' +
      [1, 2, 3, 4, 5, 6, 7].map(n => testCard(String(n), 'Test Lektion ' + n, AB_TITLES[n])).join('') +
      testCard('1-3', 'Test Lektion 1–3', 'Examen de las lecciones 1 a 3') + testCard('4-6', 'Test Lektion 4–6', 'Examen de las lecciones 4 a 6') + testCard('1-7', 'Gesamttest 1–7', 'Todo el libro') + '</div>';
    h += '<h2 class="sec">🎓 Prüfungsteile (partes del examen)</h2><section class="quick">' +
      qa('lesen', '', 6, '📖', 'Lesen', 'Textos con richtig / falsch') +
      qa('hoeren', '', 8, '🎧', 'Hören', 'Escuchar, dictado, números y horas') +
      qa('schreiben', '', 10, '✏️', 'Schreiben von null', 'Oraciones y textos sin ayuda') +
      qa('bilder', '', 15, '🖼️', 'Bilder', 'Was ist das? Was macht sie?') +
      qa('konj', '', 30, '🔁', 'Konjugationstrainer', 'Verbos en frases') +
      qa('doch', '', 20, '💬', 'ja / nein / doch + der / den', 'Lo que más cuesta') +
      qa('errors', '', 0, '🔁', 'Mis errores', missed.length + ' por repasar', '', !missed.length) +
      qa('mix', 'all', 60, '🏁', 'Simulacro final', '60 preguntas de todo') + '</section>';
    h += levelSection('Arbeitsbuch-Training por lección', LEVELS.filter(l => /^ab\d$/.test(l.id)), '📒');
  } else if (tab === 'topics') {
    h += '<p class="lead small">Practica por tema, mezclando todas las lecciones.</p>';
    const used = new Set();
    HOME_TOPICS.forEach(([icon, title, ids]) => { const ls = ids.map(id => LEVELS.find(l => l.id === id)).filter(Boolean); ls.forEach(l => used.add(l.id)); h += levelSection(title, ls, icon); });
    const rest = LEVELS.filter(l => !used.has(l.id) && !/^ab\d$/.test(l.id));
    h += levelSection('Otros', rest, '📘');
  } else {
    h += '<section class="quick">' + qa('mix', '1', 25, '👋', 'Repaso lecciones 1 a 3', '25 preguntas') + qa('mix', '2', 25, '🏠', 'Repaso lecciones 4 a 6', '25 preguntas') + qa('mix', '3', 25, '🆕', 'Repaso lección 7', '25 preguntas') +
      qa('chuleta', '', 0, '📄', 'Chuleta de todo', 'Todo en una página') + qa('pron', '', 0, '🗣️', 'Guía de pronunciación', 'Cómo leer el alemán') + '</section>';
    const groups = []; LEVELS.forEach(l => { if (!groups.includes(l.group) && l.group !== 'Arbeitsbuch und Tests') groups.push(l.group); });
    groups.forEach(g => { h += levelSection(g, LEVELS.filter(l => l.group === g)); });
  }
  return h;
}
