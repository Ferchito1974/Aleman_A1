/* Motor de la app v2: niveles, sesiones, repetición, corrección inteligente, pronunciación y progreso */
'use strict';

const KEY = 'aleman-a1-v2';
const OLD_KEY = 'aleman-a1-lecciones-4-6-v1';
let store = { q: {}, set: { strict: false } };
try {
  const raw = localStorage.getItem(KEY);
  if (raw) store = JSON.parse(raw) || store;
  else { const old = localStorage.getItem(OLD_KEY); if (old) { const o = JSON.parse(old); if (o && o.q) store.q = o.q; } }
} catch (e) { /* sin almacenamiento */ }
if (!store.q) store.q = {};
if (!store.set) store.set = { strict: false };
function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignorar */ } }

/* ---------- v3: racha de estudio y tema claro/oscuro ---------- */
const THEME_KEY = 'aleman-a1-theme';
const dayStr = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function touchStreak() { // se llama al contestar; la racha vive dentro del mismo progreso (misma clave)
  const t = dayStr(new Date());
  const y = new Date(); y.setDate(y.getDate() - 1);
  const s = store.streak || { last: '', days: 0, best: 0 };
  if (s.last === t) return;
  s.days = s.last === dayStr(y) ? s.days + 1 : 1;
  s.best = Math.max(s.best || 0, s.days); s.last = t;
  store.streak = s;
}
function streakDays() {
  const s = store.streak; if (!s || !s.last) return 0;
  const y = new Date(); y.setDate(y.getDate() - 1);
  return (s.last === dayStr(new Date()) || s.last === dayStr(y)) ? s.days : 0;
}
function themeGet() { try { return localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) { return 'auto'; } }
function themeApply(t) {
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
}
function themeCycle() {
  const order = ['auto', 'light', 'dark']; const t = order[(order.indexOf(themeGet()) + 1) % 3];
  try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* ignorar */ }
  themeApply(t); render();
}
const THEME_LABEL = { auto: ['🌓', 'Automático'], light: ['☀️', 'Claro'], dark: ['🌙', 'Oscuro'] };
const themeBtn = () => { const t = themeGet(); const l = THEME_LABEL[t] || THEME_LABEL.auto; return '<button class="theme-btn" data-act="theme" aria-label="Tema: ' + l[1] + '. Toca para cambiar" title="Tema: ' + l[1] + '"><span class="ti" aria-hidden="true">' + l[0] + '</span><span>' + l[1] + '</span></button>'; };
themeApply(themeGet());

const POOLS = {};
function pool(id) { if (!POOLS[id]) POOLS[id] = LEVELS.find(l => l.id === id).gen(); return POOLS[id]; }
const levelsBy = ex => LEVELS.filter(l => ex === 'all' || String(l.exam) === String(ex));
const poolOf = ex => levelsBy(ex).flatMap(l => pool(l.id));
const allPool = () => poolOf('all');
const stat = id => store.q[id];
const isKnown = q => (stat(q.id) || {}).c >= 1;
const isMastered = q => (stat(q.id) || {}).c >= 2;
const isMissed = q => (stat(q.id) || {}).w === true;
function prog(list) {
  const total = list.length; let k = 0, m = 0;
  list.forEach(q => { if (isKnown(q)) k++; if (isMastered(q)) m++; });
  return { total, known: k, mastered: m, pct: total ? Math.round(100 * k / total) : 0 };
}

const S = { view: 'home', level: null, tab: 'learn', hideEs: false, quiz: null };
const $app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function go(view, extra) { Object.assign(S, { view }, extra || {}); render(); window.scrollTo(0, 0); }

/* ---------- selección de preguntas ---------- */
function weight(q) {
  const s = stat(q.id);
  if (!s) return 3;
  if (s.w) return 6;
  if (s.c >= 2) return 0.5;
  return 2;
}
function pick(list, n) {
  const scored = list.map(q => ({ q, w: weight(q) * (0.4 + Math.random()) }));
  scored.sort((a, b) => b.w - a.w);
  return shuffle(scored.slice(0, n).map(x => x.q));
}
function startQuiz(title, list, n, back) {
  const mixed = new Set(list.map(q => q.level)).size > 1; // v3.2: en repasos mezclados, más verbos y menos «qué significa»
  const chosen = mixed && typeof pickBalanced === 'function' ? pickBalanced(list, Math.min(n, list.length)) : pick(list, Math.min(n, list.length));
  if (!chosen.length) return;
  S.quiz = { title, back: back || 'home', queue: chosen.map(q => ({ q, retry: 0 })), total: chosen.length, firstDone: 0, firstOk: 0, missed: [], tagMiss: {}, fb: null, st: null };
  initState();
  go('quiz');
}
function initState() {
  const Q = S.quiz; const q = Q.queue[0].q;
  Q.fb = null;
  if (q.kind === 'mc') Q.st = { order: shuffle(q.opts) };
  else if (q.kind === 'build') Q.st = { bank: shuffle(q.tokens.concat(q.extra || [])).map((t, i) => ({ t, i })), placed: [] };
  else Q.st = {};
  Q.st.tr = false; // v3.2: traducción cerrada al empezar cada pregunta
}

