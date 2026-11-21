/* Pronunciación aproximada (letras españolas) y audio del navegador */
'use strict';

const V = 'aeiouäöüy';
const isV = c => !!c && V.indexOf(c) >= 0;

/* Convierte una palabra alemana a una respelling con letras españolas. Es aproximada. */
const OVR = { joghurt: 'yó-gurt', kilo: 'kí-lo', orange: 'o-rán-ye', orangen: 'o-rán-yen', computer: 'kom-pyú-ta', kiwi: 'kí-vi', kiwis: 'kí-vis', pizza: 'pí-tsa', tee: 'te', cola: 'kó-la', steak: 'shtek', spaghetti: 'shpa-gué-ti', email: 'í-meil', hallo: 'já-lo', tablet: 'té-blet', baby: 'bé-bi', job: 'yop', jogging: 'yó-guing', radio: 'rá-dio', banane: 'ba-ná-ne', bananen: 'ba-ná-nen', tomate: 'to-má-te', tomaten: 'to-má-ten', schokolade: 'sho-ko-lá-de', kaffee: 'ka-fé', euro: 'oi-ro', cent: 'sent', gramm: 'gram', liter: 'lí-ta', kartoffel: 'kar-tó-fel', kartoffeln: 'kar-tó-feln', restaurant: 'res-to-rán', restaurants: 'res-to-ráns', pommes: 'pom', steaks: 'shteks', pizzen: 'pí-tsen', lieblingsessen: 'líb-lings-e-sen', lieblingsgetränk: 'líb-lings-gue-trenk' };
function pronWord(raw) {
  const w = raw.toLowerCase();
  if (OVR[w]) return OVR[w];
  let o = '';
  const n = w.length;
  const at = i => (i >= 0 && i < n ? w[i] : '');
  for (let i = 0; i < n; i++) {
    const c = w[i], nx = at(i + 1), nx2 = at(i + 2), pv = at(i - 1);
    const rest = w.slice(i);
    if (rest.startsWith('tsch') && !(pv === 'n' && w.slice(Math.max(0, i - 2), i + 1) === 'ent')) { o += 'ch'; i += 3; continue; }
    if (rest.startsWith('sch')) { o += 'sh'; i += 2; continue; }
    if (rest.startsWith('chs')) { o += 'ks'; i += 2; continue; }
    if (rest.startsWith('ch')) { o += 'j'; i += 1; continue; }
    if (rest.startsWith('ck')) { o += 'k'; i += 1; continue; }
    if (rest.startsWith('tz')) { o += 'ts'; i += 1; continue; }
    if (rest.startsWith('pf')) { o += 'pf'; i += 1; continue; }
    if (rest.startsWith('qu')) { o += 'kv'; i += 1; continue; }
    if (rest.startsWith('ng')) { o += 'ng'; i += 1; continue; }
    if (rest.startsWith('ie')) { if (w.slice(0, i).endsWith('famil')) { o += 'i-e'; } else { o += 'i'; } i += 1; continue; }
    if (rest.startsWith('ei') || rest.startsWith('ai') || rest.startsWith('ey')) { o += 'ai'; i += 1; continue; }
    if (rest.startsWith('eu') || rest.startsWith('äu')) { o += 'oi'; i += 1; continue; }
    if (rest.startsWith('ee')) { o += 'e'; i += 1; continue; }
    if (rest.startsWith('aa')) { o += 'a'; i += 1; continue; }
    if (rest.startsWith('oo')) { o += 'o'; i += 1; continue; }
    if (rest.startsWith('ss')) { o += 's'; i += 1; continue; }
    if (rest.startsWith('tt') || rest.startsWith('mm') || rest.startsWith('nn') || rest.startsWith('ll') || rest.startsWith('ff') || rest.startsWith('pp') || rest.startsWith('rr') || rest.startsWith('dd') || rest.startsWith('bb') || rest.startsWith('gg')) { o += c; i += 1; continue; }
    if (c === 'h') { if (isV(pv)) { if (isV(nx)) o += '-'; continue; } o += (i === 0 || !isV(pv)) ? 'j' : ''; continue; }
    if (c === 's') {
      if ((i === 0 || pv === '') && (nx === 'p' || nx === 't')) { o += 'sh'; continue; }
      o += (isV(nx) && (i === 0 || isV(pv))) ? 'z' : 's'; continue;
    }
    if (c === 'ß') { o += 's'; continue; }
    if (c === 'z') { o += 'ts'; continue; }
    if (c === 'w') { o += 'v'; continue; }
    if (c === 'v') { o += 'f'; continue; }
    if (c === 'j') { o += 'y'; continue; }
    if (c === 'y') { o += (i === 0 && isV(nx)) ? 'y' : 'ü'; continue; }
    if (c === 'x') { o += 'ks'; continue; }
    if (c === 'q') { o += 'k'; continue; }
    if (c === 'c') { o += 'k'; continue; }
    if (c === 'ä') { o += 'e'; continue; }
    if (c === 'g') {
      if (i === n - 1) { o += pv === 'i' ? '' : 'k'; if (pv === 'i') o += 'j'; continue; }
      o += (nx === 'e' || nx === 'i' || nx === 'ä' || nx === 'ö' || nx === 'ü' || nx === 'y') ? 'gu' : 'g'; continue;
    }
    if (c === 'd' && (i === n - 1)) { o += 't'; continue; }
    if (c === 'b' && (i === n - 1)) { o += 'p'; continue; }
    if (c === 'r') {
      if (i === n - 1 && isV(pv)) { o += 'a'; continue; }
      if (i === n - 1 && pv === 'h' && isV(at(i - 2))) { o += 'a'; continue; }
      if (pv === 'e' && i === n - 1) { o += 'a'; continue; }
      o += 'r'; continue;
    }
    if (c === 'e' && nx === 'r' && i + 1 === n - 1) { o += (w.replace(/[^aeiouäöüy]/g, '').length === 1 ? 'ea' : 'a'); i += 1; continue; }
    o += c;
  }
  return o;
}

function pron(text) {
  return String(text).replace(/[0-9]+/g, m => m).split(/(\s+|[.,!?;:¿¡"«»()\/–—-]+)/).map(t => {
    if (!t || /^(\s+|[.,!?;:¿¡"«»()\/–—-]+)$/.test(t)) return /^[.,!?;:¿¡"«»()]+$/.test(t) ? '' : (/^\s+$/.test(t) ? ' ' : (t === '/' ? ' / ' : ''));
    if (/^[0-9]/.test(t)) return t;
    return pronWord(t);
  }).join('').replace(/\s+/g, ' ').trim();
}

/* ---------- audio ---------- */
let _voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const vs = window.speechSynthesis.getVoices() || [];
  _voice = vs.find(v => /^de[-_]DE/i.test(v.lang)) || vs.find(v => /^de/i.test(v.lang)) || null;
  return _voice;
}
function canSpeak() { return typeof window !== 'undefined' && 'speechSynthesis' in window; }
function speak(text) {
  if (!canSpeak()) return false;
  try {
    const synth = window.speechSynthesis; synth.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ', '));
    const v = _voice || pickVoice();
    u.lang = 'de-DE'; if (v) u.voice = v; u.rate = 0.85;
    synth.speak(u); return true;
  } catch (e) { return false; }
}
if (canSpeak()) { try { window.speechSynthesis.onvoiceschanged = pickVoice; pickVoice(); } catch (e) { /* ignorar */ } }

if (typeof module !== 'undefined') module.exports = { pron, pronWord };
