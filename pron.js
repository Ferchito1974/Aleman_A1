/* Pronunciación aproximada (letras españolas) y audio del navegador */
'use strict';

const V = 'aeiouäöüy';
const isV = c => !!c && V.indexOf(c) >= 0;

/* Convierte una palabra alemana a una respelling con letras españolas. Es aproximada. */
const OVR = { joghurt: 'yó-gurt', kilo: 'kí-lo', orange: 'o-rán-ye', orangen: 'o-rán-yen', computer: 'kom-pyú-ta', kiwi: 'kí-vi', kiwis: 'kí-vis', pizza: 'pí-tsa', tee: 'te', cola: 'kó-la', steak: 'shtek', spaghetti: 'shpa-gué-ti', email: 'í-meil', hallo: 'já-lo', tablet: 'té-blet', baby: 'bé-bi', job: 'yop', jogging: 'yó-guing', radio: 'rá-dio', banane: 'ba-ná-ne', bananen: 'ba-ná-nen', tomate: 'to-má-te', tomaten: 'to-má-ten', schokolade: 'sho-ko-lá-de', kaffee: 'ka-fé', euro: 'oi-ro', cent: 'sent', gramm: 'gram', liter: 'lí-ta', kartoffel: 'kar-tó-fel', kartoffeln: 'kar-tó-feln', restaurant: 'res-to-rán', restaurants: 'res-to-ráns', pommes: 'pom', steaks: 'shteks', pizzen: 'pí-tsen', lieblingsessen: 'líb-lings-e-sen', lieblingsgetränk: 'líb-lings-gue-trenk' };
/* v3: excepciones revisadas con la lista completa de palabras del libro (Wortliste lecciones 1 a 7).
   Corrigen: -tion (tsión), st/sp dentro de compuestos (sh), v y th en extranjerismos, -ien (i-en), anglicismos. */