/* ---------- respuesta, pronunciación y feedback ---------- */
function answerText(q) {
  if (q.kind === 'mc') return q.ans;
  if (q.kind === 'type') return q.answers[0];
  return q.tokens.join(' ');
}
/* texto alemán asociado a la pregunta, con su traducción, para mostrar pronunciación */
function infoOf(q) {
  if (q.info && q.info.de) return q.info;
  if (q.kind === 'build') return { de: q.tokens.join(' '), es: q.es };
  if (q.kind === 'type') { const a = q.answers[0]; if (/^[0-9]/.test(a) || /[a-zäöüß]/i.test(a)) return { de: a, es: '' }; }
  if (q.kind === 'mc' && /Cómo se dice|en alemán|Traduce|alemán:/i.test(q.q)) return { de: q.ans, es: '' };
  return null;
}
function submit(ok, note, shown, almost) {
  const Q = S.quiz; const cur = Q.queue[0]; const q = cur.q;
  Q.anim = ok ? 'ok' : 'bad'; // v3: animación de la tarjeta
  if (cur.retry === 0) {
    touchStreak(); // v3: racha de estudio
    const s = store.q[q.id] || { c: 0, n: 0, w: false };
    s.n++;
    if (ok) { s.c++; s.w = false; Q.firstOk++; } else { s.c = 0; s.w = true; Q.missed.push(q); Q.tagMiss[q.tag || q.level] = (Q.tagMiss[q.tag || q.level] || 0) + 1; }
    store.q[q.id] = s; save();
    Q.firstDone++;
  }
  Q.fb = { ok, almost: !!almost, note: note || '', shown: shown || answerText(q), willRepeat: !ok && cur.retry < 2 };
  render();
}
function next() {
  const Q = S.quiz; const cur = Q.queue.shift();
  if (Q.fb && !Q.fb.ok && cur.retry < 2) Q.queue.splice(Math.min(3, Q.queue.length), 0, { q: cur.q, retry: cur.retry + 1 });
  if (!Q.queue.length) { go('summary'); return; }
  initState(); render(); window.scrollTo(0, 0);
}
function judge(r) { // status → (ok, almost, note) según el modo estricto
  if (r.status === 'ok') return { ok: true, almost: false, note: r.note };
  if (r.status === 'almost') return store.set.strict ? { ok: false, almost: true, note: r.note + ' En modo estricto esto cuenta como error.' } : { ok: true, almost: true, note: r.note };
  return { ok: false, almost: false, note: r.note };
}
function doCheck() {
  const Q = S.quiz; const q = Q.queue[0].q; const inp = document.getElementById('ans'); if (!inp) return;
  const r = diagnoseType(q, inp.value); if (r === null) { inp.focus(); return; }
  Q.st.val = inp.value; const j = judge(r); submit(j.ok, j.note, q.answers[0], j.almost);
}

/* ---------- vistas ---------- */
const bar = (pct, cls) => '<div class="bar ' + (cls || '') + '"><i style="width:' + pct + '%"></i></div>';
const speaker = t => '<button class="spk" data-say="' + esc(t) + '" title="Escuchar" aria-label="Escuchar">🔊</button>';

