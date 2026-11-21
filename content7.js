/* Lección 7 «Lernen, ein Leben lang» (Schritte international Neu 1, Kursbuch pp. 82 a 93, Arbeitsbuch AB 75 a 85).
   Gramática del libro (p. 90): Modalverben können y wollen, Modalverb im Satz, Perfekt mit haben, Perfekt mit sein, Perfekt im Satz.
   Todos los ejemplos, textos y explicaciones de este archivo son redacción propia basada en esos temas. */
'use strict';

/* ---------- verbos nuevos para el motor de conjugación ---------- */
[['können', 'poder / saber hacer', 'kö-nen'], ['wollen', 'querer (con decisión)', 'vó-len'], ['üben', 'practicar', 'ü-ben'], ['fragen', 'preguntar', 'frá-guen'],
  ['schicken', 'enviar', 'shí-ken'], ['malen', 'pintar', 'má-len'], ['backen', 'hornear', 'bá-ken'], ['reiten', 'montar a caballo', 'rái-ten'],
  ['funktionieren', 'funcionar', 'funk-tsio-ní-ren'], ['aussehen', 'verse (tener aspecto)', 'áus-ze-en'], ['losgehen', 'salir / ponerse en marcha', 'lós-gue-en'],
  ['kennenlernen', 'conocer (por primera vez)', 'ké-nen-ler-nen'], ['vergessen', 'olvidar', 'fer-gué-sen'], ['bringen', 'traer / llevar', 'brín-guen'],
  ['bleiben', 'quedarse', 'blái-ben'], ['lieben', 'amar', 'lí-ben'], ['suchen', 'buscar', 'zú-jen'], ['zeichnen', 'dibujar', 'tsáij-nen'],
  ['ansehen', 'mirar', 'án-ze-en'], ['vergleichen', 'comparar', 'fer-glái-jen'], ['antworten', 'responder', 'ánt-vor-ten'], ['zeigen', 'mostrar', 'tsái-guen'],
  ['sagen', 'decir', 'zá-guen'], ['erzählen', 'contar (una historia)', 'er-tsé-len'], ['glauben', 'creer', 'gláu-ben'], ['bezahlen', 'pagar', 'be-tsá-len'],
  ['vermieten', 'rentar (dar en alquiler)', 'fer-mí-ten'], ['raten', 'adivinar', 'rá-ten'], ['zeichnen', 'dibujar', 'tsáij-nen'], ['wissen', 'saber', 'ví-sen'],
  ['sehen', 'ver', 'zé-en'], ['gefallen', 'gustar', 'gue-fá-len'], ['steigen', 'subir', 'shtái-guen'], ['passen', 'quedar bien', 'pá-sen'],
  ['chatten', 'chatear', 'ché-ten'], ['surfen', 'navegar (internet)', 'sör-fen'], ['joggen', 'trotar', 'yó-guen']
].forEach(v => { if (!VERBS.find(x => x[0] === v[0])) VERBS.push(v); });
IRR.können = ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'];
IRR.wollen = ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'];
IRR.wissen = ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'];
IRR.vergessen = ['vergesse', 'vergisst', 'vergisst', 'vergessen', 'vergesst', 'vergessen'];
IRR.raten = ['rate', 'rätst', 'rät', 'raten', 'ratet', 'raten'];
IRR.gefallen = ['gefalle', 'gefällst', 'gefällt', 'gefallen', 'gefallt', 'gefallen'];
VOWEL.vergessen = 'e → i'; VOWEL.raten = 'a → ä (y la -t- final se funde: er rät)'; VOWEL.gefallen = 'a → ä';
SEP.aussehen = ['aus', 'sehen']; SEP.losgehen = ['los', 'gehen']; SEP.kennenlernen = ['kennen', 'lernen']; SEP.ansehen = ['an', 'sehen'];

/* explicación de las formas de los modales y de wissen (ampliación sin tocar conjWhy original) */
const MODAL_WHY = {
  können: 'können es un verbo modal: ich y er/sie/es NO llevan terminación y cambian la vocal ö → a: ich kann, er kann. du kannst. wir können, ihr könnt, sie können.',
  wollen: 'wollen es un verbo modal: ich y er/sie/es no llevan terminación y cambian o → i: ich will, er will. du willst. wir wollen, ihr wollt, sie wollen.',
  wissen: 'wissen es irregular en singular: ich weiß, du weißt, er weiß (sin -t en ich y er). Plural regular: wir wissen, ihr wisst, sie wissen.'
};
const _conjWhyBase = conjWhy;
conjWhy = function (inf, p) { // eslint-disable-line no-func-assign
  if (MODAL_WHY[inf]) return MODAL_WHY[inf] + ' Forma pedida: ' + conj(inf)[p] + '.';
  if (inf === 'raten' && (p === 1 || p === 2)) return 'raten cambia a → ä en du y er/sie/es: du rätst, er rät (en er la -t de la raíz ya basta, no se añade otra).';
  return _conjWhyBase(inf, p);
};

/* ---------- Perfekt: participios de la lección 7 (p. 90) y de verbos ya conocidos ---------- */
// [infinitivo, participio, auxiliar, español, grupo]
const PART = [
  ['üben', 'geübt', 'haben', 'practicar', 'ge...t'], ['machen', 'gemacht', 'haben', 'hacer', 'ge...t'], ['lieben', 'geliebt', 'haben', 'amar', 'ge...t'],
  ['kaufen', 'gekauft', 'haben', 'comprar', 'ge...t'], ['lernen', 'gelernt', 'haben', 'aprender', 'ge...t'], ['kochen', 'gekocht', 'haben', 'cocinar', 'ge...t'],
  ['hören', 'gehört', 'haben', 'escuchar', 'ge...t'], ['spielen', 'gespielt', 'haben', 'jugar', 'ge...t'], ['arbeiten', 'gearbeitet', 'haben', 'trabajar', 'ge...et'],
  ['frühstücken', 'gefrühstückt', 'haben', 'desayunar', 'ge...t'], ['malen', 'gemalt', 'haben', 'pintar', 'ge...t'], ['tanzen', 'getanzt', 'haben', 'bailar', 'ge...t'],
  ['fragen', 'gefragt', 'haben', 'preguntar', 'ge...t'], ['schicken', 'geschickt', 'haben', 'enviar', 'ge...t'], ['wohnen', 'gewohnt', 'haben', 'vivir', 'ge...t'],
  ['suchen', 'gesucht', 'haben', 'buscar', 'ge...t'], ['zeichnen', 'gezeichnet', 'haben', 'dibujar', 'ge...et'], ['kosten', 'gekostet', 'haben', 'costar', 'ge...et'],
  ['treffen', 'getroffen', 'haben', 'encontrarse con', 'ge...en'], ['finden', 'gefunden', 'haben', 'encontrar', 'ge...en'], ['sprechen', 'gesprochen', 'haben', 'hablar', 'ge...en'],
  ['schreiben', 'geschrieben', 'haben', 'escribir', 'ge...en'], ['trinken', 'getrunken', 'haben', 'beber', 'ge...en'], ['schlafen', 'geschlafen', 'haben', 'dormir', 'ge...en'],
  ['essen', 'gegessen', 'haben', 'comer', 'ge...en'], ['lesen', 'gelesen', 'haben', 'leer', 'ge...en'], ['sehen', 'gesehen', 'haben', 'ver', 'ge...en'],
  ['nehmen', 'genommen', 'haben', 'tomar', 'ge...en'], ['singen', 'gesungen', 'haben', 'cantar', 'ge...en'], ['backen', 'gebacken', 'haben', 'hornear', 'ge...en'],
  ['helfen', 'geholfen', 'haben', 'ayudar', 'ge...en'],
  ['telefonieren', 'telefoniert', 'haben', 'hablar por teléfono', '-iert'], ['fotografieren', 'fotografiert', 'haben', 'fotografiar', '-iert'], ['studieren', 'studiert', 'haben', 'estudiar', '-iert'],
  ['gehen', 'gegangen', 'sein', 'ir (a pie)', 'sein'], ['fahren', 'gefahren', 'sein', 'ir (en vehículo)', 'sein'], ['kommen', 'gekommen', 'sein', 'venir / llegar', 'sein']
];
const HABEN_F = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const SEIN_F = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];
const SUBJ = [['ich', 'yo'], ['du', 'tú'], ['er', 'él'], ['wir', 'nosotros'], ['ihr', 'ustedes (informal)'], ['sie', 'ellos']];
function partWhy(x) {
  if (x[4] === 'ge...t') return x[0] + ' es regular: ge + raíz + t → ' + x[1] + '. Se forma el Perfekt con haben: «er hat ' + x[1] + '».';
  if (x[4] === 'ge...et') return 'La raíz de ' + x[0] + ' termina en -t/-d o en -n tras consonante, por eso lleva -et: ' + x[1] + '. Con haben: «er hat ' + x[1] + '».';
  if (x[4] === 'ge...en') return x[0] + ' es irregular: el participio termina en -en (y a veces cambia la vocal): ' + x[1] + '. Con haben: «er hat ' + x[1] + '». Merke (p. 90): oft bei ge...en.';
  if (x[4] === '-iert') return 'Los verbos en -ieren NO llevan ge-: ' + x[0] + ' → ' + x[1] + '. Con haben: «er hat ' + x[1] + '».';
  return x[0] + ' indica movimiento de un lugar a otro (• → •), por eso el Perfekt va con sein: «er ist ' + x[1] + '».';
}

