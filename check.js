/* Corrección inteligente: mayúsculas, diéresis, erratas, artículo, formas de otra persona y orden */
'use strict';

const PHR = new Map(); // alemán -> español, lo llenan las listas de frases

const stripP = s => String(s).replace(/[’‘`´]/g, "'").replace(/[.!?,;:¡¿"«»]/g, '').replace(/\s+/g, ' ').trim();
const lc = s => s.toLowerCase();
const asciiFold = s => lc(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
const bareFold = s => lc(s).replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');

/* distancia de edición con transposición (Damerau) */
function dist(a, b) {
  const m = a.length, n = b.length; const d = [];
  for (let i = 0; i <= m; i++) { d[i] = [i]; }
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    const c = a[i - 1] === b[j - 1] ? 0 : 1;
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[m][n];
}
function describeTypo(user, right) {
  const a = lc(user), b = lc(right);
  if (a.length === b.length) {
    const idx = []; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) idx.push(i);
    if (idx.length === 2 && idx[1] === idx[0] + 1 && a[idx[0]] === b[idx[1]] && a[idx[1]] === b[idx[0]]) return 'dos letras cambiadas de lugar («' + right.slice(idx[0], idx[0] + 2) + '»)';
    if (idx.length === 1) return 'la letra «' + user[idx[0]] + '» debía ser «' + right[idx[0]] + '»';
  }
  if (a.length + 1 === b.length) for (let i = 0; i < b.length; i++) if (b.slice(0, i) + b.slice(i + 1) === a) return 'te falta la letra «' + right[i] + '»';
  if (a.length === b.length + 1) for (let i = 0; i < a.length; i++) if (a.slice(0, i) + a.slice(i + 1) === b) return 'sobra la letra «' + user[i] + '»';
  return 'hay una letra mal';
}

const GEN_COLOR = { der: 'masculino', das: 'neutro', die: 'femenino (o plural)' };
const NOUN_BY_W = {}; const NOUN_BY_ES = {};
function buildDict() {
  if (buildDict.done) return; buildDict.done = true;
  Object.values(CATS).forEach(c => c.items.forEach(n => { NOUN_BY_W[lc(n.w)] = n; NOUN_BY_ES[lc(n.es)] = n; }));
}
/* ¿qué significa esta cadena alemana? (para explicar la opción que eligió el alumno) */
function lookupDe(s) {
  buildDict(); const k = lc(stripP(s));
  const noun = k.replace(/^(der|die|das)\s+/, '');
  if (NOUN_BY_W[noun]) { const n = NOUN_BY_W[noun]; return n.a + ' ' + n.w + ' = ' + n.es; }
  const v = VERBS.find(x => x[0] === k); if (v) return v[0] + ' = ' + v[1];
  for (const [de, es] of PHR) if (lc(stripP(de)) === k) return de + ' = ' + es;
  return null;
}
function lookupEs(s) {
  buildDict(); const k = lc(s);
  if (NOUN_BY_ES[k]) { const n = NOUN_BY_ES[k]; return n.es + ' = ' + n.a + ' ' + n.w; }
  const v = VERBS.find(x => lc(x[1]) === k); if (v) return v[1] + ' = ' + v[0];
  for (const [de, es] of PHR) if (lc(es) === k) return es + ' = ' + de;
  return null;
}

/* formas conjugadas para detectar «forma de otra persona» */
function conjOther(q, val) {
  const m = /:c:([^:]+):(\d)$/.exec(q.id || ''); if (!m) return null;
  const forms = conj(m[1]); const p = +m[2]; const v = bareFold(stripP(val));
  const j = forms.findIndex((f, i) => i !== p && bareFold(f) === v && f !== forms[p]);
  if (j < 0) return null;
  return '«' + val.trim() + '» es la forma de «' + PERSONS[j] + '», pero aquí se pide «' + PERSONS[p] + '»: ' + forms[p] + '.';
}

const STRICT_TAGS = /^(Conjugación|ein \/ eine|kein \/ keine|Posesivos|Números|Hora|Artículo|Plural)$/;

/* Revisa una respuesta escrita. Devuelve {status:'ok'|'almost'|'no', note} o null si está vacía. */
function diagnoseType(q, val) {
  const raw = String(val).trim(); if (!raw) return null;
  const v = stripP(raw); const answers = q.answers.map(stripP);
  if (answers.includes(v)) return { status: 'ok', note: '' };
  // mayúsculas / minúsculas
  const ci = answers.find(a => lc(a) === lc(v));
  if (ci) {
    const uw = v.split(' '), aw = ci.split(' '); const bad = [];
    aw.forEach((w, i) => { if (uw[i] !== w) bad.push(w); });
    const first = aw[0];
    const why = bad.map(w => {
      if (w === first && /^[A-ZÄÖÜ]/.test(w) && !/^(der|die|das)$/i.test(w) && aw.length > 1 && /^[A-ZÄÖÜ]/.test(first)) return '«' + w + '» (inicio de frase)';
      if (/^(Sie|Ihr|Ihre|Ihnen)$/.test(w)) return '«' + w + '» (formal, siempre con mayúscula)';
      if (/^[A-ZÄÖÜ]/.test(w)) return '«' + w + '» (sustantivo, mayúscula)';
      return '«' + w + '» (en minúscula)';
    });
    const tip = why.some(x => /sustantivo|formal/.test(x)) ? ' En alemán todos los sustantivos y el «Sie» formal llevan mayúscula.' : '';
    return { status: 'almost', note: 'Casi: revisa las mayúsculas. Debe ser ' + why.join(', ') + '.' + tip };
  }
  // diéresis / ß
  const af = answers.find(a => asciiFold(a) === asciiFold(v));
  if (af) return { status: 'ok', note: 'Bien. Escribir ae/oe/ue/ss en lugar de ä/ö/ü/ß es válido. La forma con signos es «' + q.answers[0] + '».' };
  const bf = answers.find(a => bareFold(a) === bareFold(v));
  if (bf) return { status: 'almost', note: 'Casi: falta la diéresis (ä, ö, ü). Es «' + q.answers[0] + '». La diéresis cambia el sonido de la vocal.' };
  // artículo
  const whole = answers.find(a => /^(der|die|das)\s/.test(a));
  if (whole) {
    const [art, ...rest] = whole.split(' '); const noun = rest.join(' ');
    if (bareFold(v) === bareFold(noun)) return { status: 'no', note: 'La palabra está bien, pero falta el artículo: es «' + whole + '». En alemán se aprende siempre con su artículo.' };
    const uw = v.split(' ');
    if (uw.length === rest.length + 1 && /^(der|die|das)$/i.test(uw[0]) && bareFold(uw.slice(1).join(' ')) === bareFold(noun) && lc(uw[0]) !== art)
      return { status: 'no', note: 'El sustantivo está bien, pero el artículo no: «' + noun + '» lleva «' + art + '» (' + GEN_COLOR[art] + '), no «' + lc(uw[0]) + '».' };
  }
  // forma de otra persona
  const co = conjOther(q, raw); if (co) return { status: 'no', note: co };
  // erratas pequeñas (no en gramática corta)
  if (!STRICT_TAGS.test(q.tag || '')) {
    for (const a of answers) {
      const x = bareFold(v), y = bareFold(a); const lim = y.length >= 12 ? 2 : 1;
      if (y.length >= 5 && dist(x, y) <= lim && v.split(' ').length === a.split(' ').length) {
        return { status: 'almost', note: 'Casi: una errata. Escribiste «' + raw.replace(/[.!?]+$/, '') + '» y es «' + q.answers[0] + '» (' + describeTypo(v, a) + ').' };
      }
    }
  }
  // diagnóstico de lo que falló
  const target = answers[0]; const uw = v.split(' '), tw = target.split(' ');
  if (uw.length > 1 || tw.length > 1) {
    if (uw.length === tw.length && [...uw].map(bareFold).sort().join(' ') === [...tw].map(bareFold).sort().join(' ')) return { status: 'no', note: 'Tienes las palabras correctas, pero en otro orden. Recuerda: el verbo conjugado va en la posición 2 (en preguntas de sí/no, en la posición 1).' };
    if (uw.length < tw.length) return { status: 'no', note: 'Te faltan palabras: la respuesta tiene ' + tw.length + ' y la tuya ' + uw.length + '.' };
    if (uw.length > tw.length) return { status: 'no', note: 'Sobran palabras: la respuesta tiene ' + tw.length + ' y la tuya ' + uw.length + '.' };
    const wrong = tw.map((w, i) => bareFold(w) === bareFold(uw[i]) ? null : '«' + uw[i] + '» debía ser «' + w + '»').filter(Boolean);
    if (wrong.length && wrong.length <= 3) return { status: 'no', note: 'Revisa: ' + wrong.join('; ') + '.' };
  }
  const lk = lookupDe(raw);
  if (lk) return { status: 'no', note: 'Lo que escribiste existe: ' + lk + '. Pero aquí se pedía otra cosa.' };
  if (/en$/.test(lc(v)) && /Conjuga|forma/.test(q.q)) return { status: 'no', note: 'Parece el infinitivo. Hay que conjugar el verbo según la persona.' };
  return { status: 'no', note: '' };
}

/* Revisa el orden de palabras */
function diagnoseBuild(q, placed) {
  const got = placed.join(' ');
  if (q.tokens.join(' ') === got) return { status: 'ok', note: '' };
  if ((q.alts || []).some(a => a.join(' ') === got)) return { status: 'ok', note: 'Otra forma válida. Tu orden también es correcto.' };
  const t = q.tokens;
  const same = [...placed].sort().join(' ') === [...t].sort().join(' ');
  let i = 0; while (i < placed.length && i < t.length && placed[i] === t[i]) i++;
  if (same) {
    let note = 'Las palabras son las correctas, pero el orden no.';
    if (i < t.length) note += ' Desde la palabra ' + (i + 1) + ': pusiste «' + placed[i] + '» y debía ir «' + t[i] + '».';
    if (i <= 1) note += ' Regla: el verbo conjugado va en la posición 2 (o en la posición 1 si es una pregunta de sí/no).';
    return { status: 'no', note };
  }
  const miss = t.filter(w => !placed.includes(w)), extra = placed.filter(w => !t.includes(w));
  const parts = [];
  if (miss.length) parts.push('te falta: ' + miss.map(w => '«' + w + '»').join(', '));
  if (extra.length) parts.push('sobra: ' + extra.map(w => '«' + w + '»').join(', '));
  return { status: 'no', note: parts.length ? 'Revisa: ' + parts.join('; ') + '.' : '' };
}

/* Explica la opción equivocada que se eligió en una pregunta de opción múltiple */
function explainChoice(q, chosen) {
  if (['der', 'das', 'die'].includes(chosen) && q.tag === 'Artículo') return 'Elegiste «' + chosen + '»: ese artículo es para ' + GEN_COLOR[chosen] + '. ' + 'El correcto es «' + q.ans + '».';
  const co = conjOther(q, chosen); if (co) return 'Elegiste ' + co;
  const a = lookupDe(chosen) || lookupEs(chosen);
  if (a) return 'Lo que elegiste significa: ' + a + '.';
  return '';
}

if (typeof module !== 'undefined') module.exports = { diagnoseType, diagnoseBuild, dist, stripP };