/* v3: anillo de progreso (SVG) y estado de cada nivel */
function ring(pct) {
  const r = 52, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
  return '<div class="ring" role="img" aria-label="Progreso total: ' + pct + ' por ciento"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="track" cx="60" cy="60" r="' + r + '" fill="none" stroke-width="11"/>' +
    '<circle class="meter" cx="60" cy="60" r="' + r + '" fill="none" stroke-width="11" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '" data-off="' + off.toFixed(1) + '"/></svg>' +
    '<div class="ring-txt"><div><b>' + pct + '%</b><small>contestado bien</small></div></div></div>';
}
function levelStatus(pp) {
  if (pp.total && pp.mastered / pp.total >= 0.9) return '<span class="status done">✓ Dominado</span>';
  if (pp.known > 0 || pp.mastered > 0) return '<span class="status go">● En curso</span>';
  return '<span class="status new">○ Sin empezar</span>';
}
function viewHome() {
  const all = allPool(); const p = prog(all); const missed = all.filter(isMissed);
  const p1 = prog(poolOf(1)), p2 = prog(poolOf(2)), p3 = prog(poolOf(3));
  const sd = streakDays();
  let h = '<div class="appbar"><span class="brand"><span class="brand-mark" aria-hidden="true">A1</span>Alemán A1</span><span class="spacer"></span>' + themeBtn() + '</div>';
  h += '<header class="hero-card">' + ring(p.pct) + '<div class="hero-body"><p class="eyebrow">Schritte international Neu 1 · A1.1</p><h1>Lecciones 1 a 7</h1>' +
    '<p class="lead">Aprende por niveles, practica con preguntas que se repiten hasta dominarlas y lee siempre el porqué, la pronunciación y la traducción.</p>' +
    '<div class="stats"><span class="stat streak" title="Días seguidos con práctica">🔥 <b>' + sd + '</b> ' + (sd === 1 ? 'día seguido' : 'días seguidos') + '</span>' +
    '<span class="stat">✅ <b>' + p.mastered + '</b> dominadas</span><span class="stat">📚 <b>' + p.total + '</b> preguntas</span><span class="stat">🗂️ <b>' + LEVELS.length + '</b> niveles</span></div>' +
    '</div></header>';
  const qa = (act, ex, n, icon, title, sub, cls, dis) => '<button class="qa' + (cls ? ' ' + cls : '') + '" data-act="' + act + '"' + (ex ? ' data-ex="' + ex + '"' : '') + (n ? ' data-n="' + n + '"' : '') + (dis ? ' disabled' : '') + '><span class="qi" aria-hidden="true">' + icon + '</span><span><b>' + title + '</b><small>' + sub + '</small></span></button>';
  h += '<section class="quick" aria-label="Repasos y herramientas">' +
    qa('konj', '', 30, '🔁', 'Konjugationstrainer', 'Verbos en frases, 30 preguntas', 'primary') +
    qa('deonly', '', 25, '✍️', 'Nur Deutsch', 'Solo preguntas en alemán') +
    qa('mix', '3', 25, '🆕', 'Repaso lección 7', '25 preguntas · ' + p3.pct + '%') +
    qa('mix', '2', 25, '🏠', 'Repaso lecciones 4 a 6', '25 preguntas · ' + p2.pct + '%') +
    qa('mix', '1', 25, '👋', 'Repaso lecciones 1 a 3', '25 preguntas · ' + p1.pct + '%') +
    qa('mix', 'all', 60, '🏁', 'Simulacro final', '60 preguntas de todo') +
    qa('errors', '', 0, '🔁', 'Mis errores', missed.length + ' por repasar', '', !missed.length) +
    qa('chuleta', '', 0, '📄', 'Chuleta de todo', 'Todo en una página') +
    qa('pron', '', 0, '🗣️', 'Guía de pronunciación', 'Cómo leer el alemán') + '</section>';
  const groups = []; LEVELS.forEach(l => { if (!groups.includes(l.group)) groups.push(l.group); });
  groups.forEach(g => {
    const ls = LEVELS.filter(l => l.group === g); const gp = prog(ls.flatMap(l => pool(l.id)));
    h += '<h2 class="sec">' + esc(g) + ' <small>' + gp.pct + '%</small><span class="secbar">' + bar(gp.pct, gp.pct === 100 ? 'done' : '') + '</span></h2><div class="levels">';
    ls.forEach(l => {
      const pp = prog(pool(l.id));
      h += '<button class="lv" data-act="level" data-id="' + l.id + '"><span class="icon" aria-hidden="true">' + (l.icon || '📘') + '<span class="n">' + l.n + '</span></span><span class="lt"><b>' + esc(l.title) + '</b><small>' + esc(l.sub) + '</small>' + bar(pp.pct, pp.pct === 100 ? 'done' : '') +
        '<span class="meta"><span>' + pp.known + ' de ' + pp.total + ' bien · ' + pp.mastered + ' dominadas</span>' + levelStatus(pp) + '</span></span></button>';
    });
    h += '</div>';
  });
  h += '<h2 class="sec">Ajustes y progreso</h2><div class="card"><label class="chk"><input type="checkbox" data-act="strict"' + (store.set.strict ? ' checked' : '') + '> Modo estricto: una errata o una mayúscula olvidada cuenta como error</label>' +
    '<label class="chk"><input type="checkbox" data-act="demode"' + (deMode() ? ' checked' : '') + '> Preguntas en alemán (con botón 🌐 Übersetzen para ver la traducción)</label>' +
    '<p class="muted small">Sin modo estricto, las mayúsculas, las diéresis y las erratas de una letra se aceptan pero te muestro qué corregir.</p>' +
    '<div class="row"><button class="btn small" data-act="export">Exportar progreso</button><button class="btn small" data-act="import">Importar progreso</button><button class="btn small ghost" data-act="reset">Borrar progreso</button></div>' +
    '<input type="file" id="imp" accept="application/json,.json" hidden>' +
    '<p class="muted small">El progreso vive en este navegador. Si cambias de dispositivo o de dirección web, expórtalo aquí e impórtalo allá.</p></div>';
  h += '<p class="foot">Para el examen: empieza con «Temas de la maestra» (artículos, negación, der o den, ja/nein/doch, la hora, verbos y orden de palabras) y termina con el repaso de las lecciones 4 a 6 y el de la lección 7.</p>';
  return h;
}

