/* Datos del curso: Schritte international Neu 1, lecciones 4, 5 y 6 */
'use strict';

const GEN_ES = { der: 'masculino', das: 'neutro', die: 'femenino' };
const N = (a, w, es, p, pl, hint) => ({ a, w, es, p, pl: pl || null, hint: hint || null });

/* ---------- Vocabulario de sustantivos por categoría ---------- */
const CATS = {
  rooms: { title: 'Las habitaciones', items: [
    N('das', 'Schlafzimmer', 'dormitorio', 'shláf-tsimma', null, 'Palabra compuesta: toma el género de la última parte, das Zimmer.'),
    N('das', 'Bad', 'baño', 'bat'),
    N('der', 'Flur', 'pasillo / entrada', 'flur'),
    N('das', 'Arbeitszimmer', 'cuarto de trabajo / estudio', 'ár-baits-tsimma', null, 'Palabra compuesta: toma el género de la última parte, das Zimmer.'),
    N('die', 'Küche', 'cocina', 'kü-je', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('das', 'Kinderzimmer', 'cuarto de los niños', 'kín-da-tsimma', 'Kinderzimmer', 'Palabra compuesta: toma el género de la última parte, das Zimmer.'),
    N('die', 'Toilette', 'baño (WC)', 'toa-lé-te', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('der', 'Balkon', 'balcón', 'bal-kón'),
    N('das', 'Wohnzimmer', 'sala de estar', 'vón-tsimma', null, 'Palabra compuesta: toma el género de la última parte, das Zimmer.'),
    N('das', 'Zimmer', 'habitación / cuarto', 'tsí-ma', 'Zimmer'),
    N('die', 'Wohnung', 'departamento', 'vó-nung', null, 'Las palabras que terminan en -ung son siempre femeninas.'),
    N('das', 'Haus', 'casa', 'jaus')
  ]},
  furniture: { title: 'Los muebles', items: [
    N('der', 'Schrank', 'armario / ropero', 'shrank'),
    N('das', 'Sofa', 'sofá', 'zó-fa'),
    N('der', 'Tisch', 'mesa', 'tish', 'Tische'),
    N('der', 'Stuhl', 'silla', 'shtul', 'Stühle'),
    N('das', 'Bett', 'cama', 'bet', 'Betten'),
    N('der', 'Teppich', 'alfombra', 'té-pij'),
    N('das', 'Regal', 'estante / librero', 're-gál'),
    N('der', 'Sessel', 'sillón', 'zé-sel')
  ]},
  electro: { title: 'Los electrodomésticos (Elektrogeräte)', items: [
    N('die', 'Lampe', 'lámpara', 'lám-pe', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('der', 'Fernseher', 'televisor', 'férn-ze-a'),
    N('der', 'Kühlschrank', 'refrigerador', 'kül-shrank', null, 'Palabra compuesta: toma el género de la última parte, der Schrank.'),
    N('die', 'Waschmaschine', 'lavadora', 'vásh-ma-shi-ne', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('der', 'Herd', 'estufa', 'jeat')
  ]},
  bath: { title: 'El baño (das Bad)', items: [
    N('die', 'Dusche', 'regadera / ducha', 'dú-she', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('die', 'Badewanne', 'tina de baño', 'bá-de-van-ne', null, 'Muchas palabras que terminan en -e son femeninas.'),
    N('das', 'Waschbecken', 'lavabo', 'vásh-be-ken')
  ]},
  desk: { title: 'El escritorio (Schreibtisch)', items: [
    N('der', 'Schreibtisch', 'escritorio', 'shraip-tish', null, 'Palabra compuesta: toma el género de la última parte, der Tisch.'),
    N('das', 'Buch', 'libro', 'buj', 'Bücher'),
    N('der', 'Stift', 'lápiz / pluma', 'shtift'),
    N('das', 'Heft', 'cuaderno', 'jeft', 'Hefte'),
    N('das', 'Tablet', 'tableta', 'té-blet'),
    N('der', 'Computer', 'computadora', 'kom-pyú-ta'),
    N('das', 'Tagebuch', 'diario', 'tá-ge-buj', null, 'Palabra compuesta: toma el género de la última parte, das Buch.'),
    N('die', 'Schreibtischlampe', 'lámpara de escritorio', 'shraip-tish-lám-pe', null, 'Palabra compuesta: toma el género de la última parte, die Lampe.')
  ]},
  days: { title: 'Los días y las partes del día', items: [
    N('der', 'Montag', 'lunes', 'món-tag'), N('der', 'Dienstag', 'martes', 'dins-tag'),
    N('der', 'Mittwoch', 'miércoles', 'mít-voj'), N('der', 'Donnerstag', 'jueves', 'dó-nas-tag'),
    N('der', 'Freitag', 'viernes', 'frái-tag'), N('der', 'Samstag', 'sábado', 'záms-tag'),
    N('der', 'Sonntag', 'domingo', 'zón-tag'), N('das', 'Wochenende', 'fin de semana', 'vó-jen-en-de'),
    N('der', 'Morgen', 'mañana (amanecer)', 'mór-guen'), N('der', 'Vormittag', 'media mañana', 'fór-mi-tag'),
    N('der', 'Mittag', 'mediodía', 'mí-tag'), N('der', 'Nachmittag', 'tarde', 'náj-mi-tag'),
    N('der', 'Abend', 'noche (atardecer)', 'á-bent'), N('die', 'Nacht', 'noche (madrugada)', 'najt'),
    N('der', 'Tag', 'día', 'tag')
  ]},
  food: { title: 'Comida y bebida', items: [
    N('der', 'Käse', 'queso', 'ké-ze'),
    N('das', 'Würstchen', 'salchicha', 'vürst-jen', 'Würstchen', 'Las palabras que terminan en -chen son siempre neutras.'),
    N('die', 'Cola', 'refresco de cola', 'kó-la'),
    N('die', 'Tomate', 'jitomate', 'to-má-te', 'Tomaten'),
    N('der', 'Saft', 'jugo', 'zaft'),
    N('das', 'Wasser', 'agua', 'vá-sa'),
    N('der', 'Kuchen', 'pastel', 'kú-jen'),
    N('die', 'Schokolade', 'chocolate', 'sho-ko-lá-de'),
    N('der', 'Apfelsaft', 'jugo de manzana', 'áp-fel-zaft', null, 'Palabra compuesta: toma el género de la última parte, der Saft.'),
    N('der', 'Orangensaft', 'jugo de naranja', 'o-rán-jen-zaft', null, 'Palabra compuesta: toma el género de la última parte, der Saft.'),
    N('der', 'Kaffee', 'café', 'ká-fe'),
    N('der', 'Tee', 'té', 'te'),
    N('die', 'Milch', 'leche', 'milj'),
    N('das', 'Mineralwasser', 'agua mineral', 'mi-ne-rál-va-sa', null, 'Palabra compuesta: toma el género de la última parte, das Wasser.'),
    N('die', 'Pizza', 'pizza', 'pí-tsa'),
    N('der', 'Salat', 'ensalada', 'za-lát'),
    N('der', 'Hunger', 'hambre', 'jún-ga'),
    N('der', 'Durst', 'sed', 'durst'),
    N('die', 'Dose', 'recipiente / lonchera', 'dó-ze', null, 'Muchas palabras que terminan en -e son femeninas.')
  ]},
  free: { title: 'Tiempo libre y cosas', items: [
    N('das', 'Hobby', 'pasatiempo', 'jó-bi'),
    N('der', 'Fußball', 'fútbol', 'fús-bal'),
    N('der', 'Sport', 'deporte', 'shport'),
    N('die', 'Gitarre', 'guitarra', 'gi-tá-re'),
    N('die', 'Mundharmonika', 'armónica', 'múnt-jar-mó-ni-ka'),
    N('das', 'Picknick', 'picnic', 'pík-nik'),
    N('der', 'Ausflug', 'excursión', 'áus-fluk'),
    N('die', 'Musik', 'música', 'mu-zík'),
    N('der', 'Krimi', 'novela policiaca', 'krí-mi'),
    N('der', 'Film', 'película', 'film')
  ]},
  weather: { title: 'El clima, las estaciones y los puntos cardinales', items: [
    N('das', 'Wetter', 'clima', 'vé-ta'),
    N('die', 'Sonne', 'sol', 'zó-ne'),
    N('der', 'Regen', 'lluvia', 'ré-guen'),
    N('der', 'Schnee', 'nieve', 'shne'),
    N('der', 'Wind', 'viento', 'vint'),
    N('die', 'Wolke', 'nube', 'vól-ke'),
    N('das', 'Grad', 'grado', 'grat'),
    N('der', 'Frühling', 'primavera', 'frü-ling'),
    N('der', 'Sommer', 'verano', 'zó-ma'),
    N('der', 'Herbst', 'otoño', 'jerpst'),
    N('der', 'Winter', 'invierno', 'vín-ta'),
    N('der', 'Norden', 'norte', 'nór-den'),
    N('der', 'Süden', 'sur', 'zü-den'),
    N('der', 'Osten', 'este', 'ós-ten'),
    N('der', 'Westen', 'oeste', 'vés-ten')
  ]}
};

/* ---------- Adjetivos, colores y otras palabras ---------- */
const OPP = [
  ['neu', 'nuevo', 'noi', 'alt', 'viejo', 'alt'],
  ['billig', 'barato', 'bí-lij', 'teuer', 'caro', 'tói-a'],
  ['groß', 'grande', 'gros', 'klein', 'pequeño', 'klain'],
  ['breit', 'ancho', 'brait', 'schmal', 'angosto', 'shmal'],
  ['schön', 'bonito', 'shön', 'hässlich', 'feo', 'jés-lij'],
  ['hell', 'claro / luminoso', 'jel', 'dunkel', 'oscuro', 'dún-kel']
];
const COLORS = [
  ['schwarz', 'negro', 'shvarts'], ['grau', 'gris', 'grau'], ['weiß', 'blanco', 'vais'],
  ['braun', 'café (marrón)', 'braun'], ['grün', 'verde', 'grün'], ['blau', 'azul', 'blau'],
  ['rot', 'rojo', 'rot'], ['gelb', 'amarillo', 'guelb']
];
const OTHER_ADJ = [
  ['modern', 'moderno', 'mo-dérn'], ['ruhig', 'tranquilo', 'rú-ij'], ['sehr', 'muy', 'zea'],
  ['nicht', 'no', 'nijt'], ['gern', 'con gusto (me gusta)', 'guern'], ['dort', 'allí', 'dort'], ['hier', 'aquí', 'jia']
];

/* ---------- Verbos ---------- */
const VERBS = [
  // [infinitivo, español, pronunciación]
  ['aufräumen', 'ordenar / recoger', 'áuf-roi-men'], ['aufstehen', 'levantarse', 'áuf-shte-en'],
  ['einkaufen', 'ir de compras', 'áin-kau-fen'], ['fernsehen', 'ver televisión', 'férn-ze-en'],
  ['anrufen', 'llamar por teléfono', 'án-ru-fen'], ['anfangen', 'empezar', 'án-fan-guen'],
  ['frühstücken', 'desayunar', 'frü-shtü-ken'], ['kochen', 'cocinar', 'kó-jen'],
  ['hören', 'escuchar', 'hö-ren'], ['arbeiten', 'trabajar', 'ár-bai-ten'],
  ['spielen', 'jugar / tocar (instrumento)', 'shpí-len'], ['essen', 'comer', 'é-sen'],
  ['schlafen', 'dormir', 'shlá-fen'], ['telefonieren', 'hablar por teléfono', 'te-le-fo-ní-ren'],
  ['schreiben', 'escribir', 'shrái-ben'], ['lesen', 'leer', 'lé-zen'],
  ['treffen', 'encontrarse con / ver a', 'tré-fen'], ['nehmen', 'tomar / llevar', 'né-men'],
  ['fahren', 'ir (en vehículo) / manejar', 'fá-ren'], ['wandern', 'hacer senderismo', 'ván-dern'],
  ['schwimmen', 'nadar', 'shví-men'], ['joggen', 'correr (jogging)', 'yó-guen'],
  ['grillen', 'hacer parrillada', 'grí-len'], ['tanzen', 'bailar', 'tán-tsen'],
  ['fotografieren', 'fotografiar', 'fo-to-gra-fí-ren'], ['chatten', 'chatear', 'ché-ten'],
  ['singen', 'cantar', 'zín-guen'], ['klettern', 'escalar', 'klé-tern'],
  ['lernen', 'aprender / estudiar', 'lér-nen'], ['wohnen', 'vivir (habitar)', 'vó-nen'],
  ['machen', 'hacer', 'má-jen'], ['kommen', 'venir', 'kó-men'], ['gehen', 'ir (caminando)', 'gé-en'],
  ['trinken', 'beber', 'trín-ken'], ['kosten', 'costar', 'kós-ten'], ['finden', 'encontrar / opinar', 'fín-den'],
  ['regnen', 'llover', 'rég-nen'], ['schneien', 'nevar', 'shnái-en'], ['scheinen', 'brillar', 'sháinen'],
  ['sprechen', 'hablar', 'shpré-jen'], ['möchten', 'querer (cortés)', 'möj-ten'],
  ['haben', 'tener', 'já-ben'], ['sein', 'ser / estar', 'zain']
];
VERBS.find(v => v[0] === 'scheinen')[2] = 'shái-nen';

const SEP = {
  aufräumen: ['auf', 'räumen'], aufstehen: ['auf', 'stehen'], einkaufen: ['ein', 'kaufen'],
  anrufen: ['an', 'rufen'], fernsehen: ['fern', 'sehen'], anfangen: ['an', 'fangen']
};
const PERSONS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
const IRR = {
  sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
  haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
  lesen: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'],
  sehen: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
  treffen: ['treffe', 'triffst', 'trifft', 'treffen', 'trefft', 'treffen'],
  nehmen: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'],
  essen: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'],
  sprechen: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'],
  fahren: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'],
  schlafen: ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'],
  fangen: ['fange', 'fängst', 'fängt', 'fangen', 'fangt', 'fangen'],
  möchten: ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten'],
  wandern: ['wandere', 'wanderst', 'wandert', 'wandern', 'wandert', 'wandern'],
  klettern: ['klettere', 'kletterst', 'klettert', 'klettern', 'klettert', 'klettern'],
  scheinen: ['scheine', 'scheinst', 'scheint', 'scheinen', 'scheint', 'scheinen']
};
// clase de verbo, para la explicación
const VOWEL = { lesen: 'e → ie', sehen: 'e → ie', treffen: 'e → i', nehmen: 'e → i (y la h desaparece: nimmst)', essen: 'e → i', sprechen: 'e → i', fahren: 'a → ä', schlafen: 'a → ä', fangen: 'a → ä' };

function conjRaw(base) {
  if (IRR[base]) return IRR[base].slice();
  return conjReg(base);
}
function conjReg(base) {
  const stem = base.replace(/en$/, '');
  let du = 'st', er = 't';
  if (/[td]$/.test(stem)) { du = 'est'; er = 'et'; }
  else if (/[sßzx]$/.test(stem)) { du = 't'; }
  return [stem + 'e', stem + du, stem + er, stem + 'en', stem + er, stem + 'en'];
}
// formas conjugadas (con prefijo separado al final cuando es separable)
function conj(inf) {
  if (SEP[inf]) {
    const [pre, base] = SEP[inf];
    return conjRaw(base).map(f => f + ' ' + pre);
  }
  return conjRaw(inf);
}
function conjWhy(inf, p) {
  const f = conj(inf)[p];
  const sep = SEP[inf];
  const base = sep ? sep[1] : inf;
  const pre = sep ? ' El prefijo «' + sep[0] + '» se separa y va al final de la frase.' : '';
  if (p === 3 || p === 5) return 'Con ' + PERSONS[p] + ' el verbo queda igual que el infinitivo: ' + f + '.' + pre;
  if (base === 'sein') return 'sein es irregular y hay que memorizarlo: bin, bist, ist, sind, seid, sind.';
  if (base === 'haben') return 'haben es irregular en du y er: du hast, er hat. Las demás personas son regulares.';
  if (base === 'möchten') return 'möchte: ich y er/sie/es llevan la misma forma (möchte). El resto agrega -st, -n, -t, -n.';
  if (VOWEL[base]) {
    if (p === 1 || p === 2) return base + ' cambia ' + VOWEL[base] + ' solo en du y er/sie/es: ' + f + '. En ich, wir, ihr y sie/Sie no cambia.' + pre;
    return base + ' solo cambia la vocal en du y er/sie/es. Con ' + PERSONS[p] + ' es regular: ' + f + '.' + pre;
  }
  const stem = base.replace(/en$/, '');
  if (/[td]$/.test(stem) && (p === 1 || p === 2 || p === 4)) return 'La raíz «' + stem + '» termina en -t/-d, así que se añade una -e para poder pronunciarlo: ' + f + '.' + pre;
  if (/[sßzx]$/.test(stem) && p === 1) return 'La raíz «' + stem + '» ya termina en sonido s/z, por eso du solo lleva -t: ' + f + '.' + pre;
  const ends = ['-e', '-st', '-t', '-en', '-t', '-en'];
  return 'Verbo regular: raíz + terminación ' + ends[p] + ' (ich -e, du -st, er -t, wir -en, ihr -t, sie -en): ' + f + '.' + pre;
}

/* ---------- Números ---------- */
const NUMS = [
  [100, '(ein)hundert', 'jún-dat'], [200, 'zweihundert', 'tsvai-jún-dat'], [300, 'dreihundert', 'drai-jún-dat'],
  [400, 'vierhundert', 'fia-jún-dat'], [500, 'fünfhundert', 'fünf-jún-dat'], [600, 'sechshundert', 'zeks-jún-dat'],
  [700, 'siebenhundert', 'zí-ben-jún-dat'], [800, 'achthundert', 'ajt-jún-dat'], [900, 'neunhundert', 'noin-jún-dat'],
  [1000, 'tausend', 'táu-zent'], [10000, 'zehntausend', 'tsen-táu-zent'], [100000, 'hunderttausend', 'jún-dat-táu-zent'],
  [1000000, 'eine Million', 'ai-ne mi-lyón']
];
const NUM_WORDS_TEXT = {
  150: 'hundertfünfzig', 280: 'zweihundertachtzig', 350: 'dreihundertfünfzig', 440: 'vierhundertvierzig',
  588: 'fünfhundertachtundachtzig', 750: 'siebenhundertfünfzig', 950: 'neunhundertfünfzig', 1100: 'tausendeinhundert',
  300: 'dreihundert', 60: 'sechzig', 120: 'hundertzwanzig', 160: 'hundertsechzig'
};

/* ---------- Hora ---------- */
const HOUR_W = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'];
const ONES = ['null', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
function offHour(h) { // 0..24
  if (h < 20) return ONES[h];
  return ['zwanzig', 'einundzwanzig', 'zweiundzwanzig', 'dreiundzwanzig', 'vierundzwanzig'][h - 20];
}
const MIN_OFF = { 5: 'fünf', 10: 'zehn', 15: 'fünfzehn', 20: 'zwanzig', 25: 'fünfundzwanzig', 30: 'dreißig', 35: 'fünfunddreißig', 40: 'vierzig', 45: 'fünfundvierzig', 50: 'fünfzig', 55: 'fünfundfünfzig' };
function pad(n) { return (n < 10 ? '0' : '') + n; }
function timeStr(h, m) { return pad(h) + ':' + pad(m); }
// hora cotidiana (privat): h 1..12
function priv(h, m) {
  const cur = HOUR_W[h], nxt = HOUR_W[h % 12 + 1];
  switch (m) {
    case 0: return (h === 1 ? 'ein' : cur) + ' Uhr';
    case 5: return 'fünf nach ' + cur;
    case 10: return 'zehn nach ' + cur;
    case 15: return 'Viertel nach ' + cur;
    case 20: return 'zwanzig nach ' + cur;
    case 25: return 'fünf vor halb ' + nxt;
    case 30: return 'halb ' + nxt;
    case 35: return 'fünf nach halb ' + nxt;
    case 40: return 'zwanzig vor ' + nxt;
    case 45: return 'Viertel vor ' + nxt;
    case 50: return 'zehn vor ' + nxt;
    case 55: return 'fünf vor ' + nxt;
  }
}
function privWhy(h, m) {
  const nxt = h % 12 + 1;
  const t = timeStr(h, m);
  if (m === 0) return t + ' en punto: «' + priv(h, m) + '».';
  if (m === 5 || m === 10 || m === 15 || m === 20) return 'nach = pasadas. ' + t + ' son ' + m + ' minutos después de las ' + h + ': «' + priv(h, m) + '».';
  if (m === 25) return 'Truco de «halb»: halb ' + HOUR_W[nxt] + ' = 30 min hacia las ' + nxt + ' (' + h + ':30). Y 5 min antes de eso es «fünf vor halb ' + HOUR_W[nxt] + '» = ' + t + '.';
  if (m === 30) return '¡Cuidado con halb! «halb ' + HOUR_W[nxt] + '» significa media hora HACIA las ' + nxt + ', o sea ' + h + ':30, no ' + nxt + ':30.';
  if (m === 35) return '«fünf nach halb ' + HOUR_W[nxt] + '» = 5 min después de halb ' + HOUR_W[nxt] + ' (' + h + ':30), o sea ' + t + '.';
  return 'vor = faltan para. ' + t + ' faltan ' + (60 - m) + ' minutos para las ' + nxt + ': «' + priv(h, m) + '».';
}
function offi(h, m) { return offHour(h) + ' Uhr' + (m ? ' ' + MIN_OFF[m] : ''); }

/* ---------- Utilidades ---------- */
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function sample(a, n, excl) { return shuffle(a.filter(x => !(excl || []).includes(x))).slice(0, n); }
const allNouns = () => Object.values(CATS).flatMap(c => c.items);
const full = n => n.a + ' ' + n.w;

/* constructores de preguntas */
let QCOUNT = 0;
const mc = (id, level, q, ans, wrong, why, tag) => ({ id, level, kind: 'mc', q, ans, opts: Array.from(new Set([ans].concat(wrong))), why, tag });
const ty = (id, level, q, answers, why, tag) => ({ id, level, kind: 'type', q, answers: Array.isArray(answers) ? answers : [answers], why, tag });
const bd = (id, level, es, tokens, why, alts, extra) => ({ id, level, kind: 'build', es, tokens, alts: alts || [], extra: extra || [], why });

/* ---------- Generadores ---------- */
function nounQuestions(level, catKeys) {
  const out = [];
  const items = catKeys.flatMap(k => CATS[k].items);
  const pool = allNouns();
  items.forEach(n => {
    const idb = level + ':' + n.w;
    const hint = n.hint || ('«' + n.w + '» es ' + GEN_ES[n.a] + ': ' + full(n) + '. El género no tiene regla segura, se memoriza con la palabra.');
    out.push(mc(idb + ':art', level, '¿Qué artículo lleva «' + n.w + '»?', n.a, ['der', 'das', 'die'].filter(x => x !== n.a),
      full(n) + ' (' + GEN_ES[n.a] + '). ' + (n.hint || 'Anota siempre la palabra con su artículo y su color: der azul, das verde, die rojo.'), 'Artículo'));
    out.push(mc(idb + ':de', level, '¿Qué significa «' + full(n) + '»?', n.es, sample(items.concat(pool).map(x => x.es), 3, [n.es]), full(n) + ' = ' + n.es + '. Se pronuncia «' + n.p + '».', 'Vocabulario'));
    out.push(mc(idb + ':es', level, '¿Cómo se dice «' + n.es + '» en alemán?', full(n),
      sample(items.concat(pool).filter(x => x.w !== n.w), 3).map(full), full(n) + ' (' + GEN_ES[n.a] + '). Se pronuncia «' + n.p + '».', 'Vocabulario'));
    out.push(ty(idb + ':ty', level, 'Escribe en alemán con artículo: «' + n.es + '»', [full(n)], full(n) + '. ' + (n.hint || 'Recuerda: sustantivo siempre con mayúscula y con su artículo.'), 'Escritura'));
    if (n.pl) {
      const pl = (n.w === 'Zimmer' || n.w === 'Kinderzimmer' || n.w === 'Würstchen') ? n.w : n.pl;
      out.push(ty(idb + ':pl', level, 'Plural de «' + full(n) + '»: die ___', [pl, 'die ' + pl], 'El plural de ' + full(n) + ' es die ' + pl + '. En plural el artículo siempre es «die» (naranja en el libro).', 'Plural'));
    }
  });
  return out;
}

function verbQuestions(level, verbNames) {
  const out = [];
  verbNames.forEach(inf => {
    const v = VERBS.find(x => x[0] === inf); if (!v) return;
    const others = VERBS.filter(x => x[0] !== inf);
    out.push(mc(level + ':v:' + inf + ':de', level, '¿Qué significa «' + inf + '»?', v[1], sample(others.map(x => x[1]), 3), inf + ' = ' + v[1] + '. Pronunciación: «' + v[2] + '».' + (SEP[inf] ? ' Es un verbo separable (' + SEP[inf][0] + '|' + SEP[inf][1] + ').' : ''), 'Verbos'));
    out.push(ty(level + ':v:' + inf + ':es', level, 'Infinitivo en alemán de «' + v[1] + '»', [inf], inf + ' = ' + v[1] + '.' + (SEP[inf] ? ' Separable: ' + SEP[inf][0] + '|' + SEP[inf][1] + '.' : ''), 'Verbos'));
  });
  return out;
}

function conjQuestions(level, verbNames) {
  const out = [];
  verbNames.forEach(inf => {
    const forms = conj(inf);
    const sep = SEP[inf];
    for (let p = 0; p < 6; p++) {
      const id = level + ':c:' + inf + ':' + p;
      const q = 'Conjuga: <b>' + PERSONS[p] + '</b> + <b>' + inf + '</b>' + (sep ? ' (separable: escribe la forma con su prefijo al final, p. ej. «' + (inf === 'einkaufen' ? conj('anrufen')[0] : conj('einkaufen')[0]) + '»)' : '');
      if (p % 2 === 0 && !sep) {
        const wrong = [];
        forms.forEach((f, i) => { if (i !== p && f !== forms[p] && !wrong.includes(f)) wrong.push(f); });
        const base = inf.replace(/en$/, '');
        const reg = [base + 'st', base + 't', base + 'e'].filter(x => x !== forms[p] && !wrong.includes(x));
        const opts = sample(wrong, 2).concat(sample(reg, 1));
        while (opts.length < 3) opts.push(base + 'en');
        out.push(mc(id, level, q, forms[p], opts.slice(0, 3), conjWhy(inf, p), 'Conjugación'));
      } else {
        out.push(ty(id, level, q, [forms[p]], conjWhy(inf, p), 'Conjugación'));
      }
    }
  });
  return out;
}

function timeQuestions(level) {
  const out = [];
  const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  for (let h = 1; h <= 12; h++) {
    mins.forEach(m => {
      if (h % 1 !== 0) return;
      const id = level + ':t:' + h + ':' + m;
      const ph = priv(h, m);
      const t = timeStr(h, m);
      const alt = (m === 0 && h === 1) ? ['eins', 'es ist eins'] : [];
      // la mitad como opción múltiple (hora → texto), la otra mitad como escritura
      const k = (h + m / 5) % 3;
      if (k === 0) {
        const wrongTimes = [];
        mins.forEach(mm => { if (mm !== m) wrongTimes.push(priv(h, mm)); });
        const nh = h % 12 + 1; wrongTimes.push(priv(nh, m));
        const w = sample(wrongTimes.filter(x => x !== ph), 3);
        out.push(mc(id + ':mc', level, '¿Cómo se dice <b>' + t + '</b> en el lenguaje cotidiano (privat)?', ph, w, privWhy(h, m), 'Hora'));
      } else if (k === 1) {
        const wrongTimes = [];
        mins.forEach(mm => { if (mm !== m) wrongTimes.push(timeStr(h, mm)); });
        wrongTimes.push(timeStr(h % 12 + 1, m)); wrongTimes.push(timeStr(h === 1 ? 12 : h - 1, m));
        out.push(mc(id + ':rev', level, '¿Qué hora es? «Es ist <b>' + ph + '</b>»', t, sample(wrongTimes.filter(x => x !== t), 3), privWhy(h, m), 'Hora'));
      } else {
        out.push(ty(id + ':ty', level, 'Escribe en alemán (cotidiano) la hora <b>' + t + '</b>. Puedes empezar con «Es ist».', [ph, 'Es ist ' + ph].concat(alt), privWhy(h, m), 'Hora'));
      }
    });
  }
  // hora oficial (offiziell): 0..23
  for (let h = 0; h <= 23; h += 1) {
    [[0, 30, 15, 45, 10, 20, 40, 50][h % 8], [30, 0, 45, 15, 20, 10, 50, 40][h % 8]].forEach(m => {
      const id = level + ':o:' + h + ':' + m;
      const o = offi(h, m);
      const wrong = [offi((h + 12) % 24, m), offi(h, m === 30 ? 45 : 30), offi((h + 1) % 24, m), offi(h, 15 === m ? 45 : 15)].filter(x => x !== o);
      out.push(mc(id, level, 'Hora oficial (radio, tren, anuncios): ¿cómo se dice <b>' + timeStr(h, m) + '</b>?', o, sample(Array.from(new Set(wrong)), 3),
        'En la hora oficial se dice la hora de 0 a 24 y luego los minutos: ' + o + '. Se escribe ' + timeStr(h, m) + ' Uhr. No se usan halb ni Viertel.', 'Hora'));
    });
  }
  return out;
}

function numberQuestions(level) {
  const out = [];
  NUMS.forEach(([n, w, p]) => {
    const f = n.toLocaleString('de-DE');
    out.push(mc(level + ':n:' + n + ':a', level, '¿Qué número es «' + w + '»?', f, sample(NUMS.map(x => x[0].toLocaleString('de-DE')), 3, [f]), w + ' = ' + f + ' (en alemán el punto separa los miles). Pronunciación: «' + p + '».', 'Números'));
    out.push(mc(level + ':n:' + n + ':b', level, '¿Cómo se dice <b>' + f + '</b> en alemán?', w, sample(NUMS.map(x => x[1]), 3, [w]), f + ' = ' + w + '. Pronunciación: «' + p + '».', 'Números'));
  });
  Object.keys(NUM_WORDS_TEXT).forEach(k => {
    const n = +k, w = NUM_WORDS_TEXT[k];
    const wrong = sample(Object.values(NUM_WORDS_TEXT), 3, [w]);
    out.push(mc(level + ':w:' + n, level, '¿Cómo se dice <b>' + n + '</b>?', w, wrong, n + ' = ' + w + '. En alemán el número se escribe todo junto, y las unidades van antes que las decenas (588 = fünfhundert + acht + und + achtzig, «ocho y ochenta»).', 'Números'));
  });
  return out;
}

/* ---------- Preguntas escritas a mano por nivel ---------- */
const H = {};

H.rooms = () => [
  ty('rooms:h1', 'rooms', 'Das ist ___ Haus. Schön, nicht?', ['das'], 'Haus es neutro, así que es «das Haus». Se usa el artículo definido porque se señala una casa concreta.', 'Artículo'),
  ty('rooms:h2', 'rooms', 'Ja, natürlich! ___ Arbeitszimmer ist dort.', ['Das', 'das'], 'Arbeitszimmer lleva «das» (palabra compuesta, última parte: das Zimmer). Aquí se habla de un cuarto concreto, por eso artículo definido.', 'Artículo'),
  ty('rooms:h3', 'rooms', 'Natürlich. Hier ist ___ Flur.', ['der'], 'der Flur (masculino). Es el pasillo concreto que se señala, por eso artículo definido.', 'Artículo'),
  ty('rooms:h4', 'rooms', 'Und dort ist ___ Küche.', ['die'], 'die Küche (femenino).', 'Artículo'),
  mc('rooms:h5', 'rooms', 'Wo ist die Küche? Respuesta: «Hier.» ¿Qué significa «hier»?', 'aquí', ['allí', 'ahora', 'también'], 'hier = aquí. Su contrario es dort = allí. En el libro: Wo? Hier. / Dort.', 'Frases'),
  mc('rooms:h6', 'rooms', 'Dort ist das Bad. ¿Qué significa?', 'Allí está el baño.', ['Aquí está el baño.', 'El baño es grande.', 'Allí hay una cocina.'], 'dort = allí, das Bad = el baño. «Das Bad ist dort.» es el título de la sección A del libro.', 'Frases'),
  mc('rooms:h7', 'rooms', '¿Cómo preguntas dónde está la cocina?', 'Wo ist denn die Küche?', ['Was ist die Küche?', 'Hier ist die Küche.', 'Ist die Küche dort?'], 'Wo = dónde. «denn» suaviza la pregunta (equivale a un «y bien, ¿dónde está...?»).', 'Frases'),
  mc('rooms:h8', 'rooms', '«Sagen Sie mal, ist hier ein Schlafzimmer?» significa:', 'Oiga, ¿hay un dormitorio aquí?', ['Dígame, ¿dónde está la cocina?', 'Mire, el dormitorio es grande.', 'Oiga, ¿es esto una casa?'], '«Sagen Sie mal» = oiga / dígame. Es una forma educada de llamar la atención para preguntar (Strategien, p. 55).', 'Frases'),
  mc('rooms:h9', 'rooms', 'Ja, natürlich! significa:', '¡Sí, claro!', ['¡No, gracias!', '¡Qué bonito!', '¡Un momento!'], 'natürlich = claro, por supuesto.', 'Frases'),
  mc('rooms:h10', 'rooms', '«Meine Traumwohnung hat fünf Zimmer.» significa:', 'Mi departamento de ensueño tiene cinco cuartos.', ['Mi departamento es muy caro.', 'Mi casa tiene cinco baños.', 'Mi cuarto es pequeño.'], 'Traum = sueño, Wohnung = departamento, hat = tiene (haben), fünf Zimmer = cinco cuartos.', 'Frases'),
  mc('rooms:h11', 'rooms', 'Ist das hier das Bad? Respuesta correcta:', 'Ja, das hier ist das Bad.', ['Doch, hier das Bad ist.', 'Nein, ich bin das Bad.', 'Ja, dort Bad ist hier.'], 'En la frase afirmativa el verbo va en la posición 2: «das hier ist das Bad».', 'Frases'),
  bd('rooms:b1', 'rooms', 'Esta es mi casa.', ['Das', 'ist', 'mein', 'Haus', '.'].slice(0, 4), 'Verbo en la posición 2: Das (1) ist (2) mein Haus.', [], []),
  bd('rooms:b2', 'rooms', 'El baño está allí.', ['Das', 'Bad', 'ist', 'dort'], 'Sujeto en la posición 1 y verbo (ist) en la posición 2.', [['Dort', 'ist', 'das', 'Bad']], []),
  bd('rooms:b3', 'rooms', '¿Dónde está la cocina?', ['Wo', 'ist', 'denn', 'die', 'Küche'], 'Pregunta con palabra interrogativa (Wo): el verbo va en la posición 2.', [['Wo', 'ist', 'die', 'Küche']], [])
];

H.furniture = () => {
  const out = [];
  const g = { 'Möbel (muebles)': ['der Schrank', 'das Sofa', 'der Tisch', 'der Stuhl', 'das Bett', 'der Teppich', 'das Regal', 'der Sessel'],
    'Elektrogeräte (electrodomésticos)': ['die Lampe', 'der Fernseher', 'der Kühlschrank', 'die Waschmaschine', 'der Herd'],
    'das Bad (baño)': ['die Dusche', 'die Badewanne', 'das Waschbecken'] };
  const keys = Object.keys(g);
  keys.forEach(k => g[k].forEach(w => {
    out.push(mc('furn:grp:' + w, 'furniture', '¿A qué grupo pertenece «' + w + '»? (clasificación del libro, p. 50)', k, keys.filter(x => x !== k), w + ' pertenece a «' + k + '» en el ejercicio C1 del libro.', 'Vocabulario'));
  }));
  out.push(mc('furn:h1', 'furniture', '«Hier sind Stühle und Tische.» ¿Qué significa?', 'Aquí hay sillas y mesas.', ['Aquí hay una silla y una mesa.', 'Allí están las camas.', 'Las sillas son bonitas.'], 'Stühle y Tische son plurales (Stuhl → Stühle, Tisch → Tische). «Hier sind» = aquí hay / aquí están.', 'Frases'));
  out.push(mc('furn:h2', 'furniture', 'Plural de «der Tisch»:', 'die Tische', ['die Tischen', 'die Tischs', 'das Tische'], 'Tisch → Tische. Plural siempre con «die».', 'Plural'));
  out.push(mc('furn:h3', 'furniture', 'Plural de «das Bett»:', 'die Betten', ['die Bette', 'die Bett', 'die Bettes'], 'Bett → Betten.', 'Plural'));
  out.push(mc('furn:h4', 'furniture', '«Möbel» significa:', 'muebles', ['mesas', 'camas', 'cuartos'], 'Möbel = muebles. Lo usamos en plural: «Sie haben keine Möbel.»', 'Vocabulario'));
  out.push(mc('furn:h5', 'furniture', '¿Cuál de estos es un Elektrogerät (electrodoméstico)?', 'der Herd', ['das Regal', 'der Sessel', 'der Teppich'], 'der Herd (la estufa) es un electrodoméstico. Regal, Sessel y Teppich son Möbel.', 'Vocabulario'));
  return out;
};

H.adj = () => {
  const out = [];
  OPP.forEach(o => {
    out.push(mc('adj:o:' + o[0], 'adj', 'Contrario de «' + o[0] + '» (' + o[1] + '):', o[3], sample(OPP.map(x => x[0]).concat(OPP.map(x => x[3])), 3, [o[0], o[3]]), o[0] + ' ↔ ' + o[3] + '. Pronunciación: «' + o[2] + '» / «' + o[5] + '».', 'Adjetivos'));
    out.push(mc('adj:o2:' + o[3], 'adj', 'Contrario de «' + o[3] + '» (' + o[4] + '):', o[0], sample(OPP.map(x => x[0]).concat(OPP.map(x => x[3])), 3, [o[0], o[3]]), o[3] + ' ↔ ' + o[0] + '.', 'Adjetivos'));
    out.push(mc('adj:t:' + o[0], 'adj', '¿Qué significa «' + o[0] + '»?', o[1], sample(OPP.flatMap(x => [x[1], x[4]]), 3, [o[1]]), o[0] + ' = ' + o[1] + '. Se pronuncia «' + o[2] + '».', 'Adjetivos'));
    out.push(mc('adj:t:' + o[3], 'adj', '¿Qué significa «' + o[3] + '»?', o[4], sample(OPP.flatMap(x => [x[1], x[4]]), 3, [o[4]]), o[3] + ' = ' + o[4] + '. Se pronuncia «' + o[5] + '».', 'Adjetivos'));
    out.push(ty('adj:w:' + o[0], 'adj', 'Escribe en alemán: «' + o[1] + '»', [o[0]], o[0] + ' = ' + o[1] + '.', 'Adjetivos'));
    out.push(ty('adj:w:' + o[3], 'adj', 'Escribe en alemán: «' + o[4] + '»', [o[3]], o[3] + ' = ' + o[4] + '.', 'Adjetivos'));
  });
  COLORS.forEach(c => {
    out.push(mc('adj:c:' + c[0], 'adj', '¿Qué color es «' + c[0] + '»?', c[1], sample(COLORS.map(x => x[1]), 3, [c[1]]), c[0] + ' = ' + c[1] + '. Pronunciación: «' + c[2] + '».', 'Colores'));
    out.push(ty('adj:ce:' + c[0], 'adj', 'Color en alemán: «' + c[1] + '»', [c[0]], c[1] + ' = ' + c[0] + '.', 'Colores'));
  });
  out.push(mc('adj:hd1', 'adj', '«dunkelrot» significa:', 'rojo oscuro', ['rojo claro', 'rojo brillante', 'café rojizo'], 'dunkel = oscuro, hell = claro. dunkelrot ↔ hellrot (se escriben juntos).', 'Colores'));
  out.push(mc('adj:hd2', 'adj', '«hellblau» significa:', 'azul claro', ['azul oscuro', 'azul marino', 'azul brillante'], 'hell = claro. hellblau ↔ dunkelblau.', 'Colores'));
  out.push(ty('adj:hd3', 'adj', 'Rojo oscuro en una sola palabra:', ['dunkelrot'], 'dunkel + rot, todo junto y en minúscula: dunkelrot.', 'Colores'));
  out.push(ty('adj:s1', 'adj', 'Das Zimmer ist ___ teuer. (muy caro)', ['sehr'], '«sehr» = muy y va antes del adjetivo: sehr teuer.', 'Estructura'));
  out.push(ty('adj:s2', 'adj', 'Das Zimmer ist ___ teuer. (no es caro)', ['nicht'], '«nicht» niega el adjetivo y va antes de él: nicht teuer.', 'Estructura'));
  out.push(mc('adj:s3', 'adj', '«Es kostet 150 Euro.» significa:', 'Cuesta 150 euros.', ['Tiene 150 euros.', 'Son 150 cuartos.', 'Necesita 150 euros.'], 'kosten = costar, «es» se refiere a das Zimmer.', 'Frases'));
  out.push(mc('adj:s4', 'adj', 'Welche Farbe hat der Tisch? ¿Qué pregunta?', '¿De qué color es la mesa?', ['¿Qué tan grande es la mesa?', '¿Cuánto cuesta la mesa?', '¿Dónde está la mesa?'], 'Welche Farbe = qué color. «hat» viene de haben: literalmente «¿qué color tiene la mesa?».', 'Frases'));
  out.push(mc('adj:s5', 'adj', '«Wie groß ist das Bett?» pregunta por:', 'el tamaño de la cama', ['el color de la cama', 'el precio de la cama', 'la ubicación de la cama'], 'Wie groß = qué tan grande. También: wie lang (largo), wie breit (ancho), wie hoch (alto).', 'Frases'));
  out.push(mc('adj:s6', 'adj', '«Ungefähr zwei Meter» significa:', 'Aproximadamente dos metros', ['Exactamente dos metros', 'Dos metros cuadrados', 'Menos de dos metros'], 'ungefähr = aproximadamente. Contrario: genau = exactamente.', 'Frases'));
  out.push(mc('adj:g1', 'adj', 'Orden de menos a más gusto: ¿cuál es el MÁS positivo?', 'Sehr gut.', ['Es geht.', 'Nicht so gut.', 'Ganz gut.'], 'Nicht so gut (no tan bien) < Es geht (así así) < Ganz gut (bastante bien) < Gut < Sehr gut.', 'Gefallen'));
  out.push(mc('adj:g2', 'adj', '«Es geht.» como respuesta a «Wie gefällt dir das Bett?» significa:', 'Así así / regular', ['Me encanta', 'No me gusta nada', 'Se va'], 'Es geht = más o menos, regular.', 'Gefallen'));
  out.push(ty('adj:g3', 'adj', 'Wie ___ dir der Teppich? (¿Cómo te parece la alfombra?)', ['gefällt'], 'Un solo objeto (der Teppich) = verbo en singular: gefällt.', 'Gefallen'));
  out.push(ty('adj:g4', 'adj', 'Wie ___ Ihnen die Betten? (¿Cómo le parecen las camas?)', ['gefallen'], 'Varios objetos (die Betten) = verbo en plural: gefallen. El verbo concuerda con lo que te gusta.', 'Gefallen'));
  out.push(ty('adj:g5', 'adj', 'Wie gefällt dir ___ Tisch?', ['der'], 'Con «gefallen», lo que te gusta es el sujeto, así que el artículo queda en su forma normal: der Tisch (no cambia a «den»).', 'Gefallen'));
  out.push(ty('adj:g6', 'adj', 'Wie gefallen dir ___ Stühle?', ['die'], 'Plural: siempre «die» (die Stühle).', 'Gefallen'));
  out.push(bd('adj:b1', 'adj', 'La habitación es muy bonita.', ['Das', 'Zimmer', 'ist', 'sehr', 'schön'], 'Sujeto (Das Zimmer) en la 1ª posición, verbo en la 2ª, luego «sehr» + adjetivo.', [], []));
  out.push(bd('adj:b2', 'adj', '¿Cómo te parece la mesa?', ['Wie', 'gefällt', 'dir', 'der', 'Tisch'], 'Pregunta con palabra interrogativa: Wie (1) gefällt (2).', [], []));
  out.push(bd('adj:b3', 'adj', 'Mi refrigerador es blanco.', ['Mein', 'Kühlschrank', 'ist', 'weiß'], 'Verbo (ist) en la posición 2.', [], []));
  out.push(bd('adj:b4', 'adj', 'Mis sillas son negras.', ['Meine', 'Stühle', 'sind', 'schwarz'], 'Plural: sind (de sein) y «meine» (plural/femenino).', [], []));
  out.push(bd('adj:b5', 'adj', 'La cocina es pequeña y fea.', ['Die', 'Küche', 'ist', 'klein', 'und', 'hässlich'], 'Verbo en posición 2 y dos adjetivos unidos con «und».', [], []));
  return out;
};

H.numbers = () => [
  mc('num:h1', 'numbers', '«1 qm» o «1 m²» se lee:', 'ein Quadratmeter', ['ein Zentimeter', 'ein Kilometer', 'ein Quadratgrad'], 'qm = Quadratmeter (metro cuadrado). cm = Zentimeter.', 'Números'),
  ty('num:h2', 'numbers', 'Escribe en alemán: 60 x 120 cm', ['sechzig mal hundertzwanzig Zentimeter'], '«mal» = por (multiplicado). 60 = sechzig, 120 = hundertzwanzig, cm = Zentimeter.', 'Números'),
  mc('num:h3', 'numbers', '«Die Wohnung kostet 950 Euro im Monat.» ¿Qué significa «im Monat»?', 'al mes', ['al año', 'por día', 'en total'], 'im Monat = al mes / mensual.', 'Frases'),
  mc('num:h4', 'numbers', 'Anuncio: «2-Zi.-Whg., Balkon». ¿Qué significa?', 'Departamento de 2 cuartos con balcón', ['2 baños con balcón', 'Casa de 2 pisos', 'Cuarto para 2 personas'], 'Zi. = Zimmer, Whg. = Wohnung. Los anuncios abrevian mucho.', 'Anuncios'),
  mc('num:h5', 'numbers', 'Anuncio: «950 Euro, Tel. 08161/88 75 80». ¿Qué es 950 Euro?', 'el precio (renta)', ['el teléfono', 'el tamaño', 'el código postal'], 'Es el precio de la renta; el teléfono viene después de «Tel.».', 'Anuncios'),
  mc('num:h6', 'numbers', 'Sie möchten nur 400 bis 500 Euro Miete bezahlen. ¿Qué significa «bis»?', 'hasta', ['desde', 'más', 'por'], 'bis = hasta. von ... bis ... = de ... a ...', 'Anuncios'),
  mc('num:h7', 'numbers', '«ca. 60 m²» significa:', 'aproximadamente 60 metros cuadrados', ['exactamente 60 metros', '60 cuartos', 'menos de 60 euros'], 'ca. = circa = aproximadamente.', 'Anuncios')
];

H.art = () => {
  const out = [];
  const nouns = allNouns().filter(n => CATS.rooms.items.concat(CATS.furniture.items, CATS.electro.items, CATS.bath.items).includes(n));
  nouns.forEach(n => {
    const pr = { der: 'Er', das: 'Es', die: 'Sie' }[n.a];
    out.push(ty('art:pr:' + n.w, 'art', 'Wo ist ' + n.a + ' ' + n.w + '? ___ ist dort. (pronombre)', [pr, pr.toLowerCase()], n.a + ' ' + n.w + ' → ' + pr.toLowerCase() + '. Regla del libro (p. 54): der → er, das → es, die → sie. En alemán incluso las cosas usan er/es/sie según su género.', 'Pronombres'));
    out.push(mc('art:ind:' + n.w, 'art', 'Das ist ___ ' + n.w + '. (artículo indefinido)', n.a === 'die' ? 'eine' : 'ein', n.a === 'die' ? ['ein', 'der', 'die'] : ['eine', 'der', 'die'],
      'Indefinido en nominativo: «ein» para der y das, «eine» para die. ' + full(n) + ' es ' + GEN_ES[n.a] + ', por eso: ' + (n.a === 'die' ? 'eine' : 'ein') + ' ' + n.w + '.', 'Artículos'));
  });
  [['Kinderzimmer', 'Wo sind die Kinderzimmer?'], ['Stühle', 'Wo sind die Stühle?'], ['Betten', 'Wo sind die Betten?'], ['Tomaten', 'Wo sind die Tomaten?']].forEach((x, i) => {
    out.push(ty('art:plpr' + i, 'art', x[1] + ' ___ sind dort. (pronombre)', ['Sie', 'sie'], 'Plural: die → sie (y el verbo es «sind»). Con sie plural el verbo va en la forma de wir/sie: sind.', 'Pronombres'));
  });
  out.push(mc('art:t1', 'art', 'Tabla del libro: der → ?, das → ?, die → ? (pronombres)', 'er, es, sie', ['es, er, sie', 'sie, er, es', 'er, sie, es'], 'der → er (azul), das → es (verde), die → sie (rojo).', 'Pronombres'));
  out.push(mc('art:t2', 'art', 'Hier ist ein Balkon. ___ Balkon ist groß. (el balcón ya se mencionó)', 'Der', ['Ein', 'Das', 'Die'], 'Primera vez que se habla de algo: artículo indefinido (ein Balkon). Cuando ya se conoce o se señala: definido (der Balkon).', 'Artículos'));
  out.push(mc('art:t3', 'art', 'Hier ist eine Küche. ___ Küche ist klein.', 'Die', ['Eine', 'Der', 'Das'], 'eine Küche (nueva) → die Küche (ya conocida).', 'Artículos'));
  out.push(mc('art:t4', 'art', '¿Qué artículo indefinido se usa en plural?', 'Ninguno (sin artículo)', ['die', 'eine', 'einen'], 'El plural no tiene artículo indefinido: «Tomaten?», «Möbel». El definido sí existe: die Tomaten.', 'Artículos'));
  out.push(mc('art:t5', 'art', 'Wo ist ___ Balkon? (artículo definido, nominativo)', 'der', ['das', 'die', 'den'], 'Balkon es masculino (azul): der Balkon. Con «sein» (ist) se usa el nominativo.', 'Artículos'));
  out.push(mc('art:t6', 'art', '¿Qué colores usa el libro para marcar el género? (p. 54)', 'der azul, das verde, die rojo, plural naranja', ['der rojo, das azul, die verde', 'der verde, das rojo, die azul', 'todos negros'], 'En el libro: ● der = azul, ● das = verde, ● die = rojo, ● plural = naranja. Consejo: anota cada palabra con artículo y color.', 'Artículos'));
  out.push(mc('art:t7', 'art', 'Wo sind ___ Kinderzimmer? (plural definido)', 'die', ['der', 'das', 'den'], 'En plural el artículo definido es siempre «die».', 'Artículos'));
  out.push(mc('art:t8', 'art', '¿Qué pronombre reemplaza a «die Wohnung»?', 'sie', ['er', 'es', 'ihr'], 'die Wohnung → sie. «Sie ist teuer.» = Es cara.', 'Pronombres'));
  out.push(mc('art:t9', 'art', 'Wie ist dein Zimmer? ___ ist klein, aber sehr hell. (das Zimmer)', 'Es', ['Er', 'Sie', 'Ihr'], 'das Zimmer → es. «Es ist klein, aber sehr hell.»', 'Pronombres'));
  out.push(mc('art:t10', 'art', 'Der Balkon ist schön. ___ ist sehr groß. (el balcón)', 'Er', ['Es', 'Sie', 'Der'], 'der Balkon → er.', 'Pronombres'));
  out.push(mc('art:p1', 'art', 'Pronombres personales: ¿cuál es «nosotros»?', 'wir', ['ihr', 'sie', 'er'], 'ich = yo, du = tú, er/sie/es = él/ella/ello, wir = nosotros, ihr = ustedes (informal), sie = ellos/ellas, Sie = usted(es) (formal).', 'Pronombres'));
  out.push(mc('art:p2', 'art', 'Pronombres personales: ¿cuál es «ustedes» (informal, entre amigos)?', 'ihr', ['wir', 'Sie', 'du'], 'ihr = ustedes/vosotros (informal). Sie con mayúscula = usted/ustedes (formal).', 'Pronombres'));
  out.push(mc('art:p3', 'art', '«Sie» con S mayúscula en medio de una frase es:', 'usted / ustedes (formal)', ['ella', 'ellos', 'ellas'], 'Sie (mayúscula siempre) = formal. sie (minúscula) = ella o ellos/ellas.', 'Pronombres'));
  out.push(mc('art:p4', 'art', 'Wie gefällt ___ der Tisch? (a un amigo, informal)', 'dir', ['Ihnen', 'mir', 'ihm'], 'dir = a ti (informal), Ihnen = a usted (formal). Ambas aparecen en el libro: «Wie gefällt dir/Ihnen der Tisch?»', 'Pronombres'));
  return out;
};

H.neg = () => {
  const out = [];
  const T = (id, q, a, why) => out.push(ty('neg:' + id, 'neg', q, a, why, 'Negación'));
  T('1', 'Der Stuhl ist ___ schön. (no es bonito)', ['nicht'], 'Se niega un adjetivo con «nicht»: nicht schön.');
  T('2', 'Walter wohnt ___ hier. (no vive aquí)', ['nicht'], 'Se niega un verbo o un lugar con «nicht»: wohnt nicht hier.');
  T('3', 'Sie haben ___ Möbel. (no tienen muebles)', ['keine'], 'Sustantivo sin artículo (o con ein-): se niega con «kein-». Möbel es plural, por eso «keine».');
  T('4', 'Das ist ___ Küche. (no es una cocina)', ['keine'], '«eine Küche» → «keine Küche». Kein- reemplaza a ein-/eine y concuerda con el género.');
  T('5', 'Hier ist ___ Balkon. (no hay un balcón)', ['kein'], '«ein Balkon» (masculino, nominativo) → «kein Balkon».');
  T('6', 'Das ist ___ Bad. (no es un baño)', ['kein'], '«ein Bad» (neutro) → «kein Bad».');
  T('7', 'Ich stehe ___ gern früh auf. (no me gusta levantarme temprano)', ['nicht'], '«nicht» va antes de «gern»: nicht gern. El libro: «Ich stehe nicht gern früh auf.»');
  T('8', 'Das Zimmer ist ___ billig. (no es barato)', ['nicht'], 'Adjetivo: nicht billig.');
  T('9', 'Wir haben ___ Zeit. (no tenemos tiempo)', ['keine'], 'Zeit es femenino y sin artículo, así que «keine Zeit». El libro: «Da habe ich keine Zeit.»');
  T('10', 'Die Küche ist ___ so schön. (no es tan bonita)', ['nicht'], 'nicht so schön = no tan bonita. Es negación de un adjetivo.');
  out.push(mc('neg:r1', 'neg', '¿Cuándo se usa «kein-»?', 'Para negar un sustantivo con ein-/eine o sin artículo', ['Para negar un verbo', 'Para negar un adjetivo', 'Para negar un nombre propio'], 'kein- = no + sustantivo indefinido (ein Käse → kein Käse; Möbel → keine Möbel). nicht niega todo lo demás.', 'Negación'));
  out.push(mc('neg:r2', 'neg', '¿Cuál frase es correcta?', 'Der Stuhl ist nicht schön.', ['Der Stuhl ist kein schön.', 'Der Stuhl nicht ist schön.', 'Der Stuhl ist keine schön.'], 'El adjetivo se niega con nicht, y el verbo sigue en la posición 2.', 'Negación'));
  out.push(mc('neg:r3', 'neg', '¿Cuál frase es correcta?', 'Sie haben keine Möbel.', ['Sie haben nicht Möbel.', 'Sie haben kein Möbel.', 'Sie nicht haben Möbel.'], 'Plural sin artículo: keine Möbel.', 'Negación'));
  out.push(mc('neg:r4', 'neg', '¿Cuál frase es correcta?', 'Walter wohnt nicht hier.', ['Walter wohnt kein hier.', 'Walter nicht wohnt hier.', 'Walter wohnt keine hier.'], 'Verbo en la posición 2 y «nicht» después: wohnt nicht hier.', 'Negación'));
  out.push(mc('neg:r5', 'neg', '«Ich habe keinen Hunger.» significa:', 'No tengo hambre.', ['No tengo sed.', 'Tengo mucha hambre.', 'No quiero comer nada hoy.'], 'Hunger (masculino) con «haben»: keinen Hunger = ningún hambre = no tengo hambre.', 'Negación'));
  out.push(bd('neg:b1', 'neg', 'La silla no es bonita.', ['Der', 'Stuhl', 'ist', 'nicht', 'schön'], 'Sujeto (1), verbo (2), nicht antes del adjetivo.', [], []));
  out.push(bd('neg:b2', 'neg', 'Walter no vive aquí.', ['Walter', 'wohnt', 'nicht', 'hier'], 'Verbo en posición 2, «nicht» después.', [], []));
  out.push(bd('neg:b3', 'neg', 'Ellos no tienen muebles.', ['Sie', 'haben', 'keine', 'Möbel'], 'keine + plural sin artículo.', [], []));
  out.push(bd('neg:b4', 'neg', 'Yo no me levanto temprano con gusto.', ['Ich', 'stehe', 'nicht', 'gern', 'früh', 'auf'], 'Verbo separable: stehe (2) ... auf (final). «nicht gern» va antes de «früh».', [], []));
  return out;
};

H.verbs = () => {
  const out = [];
  out.push(mc('vb:r1', 'verbs', 'Terminaciones de un verbo regular (ich, du, er/sie/es, wir, ihr, sie/Sie):', '-e, -st, -t, -en, -t, -en', ['-en, -st, -t, -en, -t, -en', '-e, -s, -t, -n, -t, -n', '-st, -e, -t, -en, -en, -t'], 'Raíz + -e / -st / -t / -en / -t / -en. Ejemplo: spielen → spiele, spielst, spielt, spielen, spielt, spielen.', 'Conjugación'));
  out.push(mc('vb:r2', 'verbs', '¿Con qué personas cambia la vocal en lesen, nehmen, fahren, schlafen?', 'Solo du y er/sie/es', ['Solo ich', 'Todas las personas', 'Solo wir y sie'], 'El cambio vocálico ocurre únicamente en du y er/sie/es: du liest, er liest. Nunca en ich, wir, ihr, sie.', 'Conjugación'));
  out.push(mc('vb:r3', 'verbs', '¿Por qué decimos «du arbeitest» y no «du arbeitst»?', 'La raíz termina en -t y hace falta una -e para pronunciar', ['Porque arbeiten es irregular', 'Porque es separable', 'Porque es un verbo modal'], 'Raíces en -t/-d añaden -e en du, er/sie/es e ihr: arbeitest, arbeitet, arbeitet. (finden → er findet, kosten → es kostet).', 'Conjugación'));
  out.push(mc('vb:r4', 'verbs', '¿Qué forma de «ich» y «er/sie/es» comparte «möchte»?', 'Las dos son «möchte»', ['ich möchte / er möchtet', 'ich möchtet / er möchte', 'ich möchten / er möchte'], 'möchte: ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie möchten.', 'Conjugación'));
  out.push(mc('vb:r5', 'verbs', '«du isst» (de essen): ¿por qué solo una s?', 'La raíz «ess» ya termina en s, así que se une con la -st', ['Es un error común', 'Es irregular solo en plural', 'Porque ya cambió la vocal'], 'essen: ich esse, du isst, er isst, wir essen, ihr esst, sie essen. (también e → i en du y er).', 'Conjugación'));
  out.push(mc('vb:r6', 'verbs', 'Verbos que cambian e → i / ie en du y er/sie/es:', 'lesen, treffen, nehmen, essen, sprechen, sehen', ['spielen, kochen, machen', 'fahren, schlafen, anfangen', 'wohnen, lernen, hören'], 'e → ie: lesen, sehen (fernsehen). e → i: treffen, nehmen, essen, sprechen. a → ä: fahren, schlafen, anfangen.', 'Conjugación'));
  out.push(mc('vb:r7', 'verbs', 'Verbos que cambian a → ä en du y er/sie/es:', 'fahren, schlafen, anfangen', ['lesen, treffen, nehmen', 'kochen, machen, spielen', 'essen, sprechen, sehen'], 'du fährst / schläfst / fängst an; er fährt / schläft / fängt an.', 'Conjugación'));
  out.push(mc('vb:r8', 'verbs', '«wir» y «sie/Sie» (plural) siempre usan:', 'la misma forma que el infinitivo', ['la forma de du', 'la forma de ich', 'una terminación -t'], 'wir spielen, sie spielen, Sie spielen. Ejemplos del libro: wir arbeiten, wir sehen fern, wir schlafen.', 'Conjugación'));
  return out;
};

H.teacher = () => {
  // las nueve actividades de la maestra
  const A = [
    ['spielen', 'jugar (fútbol)', 'Fußball spielen', 'Ich spiele von fünf bis sechs Fußball.'],
    ['fernsehen', 'ver televisión', 'fernsehen', 'Sie sieht fern.'],
    ['kochen', 'cocinar', 'das Abendessen kochen', 'Lara kocht das Abendessen.'],
    ['arbeiten', 'trabajar', 'arbeiten', 'Ich arbeite gern.'],
    ['machen', 'hacer un picnic', 'ein Picknick machen', 'Wir machen ein Picknick.'],
    ['telefonieren', 'hablar por teléfono', 'telefonieren', 'Tim telefoniert.'],
    ['einkaufen', 'ir de compras', 'einkaufen', 'Lara kauft im Supermarkt ein.'],
    ['schreiben', 'escribir', 'Nachrichten schreiben', 'Lara schreibt eine Nachricht an Tim.'],
    ['machen', 'hacer la tarea', 'Hausaufgaben machen', 'Ich mache Hausaufgaben.']
  ];
  const out = [];
  A.forEach((a, i) => {
    out.push(mc('te:es' + i, 'teacher', '¿Cómo se dice «' + a[1] + '» en alemán?', a[2], sample(A.map(x => x[2]), 3, [a[2]]), a[2] + ' = ' + a[1] + '. Ejemplo: ' + a[3], 'Verbos'));
    out.push(mc('te:de' + i, 'teacher', '¿Qué significa «' + a[2] + '»?', a[1], sample(A.map(x => x[1]), 3, [a[1]]), a[2] + ' = ' + a[1] + '. Ejemplo: ' + a[3], 'Verbos'));
  });
  const T = (id, q, a, why) => out.push(ty('te:' + id, 'teacher', q, a, why, 'Verbos'));
  T('f1', 'Ich ___ Hausaufgaben. (machen)', ['mache'], 'machen es regular: ich mache. «Hausaufgaben machen» = hacer la tarea (Hausaufgaben es plural).');
  T('f2', 'Wir ___ ein Picknick. (machen)', ['machen'], 'wir + infinitivo: wir machen. «ein Picknick machen».');
  T('f3', 'Tim ___ . (telefonieren)', ['telefoniert'], 'er/sie/es lleva -t: Tim telefoniert.');
  T('f4', 'Du ___ Nachrichten. (schreiben)', ['schreibst'], 'Regular: du schreibst.');
  T('f5', 'Lara ___ das Abendessen. (kochen)', ['kocht'], 'er/sie/es → -t: Lara kocht.');
  T('f6', 'Ihr ___ Fußball. (spielen)', ['spielt'], 'ihr → -t: ihr spielt.');
  T('f7', 'Ich ___ gern. (arbeiten)', ['arbeite'], 'ich → -e: ich arbeite.');
  T('f8', 'Du ___ viel. (arbeiten)', ['arbeitest'], 'La raíz arbeit- termina en -t: du arbeitest.');
  T('f9', 'Sie (ella) ___ fern. (fernsehen)', ['sieht'], 'sehen: e → ie en er/sie/es: sie sieht fern (separable: «fern» va al final).');
  T('f10', 'Lara ___ im Supermarkt ___ . (einkaufen) Escribe las dos palabras que faltan, en orden.', ['kauft ein'], 'einkaufen es separable: Lara kauft im Supermarkt ein. El verbo conjugado va en la posición 2 y el prefijo «ein» al final.');
  T('f11', 'Wir ___ jeden Abend ___ . (fernsehen) Escribe las dos palabras que faltan, en orden.', ['sehen fern'], 'wir sehen ... fern (separable: el prefijo «fern» va al final).');
  T('f12', 'Er ___ eine Nachricht. (schreiben)', ['schreibt'], 'er schreibt.');
  out.push(bd('te:b1', 'teacher', 'Yo hago la tarea.', ['Ich', 'mache', 'Hausaufgaben'], 'Verbo en la posición 2; Hausaufgaben siempre en plural.', [], []));
  out.push(bd('te:b2', 'teacher', 'Nosotros hacemos un picnic.', ['Wir', 'machen', 'ein', 'Picknick'], 'wir machen + ein Picknick (neutro, acusativo = ein).', [], []));
  out.push(bd('te:b3', 'teacher', 'Tim habla por teléfono.', ['Tim', 'telefoniert'], 'Sujeto (1) + verbo (2).', [], []));
  out.push(bd('te:b4', 'teacher', 'Lara va de compras en el supermercado.', ['Lara', 'kauft', 'im', 'Supermarkt', 'ein'], 'Separable: kauft (2) ... ein (final).', [], []));
  out.push(bd('te:b5', 'teacher', 'Lara cocina la cena.', ['Lara', 'kocht', 'das', 'Abendessen'], 'Verbo en la posición 2; das Abendessen (neutro).', [], []));
  out.push(bd('te:b6', 'teacher', 'Ella ve televisión.', ['Sie', 'sieht', 'fern'], 'sehen → sieht (e → ie) y «fern» va al final.', [], []));
  out.push(bd('te:b7', 'teacher', 'Yo escribo un mensaje.', ['Ich', 'schreibe', 'eine', 'Nachricht'], 'ich schreibe, Nachricht es femenino: eine Nachricht.', [], []));
  out.push(bd('te:b8', 'teacher', 'Yo trabajo mucho.', ['Ich', 'arbeite', 'viel'], 'ich arbeite (con -e).', [], []));
  out.push(bd('te:b9', 'teacher', 'Yo juego fútbol.', ['Ich', 'spiele', 'Fußball'], 'ich spiele; Fußball spielen = jugar fútbol.', [], []));
  return out;
};

H.order = () => {
  const out = [];
  const S = [
    ['Yo ordeno mi cuarto.', ['Ich', 'räume', 'mein', 'Zimmer', 'auf'], 'aufräumen es separable: räume en la posición 2, auf al final.', []],
    ['Lara se levanta temprano.', ['Lara', 'steht', 'früh', 'auf'], 'aufstehen: steht (2) ... auf (final).', []],
    ['¿Te levantas temprano con gusto?', ['Stehst', 'du', 'gern', 'früh', 'auf'], 'Pregunta de sí/no: el verbo va primero. El prefijo auf va al final.', []],
    ['Sofia llama a su familia.', ['Sofia', 'ruft', 'ihre', 'Familie', 'an'], 'anrufen: ruft (2) ... an (final). Familie es femenino: ihre Familie.', []],
    ['¿Cuándo empieza el curso de alemán?', ['Wann', 'fängt', 'der', 'Deutschkurs', 'an'], 'Pregunta con Wann: Wann (1) fängt (2) ... an (final).', []],
    ['La fiesta empieza a las siete.', ['Die', 'Party', 'fängt', 'um', 'sieben', 'Uhr', 'an'], 'anfangen: fängt (2) ... an (final). Hora con «um».', []],
    ['Por la tarde, Robert hace deporte.', ['Am', 'Nachmittag', 'macht', 'Robert', 'Sport'], 'Si empiezas con el tiempo, el verbo sigue en la posición 2 y el sujeto pasa después: Am Nachmittag (1) macht (2) Robert.', [['Robert', 'macht', 'am', 'Nachmittag', 'Sport']]],
    ['El martes a las cinco Tim juega fútbol.', ['Am', 'Dienstag', 'spielt', 'Tim', 'um', 'fünf', 'Uhr', 'Fußball'], 'Posición 1: Am Dienstag; posición 2: el verbo spielt; luego el sujeto.', [['Tim', 'spielt', 'am', 'Dienstag', 'um', 'fünf', 'Uhr', 'Fußball']]],
    ['Yo me acuesto a las once.', ['Ich', 'gehe', 'um', 'elf', 'Uhr', 'ins', 'Bett'], 'ins Bett gehen = ir a la cama. um + hora.', [['Um', 'elf', 'Uhr', 'gehe', 'ich', 'ins', 'Bett']]],
    ['Por la mañana aprendo alemán.', ['Am', 'Vormittag', 'lerne', 'ich', 'Deutsch'], 'am Vormittag (parte del día) + verbo en posición 2.', [['Ich', 'lerne', 'am', 'Vormittag', 'Deutsch']]],
    ['¿Cuándo van a su curso de alemán?', ['Wann', 'gehen', 'Sie', 'zum', 'Deutschkurs'], 'Wann + verbo conjugado en la posición 2.', []],
    ['El viernes hago una fiesta.', ['Ich', 'mache', 'am', 'Freitag', 'eine', 'Party'], 'eine Party machen (femenino). am + día.', [['Am', 'Freitag', 'mache', 'ich', 'eine', 'Party']]],
    ['Yo trabajo de nueve a cinco.', ['Ich', 'arbeite', 'von', 'neun', 'bis', 'fünf', 'Uhr'], 'von ... bis ... = de ... a ...', []],
    ['Yo veo televisión con gusto.', ['Ich', 'sehe', 'gern', 'fern'], 'sehen → sehe (ich); fern al final.', []],
    ['¿Tienes tiempo el viernes?', ['Hast', 'du', 'am', 'Freitag', 'Zeit'], 'Pregunta de sí/no: verbo primero.', []],
    ['¿Quieres una salchicha?', ['Möchtest', 'du', 'ein', 'Würstchen'], 'Pregunta de sí/no: möchtest (verbo) primero. Würstchen es neutro: ein Würstchen.', []],
    ['¿Cómo está el clima?', ['Wie', 'ist', 'das', 'Wetter'], 'Wie (1) ist (2).', []],
    ['Yo no me levanto temprano con gusto.', ['Ich', 'stehe', 'nicht', 'gern', 'früh', 'auf'], 'nicht va antes de gern. auf va al final.', []],
    ['¿Qué hora es ahora?', ['Wie', 'spät', 'ist', 'es', 'jetzt'], 'Wie spät ist es? = ¿Qué hora es?', [['Wie', 'spät', 'ist', 'es']]],
    ['¿A qué hora vas a la cama?', ['Um', 'wie', 'viel', 'Uhr', 'gehst', 'du', 'ins', 'Bett'], 'Um wie viel Uhr = ¿a qué hora? El verbo va en la posición 2 (gehst).', []],
    ['Hoy no hay sol.', ['Heute', 'scheint', 'die', 'Sonne', 'nicht'], 'Posición 1: Heute. Verbo (scheint) en la 2.', []],
    ['Yo no tengo perro.', ['Ich', 'habe', 'keinen', 'Hund'], 'Hund es masculino: keinen Hund (acusativo).', []],
    ['Yo tomo las salchichas.', ['Ich', 'nehme', 'die', 'Würstchen'], 'nehmen: ich nehme. Plural de Würstchen: die Würstchen.', []],
    ['Yo compro el jugo de naranja.', ['Ich', 'kaufe', 'den', 'Orangensaft'], 'der Orangensaft → den Orangensaft (acusativo masculino).', []]
  ];
  S.forEach((s, i) => out.push(bd('ord:' + i, 'order', s[0], s[1], s[2], s[3], [])));
  const Q = (id, q, ans, wrong, why) => out.push(mc('ord:' + id, 'order', q, ans, wrong, why, 'Estructura'));
  Q('q1', '¿Cuál es la regla de la posición del verbo en una frase normal?', 'El verbo conjugado va en la posición 2', ['El verbo va siempre al final', 'El verbo va siempre en la posición 1', 'El verbo va después del objeto'], 'Posición 2 = segundo elemento de la frase (no segunda palabra). Ejemplo: «Am Nachmittag (1) macht (2) Robert Sport.»');
  Q('q2', 'En una pregunta de sí/no (Ja/Nein-Frage), el verbo va:', 'en la posición 1', ['en la posición 2', 'al final', 'después del sujeto'], '«Stehst du gern früh auf?» «Möchtest du ein Würstchen?»');
  Q('q3', 'En una pregunta con Wann, Wo, Wie, Was..., el verbo va:', 'en la posición 2', ['en la posición 1', 'al final', 'después del objeto'], 'La palabra interrogativa ocupa la posición 1 y el verbo la 2: «Wann fängt der Kurs an?»');
  Q('q4', 'En un verbo separable (aufstehen) el prefijo va:', 'al final de la frase', ['junto al verbo', 'antes del sujeto', 'se elimina'], 'Lara steht früh auf. Wir kaufen im Supermarkt ein.');
  Q('q5', '¿Cuál frase está bien ordenada?', 'Am Montag arbeite ich.', ['Am Montag ich arbeite.', 'Ich am Montag arbeite.', 'Arbeite am Montag ich.'], 'Posición 1: Am Montag; posición 2: arbeite (verbo); luego el sujeto.');
  Q('q6', '¿Cuál frase está bien ordenada?', 'Ich räume mein Zimmer auf.', ['Ich aufräume mein Zimmer.', 'Ich räume auf mein Zimmer.', 'Ich mein Zimmer räume auf.'], 'Verbo separable: räume en posición 2 y auf al final.');
  return out;
};

H.time = () => [
  mc('tm:r1', 'time', '¿Qué significa «halb neun»?', '8:30', ['9:30', '9:00', '8:45'], 'halb = media hora HACIA la siguiente hora. halb neun = 8:30. Error clásico: pensar 9:30.', 'Hora'),
  mc('tm:r2', 'time', 'Viertel nach zehn =', '10:15', ['9:45', '10:45', '10:30'], 'Viertel nach = un cuarto después. 10:15.', 'Hora'),
  mc('tm:r3', 'time', 'Viertel vor zehn =', '9:45', ['10:15', '10:45', '9:15'], 'Viertel vor = un cuarto antes de. 9:45.', 'Hora'),
  mc('tm:r4', 'time', '«Es ist kurz vor zwölf» significa:', 'Son casi las doce', ['Son las doce y cuarto', 'Es mediodía exacto', 'Faltan cinco para la una'], 'kurz vor = poco antes de. kurz nach = poco después. gleich = justo / ya casi.', 'Hora'),
  mc('tm:r5', 'time', '«Es ist kurz nach zwölf» significa:', 'Son las doce y poco', ['Faltan minutos para las doce', 'Son las doce y media', 'Es medianoche'], 'kurz nach = un poco después de.', 'Hora'),
  mc('tm:r6', 'time', '«Ist es schon zwölf?» / «Nein. Es ist erst Viertel vor zwölf.» ¿Qué significa «erst»?', 'apenas / todavía solo', ['ya', 'siempre', 'después'], 'schon = ya, erst = apenas, solo. Se suele contrastar: «schon zwölf?» «erst Viertel vor zwölf».', 'Hora'),
  mc('tm:r7', 'time', '«Wie spät ist es?» pregunta:', 'la hora', ['el precio', 'el día', 'el clima'], 'Wie spät ist es? = ¿Qué hora es? (literal: ¿qué tan tarde es?).', 'Hora'),
  mc('tm:r8', 'time', '«Um wie viel Uhr gehst du ins Bett?» pregunta:', '¿A qué hora te vas a la cama?', ['¿Cuántas horas duermes?', '¿Qué hora es ahora?', '¿Cuándo es tu cumpleaños?'], 'Um wie viel Uhr = ¿a qué hora? Respuesta: «Um elf Uhr» o «Um halb elf».', 'Hora'),
  mc('tm:r9', 'time', '08:30 en hora oficial (radio, anuncios, horarios):', 'acht Uhr dreißig', ['halb neun', 'achtzehn Uhr dreißig', 'halb acht'], 'La hora oficial se dice «hora + Uhr + minutos»: acht Uhr dreißig. «halb neun» es la forma cotidiana.', 'Hora'),
  mc('tm:r10', 'time', '19:00 en hora oficial:', 'neunzehn Uhr', ['siebzehn Uhr', 'neun Uhr', 'neunzig Uhr'], 'En la hora oficial se usa el reloj de 24 h: 19 = neunzehn. En cotidiano: sieben Uhr.', 'Hora'),
  mc('tm:r11', 'time', '¿Cuál es la hora cotidiana (privat) de 08:30? Y la oficial de 15:15?', 'halb neun / fünfzehn Uhr fünfzehn', ['halb acht / dreizehn Uhr fünfzehn', 'acht Uhr halb / fünf Uhr fünfzehn', 'Viertel neun / fünfzehn Viertel'], '8:30 = halb neun (cotidiano). 15:15 oficial = fünfzehn Uhr fünfzehn.', 'Hora'),
  mc('tm:r12', 'time', 'Se escribe 12:03 y se dice «Es ist ___ nach zwölf.»', 'kurz', ['gleich', 'erst', 'halb'], '11:58 = kurz vor zwölf / gleich zwölf. 12:03 = kurz nach zwölf.', 'Hora'),
  mc('tm:r13', 'time', '¿Cuál es la forma oficial de «halb neun» (8:30) según el libro?', 'acht Uhr dreißig', ['acht Uhr halb', 'neun Uhr dreißig', 'dreißig Uhr acht'], 'Man sagt: offiziell «acht Uhr dreißig», privat «halb neun».', 'Hora'),
  mc('tm:r14', 'time', 'El libro dice «Man schreibt 01.45 Uhr / 13.45 Uhr; man sagt ___».', 'Viertel vor zwei', ['Viertel vor eins', 'Viertel nach zwei', 'halb zwei'], '1:45 = Viertel vor zwei (faltan 15 para las 2).', 'Hora'),
  ty('tm:r15', 'time', 'Ist es schon zwölf? Nein, es ist ___ Viertel vor zwölf. (apenas)', ['erst'], 'erst = apenas, solo. Se usa cuando es más temprano de lo que se esperaba.', 'Hora'),
  ty('tm:r16', 'time', '11:58 → Es ist ___ vor zwölf. (casi)', ['kurz'], 'kurz vor = poco antes de; también «gleich zwölf».', 'Hora')
];

H.when = () => {
  const out = [];
  const F = (id, q, a, why) => out.push(ty('wh:' + id, 'when', q, a, why, 'Preposiciones'));
  F('1', '___ Montag (el lunes)', ['Am', 'am'], 'Con días de la semana: am (an + dem). Am Montag.');
  F('2', '___ Wochenende (el fin de semana)', ['Am', 'am'], 'am Wochenende = el fin de semana (am Samstag + am Sonntag).');
  F('3', '___ Morgen (por la mañana)', ['Am', 'am'], 'Partes del día con am: am Morgen, am Vormittag, am Mittag, am Nachmittag, am Abend.');
  F('4', '___ Abend (por la tarde-noche)', ['Am', 'am'], 'am Abend.');
  F('5', '___ der Nacht (por la noche, madrugada)', ['In', 'in'], 'Excepción: «in der Nacht», NO «am Nacht».');
  F('6', 'Der Kurs fängt ___ acht Uhr an. (a las ocho)', ['um'], 'Con una hora exacta: um. um acht Uhr, um halb neun.');
  F('7', 'Ich gehe ___ elf Uhr ins Bett. (a las once)', ['um'], 'Hora exacta → um.');
  F('8', 'Sie lernt ___ Montag ___ Freitag Deutsch. (de lunes a viernes) Escribe las dos palabras que faltan, en orden.', ['von bis'], 'von ... bis ... = de ... a ... (días u horas).');
  F('9', 'Ich arbeite ___ neun ___ fünf Uhr. Escribe las dos palabras que faltan, en orden.', ['von bis'], 'von neun bis fünf Uhr = de nueve a cinco.');
  F('10', 'Die Party fängt ___ sieben Uhr an.', ['um'], 'um + hora.');
  F('11', 'Ich spiele ___ Freitag Fußball.', ['am'], 'am + día.');
  F('12', '___ Tag (todos los días)', ['jeden Tag', 'Jeden Tag', 'jeden tag'], '«jeden Tag» (acusativo masculino). El libro: jeden Tag, jeden Morgen, jeden Abend.');
  F('13', '___ Nacht (todas las noches)', ['jede Nacht', 'Jede Nacht'], 'Nacht es femenino: jede Nacht.');
  F('14', '___ Abend (todas las tardes)', ['jeden Abend', 'Jeden Abend'], 'Abend es masculino: jeden Abend.');
  out.push(mc('wh:q1', 'when', '¿Qué pregunta se usa para «¿a qué hora?»', 'Um wie viel Uhr?', ['Wie spät?', 'Wann ist es?', 'Wie viel?'], 'Um wie viel Uhr = ¿a qué hora? Wie spät ist es? = ¿qué hora es? Wann = ¿cuándo?', 'Preguntas'));
  out.push(mc('wh:q2', 'when', '«Wann fängt der Kurs an?» significa:', '¿Cuándo empieza el curso?', ['¿Dónde es el curso?', '¿Cuánto cuesta el curso?', '¿Quién da el curso?'], 'Wann = cuándo; anfangen = empezar.', 'Preguntas'));
  out.push(mc('wh:q3', 'when', '«Am Wochenende» significa:', 'el fin de semana', ['entre semana', 'todos los días', 'por la noche'], 'Wochenende = fin de semana (Samstag + Sonntag).', 'Días'));
  out.push(mc('wh:q4', 'when', 'Aufgabe: Tim juega fútbol el martes a las 17:00. «Wann spielt Tim Fußball?»', 'Am Dienstag um fünf Uhr.', ['Am Dienstag halb fünf.', 'Um Dienstag am fünf Uhr.', 'Von Dienstag bis fünf Uhr.'], 'am + día, um + hora.', 'Horario'));
  out.push(mc('wh:q5', 'when', 'Samstag y Sonntag juntos:', 'am Wochenende', ['in der Woche', 'jeden Tag', 'am Montag'], 'am Wochenende.', 'Días'));
  out.push(mc('wh:q6', 'when', 'Reloj de la mañana: ¿qué orden tiene el día en alemán?', 'Morgen, Vormittag, Mittag, Nachmittag, Abend, Nacht', ['Mittag, Morgen, Abend, Nacht', 'Abend, Nacht, Morgen, Mittag', 'Nacht, Mittag, Abend, Morgen'], 'Morgen (amanecer) → Vormittag → Mittag → Nachmittag → Abend → Nacht.', 'Días'));
  out.push(mc('wh:q7', 'when', '«Die Bibliothek ist von Montag bis Freitag geöffnet.» significa:', 'La biblioteca está abierta de lunes a viernes.', ['La biblioteca está cerrada el lunes.', 'La biblioteca abre a las cinco.', 'La biblioteca abre solo los viernes.'], 'geöffnet = abierto, geschlossen = cerrado. «Wann ist ... geöffnet?» = ¿cuándo está abierto...?', 'Horario'));
  out.push(mc('wh:q8', 'when', 'Cartel: «Montag bis Samstag 9.00-20.00 Uhr». En cotidiano:', 'von neun bis acht Uhr abends (20 Uhr)', ['von neun bis zwölf Uhr', 'am neun bis acht', 'um neun und acht'], 'Oficial: neun Uhr bis zwanzig Uhr. Cotidiano: von neun bis acht.', 'Horario'));
  out.push(bd('wh:b1', 'when', 'El curso de alemán empieza a las ocho y media.', ['Der', 'Deutschkurs', 'fängt', 'um', 'acht', 'Uhr', 'dreißig', 'an'], 'Oficial: acht Uhr dreißig. Verbo separable: fängt ... an.', [['Der', 'Deutschkurs', 'fängt', 'um', 'halb', 'neun', 'an']], []));
  out.push(bd('wh:b2', 'when', 'La biblioteca está abierta de lunes a viernes.', ['Die', 'Bibliothek', 'ist', 'von', 'Montag', 'bis', 'Freitag', 'geöffnet'], 'ist (2) ... geöffnet (final).', [], []));
  out.push(bd('wh:b3', 'when', 'Yo me levanto todos los días a las seis.', ['Ich', 'stehe', 'jeden', 'Tag', 'um', 'sechs', 'Uhr', 'auf'], 'jeden Tag, um + hora, y auf al final.', [], []));
  return out;
};

const ACC_FOOD = [
  ['der', 'Käse', 'den', 'm'], ['das', 'Würstchen', 'das', 'n'], ['die', 'Cola', 'die', 'f'], ['der', 'Saft', 'den', 'm'],
  ['der', 'Kuchen', 'den', 'm'], ['die', 'Schokolade', 'die', 'f'], ['der', 'Apfelsaft', 'den', 'm'], ['der', 'Orangensaft', 'den', 'm'],
  ['der', 'Kaffee', 'den', 'm'], ['der', 'Tee', 'den', 'm'], ['die', 'Milch', 'die', 'f'], ['das', 'Mineralwasser', 'das', 'n'],
  ['die', 'Pizza', 'die', 'f'], ['der', 'Salat', 'den', 'm'], ['das', 'Wasser', 'das', 'n']
];
const ACC_VERBS = [['haben', 'Ich habe'], ['nehmen', 'Ich nehme'], ['kaufen', 'Ich kaufe'], ['essen', 'Ich esse'], ['trinken', 'Ich trinke']];
const IND = { m: ['einen', 'ein'], n: ['ein', 'ein'], f: ['eine', 'eine'] };
const NEG = { m: 'keinen', n: 'kein', f: 'keine' };

H.acc = () => {
  const out = [];
  ACC_FOOD.forEach((f, i) => {
    const [art, w, acc, g] = f;
    const [vinf, vs] = ACC_VERBS[i % ACC_VERBS.length];
    out.push(mc('acc:d:' + w, 'acc', vs + ' ___ ' + w + '. (artículo definido, ' + art + ' ' + w + ')', acc, ['der', 'das', 'die', 'den'].filter(x => x !== acc).slice(0, 3),
      g === 'm' ? w + ' es masculino: nominativo «der», acusativo «den». Con ' + vinf + ' el objeto va en acusativo.' : w + ' no es masculino: en acusativo el artículo no cambia (' + art + '). Solo masculino cambia: der → den.', 'Akkusativ'));
    const ind = IND[g][0];
    out.push(mc('acc:i:' + w, 'acc', 'Ich habe ___ ' + w + '. (artículo indefinido, ' + art + ' ' + w + ')', ind, ['ein', 'eine', 'einen'].filter(x => x !== ind),
      g === 'm' ? 'Masculino: nominativo «ein», acusativo «einen» (ein Käse → Ich habe einen Käse).' : 'No es masculino: no cambia (' + ind + ' ' + w + ').', 'Akkusativ'));
    out.push(mc('acc:n:' + w, 'acc', 'Wir haben ___ ' + w + '. (no tenemos)', NEG[g], ['kein', 'keine', 'keinen'].filter(x => x !== NEG[g]),
      g === 'm' ? 'Negación de «einen ' + w + '»: keinen ' + w + ' (acusativo masculino).' : 'Negación: ' + NEG[g] + ' ' + w + ' (no cambia en acusativo).', 'Akkusativ'));
    out.push(ty('acc:w:' + w, 'acc', 'Wo ist ___ ' + w + '? (nominativo, con «sein»)', [art], 'Con «sein» (ist/sind) se usa el nominativo: ' + art + ' ' + w + '. No hay cambio.', 'Akkusativ'));
  });
  out.push(mc('acc:r1', 'acc', '¿Qué artículo cambia en acusativo?', 'Solo el masculino (der → den, ein → einen, kein → keinen)', ['Todos', 'Solo el femenino', 'Solo el neutro'], 'Neutro, femenino y plural quedan igual. Masculino: der → den.', 'Akkusativ'));
  out.push(mc('acc:r2', 'acc', 'Hast du ___ Käse? (haben + masculino)', 'den', ['der', 'das', 'die'], '«haben» pide acusativo. der Käse → den Käse. Ejemplo del libro: «Hast du den Käse?»', 'Akkusativ'));
  out.push(mc('acc:r3', 'acc', 'Moment mal, wo ist denn ___ Käse? (con «sein»)', 'der', ['den', 'das', 'die'], '«ist» es sein y pide nominativo: der Käse.', 'Akkusativ'));
  out.push(mc('acc:r4', 'acc', 'Hier, Papa. Ich habe ___ Käse, siehst du?', 'den', ['der', 'ein', 'keine'], '«Ich habe» + masculino definido → den Käse (libro, p. 73).', 'Akkusativ'));
  out.push(mc('acc:r5', 'acc', 'Wir machen ___ Ausflug. (der Ausflug)', 'einen', ['ein', 'eine', 'der'], 'Ausflug es masculino: einen Ausflug machen (acusativo). Libro: «Lara, Lili, Sofia und Walter machen einen Ausflug.»', 'Akkusativ'));
  out.push(mc('acc:r6', 'acc', 'Wir machen ___ Picknick. (das Picknick)', 'ein', ['einen', 'eine', 'der'], 'Picknick es neutro: ein Picknick (no cambia).', 'Akkusativ'));
  out.push(mc('acc:r7', 'acc', 'Hast du ___ Hunger mehr? (¿ya no tienes hambre?)', 'keinen', ['kein', 'keine', 'nicht'], 'Hunger es masculino. Hunger haben es acusativo → keinen Hunger. Libro: «Hast du keinen Hunger mehr?»', 'Akkusativ'));
  out.push(mc('acc:r8', 'acc', 'Ich kaufe ___ Orangensaft.', 'den', ['der', 'die', 'das'], 'Libro: «Ich kaufe den Orangensaft.» der Orangensaft → den Orangensaft.', 'Akkusativ'));
  out.push(mc('acc:r9', 'acc', 'Ich nehme ___ Würstchen. (definido)', 'das', ['den', 'die', 'der'], 'Neutro: das Würstchen no cambia. Libro: «Ich nehme die Würstchen» (plural).', 'Akkusativ'));
  out.push(mc('acc:r10', 'acc', 'Ich möchte ___ Kaffee. (indefinido, der Kaffee)', 'einen', ['ein', 'eine', 'der'], 'Masculino acusativo: einen Kaffee.', 'Akkusativ'));
  out.push(bd('acc:b1', 'acc', 'Yo tengo el queso.', ['Ich', 'habe', 'den', 'Käse'], 'haben + masculino → den.', [], []));
  out.push(bd('acc:b2', 'acc', 'Yo compro el jugo de naranja.', ['Ich', 'kaufe', 'den', 'Orangensaft'], 'kaufen + masculino → den.', [], []));
  out.push(bd('acc:b3', 'acc', 'No tenemos queso.', ['Wir', 'haben', 'keinen', 'Käse'], 'Masculino acusativo negado: keinen.', [], []));
  out.push(bd('acc:b4', 'acc', '¿Tienes el queso?', ['Hast', 'du', 'den', 'Käse'], 'Pregunta de sí/no: el verbo primero.', [], []));
  return out;
};

H.jandoch = () => {
  const out = [];
  const J = (id, q, a, why) => out.push(mc('jd:' + id, 'jandoch', q, a, ['Ja', 'Nein', 'Doch'].filter(x => x !== a), why, 'Ja/Nein/Doch'));
  J('1', 'Möchtest du ein Würstchen? (Sí quiero)', 'Ja', 'Pregunta afirmativa + respuesta afirmativa = Ja.');
  J('2', 'Möchtest du ein Würstchen? (No quiero)', 'Nein', 'Pregunta afirmativa + respuesta negativa = Nein.');
  J('3', 'Hast du keinen Hunger mehr? (Sí tengo hambre)', 'Doch', 'Pregunta NEGATIVA (keinen) y tú contradices con «sí»: Doch. Libro: «Hast du keinen Hunger mehr? Doch.»');
  J('4', 'Hast du keinen Hunger mehr? (No, no tengo)', 'Nein', 'Pregunta negativa y confirmas el «no»: Nein.');
  J('5', 'Haben wir den Käse nicht dabei? (Sí, lo tenemos)', 'Doch', 'Pregunta negativa (nicht) + respuesta afirmativa = Doch. Libro, C1.');
  J('6', 'Haben wir den Käse nicht dabei? (No, no lo tenemos)', 'Nein', 'Pregunta negativa + respuesta negativa = Nein.');
  J('7', 'Spielst du nicht gern Fußball? (Sí me gusta)', 'Doch', 'Pregunta negativa → Doch para decir sí.');
  J('8', 'Spielst du gern Fußball? (Sí)', 'Ja', 'Pregunta positiva → Ja.');
  J('9', 'Du hast keinen Hund? (Correcto, no tengo)', 'Nein', 'Pregunta negativa; confirmas que no: Nein. Libro: «Du hast keinen Hund? Nein.»');
  J('10', 'Sprichst du nicht Deutsch? (Sí hablo alemán)', 'Doch', 'Contradices la negación: Doch.');
  J('11', 'Kommst du heute nicht zum Fußball? (Sí voy, ya llego)', 'Doch', 'Doch = sí (contradice la negación). Libro, C2 D: «Doch! Ich bin gleich da.»');
  J('12', 'Ist die Wohnung teuer? (No, cuesta solo 300 euros)', 'Nein', 'Pregunta positiva, respuesta negativa: Nein. Libro, C2 A.');
  J('13', 'Ist die Frau auf den Fotos nicht deine Freundin? (Sí, claro que lo es)', 'Doch', 'Pregunta negativa + «sí, claro» = Doch. Libro, C2 C.');
  J('14', 'Hast du keinen Computer? (No tengo)', 'Nein', 'Confirma la negación: Nein.');
  J('15', 'Ich glaube, du stehst nicht jeden Tag um sechs auf. (Sí me levanto a las seis)', 'Doch', 'Contradice una afirmación negativa: Doch. Libro, D3: «Doch. Ich stehe um sechs auf.»');
  out.push(mc('jd:r1', 'jandoch', '¿Cuándo se usa «doch»?', 'Para decir «sí» a una pregunta o afirmación negativa', ['Para decir «sí» a cualquier pregunta', 'Para decir «no»', 'Para decir «quizás»'], '«Doch» solo existe como respuesta a algo negativo que tú contradices. En español se responde «sí»; en alemán «doch».', 'Ja/Nein/Doch'));
  out.push(mc('jd:r2', 'jandoch', 'Hast du keinen Hunger mehr? ___ , ich habe Hunger.', 'Doch', ['Ja', 'Nein', 'Kein'], 'Pregunta negativa + hay hambre = Doch.', 'Ja/Nein/Doch'));
  out.push(mc('jd:r3', 'jandoch', 'Hast du keinen Computer? ___ , ich habe einen Computer.', 'Doch', ['Ja', 'Nein', 'Kein'], 'Contradices la negación: Doch, ich habe einen Computer (einen: masculino acusativo).', 'Ja/Nein/Doch'));
  out.push(mc('jd:r4', 'jandoch', '«Wie bitte?» significa:', '¿Cómo? / ¿Perdón?', ['Por favor', '¿Cuánto cuesta?', '¡Bienvenido!'], 'Wie bitte? se usa cuando no entendiste o no puedes creerlo. Libro, C3.', 'Frases'));
  out.push(mc('jd:r5', 'jandoch', 'Hast du einen Hund? (pregunta positiva). Si NO tienes:', 'Nein.', ['Doch.', 'Ja.', 'Kein.'], 'Pregunta positiva y respuesta negativa: Nein.', 'Ja/Nein/Doch'));
  out.push(ty('jd:t1', 'jandoch', 'Spielst du nicht gern Fußball? ___ , ich spiele sehr gern Fußball. (Ja / Nein / Doch)', ['Doch'], 'Pregunta negativa + contradices = Doch.', 'Ja/Nein/Doch'));
  out.push(ty('jd:t2', 'jandoch', 'Möchtest du auch ein Würstchen? ___ , danke. (no quiero)', ['Nein'], 'Pregunta positiva + rechazo = Nein, danke.', 'Ja/Nein/Doch'));
  return out;
};

H.weather = () => {
  const out = [];
  const W = [
    ['Es regnet.', 'Está lloviendo.', ['Está nevando.', 'Hace viento.', 'Hace calor.']],
    ['Die Sonne scheint.', 'Hace sol.', ['Está lloviendo.', 'Está nublado.', 'Hace frío.']],
    ['Es ist windig.', 'Hace viento.', ['Está nublado.', 'Hace sol.', 'Está nevando.']],
    ['Es schneit.', 'Está nevando.', ['Está lloviendo.', 'Hace calor.', 'Hace viento.']],
    ['Es ist bewölkt.', 'Está nublado.', ['Hace sol.', 'Está nevando.', 'Hace calor.']],
    ['Es ist warm.', 'Hace calor (templado).', ['Hace frío.', 'Está lloviendo.', 'Hace viento.']],
    ['Es ist heiß.', 'Hace mucho calor.', ['Hace frío.', 'Hace fresco.', 'Hay niebla.']],
    ['Es ist kalt.', 'Hace frío.', ['Hace calor.', 'Está nublado.', 'Hace sol.']],
    ['Es gibt viele Wolken.', 'Hay muchas nubes.', ['Hay mucha lluvia.', 'Hay mucho sol.', 'Hace viento.']],
    ['Es sind 25 Grad.', 'Hay 25 grados.', ['Son las 25 horas.', 'Cuesta 25 euros.', 'Hay 25 nubes.']],
    ['Es ist schön.', 'Hace buen tiempo.', ['Hace mal tiempo.', 'Es bonito el cuarto.', 'Está nublado.']],
    ['Es ist schlecht.', 'Hace mal tiempo.', ['Hace buen tiempo.', 'Hace calor.', 'Hace sol.']]
  ];
  W.forEach((w, i) => {
    out.push(mc('we:de' + i, 'weather', '¿Qué significa «' + w[0] + '»?', w[1], w[2], w[0] + ' = ' + w[1], 'Clima'));
    out.push(mc('we:es' + i, 'weather', 'En alemán: «' + w[1] + '»', w[0], sample(W.map(x => x[0]), 3, [w[0]]), w[1] + ' = ' + w[0], 'Clima'));
  });
  out.push(ty('we:t1', 'weather', 'Die Sonne ___ . (scheinen)', ['scheint'], 'Die Sonne = 3ª persona singular (er/sie/es): scheint.', 'Clima'));
  out.push(ty('we:t2', 'weather', 'Es ___ . (regnen)', ['regnet'], 'La raíz «regn» termina en n: es regnet. Hablando del clima siempre se usa «es».', 'Clima'));
  out.push(ty('we:t3', 'weather', 'Es ___ . (schneien)', ['schneit'], 'es schneit (de schneien).', 'Clima'));
  out.push(mc('we:m1', 'weather', '+8 °C se dice:', 'acht Grad / plus acht Grad', ['minus acht Grad', 'Null Grad', 'achtzig Grad'], '+8 °C: acht Grad (o plus acht Grad). -3 °C: minus drei Grad o drei Grad unter Null.', 'Clima'));
  out.push(mc('we:m2', 'weather', '-3 °C se dice:', 'minus drei Grad', ['plus drei Grad', 'drei Grad über Null', 'dreißig Grad'], 'minus drei Grad = drei Grad unter Null.', 'Clima'));
  out.push(mc('we:m3', 'weather', '«im Norden» significa:', 'en el norte', ['al norte', 'del este', 'en el oeste'], 'im Norden, im Süden, im Osten, im Westen. (In der Mitte = en el centro).', 'Clima'));
  out.push(mc('we:m4', 'weather', '¿Cómo preguntas cómo está el clima?', 'Wie ist das Wetter?', ['Was ist das Wetter?', 'Wo ist das Wetter?', 'Wann ist das Wetter?'], 'Wie ist das Wetter? Respuestas: Gut. / Schön. / Schlecht. / Nicht so gut.', 'Clima'));
  out.push(mc('we:m5', 'weather', '«Im Winter schneit es oft» significa:', 'En invierno nieva a menudo.', ['En verano llueve a menudo.', 'En otoño hace viento.', 'En primavera hace sol.'], 'Im Winter = en invierno. Estaciones: im Frühling, im Sommer, im Herbst, im Winter (todas con «im»).', 'Clima'));
  out.push(bd('we:b1', 'weather', '¿Cómo está el clima?', ['Wie', 'ist', 'das', 'Wetter'], 'Wie (1) ist (2).', [], []));
  out.push(bd('we:b2', 'weather', 'Hoy hace sol y hace calor.', ['Heute', 'scheint', 'die', 'Sonne', 'und', 'es', 'ist', 'warm'], 'Posición 1: Heute. Posición 2: scheint. Luego sujeto y la segunda frase.', [], []));
  out.push(bd('we:b3', 'weather', 'En el norte está nublado.', ['Im', 'Norden', 'ist', 'es', 'bewölkt'], 'Im Norden (1) ist (2).', [], []));
  return out;
};

H.hobby = () => {
  const out = [];
  const Hb = [
    ['wandern', 'hacer senderismo', 'Ich wandere gern.'], ['schwimmen', 'nadar', 'Ich schwimme viel.'],
    ['Gitarre spielen', 'tocar guitarra', 'Ich spiele auch Gitarre.'], ['Freunde treffen', 'ver a los amigos', 'Ich treffe meine Freunde.'],
    ['Ski fahren', 'esquiar', 'Ich fahre gern Ski.'], ['joggen', 'correr', 'Ich jogge gern.'],
    ['grillen', 'hacer parrillada', 'Wir grillen zusammen.'], ['tanzen', 'bailar', 'Ich tanze gern.'],
    ['lesen', 'leer', 'Lesen macht Spaß!'], ['fotografieren', 'fotografiar', 'Ich fotografiere gern.'],
    ['Mountainbike fahren', 'andar en bicicleta de montaña', 'Ich fahre gern Mountainbike.'], ['im Internet surfen', 'navegar en internet', 'Ich surfe nicht gern im Internet.']
  ];
  Hb.forEach((h, i) => {
    out.push(mc('hb:de' + i, 'hobby', '¿Qué significa «' + h[0] + '»?', h[1], sample(Hb.map(x => x[1]), 3, [h[1]]), h[0] + ' = ' + h[1] + '. Ejemplo: ' + h[2], 'Hobbys'));
    out.push(mc('hb:es' + i, 'hobby', 'En alemán: «' + h[1] + '»', h[0], sample(Hb.map(x => x[0]), 3, [h[0]]), h[1] + ' = ' + h[0] + '. Ejemplo: ' + h[2], 'Hobbys'));
  });
  const T = (id, q, a, why) => out.push(ty('hb:' + id, 'hobby', q, a, why, 'Hobbys'));
  T('f1', 'Ich ___ gern. (tanzen)', ['tanze'], 'ich tanze.');
  T('f2', 'Du ___ gern Gitarre. (spielen)', ['spielst'], 'du spielst.');
  T('f3', 'Adrian ___ viel. (lesen)', ['liest'], 'lesen: e → ie en er/sie/es: er liest.');
  T('f4', 'Er ___ gern Ski. (fahren)', ['fährt'], 'fahren: a → ä en er: er fährt.');
  T('f5', 'Wir ___ zusammen. (grillen)', ['grillen'], 'wir + infinitivo: wir grillen.');
  T('f6', 'Ich ___ meine Freunde. (treffen)', ['treffe'], 'ich treffe (sin cambio de vocal en ich).');
  T('f7', 'Du ___ deine Freunde. (treffen)', ['triffst'], 'treffen: e → i en du: du triffst.');
  T('f8', 'Sie (ella) ___ viel. (schwimmen)', ['schwimmt'], 'sie schwimmt.');
  T('f9', 'Ich ___ gern. (wandern)', ['wandere'], 'ich wandere (verbo en -ern: ich wandere). wir wandern.');
  out.push(mc('hb:r1', 'hobby', '«Ich finde Krimis toll.» significa:', 'Me parecen geniales las novelas policiacas.', ['Encuentro novelas policiacas.', 'No me gustan los policías.', 'Busco una novela.'], 'finden = encontrar / opinar. «Ich finde X gut/toll/super/interessant» = me parece X bueno/genial/... Los adjetivos del libro: gut, toll, super, interessant.', 'Hobbys'));
  out.push(mc('hb:r2', 'hobby', '«Das macht Spaß» significa:', 'Eso es divertido.', ['Eso cuesta mucho.', 'Eso es difícil.', 'Eso es feo.'], 'Spaß machen = ser divertido. Libro: «Lesen macht Spaß!»', 'Hobbys'));
  out.push(mc('hb:r3', 'hobby', '«Mein Lieblingsbuch ist ...» significa:', 'Mi libro favorito es ...', ['Mi libro viejo es ...', 'Mi biblioteca es ...', 'Mi lectura es lenta ...'], 'Lieblings- + sustantivo = favorito: Lieblingsbuch, Lieblingsfilm, Lieblingsmusik.', 'Hobbys'));
  out.push(mc('hb:r4', 'hobby', '«Was machst du gern in der Freizeit?» significa:', '¿Qué te gusta hacer en tu tiempo libre?', ['¿Qué haces mañana?', '¿Cuánto trabajas?', '¿Dónde pasas tus vacaciones?'], 'gern = con gusto. Was machst du gern = ¿qué haces con gusto? Freizeit = tiempo libre.', 'Hobbys'));
  out.push(mc('hb:r5', 'hobby', 'Para decir «Me gusta bailar» en alemán:', 'Ich tanze gern.', ['Ich gern tanze.', 'Ich tanzen gern.', 'Gern tanze ich nicht.'], '«gern» va después del verbo conjugado: Ich tanze gern. Para negar: Ich tanze nicht gern.', 'Hobbys'));
  out.push(mc('hb:r6', 'hobby', '«Wandern gefällt mir nicht.» significa:', 'No me gusta el senderismo.', ['Me gusta mucho caminar.', 'No camino nunca.', 'Mi hobby es caminar.'], 'gefällt mir nicht = no me gusta. Es la misma expresión de «Wie gefällt dir ...?»', 'Hobbys'));
  out.push(mc('hb:r7', 'hobby', 'Hobbys de Lara y su familia: «Lara, Lili, Sofia und Walter machen einen Ausflug.» ¿Qué hacen?', 'Una excursión', ['Una fiesta', 'Un viaje largo', 'La tarea'], 'einen Ausflug machen = hacer una excursión. (der Ausflug: masculino → einen).', 'Hobbys'));
  out.push(bd('hb:b1', 'hobby', 'Me gusta bailar.', ['Ich', 'tanze', 'gern'], 'Verbo en la posición 2, «gern» después.', [], []));
  out.push(bd('hb:b2', 'hobby', 'Mi hobby es leer.', ['Mein', 'Hobby', 'ist', 'Lesen'], 'Verbo en la posición 2.', [], []));
  out.push(bd('hb:b3', 'hobby', 'Me parecen geniales las novelas policiacas.', ['Ich', 'finde', 'Krimis', 'toll'], 'Ich finde + objeto + adjetivo.', [], []));
  out.push(bd('hb:b4', 'hobby', 'Los fines de semana asamos juntos.', ['Am', 'Wochenende', 'grillen', 'wir', 'zusammen'], 'Am Wochenende (1) grillen (2) wir.', [['Wir', 'grillen', 'am', 'Wochenende', 'zusammen']], []));
  out.push(bd('hb:b5', 'hobby', 'No me gusta levantarme temprano.', ['Ich', 'stehe', 'nicht', 'gern', 'früh', 'auf'], 'Separable + nicht gern.', [], []));
  return out;
};

H.food = () => {
  const out = [];
  const P = [
    ['Möchtest du ein Würstchen?', '¿Quieres una salchicha?'],
    ['Was nimmst du?', '¿Qué vas a tomar?'],
    ['Ich nehme die Würstchen und einen Apfelsaft.', 'Yo tomo las salchichas y un jugo de manzana.'],
    ['Ich glaube, ich trinke nur eine Cola.', 'Creo que solo tomo una cola.'],
    ['Ich weiß nicht.', 'No sé.'],
    ['Haben wir keinen Käse?', '¿No tenemos queso?'],
    ['Wer kauft die Würstchen und den Orangensaft?', '¿Quién compra las salchichas y el jugo de naranja?'],
    ['Sag mal, Sofia: Hast du den Käse?', 'Dime, Sofia: ¿tienes el queso?'],
    ['Moment mal, wo ist denn der Käse?', 'Un momento, ¿dónde está el queso?'],
    ['Hast du Hunger?', '¿Tienes hambre?'],
    ['Ich habe Durst.', 'Tengo sed.']
  ];
  P.forEach((p, i) => {
    out.push(mc('fd:de' + i, 'food', '¿Qué significa «' + p[0] + '»?', p[1], sample(P.map(x => x[1]), 3, [p[1]]), p[0] + ' = ' + p[1], 'Frases'));
    out.push(mc('fd:es' + i, 'food', 'En alemán: «' + p[1] + '»', p[0], sample(P.map(x => x[0]), 3, [p[0]]), p[1] + ' = ' + p[0], 'Frases'));
  });
  const S = [
    ['Na gut.', 'Bueno, está bien.'], ['Ach nein.', 'Ay, no.'], ['Kein Problem!', '¡No hay problema!'],
    ['Gute Idee!', '¡Buena idea!'], ['Na prima!', '¡Excelente!'], ['Stimmt.', 'Es verdad / Así es.'],
    ['Moment mal.', 'Un momento.'], ['Ich glaube, ...', 'Creo que ...'], ['Entschuldigung!', '¡Perdón!'], ['Ich weiß nicht.', 'No sé.']
  ];
  S.forEach((s, i) => {
    out.push(mc('fd:s' + i, 'food', '«' + s[0] + '» significa:', s[1], sample(S.map(x => x[1]), 3, [s[1]]), s[0] + ' = ' + s[1] + ' (Strategien, libro p. 55/67/79).', 'Frases'));
  });
  const T = (id, q, a, why) => out.push(ty('fd:' + id, 'food', q, a, why, 'Frases'));
  T('t1', 'Ich ___ die Würstchen. (nehmen)', ['nehme'], 'ich nehme.');
  T('t2', 'Was ___ du? (nehmen)', ['nimmst'], 'nehmen: e → i en du: du nimmst.');
  T('t3', 'Sie ___ einen Saft. (nehmen, ella)', ['nimmt'], 'er/sie/es nimmt.');
  T('t4', 'Ich ___ nur eine Cola. (trinken)', ['trinke'], 'ich trinke.');
  out.push(mc('fd:q1', 'food', 'Alguien dice «Entschuldigung!» porque llegó tarde. Respondes:', 'Kein Problem!', ['Doch!', 'Na prima!', 'Wie bitte?'], 'Entschuldigung = perdón. Kein Problem = no hay problema.', 'Frases'));
  out.push(mc('fd:q2', 'food', 'Alguien propone «Dann vielleicht Pizza?» y te parece bien:', 'Ja, gern. Gute Idee!', ['Nein, danke.', 'Kein Problem!', 'Wie bitte?'], 'Ja, gern = sí, con gusto. Gute Idee = buena idea.', 'Frases'));
  out.push(bd('fd:b1', 'food', '¿Qué vas a tomar?', ['Was', 'nimmst', 'du'], 'Was (1) nimmst (2) du.', [], []));
  out.push(bd('fd:b2', 'food', 'Yo tomo las salchichas.', ['Ich', 'nehme', 'die', 'Würstchen'], 'nehmen: ich nehme.', [], []));
  out.push(bd('fd:b3', 'food', 'Creo que solo tomo una cola.', ['Ich', 'glaube', 'ich', 'trinke', 'nur', 'eine', 'Cola'], 'Después de «Ich glaube,» empieza otra frase con verbo en la posición 2: ich (1) trinke (2).', [], []));
  return out;
};

/* ---------- Niveles ---------- */
const LEVELS = [
  { id: 'rooms', n: 1, title: 'La casa y las habitaciones', sub: 'Lección 4 A', cats: ['rooms'], gen: () => nounQuestions('rooms', ['rooms']).concat(H.rooms()) },
  { id: 'furniture', n: 2, title: 'Muebles, baño y electrodomésticos', sub: 'Lección 4 C, E', cats: ['furniture', 'electro', 'bath', 'desk'], gen: () => nounQuestions('furniture', ['furniture', 'electro', 'bath', 'desk']).concat(H.furniture()) },
  { id: 'adj', n: 3, title: 'Describir: adjetivos, colores y gustar', sub: 'Lección 4 B, C', cats: [], gen: () => H.adj() },
  { id: 'numbers', n: 4, title: 'Números y anuncios de vivienda', sub: 'Lección 4 D (p. 52)', cats: [], gen: () => numberQuestions('numbers').concat(H.numbers()) },
  { id: 'art', n: 5, title: 'Artículos y pronombres', sub: 'Gramática p. 54', cats: [], gen: () => H.art() },
  { id: 'neg', n: 6, title: 'Negación: nicht y kein', sub: 'Gramática p. 54', cats: [], gen: () => H.neg() },
  { id: 'verbs', n: 7, title: 'Conjugación de verbos', sub: 'Gramática pp. 66 y 78', cats: [], gen: () => conjQuestions('verbs', ['sein', 'haben', 'wohnen', 'machen', 'kochen', 'spielen', 'schreiben', 'lernen', 'kommen', 'gehen', 'hören', 'arbeiten', 'finden', 'kosten', 'lesen', 'treffen', 'nehmen', 'essen', 'sprechen', 'fahren', 'schlafen', 'möchten', 'trinken', 'telefonieren', 'tanzen', 'wandern']).concat(verbQuestions('verbs', VERBS.map(v => v[0]))).concat(H.verbs()) },
  { id: 'teacher', n: 8, title: 'Las actividades de la maestra', sub: 'Lección 5 y 6 (verbos)', cats: [], gen: () => H.teacher().concat(conjQuestions('teacher', ['aufräumen', 'aufstehen', 'einkaufen', 'anrufen', 'fernsehen', 'anfangen'])) },
  { id: 'order', n: 9, title: 'Estructura de la frase', sub: 'Posición 2, separables, preguntas', cats: [], gen: () => H.order() },
  { id: 'time', n: 10, title: 'La hora', sub: 'Lección 5 B (pp. 61 y 67)', cats: [], gen: () => timeQuestions('time').concat(H.time()) },
  { id: 'when', n: 11, title: 'Días, partes del día y am / um / von bis', sub: 'Lección 5 C, D', cats: ['days'], gen: () => nounQuestions('when', ['days']).concat(H.when()) },
  { id: 'acc', n: 12, title: 'Akkusativ: der → den', sub: 'Gramática p. 78', cats: [], gen: () => H.acc() },
  { id: 'jandoch', n: 13, title: 'Ja, nein, doch', sub: 'Lección 6 C (p. 78)', cats: [], gen: () => H.jandoch() },
  { id: 'weather', n: 14, title: 'El clima y las estaciones', sub: 'Lección 6 A (p. 72)', cats: ['weather'], gen: () => nounQuestions('weather', ['weather']).concat(H.weather()) },
  { id: 'hobby', n: 15, title: 'Tiempo libre y hobbys', sub: 'Lección 6 D (p. 75)', cats: ['free'], gen: () => nounQuestions('hobby', ['free']).concat(H.hobby()) },
  { id: 'food', n: 16, title: 'En el Imbiss: comer y pedir', sub: 'Lección 6 B (p. 73)', cats: ['food'], gen: () => nounQuestions('food', ['food']).concat(H.food()) }
];

if (typeof module !== 'undefined') module.exports = { LEVELS, conj, conjReg, priv, offi, timeStr, CATS, VERBS, SEP, IRR, PERSONS, N, HOUR_W, ACC_FOOD };