/* ====================== NIVEL A: können ====================== */
const R_KANN = [
  ['Ich kann gut schwimmen.', 'Sé nadar bien.'], ['Kannst du Gitarre spielen?', '¿Sabes tocar la guitarra?'], ['Ja, ein bisschen.', 'Sí, un poco.'],
  ['Nein, gar nicht.', 'No, para nada.'], ['Er kann nicht so gut singen.', 'Él no canta tan bien.'], ['Wir können zusammen kochen.', 'Podemos cocinar juntos.'],
  ['Könnt ihr Ski fahren?', '¿Saben esquiar (ustedes)?'], ['Sie kann sehr gut tanzen.', 'Ella sabe bailar muy bien.'], ['Kann ich das auch lernen?', '¿Puedo aprender eso yo también?'],
  ['Das sieht toll aus!', '¡Eso se ve genial!'], ['Das stimmt nicht.', 'Eso no es cierto.'], ['Stimmt!', '¡Es cierto!'],
  ['Ich kann gute Tipps geben.', 'Puedo dar buenos consejos.'], ['Können Sie Französisch sprechen?', '¿Habla usted francés? (¿sabe hablar?)'], ['Mein Opa kann sehr gut malen.', 'Mi abuelo pinta muy bien.'],
  ['Ich kann leider nicht reiten.', 'Lamentablemente no sé montar a caballo.'], ['Kannst du mir helfen?', '¿Me puedes ayudar?'], ['Wer kann Klavier spielen?', '¿Quién sabe tocar el piano?']
];
function genL7Kann() {
  const M = maker('l7kann');
  const out = phraseQs('l7kann', R_KANN, 'Frases con können').concat(conjQuestions('l7kann', ['können']));
  const SUBJ_K = [['Ich', 'kann'], ['Du', 'kannst'], ['Er', 'kann'], ['Sie (ella)', 'kann'], ['Wir', 'können'], ['Ihr', 'könnt'], ['Sie (usted)', 'können'], ['Lara und Tim', 'können']];
  const ACT = [['schwimmen', 'nadar'], ['Ski fahren', 'esquiar'], ['Gitarre spielen', 'tocar la guitarra'], ['Kuchen backen', 'hornear pasteles'], ['Englisch sprechen', 'hablar inglés'], ['tanzen', 'bailar'], ['Fahrrad fahren', 'andar en bicicleta'], ['Klavier spielen', 'tocar el piano']];
  SUBJ_K.forEach((s, i) => {
    const a = ACT[i % ACT.length];
    out.push(M.ty(s[0] + ' ___ gut ' + a[0] + '. (können)', s[1], s[0] + ' → ' + s[1] + '. ' + MODAL_WHY.können + ' El infinitivo «' + a[0].split(' ').pop() + '» va al final.', 'können'));
  });
  ACT.forEach(a => {
    const words = a[0].split(' ');
    out.push(M.bd('Sé ' + a[1] + ' bien.', ['Ich', 'kann', 'gut'].concat(words), 'Satzklammer: el modal «kann» va en la posición 2 y el infinitivo (' + words[words.length - 1] + ') al final.'));
    out.push(M.bd('¿Sabes ' + a[1] + '?', ['Kannst', 'du'].concat(words), 'Pregunta de sí/no: el modal va en la posición 1 y el infinitivo al final.'));
  });
  out.push(M.bd('Él no sabe cantar bien.', ['Er', 'kann', 'nicht', 'gut', 'singen'], '«nicht» va antes de «gut»; el infinitivo «singen» al final.'));
  out.push(M.bd('¿Qué sabes hacer bien?', ['Was', 'kannst', 'du', 'gut'], 'W-Frage: Was (1) kannst (2). Aquí no hace falta otro verbo.'));
  out.push(M.bd('Mañana podemos hacer un picnic.', ['Morgen', 'können', 'wir', 'ein', 'Picknick', 'machen'], 'Inversión: Morgen (1) können (2) wir ... machen (final).', [['Wir', 'können', 'morgen', 'ein', 'Picknick', 'machen']]));
  out.push(M.mc('¿Dónde va el infinitivo en una frase con «können»?', 'Al final de la frase', ['En la posición 2', 'Justo después de können', 'Al principio'], 'Es la «Satzklammer» (paréntesis verbal): Ich kann gut Ski fahren. El modal en 2 y el infinitivo al final.', 'Estructura'));
  out.push(M.mc('¿Qué forma es correcta? «Lara ___ gut tanzen.»', 'kann', ['kannt', 'könnt', 'können'], 'er/sie/es kann (sin -t). Igual que ich kann.', 'können'));
  out.push(M.mc('¿Qué forma es correcta? «Ihr ___ gut kochen.»', 'könnt', ['kannt', 'kann', 'können'], 'ihr könnt (con ö y -t).', 'können'));
  out.push(M.mc('Respuesta a «Kannst du Ski fahren?» si no sabes nada:', 'Nein, gar nicht.', ['Ja, sehr gut.', 'Ja, ein bisschen.', 'Doch, natürlich.'], 'gar nicht = para nada. Escala del libro (p. 84): sehr gut · gut · ein bisschen · nicht so gut · gar nicht.', 'Frases'));
  out.push(M.mc('¿Qué expresa «Ja, ein bisschen»?', 'Que sabes hacerlo un poco', ['Que lo haces muy bien', 'Que no lo sabes hacer', 'Que quieres aprenderlo'], 'ein bisschen = un poco.', 'Frases'));
  out.push(M.mc('Ordena de mejor a peor: sehr gut / gar nicht / ein bisschen / gut', 'sehr gut, gut, ein bisschen, gar nicht', ['gut, sehr gut, gar nicht, ein bisschen', 'ein bisschen, gut, sehr gut, gar nicht', 'gar nicht, ein bisschen, gut, sehr gut'], 'Escala: sehr gut > gut > ein bisschen > nicht so gut > gar nicht.', 'Frases'));
  out.push(M.mc('«Das sieht toll aus!» significa:', '¡Eso se ve genial!', ['¡Eso suena genial!', '¡Mira eso!', '¡Sal de ahí!'], 'aussehen (separable) = verse, tener aspecto: Das sieht ... aus.', 'Frases'));
  out.push(M.mc('«Kann ich das auch lernen?» ¿Qué tipo de pregunta es?', 'Pregunta de sí/no con modal: modal en posición 1, infinitivo al final', ['W-Frage', 'Una orden', 'Una afirmación'], 'Kann (1) ich das auch lernen (final)?', 'Estructura'));
  out.push(M.ty('Completa con el infinitivo al final: «Ich kann gut ___.» (nadar)', 'schwimmen', 'Con können el segundo verbo queda en infinitivo y al final: Ich kann gut schwimmen.', 'können'));
  out.push(M.ty('Completa: «___ du Klavier spielen?» (können)', 'Kannst', 'du kannst. En la pregunta de sí/no va al principio y con mayúscula.', 'können'));
  return out;
}
LESSONS.l7kann = () => box('können: lo que sé (o no sé) hacer', '<p><b>können</b> = poder / saber hacer algo. Es un <b>verbo modal</b>: va conjugado en la posición 2 y el otro verbo queda en <b>infinitivo al final</b> de la frase (Satzklammer).</p>') +
  conjTable(['können']) +
  tbl(['Posición 1', 'Posición 2 (modal)', 'Resto', 'Final (infinitivo)'], [['Ich', '<b>kann</b>', 'gut', '<b>schwimmen</b>.'], ['Lara', '<b>kann</b>', 'gute Tipps', '<b>geben</b>.'], ['<b>Kannst</b>', 'du', 'Ski', '<b>fahren</b>?'], ['Was', '<b>kannst</b>', 'du', '(gut)?']]) +
  box('Escala para responder', '<p>sehr gut · gut · ein bisschen · nicht so gut · gar nicht</p>') +
  ph('Frases con können (redacción propia)', R_KANN);