function viewLevel() {
  const l = LEVELS.find(x => x.id === S.level); const list = pool(l.id); const p = prog(list);
  let h = '<div class="top"><button class="btn ghost" data-act="home">← Niveles</button></div>';
  h += '<h1 class="lh"><span class="num big" aria-hidden="true">' + (l.icon || l.n) + '</span>' + esc(l.title) + '</h1><p class="sub">' + esc(l.group) + ' · ' + esc(l.sub) + '</p>';
  h += '<div class="tabs"><button class="tab' + (S.tab === 'learn' ? ' on' : '') + '" data-act="tab" data-t="learn">Aprender</button><button class="tab' + (S.tab === 'practice' ? ' on' : '') + '" data-act="tab" data-t="practice">Practicar (' + p.total + ')</button></div>';
  if (S.tab === 'learn') {
    h += '<div class="learn' + (S.hideEs ? ' hide-es' : '') + '"><label class="chk"><input type="checkbox" id="hide-es"' + (S.hideEs ? ' checked' : '') + ' data-act="hides"> Ocultar el español (toca una celda para verla)</label>' + LESSONS[l.id]() +
      '</div><div class="sticky"><button class="btn primary wide" data-act="tab" data-t="practice">Ir a practicar este nivel →</button></div>';
  } else {
    h += '<div class="card"><p>' + bar(p.pct, p.pct === 100 ? 'done' : '') + '</p><p><b>' + p.known + '</b> de ' + p.total + ' contestadas bien · <b>' + p.mastered + '</b> dominadas.</p>' +
      '<p class="muted">Cada sesión prioriza lo que no has visto y lo que fallaste. Lo que falles reaparece unas preguntas después hasta que lo aciertes.</p>' +
      '<div class="row"><button class="btn primary" data-act="start" data-n="10">10 preguntas</button><button class="btn" data-act="start" data-n="20">20 preguntas</button><button class="btn" data-act="start" data-n="40">40 preguntas</button></div></div>';
  }
  return h;
}

function pronLine(q) {
  const f = infoOf(q); if (!f || !f.de) return '';
  return '<div class="pronline">' + speaker(f.de) + '<div><b>' + esc(f.de) + '</b><span class="pr"> · se pronuncia «' + esc(pron(f.de)) + '»</span>' + (f.es ? '<br><span class="es">' + esc(f.es) + '</span>' : '') + '</div></div>';
}

