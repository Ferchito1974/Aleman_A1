/* v3: registro y orden de todos los niveles (después de cargar todos los archivos de contenido).
   Agrupa por lección, añade un icono por tema y numera de nuevo. Los ids de pregunta no cambian. */
'use strict';
(function () {
  const extra = [].concat(typeof WL_LEVELS !== 'undefined' ? WL_LEVELS : [], typeof L456_LEVELS !== 'undefined' ? L456_LEVELS : [], typeof L7_LEVELS !== 'undefined' ? L7_LEVELS : [], typeof CTX_LEVELS !== 'undefined' ? CTX_LEVELS : []);
  extra.forEach(l => { const g = l.gen; l.gen = uniq(g); });
  const ICONS = {
    l1greet: '👋', l1name: '🪪', l1abc: '🔤', l2family: '👨‍👩‍👧', l2feel: '🙂', l2data: '🔢', l3food: '🍎', l3art: '❓', l3shop: '🛒', l3eat: '🍽️', verbs123: '📝',
    rooms: '🏠', furniture: '🛋️', adj: '🎨', numbers: '💶', art: '🔵', neg: '🚫', verbs: '📝', teacher: '🧑‍🏫', order: '🧩',
    time: '⏰', when: '📅', acc: '🎯', jandoch: '💬', weather: '☀️', hobby: '⚽', food: '🌭', mias: '✏️'
  };
  const all = LEVELS.concat(extra);
  all.forEach(l => { if (!l.icon) l.icon = ICONS[l.id] || '📘'; });
  const ORDER = ['Lección 1', 'Lección 2', 'Lección 3', 'Lección 4', 'Gramática y verbos (4 a 6)', 'Temas de la maestra', 'Lección 5', 'Lección 6', 'Lección 7', 'Mis preguntas'];
  const rank = g => { const i = ORDER.indexOf(g); return i < 0 ? ORDER.length : i; };
  // orden estable: por grupo, y dentro del grupo el orden original (la Wortliste al final de su lección)
  const sorted = all.map((l, i) => ({ l, i: /^wl/.test(l.id) ? 2000 + i : /^ctx/.test(l.id) ? 1000 + i : i })).sort((a, b) => rank(a.l.group) - rank(b.l.group) || a.i - b.i).map(x => x.l);
  LEVELS.length = 0;
  sorted.forEach((l, i) => { l.n = i + 1; LEVELS.push(l); });
})();