/* ====================== NIVEL B: wollen ====================== */
const R_WILL = [
  ['Ich will Deutsch lernen.', 'Quiero aprender alemán.'], ['Was willst du in den Ferien machen?', '¿Qué quieres hacer en las vacaciones?'], ['Ich will Freunde treffen.', 'Quiero ver a mis amigos.'],
  ['Ich will nicht früh aufstehen.', 'No quiero levantarme temprano.'], ['Wollen wir Fahrrad fahren?', '¿Vamos en bicicleta? (¿queremos...?)'], ['Wollen wir schwimmen gehen?', '¿Vamos a nadar?'],
  ['Er will einen Kurs machen.', 'Él quiere hacer un curso.'], ['Wir wollen im Park joggen.', 'Queremos trotar en el parque.'], ['Wollt ihr mitkommen?', '¿Quieren venir (ustedes)?'],
  ['Sie will am Wochenende lange schlafen.', 'Ella quiere dormir mucho el fin de semana.'], ['Ich will Gitarre spielen lernen.', 'Quiero aprender a tocar la guitarra.'], ['Ja, super!', '¡Sí, genial!'],
  ['Nein, nicht so gern.', 'No, no tanto (no me apetece mucho).'], ['Gute Idee!', '¡Buena idea!'], ['Ich will einen Anti-Stress-Kurs machen.', 'Quiero hacer un curso antiestrés.']
];
function genL7Will() {
  const M = maker('l7will');
  const out = phraseQs('l7will', R_WILL, 'Frases con wollen').concat(conjQuestions('l7will', ['wollen']));
  [['Ich', 'will'], ['Du', 'willst'], ['Er', 'will'], ['Wir', 'wollen'], ['Ihr', 'wollt'], ['Sie (ellos)', 'wollen'], ['Mein Bruder', 'will'], ['Lara und Lili', 'wollen']].forEach((s, i) => {
    const a = [['einen Computerkurs machen', 'hacer un curso de computación'], ['Spanisch lernen', 'aprender español'], ['Kuchen backen', 'hornear un pastel'], ['ins Kino gehen', 'ir al cine'], ['Tennis spielen', 'jugar tenis'], ['nach Hause fahren', 'ir a casa'], ['Klavier spielen', 'tocar el piano'], ['im Park grillen', 'asar en el parque']][i];
    out.push(M.ty(s[0] + ' ___ ' + a[0] + '. (wollen)', s[1], s[0] + ' → ' + s[1] + '. ' + MODAL_WHY.wollen, 'wollen'));
    const words = a[0].split(' ');
    out.push(M.bd('Quiero ' + a[1] + '.', ['Ich', 'will'].concat(words), 'wollen + infinitivo al final: Ich will ... ' + words[words.length - 1] + '.'));
  });
  [['Am Wochenende', 'el fin de semana'], ['In den Ferien', 'en las vacaciones'], ['Morgen', 'mañana'], ['Heute Abend', 'hoy en la noche']].forEach(t => {
    out.push(M.bd(t[1].charAt(0).toUpperCase() + t[1].slice(1) + ' quiero dormir mucho.', t[0].split(' ').concat(['will', 'ich', 'lange', 'schlafen']), 'Inversión: si la frase empieza con el tiempo (' + t[0] + '), el modal sigue en la posición 2 y el sujeto va después: ' + t[0] + ' will ich lange schlafen.', [['Ich', 'will'].concat(t[0].toLowerCase().split(' '), ['lange', 'schlafen'])]));
  });
  out.push(M.mc('«Wollen wir ins Kino gehen?» ¿Qué expresa?', 'Una propuesta: ¿vamos al cine?', ['Una orden', 'Un deseo de otra persona', 'Que ya fueron al cine'], 'Wollen wir ...? = propuesta (Vorschlag), como «¿vamos a...?». Respuestas: Ja, super! / Gute Idee! / Nein, nicht so gern.', 'Frases'));
  out.push(M.mc('¿Qué diferencia hay entre «Ich möchte...» y «Ich will...»?', 'will expresa un deseo más fuerte y directo; möchte es más cortés', ['Son lo mismo y suenan igual de corteses', 'möchte es pasado de will', 'will solo se usa con comida'], 'El libro llama a wollen «starker Wunsch» (deseo fuerte). Para pedir en un café se usa möchte: Ich möchte einen Kaffee.', 'wollen'));
  out.push(M.mc('¿Qué forma es correcta? «Du ___ Ski fahren.»', 'willst', ['wills', 'wollst', 'will'], 'du willst. ich/er will, du willst.', 'wollen'));
  out.push(M.mc('¿Qué forma es correcta? «Er ___ Hula-Hoop lernen.»', 'will', ['willt', 'wollt', 'wollen'], 'er will, sin -t (igual que ich will).', 'wollen'));
  out.push(M.mc('Respuesta cortés negativa a «Wollen wir joggen?»', 'Nein, nicht so gern.', ['Ja, super!', 'Gute Idee!', 'Doch!'], 'Nein, nicht so gern = no, no me apetece mucho.', 'Frases'));
  out.push(M.ty('Completa: «Was ___ du in den Ferien machen?» (wollen)', 'willst', 'du willst. W-Frage: Was (1) willst (2) du ... machen (final)?', 'wollen'));
  out.push(M.bd('¿Qué quieres hacer en las vacaciones?', ['Was', 'willst', 'du', 'in', 'den', 'Ferien', 'machen'], 'W-Frage con modal: Was (1) willst (2) ... machen (final).'));
  out.push(M.bd('¿Vamos a nadar?', ['Wollen', 'wir', 'schwimmen', 'gehen'], 'Propuesta: Wollen wir ...? con el infinitivo al final.'));
  return out;
}
LESSONS.l7will = () => box('wollen: deseos fuertes y propuestas', '<p><b>wollen</b> = querer (un deseo fuerte y decidido). Como <b>können</b>, va en la posición 2 y el otro verbo en infinitivo al final. <b>Wollen wir ...?</b> sirve para proponer algo.</p>') +
  conjTable(['wollen']) +
  tbl(['Posición 1', 'Posición 2 (modal)', 'Resto', 'Final'], [['Ich', '<b>will</b>', 'das so gern wieder', '<b>lernen</b>.'], ['Am Wochenende', '<b>will</b>', 'ich lange', '<b>schlafen</b>.'], ['<b>Wollen</b>', 'wir', 'Fahrrad', '<b>fahren</b>?']]) +
  box('können y wollen comparados', tbl(['', 'können', 'wollen'], [['ich', 'kann', 'will'], ['du', 'kannst', 'willst'], ['er/sie/es', 'kann', 'will'], ['wir', 'können', 'wollen'], ['ihr', 'könnt', 'wollt'], ['sie/Sie', 'können', 'wollen']]) + '<p>Truco: en ich y er/sie/es la forma es idéntica y no lleva terminación.</p>') +
  ph('Frases con wollen (redacción propia)', R_WILL);