function viewQuiz() {
  const Q = S.quiz; const cur = Q.queue[0]; const q = cur.q;
  const pct = Math.round(100 * Q.firstDone / Q.total);
  const DE = deMode(); const V = DE ? deView(q) : null; // v3.2: presentación en alemán
  const L = DE ? { quit: '← Beenden', rev: 'Wiederholung', check: 'Prüfen', idk: 'Weiß ich nicht', clear: 'Löschen', next: 'Weiter', ph: 'Deine Antwort', hint: 'Tippe die Wörter in der richtigen Reihenfolge an', sol: 'Lösung', why: 'Erklärung (español)', again: 'Diese Frage kommt gleich noch einmal.' }
    : { quit: '← Salir', rev: 'Repaso', check: 'Comprobar', idk: 'No sé', clear: 'Borrar', next: 'Siguiente', ph: 'Tu respuesta', hint: 'Toca las palabras de abajo en orden', sol: 'Respuesta', why: 'Por qué', again: 'Esta pregunta volverá a aparecer en unos minutos.' };
  let h = '<div class="qtop"><button class="btn ghost small" data-act="quit">' + L.quit + '</button><span class="qt">' + esc(Q.title) + '</span><span class="qc" aria-label="Pregunta ' + Math.min(Q.firstDone + 1, Q.total) + ' de ' + Q.total + '">' + Math.min(Q.firstDone + 1, Q.total) + ' / ' + Q.total + (cur.retry ? ' · ' + L.rev.toLowerCase() : '') + '</span></div>' + bar(pct, 'session');
  const cls = (Q.fb ? (Q.fb.ok ? (Q.fb.almost ? ' almost' : ' ok') : ' bad') : '') + (Q.fb && Q.anim ? ' anim-' + Q.anim : '');
  h += '<div class="qcard' + cls + '">' + (q.tag ? '<span class="chip">' + esc(tagDe(q.tag)) + '</span>' : '') + (cur.retry ? '<span class="chip warn">' + L.rev + '</span>' : '');
  if (DE) {
    h += '<p class="qq">' + V.html + '</p>';
    const tb = trBlock(V);
    if (tb) h += '<button class="trbtn" data-act="tr" aria-expanded="' + (Q.st.tr ? 'true' : 'false') + '">🌐 ' + (Q.st.tr ? 'Übersetzung ausblenden' : 'Übersetzen') + '</button>' + (Q.st.tr ? tb : '');
  } else if (q.kind === 'build') h += '<p class="qq">Ordena las palabras para decir: <b>' + esc(q.es) + '</b></p>';
  else h += '<p class="qq">' + q.q + '</p>';
  if (q.kind === 'mc') {
    h += '<div class="opts">' + Q.st.order.map((o, i) => {
      let c = 'opt';
      if (Q.fb) { if (o === q.ans) c += ' right'; else if (Q.st.chosen === o) c += ' wrong'; }
      return '<button class="' + c + '" data-act="mc" data-i="' + i + '"' + (Q.fb ? ' disabled' : '') + '>' + esc(o) + '</button>';
    }).join('') + '</div>';
  } else if (q.kind === 'type') {
    h += '<div class="typebox"><input id="ans" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + L.ph + '" value="' + esc(Q.st.val || '') + '"' + (Q.fb ? ' disabled' : '') + '>' +
      (Q.fb ? '' : '<div class="keys">' + ['ä', 'ö', 'ü', 'ß'].map(c => '<button class="key" data-act="ins" data-c="' + c + '">' + c + '</button>').join('') + '</div><div class="row"><button class="btn primary" data-act="check">' + L.check + '</button><button class="btn ghost" data-act="idk">' + L.idk + '</button></div>') + '</div>';
  } else {
    h += '<div class="placed" id="placed">' + (Q.st.placed.length ? Q.st.placed.map(k => '<button class="tok" data-act="unplace" data-k="' + k + '"' + (Q.fb ? ' disabled' : '') + '>' + esc(Q.st.bank.find(b => b.i === k).t) + '</button>').join('') : '<span class="hint">' + L.hint + '</span>') + '</div>';
    h += '<div class="bank">' + Q.st.bank.filter(b => !Q.st.placed.includes(b.i)).map(b => '<button class="tok" data-act="place" data-k="' + b.i + '"' + (Q.fb ? ' disabled' : '') + '>' + esc(b.t) + '</button>').join('') + '</div>';
    if (!Q.fb) h += '<div class="row"><button class="btn primary" data-act="checkb"' + (Q.st.placed.length ? '' : ' disabled') + '>' + L.check + '</button><button class="btn ghost" data-act="clear">' + L.clear + '</button><button class="btn ghost" data-act="idkb">' + L.idk + '</button></div>';
  }
  if (Q.fb) {
    const verdict = DE ? (Q.fb.ok ? (Q.fb.almost ? 'Fast richtig!' : 'Richtig!') : 'Leider falsch.') : (Q.fb.ok ? (Q.fb.almost ? 'Casi, pero se acepta' : 'Correcto') : (Q.fb.almost ? 'Casi, pero en modo estricto cuenta como error' : 'Todavía no'));
    const vicon = Q.fb.ok ? (Q.fb.almost ? '≈' : '✓') : '✗';
    h += '<div class="fb ' + (Q.fb.ok ? (Q.fb.almost ? 'almost' : 'ok') : 'bad') + '" role="status" aria-live="polite"><p class="verdict"><span class="vi" aria-hidden="true">' + vicon + '</span>' + verdict + '</p>' +
      (Q.fb.ok && q.kind === 'mc' ? '' : '<p class="ca">' + L.sol + ': <b>' + esc(Q.fb.shown) + '</b></p>') + pronLine(q) +
      (DE ? '<details class="whybox"' + (Q.fb.ok && !Q.fb.almost ? '' : ' open') + '><summary>' + L.why + '</summary>' + (Q.fb.note ? '<p class="note">' + esc(Q.fb.note) + '</p>' : '') + '<p class="why">' + q.why + '</p></details>'
        : (Q.fb.note ? '<p class="note">' + esc(Q.fb.note) + '</p>' : '') + '<p class="why"><b>Por qué:</b> ' + q.why + '</p>') +
      (Q.fb.willRepeat ? '<p class="note">' + L.again + '</p>' : '') +
      '<button class="btn primary wide" id="nextbtn" data-act="next">' + L.next + '</button></div>';
  }
  return h + '</div>';
}

