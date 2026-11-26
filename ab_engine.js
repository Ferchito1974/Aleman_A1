/* v3.4: motor de los ejercicios tipo Arbeitsbuch (kind 'cloze') y de los «Test Lektion». */
'use strict';

const AB_SEC = { W: 'Wörter', G: 'Grammatik', K: 'Kommunikation' };
const AB_TEST_PLAN = { W: 2, G: 3, K: 2 }; // ejercicios por sección en cada test

/* convierte un ejercicio de AB en una pregunta 'cloze' */
function abToQ(x) {
  const level = 'ab' + x.l;
  const gaps = [], segs = [];
  x.lines.forEach(line => {
    const row = [];
    let last = 0; const rx = /\[\[(.+?)\]\]/g; let m;
    while ((m = rx.exec(line))) {
      if (m.index > last) row.push(line.slice(last, m.index));
      const [ansPart, optPart] = m[1].split('::');
      const ans = ansPart.split('/').map(s => s.trim());
      let opts = optPart ? shuffle(ans.slice(0, 1).concat(optPart.split('|'))) : null;
      if (!opts && x.bank) opts = x.bank.slice();
      row.push({ g: gaps.length });
      gaps.push({ ans, opts });
      last = rx.lastIndex;
    }
    if (last < line.length) row.push(line.slice(last));
    segs.push(row);
  });
  const q = { id: level + ':' + hash(x.ins + '|' + x.lines.join('|')), level, kind: 'cloze', q: x.ins, tr: x.tr, why: x.why, tag: 'Arbeitsbuch', sec: x.sec, segs, gaps, bank: x.bank || null, pts: gaps.length, de: true };
  q.plain = x.lines.map(l => l.replace(/\[\[(.+?)\]\]/g, '___')).join(' ');
  return q;
}
/* líneas resueltas (para la solución y el audio) */
function clozeSolved(q) {
  return q.segs.map(row => row.map(s => typeof s === 'string' ? s : q.gaps[s.g].ans[0]).join('').replace(/^\s*[◆○]\s*/, '').replace(/\s+/g, ' ').trim());
}
/* lo que se lee en voz alta: si la línea tiene «→», solo la solución */
const clozeSay = t => (t.includes('→') ? t.split('→').pop() : t).replace(/[()]/g, '').trim();
const clozeNorm = s => asciiFold(stripP(String(s || ''))).replace(/\s+/g, ' ').trim();
function clozeCheck(q, vals) {
  return q.gaps.map((g, i) => g.ans.some(a => clozeNorm(a) === clozeNorm(vals[i])));
}

const AB_TITLES = { 1: 'Guten Tag. Mein Name ist ...', 2: 'Meine Familie', 3: 'Essen und Trinken', 4: 'Meine Wohnung', 5: 'Mein Tag', 6: 'Freizeit', 7: 'Lernen, ein Leben lang' };
const AB_LEVELS = [1, 2, 3, 4, 5, 6, 7].map(n => ({
  id: 'ab' + n, group: 'Arbeitsbuch und Tests', exam: n <= 3 ? 1 : n <= 6 ? 2 : 3, icon: '📝', test: n,
  title: 'Arbeitsbuch-Training: Lektion ' + n, sub: '«' + AB_TITLES[n] + '» · Wörter, Grammatik, Kommunikation · Test Lektion ' + n,
  cats: [], gen: () => AB.filter(x => x.l === n).map(abToQ)
}));
[1, 2, 3, 4, 5, 6, 7].forEach(n => {
  LESSONS['ab' + n] = () => {
    const xs = AB.filter(x => x.l === n);
    const list = sec => '<ul class="ex">' + xs.filter(x => x.sec === sec).map(x => '<li>' + esc(x.ins) + ' <small>(' + esc(x.tr) + ')</small></li>').join('') + '</ul>';
    return box('Ejercicios con el formato del Arbeitsbuch', '<p>Aquí practicas como en el <b>Arbeitsbuch</b> y en el <b>Test Lektion ' + n + '</b>: diálogos con varios huecos, banco de palabras, «Was passt nicht?» y «Schreiben Sie Sätze». Cada hueco vale un punto.</p>' +
      '<p>El botón <b>📝 Test Lektion ' + n + '</b> te hace un examen como el del libro: 2 ejercicios de Wörter, 3 de Grammatik y 2 de Kommunikation, con puntos y semáforo al final (🔴 repasar, 🟡 casi, 🟢 bien).</p>') +
      '<div class="row"><button class="btn primary" data-act="abtest" data-l="' + n + '">📝 Test Lektion ' + n + ' starten</button></div>' +
      '<h4>Wörter (' + xs.filter(x => x.sec === 'W').length + ')</h4>' + list('W') +
      '<h4>Grammatik (' + xs.filter(x => x.sec === 'G').length + ')</h4>' + list('G') +
      '<h4>Kommunikation (' + xs.filter(x => x.sec === 'K').length + ')</h4>' + list('K');
  };
});

/* Test Lektion: elige ejercicios por sección, en orden W, G, K, sin repetir y con puntos */
function startTest(n) {
  const qs = pool('ab' + n);
  const chosen = [];
  ['W', 'G', 'K'].forEach(sec => { pick(qs.filter(q => q.sec === sec), AB_TEST_PLAN[sec]).forEach(q => chosen.push(q)); });
  if (!chosen.length) return;
  S.quiz = { title: 'Test Lektion ' + n, back: 'home', queue: chosen.map(q => ({ q, retry: 0 })), total: chosen.length, firstDone: 0, firstOk: 0, missed: [], tagMiss: {}, fb: null, st: null, test: n, pts: {}, max: {} };
  S.last = { title: 'Test Lektion ' + n, test: n };
  initState();
  go('quiz');
}
function trafficLight(p, m) { const r = m ? p / m : 0; return r >= 0.8 ? ['🟢', 'Sehr gut!', 'ok'] : r >= 0.6 ? ['🟡', 'Gut, aber üben Sie noch ein bisschen.', 'almost'] : ['🔴', 'Bitte noch einmal üben.', 'bad']; }