/* ====================== NIVEL C: Perfekt con haben ====================== */
function genL7PerfH() {
  const M = maker('l7perfh');
  const out = [];
  PART.filter(x => x[2] === 'haben').forEach((x, i) => {
    const s = SUBJ[i % 6];
    out.push(M.ty('Participio (Partizip II) de «' + x[0] + '» (' + x[3] + '):', x[1], partWhy(x), 'Participio'));
    const wrong = [x[1].replace(/^ge/, ''), 'ge' + x[0].replace(/en$/, '') + (x[4] === 'ge...en' ? 't' : 'en'), x[0]].filter(w => w !== x[1]);
    out.push(M.mc('¿Cuál es el participio de «' + x[0] + '»?', x[1], wrong, partWhy(x), 'Participio'));
    out.push(M.ty(s[0].charAt(0).toUpperCase() + s[0].slice(1) + ' ___ gestern ' + (x[0] === 'kosten' ? 'viel' : '...') + ' ' + x[1] + '. (haben, Perfekt)', HABEN_F[i % 6], 'Perfekt = haben conjugado (posición 2) + participio al final. Con «' + s[0] + '»: ' + HABEN_F[i % 6] + '. ' + partWhy(x), 'Perfekt'));
  });
  const SENT = [
    ['Ayer jugué fútbol.', ['Ich', 'habe', 'gestern', 'Fußball', 'gespielt'], [['Gestern', 'habe', 'ich', 'Fußball', 'gespielt']]],
    ['Walter compró un aro nuevo.', ['Walter', 'hat', 'einen', 'neuen', 'Reifen', 'gekauft'], []],
    ['¿Ya desayunaste?', ['Hast', 'du', 'schon', 'gefrühstückt'], []],
    ['Hemos aprendido mucho.', ['Wir', 'haben', 'viel', 'gelernt'], []],
    ['¿Qué hiciste el viernes?', ['Was', 'hast', 'du', 'am', 'Freitag', 'gemacht'], []],
    ['Ella escribió un correo.', ['Sie', 'hat', 'eine', 'E-Mail', 'geschrieben'], []],
    ['Ayer vi a mis amigos.', ['Gestern', 'habe', 'ich', 'Freunde', 'getroffen'], [['Ich', 'habe', 'gestern', 'Freunde', 'getroffen']]],
    ['Encontré una foto.', ['Ich', 'habe', 'ein', 'Foto', 'gefunden'], []],
    ['¿Ustedes cocinaron?', ['Habt', 'ihr', 'gekocht'], []],
    ['El domingo dormí mucho.', ['Am', 'Sonntag', 'habe', 'ich', 'lange', 'geschlafen'], [['Ich', 'habe', 'am', 'Sonntag', 'lange', 'geschlafen']]],
    ['Antes practicaba hula-hoop muy seguido.', ['Ich', 'habe', 'früher', 'oft', 'Hula-Hoop', 'geübt'], [['Früher', 'habe', 'ich', 'oft', 'Hula-Hoop', 'geübt']]],
    ['Tim habló por teléfono con Lara.', ['Tim', 'hat', 'mit', 'Lara', 'telefoniert'], []],
    ['¿Comiste a mediodía?', ['Hast', 'du', 'Mittag', 'gegessen'], []],
    ['Trabajé de dos a cuatro.', ['Ich', 'habe', 'von', 'zwei', 'bis', 'vier', 'gearbeitet'], []]
  ];
  SENT.forEach(s => out.push(M.bd(s[0], s[1], 'Perfekt im Satz (p. 90): haben conjugado en la posición 2 (o 1 en la pregunta de sí/no) y el participio al final.', s[2])));
  out.push(M.mc('¿Cómo se forma el Perfekt?', 'haben o sein conjugado + participio al final', ['participio + haben al final', 'solo el participio', 'werden + infinitivo'], 'Ich habe Fußball gespielt. Ich bin nach Hause gegangen.', 'Perfekt'));
  out.push(M.mc('¿Para qué se usa el Perfekt al hablar?', 'Para contar lo que pasó (pasado)', ['Para el futuro', 'Para dar órdenes', 'Para deseos corteses'], 'En la conversación diaria el alemán usa el Perfekt para el pasado: Gestern habe ich gearbeitet.', 'Perfekt'));
  out.push(M.mc('¿Cuál participio NO lleva ge-?', 'telefoniert', ['gespielt', 'gekauft', 'gelernt'], 'Los verbos en -ieren no llevan ge-: telefoniert, fotografiert, studiert.', 'Participio'));
  out.push(M.mc('¿Qué participio termina en -en?', 'geschrieben', ['gemacht', 'geübt', 'gekauft'], 'Muchos verbos irregulares terminan en -en: geschrieben, gesprochen, getrunken, getroffen, gefunden.', 'Participio'));
  out.push(M.mc('¿Por qué «gearbeitet» lleva -et y no solo -t?', 'Porque la raíz arbeit- termina en -t', ['Porque es irregular', 'Porque va con sein', 'Porque es separable'], 'Igual que en presente (du arbeitest): ge + arbeit + et.', 'Participio'));
  out.push(M.mc('«Das hat richtig Spaß gemacht.» significa:', 'Eso fue muy divertido.', ['Eso es muy divertido.', 'Eso será divertido.', 'Eso no fue divertido.'], 'Spaß machen = ser divertido. En Perfekt: hat ... gemacht.', 'Frases'));
  out.push(M.mc('Merke (p. 90): schreiben → geschrieben, sprechen → gesprochen, trinken → getrunken. ¿Qué cambia?', 'La vocal de la raíz y la terminación -en', ['Nada, son regulares', 'Solo el prefijo ge-', 'Se usa sein'], 'ei → ie (geschrieben), e → o (gesprochen), i → u (getrunken). Se aprenden de memoria.', 'Participio'));
  return out;
}
LESSONS.l7perfh = () => box('El Perfekt: hablar del pasado', '<p>Para contar lo que hiciste se usa el <b>Perfekt</b>: <b>haben</b> (o <b>sein</b>) conjugado en la posición 2 + <b>participio</b> al final.</p>') +
  tbl(['Posición 1', 'Posición 2', 'Resto', 'Final (participio)'], [['Walter', '<b>hat</b>', 'einen Reifen', '<b>gekauft</b>.'], ['Gestern', '<b>habe</b>', 'ich Freunde', '<b>getroffen</b>.'], ['<b>Hast</b>', 'du', 'schon', '<b>gefrühstückt</b>?']]) +
  box('Tres tipos de participio', '<p><b>ge...t</b> (regulares): üben → geübt, machen → gemacht, kaufen → gekauft.<br><b>ge...en</b> (irregulares): treffen → getroffen, finden → gefunden, sprechen → gesprochen, schreiben → geschrieben.<br><b>sin ge-</b> (-ieren): telefonieren → telefoniert.</p>') +
  tbl(['Infinitivo', 'Participio', 'Español'], PART.filter(x => x[2] === 'haben').map(x => [spk(x[0]) + x[0], spk('hat ' + x[1]) + '<b>hat ' + x[1] + '</b><small class="pr">' + pron('hat ' + x[1]) + '</small>', x[3]])) +
  box('haben en presente (auxiliar)', conjTable(['haben']));