function viewSummary() {
  const Q = S.quiz; const acc = Math.round(100 * Q.firstOk / Q.total);
  let h = '<div class="top"><button class="btn ghost" data-act="' + (Q.back === 'level' ? 'level2' : 'home') + '">← Volver</button></div><h1>Sesión terminada</h1>';
  h += '<div class="card big"><div class="score">' + acc + '%</div><p>' + Q.firstOk + ' de ' + Q.total + ' a la primera. ' + (acc >= 85 ? 'Muy bien: este bloque ya se ve sólido.' : acc >= 60 ? 'Vas bien. Repite para consolidar.' : 'Normal al empezar: repite la sesión, cada vuelta ayuda.') + '</p>' + bar(acc, acc >= 85 ? 'done' : '') + '</div>';
  const tags = Object.entries(Q.tagMiss).sort((a, b) => b[1] - a[1]);
  if (tags.length) h += '<h2 class="sec">Temas que debes reforzar</h2><div class="chips">' + tags.map(t => '<span class="chip warn">' + esc(t[0]) + ' (' + t[1] + ')</span>').join('') + '</div>';
  if (Q.missed.length) {
    h += '<h2 class="sec">Lo que fallaste, con su explicación</h2>' + Q.missed.map(q => '<div class="card miss"><p class="qq">' + (q.kind === 'build' ? 'Ordena: <b>' + esc(q.es) + '</b>' : q.q) + '</p><p class="ca">Respuesta: <b>' + esc(answerText(q)) + '</b></p>' + pronLine(q) + '<p class="why"><b>Por qué:</b> ' + q.why + '</p></div>').join('');
  } else h += '<p class="muted">No fallaste ninguna a la primera.</p>';
  h += '<div class="row"><button class="btn primary" data-act="again">Otra sesión igual</button><button class="btn" data-act="home">Ir a los niveles</button></div>';
  return h;
}

function viewChuleta() {
  let h = '<div class="top"><button class="btn ghost" data-act="home">← Niveles</button></div><h1>Chuleta completa</h1><p class="lead">Todo lo de las lecciones 1 a 7 en una sola página, con pronunciación y traducción.</p><div class="learn">';
  LEVELS.forEach(l => { h += '<h2 class="sec" id="c-' + l.id + '">' + l.n + '. ' + esc(l.title) + ' <small>' + esc(l.group) + '</small></h2>' + LESSONS[l.id](); });
  return h + '</div>';
}
function viewPron() {
  return '<div class="top"><button class="btn ghost" data-act="home">← Niveles</button></div><h1>Guía de pronunciación</h1><p class="lead">Cómo leer el alemán con letras españolas. Las columnas «Se pronuncia» siguen estas reglas. El botón 🔊 usa la voz alemana de tu dispositivo.</p><div class="learn">' + PRON_GUIDE + '</div>';
}