Object.assign(OVR, {
  buchstabe: 'buj-shtá-be', buchstaben: 'buj-shtá-ben', buchstabieren: 'buj-shta-bí-ren', hauptstadt: 'jáupt-shtat', hauptstädte: 'jáupt-shte-te', stadt: 'shtat', städte: 'shté-te',
  gespräch: 'gue-shpréj', gespräche: 'gue-shpré-je', gesprochen: 'gue-shpró-jen', nachsprechen: 'náj-shpre-jen', aufstehen: 'áuf-shte-en', aufgestanden: 'áuf-gue-shtan-den',
  frühstücken: 'frü-shtü-ken', gefrühstückt: 'gue-frü-shtükt', frühstück: 'frü-shtük', verstehen: 'fer-shté-en', verstehe: 'fer-shté-e',
  kaution: 'kau-tsión', kautionen: 'kau-tsió-nen', lektion: 'lek-tsión', lektionen: 'lek-tsió-nen', präsentation: 'pre-zen-ta-tsión', präsentationen: 'pre-zen-ta-tsió-nen',
  portion: 'por-tsión', portionen: 'por-tsió-nen', produktion: 'pro-duk-tsión', produktionen: 'pro-duk-tsió-nen', kommunikation: 'ko-mu-ni-ka-tsión', international: 'in-ter-na-tsio-nál',
  offiziell: 'o-fi-tsiél', information: 'in-for-ma-tsión',
  klavier: 'kla-vía', klaviere: 'kla-ví-re', visitenkarte: 'vi-zí-ten-kar-te', visitenkarten: 'vi-zí-ten-kar-ten', variieren: 'va-ri-í-ren', video: 'ví-de-o', privat: 'pri-vát', intensivkurs: 'in-ten-zíf-kurs',
  theater: 'te-á-ta', mathematik: 'ma-te-ma-tík', mathe: 'má-te', bibliothek: 'bi-blio-ték', bibliotheken: 'bi-blio-té-ken', alphabet: 'al-fa-bét', psychologie: 'psü-jo-lo-guí',
  ferien: 'fé-ri-en', italien: 'i-tá-li-en', italienisch: 'i-ta-li-é-nish', spanien: 'shpá-ni-en', großbritannien: 'gros-bri-tá-ni-en', familienname: 'fa-mí-li-en-na-me', familienstand: 'fa-mí-li-en-shtant',
  museum: 'mu-zé-um', museen: 'mu-zé-en', europa: 'oi-ró-pa', idee: 'i-dé', ideen: 'i-dé-en',
  handy: 'jén-di', handys: 'jén-dis', hobby: 'jó-bi', hobbys: 'jó-bis', party: 'pár-ti', partys: 'pár-tis', mountainbike: 'máun-ten-baik', mountainbikes: 'máun-ten-baiks',
  apartment: 'a-párt-ment', apartments: 'a-párt-ments', training: 'tréi-ning', trainings: 'tréi-nings', comic: 'kó-mik', comics: 'kó-miks', cool: 'kul', ketchup: 'két-chap',
  hamburger: 'jám-bur-ga', dessert: 'de-sér', desserts: 'de-sérs', café: 'ka-fé', cafés: 'ka-fés', tour: 'tur', touren: 'tú-ren', ski: 'shi', skier: 'shí-a', internet: 'ín-ter-net',
  chatten: 'ché-ten', gechattet: 'gue-ché-tet', surfen: 'sör-fen', windsurfen: 'vínt-sör-fen', tv: 'te-fáu', joghurts: 'yó-gurts', pommes: 'pom', frites: 'frit', jogging: 'yó-guing',
  circa: 'tsír-ka', garage: 'ga-rá-she', garagen: 'ga-rá-shen', tiefgarage: 'tíf-ga-ra-she', tiefgaragen: 'tíf-ga-ra-shen', ungefähr: 'ún-gue-fea',
  angebot: 'án-gue-bot', angebote: 'án-gue-bo-te', sonderangebot: 'zón-da-an-gue-bot', sonderangebote: 'zón-da-an-gue-bo-te', ansage: 'án-za-gue', ansagen: 'án-za-guen',
  aha: 'a-já', woher: 'vo-jéa', china: 'jí-na', chinesisch: 'ji-né-zish', österreich: 'ös-te-raij', fernseher: 'férn-ze-a', erwachsene: 'er-vák-se-ne', erwachsenen: 'er-vák-se-nen',
  einbauküche: 'áin-bau-kü-je', einbauküchen: 'áin-bau-kü-jen', nebenkosten: 'né-ben-kos-ten', quadratmeter: 'kva-drát-me-ta', zentimeter: 'tsen-ti-mé-ta', terminkalender: 'ter-mín-ka-len-da',
  kennenlernen: 'ké-nen-ler-nen', zuordnen: 'tsú-ord-nen', ankreuzen: 'án-kroi-tsen', ansehen: 'án-ze-en', aussehen: 'áus-ze-en', losgehen: 'lós-gue-en', anrufen: 'án-ru-fen', anfangen: 'án-fan-guen',
  einkaufen: 'áin-kau-fen', aufräumen: 'áuf-roi-men', fernsehen: 'férn-ze-en', spazieren: 'shpa-tsí-ren', telefonieren: 'te-le-fo-ní-ren', telefoniert: 'te-le-fo-nírt',
  fotografieren: 'fo-to-gra-fí-ren', fotografiert: 'fo-to-gra-fírt', studieren: 'shtu-dí-ren', studiert: 'shtu-dírt', funktionieren: 'funk-tsio-ní-ren', notieren: 'no-tí-ren', markieren: 'mar-kí-ren',
  besonders: 'be-zón-ders', geübt: 'gue-übt', gearbeitet: 'gue-ár-bai-tet', geholfen: 'gue-jól-fen', gehört: 'gue-jört', verheiratet: 'fer-jái-ra-tet', vielleicht: 'fi-láijt',
  partnerin: 'párt-ne-rin', lehrerin: 'lé-re-rin', freundin: 'fróin-din', enkelin: 'én-ke-lin', supermarkt: 'zú-pa-markt', supermärkte: 'zú-pa-merk-te', interessant: 'in-te-re-sánt',
  temperatur: 'tem-pe-ra-túa', temperaturen: 'tem-pe-ra-tú-ren', polizei: 'po-li-tsái', türkei: 'tür-kái', kommentar: 'ko-men-tár', programm: 'pro-grám', problem: 'pro-blém', probleme: 'pro-blé-me',
  natur: 'na-túa', formular: 'for-mu-lár', regal: 're-gál', salat: 'za-lát', plakat: 'pla-kát', moment: 'mo-mént', rezept: 're-tsépt', prospekt: 'pros-pékt', mineralwasser: 'mi-ne-rál-va-sa',
  wunderbar: 'vún-der-baa', überall: 'ü-ba-ál', zurzeit: 'tsur-tsáit', zusammen: 'tsu-zá-men', willkommen: 'vil-kó-men', entschuldigung: 'ent-shúl-di-gung', wiedersehen: 'ví-da-ze-en', wiederhören: 'ví-da-jö-ren'
});

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