/* ====================== NIVEL D: Perfekt con sein y experiencias ====================== */
const R_SCHON = [
  ['Bist du schon mal Ski gefahren?', '¿Ya has esquiado alguna vez?'], ['Ja, schon einmal.', 'Sí, una vez.'], ['Ja, schon öfter.', 'Sí, varias veces.'],
  ['Nein, noch nie.', 'No, nunca.'], ['Hast du schon einmal einen Kurs gemacht?', '¿Ya has hecho alguna vez un curso?'], ['Ich bin heute in die Stadt gegangen.', 'Hoy fui al centro.'],
  ['Am Nachmittag bin ich nach Hause gekommen.', 'En la tarde llegué a casa.'], ['Am Abend bin ich in den Park gefahren.', 'En la noche fui al parque (en bici o coche).'], ['Wir sind nach Italien gefahren.', 'Fuimos a Italia.'],
  ['Wann bist du nach Hause gekommen?', '¿Cuándo llegaste a casa?']
];
function genL7PerfS() {
  const M = maker('l7perfs');
  const out = phraseQs('l7perfs', R_SCHON, 'Experiencias');
  PART.filter(x => x[2] === 'sein').forEach(x => {
    SUBJ.forEach((s, p) => {
      out.push(M.ty(s[0].charAt(0).toUpperCase() + s[0].slice(1) + ' ___ nach Hause ' + x[1] + '. (Perfekt de ' + x[0] + ')', SEIN_F[p], x[0] + ' expresa movimiento de un lugar a otro, así que el auxiliar es sein: ' + s[0] + ' ' + SEIN_F[p] + ' ... ' + x[1] + '.', 'Perfekt con sein'));
    });
    out.push(M.ty('Participio de «' + x[0] + '» (' + x[3] + '):', x[1], partWhy(x), 'Participio'));
  });
  const HS = [['Fußball gespielt', 'hat'], ['nach Berlin gefahren', 'ist'], ['Pizza gegessen', 'hat'], ['in die Stadt gegangen', 'ist'], ['viel gelernt', 'hat'], ['spät nach Hause gekommen', 'ist'], ['mit Lara telefoniert', 'hat'], ['einen Brief geschrieben', 'hat'], ['mit dem Fahrrad gefahren', 'ist'], ['lange geschlafen', 'hat']];
  HS.forEach(h => out.push(M.mc('Walter ___ ' + h[0] + '. ¿hat o ist?', h[1], [h[1] === 'hat' ? 'ist' : 'hat'], h[1] === 'ist' ? 'Movimiento de un lugar a otro (gehen, fahren, kommen) → sein: ist.' : 'No hay movimiento de un lugar a otro → haben: hat. La mayoría de los verbos usan haben.', 'haben o sein')));
  out.push(M.mc('¿Qué verbos de la lección 7 forman el Perfekt con sein?', 'gehen, fahren, kommen', ['machen, kaufen, üben', 'schreiben, sprechen, trinken', 'telefonieren, studieren, fotografieren'], 'Movimiento (• → •): ich bin gegangen, ich bin gefahren, ich bin gekommen.', 'haben o sein'));
  out.push(M.mc('Respuesta a «Bist du schon mal 100 Kilometer Fahrrad gefahren?» si nunca lo hiciste:', 'Nein, noch nie.', ['Ja, schon öfter.', 'Ja, schon einmal.', 'Doch, immer.'], 'noch nie = nunca (hasta ahora). schon einmal = una vez. schon öfter = varias veces.', 'Experiencias'));
  out.push(M.mc('¿Qué significa «schon öfter»?', 'ya varias veces', ['nunca', 'una sola vez', 'todavía no'], 'öfter = varias veces, con cierta frecuencia.', 'Experiencias'));
  out.push(M.mc('«Hast du schon mal ...?» sirve para preguntar:', 'si alguien ha hecho algo alguna vez', ['qué hora es', 'si alguien quiere algo', 'dónde vive alguien'], 'schon mal = schon einmal = alguna vez.', 'Experiencias'));
  out.push(M.bd('Hoy fui al centro.', ['Ich', 'bin', 'heute', 'in', 'die', 'Stadt', 'gegangen'], 'sein (bin) en la posición 2 y el participio gegangen al final.', [['Heute', 'bin', 'ich', 'in', 'die', 'Stadt', 'gegangen']]));
  out.push(M.bd('¿Ya has esquiado alguna vez?', ['Bist', 'du', 'schon', 'mal', 'Ski', 'gefahren'], 'Pregunta de sí/no: Bist (1) ... gefahren (final). Ski fahren usa sein.'));
  out.push(M.bd('Fuimos a Italia.', ['Wir', 'sind', 'nach', 'Italien', 'gefahren'], 'wir sind ... gefahren.'));
  out.push(M.bd('¿Cuándo llegaste a casa?', ['Wann', 'bist', 'du', 'nach', 'Hause', 'gekommen'], 'Wann (1) bist (2) ... gekommen (final).'));
  out.push(M.bd('Nunca he hecho un curso.', ['Ich', 'habe', 'noch', 'nie', 'einen', 'Kurs', 'gemacht'], 'noch nie va después del auxiliar; Kurs es masculino: einen Kurs.'));
  return out;
}
LESSONS.l7perfs = () => box('Perfekt con sein', '<p>Los verbos de <b>movimiento de un lugar a otro</b> (• → •) usan <b>sein</b>: <b>gehen → ist gegangen</b>, <b>fahren → ist gefahren</b>, <b>kommen → ist gekommen</b>. Casi todos los demás usan haben.</p>') +
  tbl(['', 'gehen', 'fahren', 'kommen'], SUBJ.map((s, p) => [s[0], SEIN_F[p] + ' gegangen', SEIN_F[p] + ' gefahren', SEIN_F[p] + ' gekommen'])) +
  box('¿Alguna vez...? (Häufigkeit)', '<p><b>schon einmal / schon mal</b> = alguna vez / una vez · <b>schon öfter</b> = varias veces · <b>noch nie</b> = nunca</p>') +
  ph('Frases (redacción propia)', R_SCHON);