/* añade pronunciación y audio a las tablas y frases de las lecciones antiguas */
const ES_WORDS = /\b(el|la|los|las|que|un|una|con|para|se|por|cuando|y|o|de|del|al|en|como|tu|su|mi|no|si|sí|hay|es un|cuidado)\b/i;
const looksGerman = t => t.length > 2 && /[A-Za-zäöüß]/.test(t) && !/[áéíóúñ¿¡]/.test(t) && !ES_WORDS.test(t) && !/^[0-9\s.,€%²x-]+$/.test(t);
function enhance() {
  document.querySelectorAll('.learn').forEach(root => {
    root.querySelectorAll('table.t').forEach(tb => {
      if (tb.classList.contains('ph') || tb.dataset.en) return; tb.dataset.en = '1';
      const ths = [...tb.querySelectorAll('thead th')].map(x => x.textContent.trim());
      const rows = [...tb.querySelectorAll('tbody tr')];
      const firstText = td => { const c = td.cloneNode(true); c.querySelectorAll('small,button').forEach(x => x.remove()); return c.textContent.trim(); };
      if (tb.classList.contains('conj')) {
        rows.forEach(tr => [...tr.children].forEach((td, i) => { if (i === 0) return; const t = td.textContent.trim(); if (t) { const s = document.createElement('small'); s.className = 'pr'; s.textContent = pron(t); td.appendChild(s); } }));
      } else if (ths.length === 2 && ths[0] === 'Alemán' && ths[1] === 'Español') {
        tb.querySelector('thead tr').insertBefore(Object.assign(document.createElement('th'), { textContent: 'Se pronuncia' }), tb.querySelector('thead th:nth-child(2)'));
        rows.forEach(tr => {
          const td0 = tr.children[0]; const t = firstText(td0);
          const pt = document.createElement('td'); pt.className = 'pr'; pt.textContent = pron(t); tr.insertBefore(pt, tr.children[1]);
          td0.insertAdjacentHTML('afterbegin', speaker(t));
          if (tr.children[2]) tr.children[2].classList.add('es'), tr.children[2].setAttribute('data-reveal', '');
        });
      } else if (tb.classList.contains('voc') && ths[0] === 'Alemán') {
        rows.forEach(tr => { const t = firstText(tr.children[0]); if (t) tr.children[0].insertAdjacentHTML('afterbegin', speaker(t)); });
      } else {
        rows.forEach(tr => [...tr.children].forEach(td => {
          if (td.querySelector('.spk')) return; const t = firstText(td);
          if (looksGerman(t) && t.split(/\s+/).length >= 2) { td.insertAdjacentHTML('afterbegin', speaker(t)); const s = document.createElement('small'); s.className = 'pr'; s.textContent = pron(t); td.appendChild(s); }
        }));
      }
    });
    root.querySelectorAll('span.de, i').forEach(sp => {
      if (sp.dataset.en || sp.closest('.es') || sp.closest('td')) return; sp.dataset.en = '1';
      const t = sp.textContent.trim(); if (!looksGerman(t)) return;
      sp.setAttribute('data-say', t); sp.classList.add('say');
      sp.insertAdjacentHTML('afterend', '<span class="pr-inline"> (' + esc(pron(t)) + ')</span>');
    });
  });
}

function render() {
  let h;
  if (S.view === 'home') h = viewHome();
  else if (S.view === 'level') h = viewLevel();
  else if (S.view === 'quiz') h = viewQuiz();
  else if (S.view === 'summary') h = viewSummary();
  else if (S.view === 'chuleta') h = viewChuleta();
  else h = viewPron();
  const enter = S.view !== render.last || (S.view === 'level' && S.level !== render.lastLevel); render.last = S.view; render.lastLevel = S.level;
  $app.innerHTML = enter ? '<div class="view-enter">' + h + '</div>' : h;
  enhance();
  /* v3: anima el anillo de progreso y limpia la animación de la tarjeta para la próxima respuesta */
  const meter = $app.querySelector('.ring .meter'); if (meter) requestAnimationFrame(() => requestAnimationFrame(() => { meter.style.strokeDashoffset = meter.dataset.off; }));
  if (S.quiz) S.quiz.anim = null;
  if (S.view === 'quiz' && S.quiz) {
    const inp = document.getElementById('ans');
    if (inp && !S.quiz.fb) inp.focus();
    const nb = document.getElementById('nextbtn'); if (nb) nb.focus({ preventScroll: true });
  }
}

