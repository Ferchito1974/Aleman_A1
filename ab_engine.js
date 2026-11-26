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
  const q = { id: level + ':' + hash(x.ins + '|' + x.lines.join('|')), level, kind: 'cloze', q: x.ins, tr: x.tr, why: x.why, tag: x.sec === 'L' ? 'Lesen' : 'Arbeitsbuch', sec: x.sec, segs, gaps, bank: x.bank || null, pts: gaps.length, de: true };
  q.plain = x.lines.map(l => l.replace(/\[\[(.+?)\]\]/g, '___')).join(' ');
  return q;
}
/* líneas resueltas (para la solución y el audio) */
function clozeSolved(q) {
  return q.segs.map(row => row.map(s => typeof s === 'string' ? s : q.gaps[s.g].ans[0]).join('').replace(/^\s*[◆○¶]\s*/, '').replace(/\s+/g, ' ').trim());
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

/* ======================= v3.5: SCHREIBEN (tipo 'free') ======================= */
Object.assign(AB_SEC, { L: 'Lesen', S: 'Schreiben' });
AB_TEST_PLAN.L = 1; AB_TEST_PLAN.S = 2;
function freeToQ(f) {
  const level = 'ab' + f.l;
  const pts = f.mode === 'text' ? f.checks.length + 1 : 1;
  return { id: level + ':s:' + hash(f.q + '|' + f.model), level, kind: 'free', mode: f.mode, q: f.q, tr: f.tr, why: f.why, tag: 'Schreiben', sec: 'S', pats: f.pats || [], checks: f.checks || [], min: f.min || 0, model: f.model, pts, de: true, plain: f.q };
}
const freeNorm = s => asciiFold(String(s || '')).replace(/[–—]/g, ' ').replace(/[.!?¿¡"«»;:]/g, ' ').replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ').trim().replace(/,$/, '');
let _NOUNS = null;
function nounSet() { // sustantivos conocidos que no son también otra palabra (para avisar de la minúscula)
  if (_NOUNS) return _NOUNS;
  const other = new Set(WL_ALL.filter(e => !e.noun).map(e => e.w.toLowerCase()).concat(VERBS.map(v => v[0])));
  _NOUNS = new Map();
  WL_ALL.filter(e => e.noun).forEach(e => { const k = e.w.toLowerCase(); if (!other.has(k) && !/\s/.test(k)) _NOUNS.set(k, e.w); if (e.pl && !/^(Sg|Pl)$/.test(e.pl) && !other.has(e.pl.toLowerCase())) _NOUNS.set(e.pl.toLowerCase(), e.pl); });
  return _NOUNS;
}
/* errores típicos en lo que escribe el estudiante (notas en español) */
function freeHints(raw) {
  const parts = String(raw).split(/[.!?]+/).map(x => x.trim()).filter(Boolean);
  if (parts.length > 1) { const all = []; parts.forEach(pt => freeHints1(pt).forEach(h => { if (!all.includes(h)) all.push(h); })); return all; }
  return freeHints1(raw);
}
function freeHints1(raw) {
  const notes = []; const n = freeNorm(raw); const nouns = nounSet();
  const low = (String(raw).match(/[A-Za-zÄÖÜäöüß]+/g) || []).filter((w, i) => i > 0 && w === w.toLowerCase() && nouns.has(w));
  if (low.length) notes.push('Los sustantivos van con mayúscula: ' + low.map(w => nouns.get(w)).join(', ') + '.');
  if (/\b(habe|hast|hat|haben|habt)\b.*\bge(gangen|fahren|kommen)\b|\b(habe|hast|hat|haben|habt)\b.*\baufgestanden\b/.test(n)) notes.push('gehen, fahren, kommen y aufstehen forman el Perfekt con sein: ich bin gegangen / gefahren / gekommen.');
  if (/\b(bin|bist|ist|sind|seid)\b.*\bge(macht|spielt|lernt|kauft|kocht|arbeitet|gessen|trunken|schlafen|lesen|sehen|troffen|schrieben)\b/.test(n)) notes.push('Ese verbo forma el Perfekt con haben, no con sein: ich habe ... gemacht / gespielt / gegessen.');
  if (/(^|, )(heute|morgen|gestern|dann|danach|am \w+|um [\w.:]+( uhr)?|in den ferien|im \w+|naechste woche) (ich|du|er|sie|wir|ihr)\b/.test(n)) notes.push('Si empiezas con una expresión de tiempo, el verbo va en la posición 2 y el sujeto después: «Am Abend gehe ich ...», no «Am Abend ich gehe ...».');
  if (/\b(kann|will|kannst|willst|koennen|wollen)\b \w+(e|st|t)\b \w+$/.test(n) && !/\b(kann|will|kannst|willst|koennen|wollen)\b.*\w+en$/.test(n)) notes.push('Con können / wollen el otro verbo va en infinitivo (-en) y al final: «Ich kann gut kochen».');
  if (/^ich (?!bin\b|kann\b|will\b|habe\b)[a-z]+en\b/.test(n)) notes.push('Con «ich» el verbo no lleva -en (eso es el infinitivo o la forma de wir/sie): ich wohne, ich spiele, ich lerne.');
  if (/^ich \w+(st|t)\b/.test(n) && !/^ich (bist|ist|hast|hat|isst|weisst|heisst|kannst|willst|musst|bin|hat)\b/.test(n) && !/^ich (arbeit|antwort|kost|wart|test)/.test(n)) notes.push('Con «ich» el verbo termina en -e: ich wohne, ich spiele, ich lerne.');
  return notes;
}
function freeCheck(q, raw) {
  const n = freeNorm(raw);
  if (q.mode === 'sentence') {
    const ok = q.pats.some(p => new RegExp(p).test(n));
    return { ok, earned: ok ? 1 : 0, items: [], hints: ok ? [] : freeHints(raw) };
  }
  const words = n.split(' ').filter(w => /[a-z0-9]/.test(w)).length;
  const items = q.checks.map(c => ({ l: c[0], ok: new RegExp(c[1]).test(n) }));
  items.push({ l: 'Mínimo ' + q.min + ' palabras (escribiste ' + words + ')', ok: words >= q.min });
  const earned = items.filter(i => i.ok).length;
  return { ok: earned === items.length, earned, items, hints: freeHints(raw) };
}
/* los niveles de Arbeitsbuch-Training incluyen ahora Lesen y Schreiben */
AB_LEVELS.forEach(L => { const g0 = L.gen; L.gen = () => g0().concat(FREE_LIST.filter(f => f.l === L.test).map(freeToQ)); L.sub = '«' + AB_TITLES[L.test] + '» · Wörter, Grammatik, Kommunikation, Lesen, Schreiben · Test'; });