/* ====================== NIVEL E: textos de lectura y consejos para aprender idiomas ====================== */
/* Textos originales escritos para la app, sobre los temas de la lección 7 (historia de Walter, consejos para aprender, small talk). */
const T7_WALTER = 'Walter findet zu Hause ein altes Foto. Auf dem Foto ist er noch ein Kind und spielt mit einem Hula-Hoop-Reifen. Er denkt: Das will ich wieder lernen! Er übt im Wohnzimmer, aber es klappt nicht und eine Vase geht kaputt. Walter ruft Lara an. Sie sagt: Schick mir doch ein Foto! Lara sieht das Foto und lacht: Der Reifen ist zu klein! Walter kauft einen neuen, größeren Reifen und übt im Park weiter. Jetzt kann er es richtig gut.';
const T7_WALTER_ES = 'Walter encuentra en casa una foto vieja. En la foto todavía es un niño y juega con un aro de hula-hoop. Piensa: ¡quiero volver a aprenderlo! Practica en la sala, pero no le sale y se rompe un florero. Walter llama a Lara. Ella le dice: ¡mándame una foto! Lara ve la foto y se ríe: ¡el aro es demasiado pequeño! Walter compra un aro nuevo, más grande, y sigue practicando en el parque. Ahora lo hace muy bien.';
const T7_FORUM = [
  ['Marta', 'Hallo! Ich lerne seit drei Monaten Deutsch. Die Wörter sind schwer und ich vergesse sie immer. Habt ihr Tipps?'],
  ['Kemal', 'Ich lerne Vokabeln im Bus. Jeden Tag zehn Wörter. Das hilft wirklich!'],
  ['Sofía', 'Ich höre Musik auf Deutsch und lese Comics. So lerne ich viel und es macht Spaß.'],
  ['Jonas', 'Such dir einen Tandem-Partner! Du kannst mit ihm chatten, telefonieren oder E-Mails schreiben.'],
  ['Ana', 'Ich sehe Filme auf Deutsch. Am Anfang verstehe ich wenig, aber jetzt verstehe ich immer mehr.']
];
const T7_MAIL = 'Liebe Carla, wie geht es dir? Ich habe lange nicht geschrieben, aber ich hatte viel Arbeit. Am Samstag habe ich lange geschlafen und dann mit meiner Schwester gefrühstückt. Am Nachmittag sind wir in die Stadt gegangen. Wir haben Kaffee getrunken und ein Buch gekauft. Am Sonntag bin ich mit dem Fahrrad zum See gefahren. Das hat richtig Spaß gemacht! Und du? Was hast du am Wochenende gemacht? Viele Grüße, Fernando';
const R_SMALLTALK = [
  ['Wie geht es Ihnen?', '¿Cómo está usted?'], ['Danke, gut. Und Ihnen?', 'Bien, gracias. ¿Y usted?'], ['Es geht.', 'Más o menos.'],
  ['Wie ist das Wetter?', '¿Cómo está el clima?'], ['Schönen Tag noch!', '¡Que tenga un buen día!'], ['Sag mal, ...', 'Oye, ... / Dime, ...'],
  ['Schau mal!', '¡Mira!'], ['Ich finde das sehr wichtig.', 'Me parece muy importante.'], ['Ich finde den Tipp nicht so wichtig.', 'El consejo no me parece tan importante.'],
  ['Gute Idee!', '¡Buena idea!'], ['Ach so.', 'Ah, ya veo.'], ['Ja, das stimmt.', 'Sí, es cierto.']
];
function genL7Read() {
  const M = maker('l7read');
  const out = phraseQs('l7read', R_SMALLTALK, 'Small Talk');
  const W = (q, a, wrong, why) => out.push(M.mc('Texto «Walter y el hula-hoop»: ' + q, a, wrong, why, 'Lectura'));
  W('¿Qué encuentra Walter en casa?', 'una foto vieja', ['un aro nuevo', 'una carta de Lara', 'un florero'], '«Walter findet zu Hause ein altes Foto.» finden = encontrar, alt = viejo.');
  W('¿Qué hace Walter en la foto?', 'juega con un aro de hula-hoop', ['toca la guitarra', 'anda en bicicleta', 'nada en el lago'], '«Auf dem Foto ist er noch ein Kind und spielt mit einem Hula-Hoop-Reifen.»');
  W('¿Qué pasa cuando practica en la sala?', 'se rompe un florero', ['le sale perfecto', 'llega Lara', 'se cae la lámpara'], '«eine Vase geht kaputt» = un florero se rompe.');
  W('¿Qué le dice Lara por teléfono?', 'que le mande una foto', ['que compre otro florero', 'que deje de practicar', 'que vaya al parque'], '«Schick mir doch ein Foto!» schicken = enviar.');
  W('¿Cuál es el problema?', 'el aro es demasiado pequeño', ['el aro es demasiado grande', 'Walter es demasiado viejo', 'la sala es pequeña'], '«Der Reifen ist zu klein!» zu klein = demasiado pequeño.');
  W('¿Dónde sigue practicando Walter?', 'en el parque', ['en la sala', 'en el baño', 'en la oficina'], '«übt im Park weiter» = sigue practicando en el parque.');
  W('¿Cómo termina la historia?', 'Walter ya lo hace muy bien', ['Walter se rinde', 'Lara compra el aro', 'Walter rompe otra cosa'], '«Jetzt kann er es richtig gut.» können = saber hacer.');
  out.push(M.mc('En el texto: «es klappt nicht». ¿Qué significa?', 'no le sale / no funciona', ['no le gusta', 'no tiene tiempo', 'no lo encuentra'], 'klappen (coloquial) = salir bien, funcionar. Sinónimo del libro: funktionieren.', 'Lectura'));
  const F = (q, a, wrong, why) => out.push(M.mc('Foro «Tipps zum Deutschlernen»: ' + q, a, wrong, why, 'Lectura'));
  F('¿Cuál es el problema de Marta?', 'olvida las palabras', ['no tiene libro', 'no le gusta el alemán', 'no tiene internet'], '«Die Wörter sind schwer und ich vergesse sie immer.» vergessen = olvidar.');
  F('¿Dónde aprende Kemal vocabulario?', 'en el autobús', ['en la cama', 'en el parque', 'en la biblioteca'], '«Ich lerne Vokabeln im Bus.»');
  F('¿Cuántas palabras aprende Kemal cada día?', 'diez', ['tres', 'cinco', 'veinte'], '«Jeden Tag zehn Wörter.»');
  F('¿Qué hace Sofía para aprender?', 'escucha música en alemán y lee cómics', ['ve películas', 'chatea con un tándem', 'hace un curso intensivo'], '«Ich höre Musik auf Deutsch und lese Comics.»');
  F('¿Qué recomienda Jonas?', 'buscar un compañero de tándem', ['aprender en el autobús', 'leer el periódico', 'ver películas'], '«Such dir einen Tandem-Partner!» suchen = buscar.');
  F('¿Qué le pasa a Ana con las películas?', 'cada vez entiende más', ['no entiende nada', 'se aburre', 'solo ve cómics'], '«jetzt verstehe ich immer mehr» = ahora entiendo cada vez más.');
  const E = (q, a, wrong, why) => out.push(M.mc('Correo de Fernando: ' + q, a, wrong, why, 'Lectura'));
  E('¿Qué hizo Fernando el sábado por la mañana?', 'durmió mucho y desayunó con su hermana', ['fue al lago', 'trabajó', 'compró un coche'], '«Am Samstag habe ich lange geschlafen und dann mit meiner Schwester gefrühstückt.»');
  E('¿A dónde fueron el sábado en la tarde?', 'al centro de la ciudad', ['al cine', 'a la montaña', 'a Italia'], '«Am Nachmittag sind wir in die Stadt gegangen.» gehen → sind gegangen (sein).');
  E('¿Qué compraron?', 'un libro', ['un aro', 'una bicicleta', 'café para la casa'], '«Wir haben Kaffee getrunken und ein Buch gekauft.»');
  E('¿Cómo fue al lago el domingo?', 'en bicicleta', ['en autobús', 'a pie', 'en barco'], '«mit dem Fahrrad zum See gefahren». fahren → ist gefahren.');
  E('¿Qué verbos del correo van con sein?', 'gehen y fahren', ['schlafen y trinken', 'kaufen y schreiben', 'frühstücken y machen'], 'sind ... gegangen, bin ... gefahren: movimiento de un lugar a otro.');
  out.push(M.ty('Del correo: «Am Samstag ___ ich lange geschlafen.»', 'habe', 'schlafen forma el Perfekt con haben: ich habe geschlafen.', 'Perfekt'));
  out.push(M.ty('Del correo: «Am Sonntag ___ ich zum See gefahren.»', 'bin', 'fahren es movimiento → sein: ich bin gefahren.', 'Perfekt'));
  out.push(M.ty('Del correo: «Das hat richtig Spaß ___.»', 'gemacht', 'Spaß machen → hat Spaß gemacht.', 'Perfekt'));
  const TIPS = [['Wörter lernen', 'aprender palabras'], ['die Sprache hören', 'escuchar el idioma'], ['mit Leuten sprechen', 'hablar con gente'], ['Texte lesen', 'leer textos'], ['Texte schreiben', 'escribir textos'], ['Filme sehen', 'ver películas']];
  TIPS.forEach(t => out.push(M.mc('Consejo para aprender idiomas: «' + t[0] + '» significa:', t[1], sample(TIPS.map(x => x[1]), 3, [t[1]]), t[0] + ' = ' + t[1] + '. Se pronuncia «' + pron(t[0]) + '».', 'Vocabulario')));
  out.push(M.mc('Small Talk en la oficina: ¿qué tema NO se suele tocar en Alemania?', 'el dinero (cuánto gana alguien)', ['el clima', 'la comida', 'las vacaciones'], 'En el Arbeitsbuch (AB 85) se comenta qué temas sirven para el small talk: el clima siempre funciona; el dinero (Geld) no.', 'Small Talk'));
  out.push(M.bd('Aprendo vocabulario en el autobús.', ['Ich', 'lerne', 'im', 'Bus', 'Vokabeln'], 'Verbo en posición 2. im Bus = en el autobús.', [['Im', 'Bus', 'lerne', 'ich', 'Vokabeln']]));
  out.push(M.bd('El consejo me parece importante.', ['Ich', 'finde', 'den', 'Tipp', 'wichtig'], 'finden + acusativo: der Tipp → den Tipp.'));
  out.push(M.bd('Puedes buscar un tándem en internet.', ['Du', 'kannst', 'im', 'Internet', 'einen', 'Tandem-Partner', 'suchen'], 'Modal en posición 2, infinitivo suchen al final.'));
  return out;
}
LESSONS.l7read = () => box('Cómo leer estos textos', '<p>Los textos de este nivel están escritos para la app con el vocabulario de la lección 7. Léelos en voz alta con 🔊 y responde las preguntas de comprensión en «Practicar».</p>') +
  '<h4>1. Walter y el hula-hoop (resumen de la Foto-Hörgeschichte)</h4><div class="card reading"><p>' + spk(T7_WALTER) + T7_WALTER + '</p><p class="es" data-reveal>' + T7_WALTER_ES + '</p></div>' +
  '<h4>2. Foro: consejos para aprender alemán</h4><div class="card reading">' + T7_FORUM.map(f => '<p><b>' + f[0] + ':</b> ' + spk(f[1]) + f[1] + '<br><small class="pr">' + pron(f[1]) + '</small></p>').join('') + '</div>' +
  ph('Traducción del foro', T7_FORUM.map(f => [f[1], ({ Marta: '¡Hola! Aprendo alemán desde hace tres meses. Las palabras son difíciles y siempre las olvido. ¿Tienen consejos?', Kemal: 'Aprendo vocabulario en el autobús. Diez palabras cada día. ¡De verdad ayuda!', 'Sofía': 'Escucho música en alemán y leo cómics. Así aprendo mucho y es divertido.', Jonas: '¡Búscate un compañero de tándem! Puedes chatear, hablar por teléfono o escribirle correos.', Ana: 'Veo películas en alemán. Al principio entiendo poco, pero ahora entiendo cada vez más.' })[f[0]]])) +
  '<h4>3. Un correo en Perfekt</h4><div class="card reading"><p>' + spk(T7_MAIL) + T7_MAIL + '</p><p class="es" data-reveal>Querida Carla: ¿cómo estás? Hace mucho que no escribo, pero tuve mucho trabajo. El sábado dormí mucho y luego desayuné con mi hermana. En la tarde fuimos al centro. Tomamos café y compramos un libro. El domingo fui en bicicleta al lago. ¡Fue muy divertido! ¿Y tú? ¿Qué hiciste el fin de semana? Saludos, Fernando</p></div>' +
  ph('Small Talk en la oficina (Fokus Beruf, AB 85)', R_SMALLTALK);