/* ---------- eventos ---------- */
function exportProgress() {
  const blob = new Blob([JSON.stringify(store)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'aleman-progreso.json'; document.body.appendChild(a); a.click(); a.remove();
}
document.addEventListener('click', e => {
  const sp = e.target.closest('[data-say]');
  if (sp) { speak(sp.dataset.say); return; }
  const t = e.target.closest('[data-act],[data-reveal]'); if (!t) return;
  if (t.hasAttribute('data-reveal') && !t.dataset.act) { t.classList.toggle('show'); return; }
  const a = t.dataset.act; const Q = S.quiz;
  if (a === 'theme') themeCycle();
  else if (a === 'home') go('home');
  else if (a === 'level') go('level', { level: t.dataset.id, tab: 'learn' });
  else if (a === 'level2') go('level', { tab: 'practice' });
  else if (a === 'tab') { S.tab = t.dataset.t; render(); window.scrollTo(0, 0); }
  else if (a === 'hides') { S.hideEs = t.checked; render(); }
  else if (a === 'strict') { store.set.strict = t.checked; save(); }
  else if (a === 'start') { const l = LEVELS.find(x => x.id === S.level); S.last = { title: 'Nivel ' + l.n + ': ' + l.title, ids: [l.id], n: +t.dataset.n, back: 'level' }; startQuiz(S.last.title, pool(l.id), S.last.n, 'level'); }
  else if (a === 'mix') { const ex = t.dataset.ex; const names = { 1: 'Repaso lecciones 1 a 3', 2: 'Repaso lecciones 4 a 6', 3: 'Repaso lección 7', all: 'Simulacro final' }; S.last = { title: names[ex], ids: levelsBy(ex).map(l => l.id), n: +t.dataset.n, back: 'home' }; startQuiz(S.last.title, poolOf(ex), S.last.n, 'home'); }
  else if (a === 'errors') { const m = allPool().filter(isMissed); S.last = { title: 'Mis errores', ids: LEVELS.map(l => l.id), n: 20, back: 'home', errors: true }; startQuiz('Mis errores', m, 20, 'home'); }
  else if (a === 'konj' || a === 'deonly') { const f = a === 'konj' ? (q => q.tag === 'Conjugación' || (q.de && q.tag !== 'Situationen')) : (q => q.de); const title = a === 'konj' ? 'Konjugationstrainer' : 'Nur Deutsch'; S.last = { title, ids: LEVELS.map(l => l.id), n: +t.dataset.n, back: 'home', filter: a }; startQuiz(title, allPool().filter(f), S.last.n, 'home'); }
  else if (a === 'tr') { Q.st.tr = !Q.st.tr; render(); }
  else if (a === 'demode') { store.set.de = t.checked; save(); }
  else if (a === 'again') { const L = S.last; const FL = { konj: q => q.tag === 'Conjugación' || (q.de && q.tag !== 'Situationen'), deonly: q => q.de }; const list = L.errors ? allPool().filter(isMissed) : L.filter ? allPool().filter(FL[L.filter]) : L.ids.flatMap(id => pool(id)); if (!list.length) go('home'); else startQuiz(L.title, list, L.n, L.back); }
  else if (a === 'chuleta') go('chuleta');
  else if (a === 'pron') go('pron');
  else if (a === 'export') exportProgress();
  else if (a === 'import') document.getElementById('imp').click();
  else if (a === 'reset') { if (confirm('¿Borrar todo tu progreso? No se puede deshacer.')) { store = { q: {}, set: store.set }; save(); render(); } }
  else if (a === 'quit') { if (Q && Q.firstDone > 0) go('summary'); else go(Q && Q.back === 'level' ? 'level' : 'home'); }
  else if (a === 'mc') { const q = Q.queue[0].q; const o = Q.st.order[+t.dataset.i]; Q.st.chosen = o; const ok = o === q.ans; submit(ok, ok ? '' : explainChoice(q, o), q.ans); }
  else if (a === 'ins') { const inp = document.getElementById('ans'); const p = inp.selectionStart || inp.value.length; inp.value = inp.value.slice(0, p) + t.dataset.c + inp.value.slice(inp.selectionEnd || p); inp.focus(); inp.setSelectionRange(p + 1, p + 1); }
  else if (a === 'check') doCheck();
  else if (a === 'idk' || a === 'idkb') { submit(false, '', answerText(Q.queue[0].q)); }
  else if (a === 'place') { Q.st.placed.push(+t.dataset.k); render(); }
  else if (a === 'unplace') { Q.st.placed = Q.st.placed.filter(k => k !== +t.dataset.k); render(); }
  else if (a === 'clear') { Q.st.placed = []; render(); }
  else if (a === 'checkb') { const q = Q.queue[0].q; const words = Q.st.placed.map(k => Q.st.bank.find(b => b.i === k).t); const r = diagnoseBuild(q, words); const j = judge(r); submit(j.ok, j.note, j.ok ? words.join(' ') : q.tokens.join(' '), j.almost); }
  else if (a === 'next') next();
});
document.addEventListener('change', e => {
  if (e.target.id === 'hide-es') { S.hideEs = e.target.checked; render(); }
  if (e.target.id === 'imp' && e.target.files[0]) {
    const f = e.target.files[0]; const r = new FileReader();
    r.onload = () => { try { const o = JSON.parse(r.result); if (!o || typeof o.q !== 'object') throw new Error('formato'); if (confirm('¿Reemplazar tu progreso actual por el del archivo?')) { store = { q: o.q, set: Object.assign({ strict: false }, o.set || {}) }; save(); render(); } } catch (err) { alert('El archivo no es un respaldo válido de esta app.'); } };
    r.readAsText(f);
  }
});
document.addEventListener('keydown', e => {
  if (S.view !== 'quiz' || !S.quiz) return;
  if (e.key === 'Enter') {
    const Q = S.quiz;
    if (Q.fb) { e.preventDefault(); next(); }
    else if (e.target.id === 'ans') { e.preventDefault(); doCheck(); }
  }
});
if (!canSpeak()) document.body.classList.add('nospeech');
render();