/* ====================== NIVEL F: hobbys, cursos y frecuencia ====================== */
const R_HOB7 = [
  ['Gitarre spielen', 'tocar la guitarra'], ['Fahrrad fahren', 'andar en bicicleta'], ['Ski fahren', 'esquiar'], ['Kuchen backen', 'hornear pasteles'],
  ['Klavier spielen', 'tocar el piano'], ['Tennis spielen', 'jugar tenis'], ['einen Handstand machen', 'hacer el pino (pararse de manos)'], ['Französisch sprechen', 'hablar francés'],
  ['reiten', 'montar a caballo'], ['malen', 'pintar'], ['singen', 'cantar'], ['fotografieren', 'fotografiar'],
  ['einen Kurs machen', 'hacer un curso'], ['Vokabeln lernen', 'aprender vocabulario'], ['Freunde treffen', 'ver a los amigos'], ['lange schlafen', 'dormir mucho']
];
const R_FREQ = [['immer', 'siempre'], ['meistens', 'casi siempre'], ['oft', 'a menudo'], ['manchmal', 'a veces'], ['nie', 'nunca']];
function genL7Hob() {
  const M = maker('l7hob');
  const out = phraseQs('l7hob', R_HOB7, 'Actividades');
  const K = [['Computerkurs', 'curso de computación'], ['Intensivkurs', 'curso intensivo'], ['Anti-Stress-Kurs', 'curso antiestrés'], ['Theaterkurs', 'curso de teatro'], ['Fotokurs', 'curso de fotografía'], ['Mathematikkurs', 'curso de matemáticas'], ['Kommunikationstraining', 'entrenamiento en comunicación'], ['Psychologiekurs', 'curso de psicología']];
  K.forEach(k => {
    out.push(M.mc('¿Qué es un «' + k[0] + '»?', k[1], sample(K.map(x => x[1]), 3, [k[1]]), k[0] + ' = ' + k[1] + '. Palabra compuesta: la última parte (der Kurs / das Training) da el género.', 'Cursos'));
    out.push(M.mc('¿Qué artículo lleva «' + k[0] + '»?', /Training$/.test(k[0]) ? 'das' : 'der', /Training$/.test(k[0]) ? ['der', 'die'] : ['das', 'die'], 'Palabra compuesta: toma el género de la última parte: ' + (/Training$/.test(k[0]) ? 'das Training' : 'der Kurs') + '.', 'Artículo'));
  });
  R_FREQ.forEach((f, i) => {
    out.push(M.mc('¿Qué significa «' + f[0] + '»?', f[1], sample(R_FREQ.map(x => x[1]), 3, [f[1]]), f[0] + ' = ' + f[1] + '. Escala: immer > meistens > oft > manchmal > nie.', 'Frecuencia'));
    out.push(M.ty('Escribe en alemán: «' + f[1] + '»', f[0], f[0] + ' = ' + f[1] + '.', 'Frecuencia'));
  });
  out.push(M.mc('Ordena de más a menos frecuente:', 'immer, meistens, oft, manchmal, nie', ['oft, immer, nie, meistens, manchmal', 'nie, manchmal, oft, meistens, immer', 'meistens, immer, manchmal, oft, nie'], 'immer (100 %) > meistens > oft > manchmal > nie (0 %).', 'Frecuencia'));
  out.push(M.mc('«gestern» significa:', 'ayer', ['hoy', 'mañana', 'antes'], 'gestern = ayer · heute = hoy · morgen = mañana · früher = antes (en el pasado).', 'Tiempo'));
  out.push(M.mc('«früher» significa:', 'antes (en el pasado)', ['más temprano mañana', 'ahora', 'después'], 'früher = antes, en otra época: Früher habe ich oft Hula-Hoop geübt.', 'Tiempo'));
  out.push(M.mc('«die Ferien» o «der Urlaub»: ¿cuál son las vacaciones escolares?', 'die Ferien', ['der Urlaub', 'die Freizeit', 'das Wochenende'], 'die Ferien (solo plural) = vacaciones escolares o universitarias. der Urlaub = vacaciones del trabajo.', 'Vocabulario'));
  out.push(M.mc('Crucigrama del libro: «senkrecht» y «waagerecht» significan:', 'vertical y horizontal', ['arriba y abajo', 'izquierda y derecha', 'correcto e incorrecto'], 'senkrecht = vertical, waagerecht = horizontal (también en el juego de bingo de la p. 84).', 'Vocabulario'));
  out.push(M.bd('Yo nunca escalo.', ['Ich', 'klettere', 'nie'], 'nie va después del verbo conjugado.'));
  out.push(M.bd('A menudo hago un curso.', ['Ich', 'mache', 'oft', 'einen', 'Kurs'], 'oft después del verbo; Kurs es masculino: einen Kurs.', [['Oft', 'mache', 'ich', 'einen', 'Kurs']]));
  return out;
}
LESSONS.l7hob = () => ph('Actividades y hobbys (pp. 84 y 85)', R_HOB7) +
  box('Cursos (Kursangebot, p. 85)', '<p>der Computerkurs, der Intensivkurs, der Anti-Stress-Kurs, der Theaterkurs, der Fotokurs, der Mathematikkurs, das Kommunikationstraining...</p>') +
  ph('¿Con qué frecuencia?', R_FREQ.map(f => [f[0], f[1]])) +
  wordTable('Tiempo', [['gestern', 'ayer', pron('gestern')], ['heute', 'hoy', pron('heute')], ['morgen', 'mañana', pron('morgen')], ['früher', 'antes (en el pasado)', pron('früher')], ['jetzt', 'ahora', pron('jetzt')]]);

const L7_LEVELS = [
  { id: 'l7kann', group: 'Lección 7', exam: 3, icon: '💪', title: 'können: lo que sé hacer', sub: 'Lección 7 A (p. 84)', cats: [], gen: genL7Kann },
  { id: 'l7will', group: 'Lección 7', exam: 3, icon: '🎯', title: 'wollen: deseos y propuestas', sub: 'Lección 7 B (p. 85)', cats: [], gen: genL7Will },
  { id: 'l7perfh', group: 'Lección 7', exam: 3, icon: '⏪', title: 'Perfekt con haben', sub: 'Lección 7 C (pp. 86, 87 y 90)', cats: [], gen: genL7PerfH },
  { id: 'l7perfs', group: 'Lección 7', exam: 3, icon: '🚲', title: 'Perfekt con sein y «schon mal»', sub: 'Lección 7 D (pp. 88 y 90)', cats: [], gen: genL7PerfS },
  { id: 'l7hob', group: 'Lección 7', exam: 3, icon: '🎸', title: 'Hobbys, cursos y frecuencia', sub: 'Lección 7 A, B, D (pp. 84 a 88)', cats: [], gen: genL7Hob },
  { id: 'l7read', group: 'Lección 7', exam: 3, icon: '📖', title: 'Lectura: aprender idiomas y small talk', sub: 'Lección 7 E (p. 89) y AB 85', cats: [], gen: genL7Read }
];
/* TODO: la página «Zwischendurch mal» de la lección 7 (pp. 92 y 93: película «Ui!» y la canción) no se convirtió en preguntas:
   la letra de la canción está protegida y la película no se puede ver desde el PDF. */
