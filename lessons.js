/* Contenido de las lecciones (pestaña "Aprender") y chuleta */
'use strict';

const cls = a => ({ der: 'm', das: 'n', die: 'f', pl: 'p' }[a]);
const A = (a, w) => '<span class="art ' + cls(a) + '">' + a + '</span> ' + w;
const tbl = (head, rows, extra) => '<div class="tw"><table class="t' + (extra ? ' ' + extra : '') + '"><thead><tr>' + head.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
  rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
const box = (t, body) => '<div class="box"><b>' + t + '</b>' + body + '</div>';
const warn = (t, body) => '<div class="box warn"><b>' + t + '</b>' + body + '</div>';
const ex = a => '<ul class="ex">' + a.map(x => '<li>' + x + '</li>').join('') + '</ul>';
const de = s => '<span class="de">' + s + '</span>';
const es = s => '<span class="es">' + s + '</span>';

function vocabTable(catKey) {
  const c = CATS[catKey];
  return '<h4>' + c.title + '</h4>' + '<div class="tw"><table class="t voc"><thead><tr><th>Alemán</th><th>Se pronuncia</th><th>Español</th></tr></thead><tbody>' +
    c.items.map(n => '<tr><td>' + A(n.a, '<b>' + n.w + '</b>') + (n.pl ? '<br><small>pl. die ' + n.pl + '</small>' : '') + '</td><td class="pr">' + n.p + '</td><td class="es" data-reveal>' + n.es + '</td></tr>').join('') + '</tbody></table></div>';
}
function wordTable(title, rows) { // rows: [de, es, pron]
  return '<h4>' + title + '</h4><div class="tw"><table class="t voc"><thead><tr><th>Alemán</th><th>Se pronuncia</th><th>Español</th></tr></thead><tbody>' +
    rows.map(r => '<tr><td><b>' + r[0] + '</b></td><td class="pr">' + (r[2] || '') + '</td><td class="es" data-reveal>' + r[1] + '</td></tr>').join('') + '</tbody></table></div>';
}
function conjTable(infs) {
  const head = ['Verbo'].concat(PERSONS);
  const rows = infs.map(inf => {
    const f = conj(inf);
    const base = SEP[inf] ? SEP[inf][1] : inf;
    const reg = conjReg(base).map(x => SEP[inf] ? x + ' ' + SEP[inf][0] : x);
    const v = VERBS.find(x => x[0] === inf);
    return ['<b>' + inf + '</b><br><small>' + (v ? v[1] : '') + '</small>'].concat(f.map((x, i) => x !== reg[i] ? '<span class="irr">' + x + '</span>' : x));
  });
  return tbl(head, rows, 'conj');
}

const LESSONS = {};

LESSONS.rooms = () => box('Cómo estudiar con este curso', '<p>Cada nivel tiene dos partes: <b>Aprender</b> (esta pantalla) y <b>Practicar</b>. Después de cada respuesta verás <b>por qué</b> es correcta. Si fallas una pregunta, vuelve a aparecer en la misma sesión.</p>' +
  '<p>Colores del libro para el género: ' + A('der', 'masculino') + ' · ' + A('das', 'neutro') + ' · ' + A('die', 'femenino') + ' · ' + A('pl', 'plural (siempre «die»)') + '</p>') +
  box('Regla de oro (consejo del libro, p. 54)', '<p>Anota cada sustantivo <b>siempre con su artículo y su color</b>: <span class="art n">das</span> Bad. Aprenderlo suelto, sin artículo, no sirve.</p>') +
  vocabTable('rooms') +
  '<h4>Frases clave de la lección 4 A</h4>' + tbl(['Alemán', 'Español'], [
    ['Wo ist denn die Küche?', '¿Y dónde está la cocina?'],
    ['Hier. / Dort.', 'Aquí. / Allí.'],
    ['Sagen Sie mal, ist hier ein Schlafzimmer?', 'Oiga, ¿hay aquí un dormitorio?'],
    ['Ja, natürlich! Das Schlafzimmer ist dort.', '¡Sí, claro! El dormitorio está allí.'],
    ['Ist das hier das Bad? / Ja, das hier ist das Bad.', '¿Es este el baño? / Sí, este es el baño.'],
    ['Das ist meine Wohnung. / Oh, schön!', 'Este es mi departamento. / ¡Qué bonito!'],
    ['Meine Traumwohnung hat fünf Zimmer.', 'Mi departamento de ensueño tiene cinco cuartos.']
  ]) +
  box('Artículo definido vs indefinido', '<p><b>ein / eine</b> (indefinido) = algo nuevo o cualquiera: <i>ein Balkon, ein Bad, eine Küche</i>.<br><b>der / das / die</b> (definido) = algo ya conocido o señalado: <i>der Balkon, das Bad, die Küche</i>.</p>');

LESSONS.furniture = () => box('Agrupación del libro (p. 50)', tbl(['Möbel', 'Elektrogeräte', 'das Bad'], [[
  [A('der', 'Schrank'), A('das', 'Sofa'), A('der', 'Tisch'), A('der', 'Stuhl'), A('das', 'Bett'), A('der', 'Teppich'), A('das', 'Regal'), A('der', 'Sessel')].join('<br>'),
  [A('die', 'Lampe'), A('der', 'Fernseher'), A('der', 'Kühlschrank'), A('die', 'Waschmaschine'), A('der', 'Herd')].join('<br>'),
  [A('die', 'Dusche'), A('die', 'Badewanne'), A('das', 'Waschbecken')].join('<br>')]])) +
  vocabTable('furniture') + vocabTable('electro') + vocabTable('bath') + vocabTable('desk') +
  box('Plural', '<p>En plural el artículo siempre es <span class="art p">die</span>. Plurales del libro: <i>der Stuhl → die Stühle, der Tisch → die Tische, das Bett → die Betten, das Buch → die Bücher, das Heft → die Hefte, das Zimmer → die Zimmer</i>. «Möbel» (muebles) se usa en plural.</p>') +
  box('Palabras compuestas', '<p>El género lo da la <b>última parte</b>: Kühl<b>schrank</b> → der Schrank → <i>der Kühlschrank</i>; Arbeits<b>zimmer</b> → das Zimmer → <i>das Arbeitszimmer</i>.</p>');

LESSONS.adj = () => wordTable('Adjetivos opuestos (p. 49)', OPP.flatMap(o => [[o[0], o[1], o[2]], [o[3], o[4], o[5]]])) +
  wordTable('Colores (p. 51)', COLORS.map(c => [c[0], c[1], c[2]])) +
  box('hell y dunkel con colores', '<p>Se pegan al color y se escriben juntos: <i>hellrot</i> (rojo claro), <i>dunkelrot</i> (rojo oscuro), <i>dunkelbraun</i>, <i>hellblau</i>.</p>') +
  '<h4>Cuánto: sehr y nicht</h4>' + ex([de('Das Zimmer ist teuer.') + ' ' + es('El cuarto es caro.'), de('Das Zimmer ist <b>sehr</b> teuer.') + ' ' + es('Muy caro.'), de('Das Zimmer ist <b>nicht</b> teuer.') + ' ' + es('No es caro.'), de('Es kostet 150 Euro.') + ' ' + es('Cuesta 150 euros.')]) +
  '<h4>Preguntar por características</h4>' + tbl(['Pregunta', 'Respuesta'], [
    ['Wie ist dein Zimmer?', 'Es ist teuer / nicht teuer / sehr teuer.'],
    ['Wie groß ist das Bett?', 'Sechzig mal hundertzwanzig Zentimeter.'],
    ['Wie lang / breit / hoch ist der Tisch?', 'Ungefähr / Genau zwei Meter.'],
    ['Welche Farbe hat der Tisch?', 'Er ist dunkelbraun.']
  ]) +
  '<h4>Gefallen: ¿te gusta?</h4>' + tbl(['Pregunta', 'Respuestas (de menos a más)'], [
    ['Wie gefällt dir / Ihnen <b>der Tisch</b>?', 'Nicht so gut. · Es geht. · Gut. / Ganz gut. · Sehr gut.'],
    ['Wie gefallen dir / Ihnen <b>die Betten</b>?', 'Igual, pero con el verbo en plural.']
  ]) +
  box('gefällt o gefallen', '<p>El verbo concuerda con <b>lo que te gusta</b>: un objeto → <i>gefällt</i>; varios → <i>gefallen</i>. dir = informal (a ti), Ihnen = formal (a usted).</p>');

LESSONS.numbers = () => '<h4>Los números grandes (p. 52)</h4>' + tbl(['Número', 'Alemán', 'Se pronuncia'], NUMS.map(n => [n[0].toLocaleString('de-DE'), '<b>' + n[1] + '</b>', n[2]])) +
  box('Cómo se arman', '<p>Todo junto y sin «y» entre centenas y el resto: <i>350 = dreihundertfünfzig</i>. Las unidades van antes que las decenas: <i>588 = fünfhundert-acht-und-achtzig</i>. En alemán el <b>punto</b> separa los miles: 1.000 = tausend.</p>') +
  tbl(['Abreviatura', 'Significa'], [['cm', 'Zentimeter'], ['qm / m²', 'Quadratmeter (metro cuadrado)'], ['Zi.', 'Zimmer'], ['Whg.', 'Wohnung'], ['ca.', 'circa (aproximadamente)'], ['Tel.', 'Telefon'], ['Euro im Monat', 'euros al mes']]) +
  box('Medidas', '<p>60 cm x 120 cm = <i>sechzig mal hundertzwanzig Zentimeter</i> («mal» = por).</p>');

LESSONS.art = () => '<h4>1. Artículo definido (p. 54)</h4>' + tbl(['', 'Hier ist / sind ...', 'definiter Artikel'], [
  ['Singular', 'Hier ist', A('der', 'Balkon')], ['', 'Hier ist', A('das', 'Bad')], ['', 'Hier ist', A('die', 'Küche')], ['Plural', 'Hier sind', A('pl', 'Kinderzimmer') + ' (die)']]) +
  '<h4>Artículo indefinido</h4>' + tbl(['indefiniter Artikel', 'definiter Artikel'], [['ein Balkon', A('der', 'Balkon')], ['ein Bad', A('das', 'Bad')], ['eine Küche', A('die', 'Küche')], ['Plural: sin artículo (Tomaten)', A('pl', 'Tomaten') + ' (die)']]) +
  '<h4>2. Pronombres personales (p. 54)</h4>' + tbl(['Wo ist ...?', 'Respuesta'], [
    [A('der', 'Balkon') + '?', '<b>Er</b> ist dort.'], [A('das', 'Bad') + '?', '<b>Es</b> ist dort.'], [A('die', 'Küche') + '?', '<b>Sie</b> ist dort.'], ['Wo sind ' + A('pl', 'Kinderzimmer') + '?', '<b>Sie</b> sind dort.']]) +
  box('Truco visual del libro', '<p>der → <b>er</b> · das → <b>es</b> · die → <b>sie</b>. En alemán incluso las cosas se llaman «él», «ello» o «ella» según su género.</p>') +
  '<h4>Los pronombres de persona</h4>' + tbl(['Pronombre', 'Español'], [['ich', 'yo'], ['du', 'tú'], ['er / sie / es', 'él / ella / ello'], ['wir', 'nosotros'], ['ihr', 'ustedes (informal) / vosotros'], ['sie', 'ellos / ellas'], ['Sie (mayúscula)', 'usted / ustedes (formal)']]) +
  warn('Cuidado', '<p><b>sie</b> puede ser «ella», «ellos» o «ellas». Se distingue por el verbo: <i>sie ist</i> (ella), <i>sie sind</i> (ellos). <b>Sie</b> con mayúscula es formal.</p>');

LESSONS.neg = () => '<h4>3. Negación (p. 54)</h4>' + tbl(['Ejemplo', 'Con qué se niega'], [
  ['Der Stuhl ist <b>nicht</b> schön.', 'adjetivo: nicht'], ['Walter wohnt <b>nicht</b> hier.', 'verbo / lugar: nicht'], ['Sie haben <b>keine</b> Möbel.', 'sustantivo sin artículo o con ein-: kein-']]) +
  box('Regla simple', '<p><b>kein-</b> reemplaza a <i>ein / eine</i> o a la ausencia de artículo (no + sustantivo). <b>nicht</b> niega todo lo demás: verbos, adjetivos, lugares, horas y también «el + sustantivo».</p>') +
  tbl(['Afirmativo', 'Negativo'], [['ein Balkon', 'kein Balkon'], ['ein Bad', 'kein Bad'], ['eine Küche', 'keine Küche'], ['Möbel / Tomaten (plural)', 'keine Möbel / keine Tomaten']]) +
  box('Posición de nicht', '<p>Normalmente va <b>después del verbo</b> y antes del adjetivo o de «gern»: <i>Ich stehe nicht gern früh auf.</i> Con frase de «el + sustantivo»: <i>Haben wir den Käse nicht dabei?</i></p>');

LESSONS.verbs = () => '<h4>5. Conjugación (pp. 66 y 78)</h4>' + box('Verbo regular', '<p>raíz + <b>-e, -st, -t, -en, -t, -en</b><br>spielen → spiel<b>e</b>, spiel<b>st</b>, spiel<b>t</b>, spiel<b>en</b>, spiel<b>t</b>, spiel<b>en</b></p>') +
  conjTable(['spielen', 'machen', 'kochen', 'schreiben', 'telefonieren', 'wohnen', 'lernen', 'hören', 'gehen', 'kommen', 'trinken', 'tanzen', 'wandern']) +
  box('Raíz en -t / -d: se añade -e', '<p>arbeiten → du arbeit<b>e</b>st, er arbeit<b>e</b>t, ihr arbeit<b>e</b>t. También: finden → er findet; kosten → es kostet.</p>') +
  conjTable(['arbeiten', 'finden', 'kosten']) +
  box('Verbos con cambio de vocal (solo du y er/sie/es)', '<p>e → i / ie y a → ä. Mira las formas en color: <span class="irr">así</span> se marcan las irregulares.</p>') +
  conjTable(['lesen', 'treffen', 'nehmen', 'essen', 'sprechen', 'fahren', 'schlafen']) +
  box('möchte (querer, cortés)', '<p>ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie möchten.</p>') +
  conjTable(['möchten', 'haben', 'sein']) +
  box('Reglas de bolsillo', '<ul><li>wir y sie/Sie = infinitivo (siempre).</li><li>El cambio de vocal solo ocurre en <b>du</b> y <b>er/sie/es</b>.</li><li>essen: du <b>isst</b> (una sola s).</li><li>tanzen: du <b>tanzt</b> (raíz en z).</li></ul>') +
  wordTable('Verbos de las lecciones 4 a 6', VERBS.map(v => [v[0], v[1], v[2]]));

LESSONS.teacher = () => box('Los verbos que pidió la maestra', '<p>Jugar, ver televisión, cocinar, trabajar, hacer un picnic, hablar por teléfono, ir de compras, escribir y hacer la tarea.</p>') +
  tbl(['Español', 'Alemán', 'Ejemplo'], [
    ['jugar (fútbol)', '<b>Fußball spielen</b>', 'Ich spiele von fünf bis sechs Fußball.'],
    ['ver televisión', '<b>fernsehen</b> (separable)', 'Sie sieht fern.'],
    ['cocinar', '<b>kochen</b>', 'Lara kocht das Abendessen.'],
    ['trabajar', '<b>arbeiten</b>', 'Ich arbeite gern. / Du arbeitest viel.'],
    ['hacer un picnic', '<b>ein Picknick machen</b>', 'Wir machen ein Picknick.'],
    ['hablar por teléfono', '<b>telefonieren</b>', 'Tim telefoniert.'],
    ['ir de compras', '<b>einkaufen</b> (separable)', 'Lara kauft im Supermarkt ein.'],
    ['escribir', '<b>schreiben</b>', 'Lara schreibt eine Nachricht an Tim.'],
    ['hacer la tarea', '<b>Hausaufgaben machen</b>', 'Ich mache Hausaufgaben.']
  ]) +
  '<h4>Conjugación completa</h4>' + conjTable(['spielen', 'fernsehen', 'kochen', 'arbeiten', 'machen', 'telefonieren', 'einkaufen', 'schreiben']) +
  box('Verbos separables (p. 66)', '<p>El verbo se parte: el prefijo va <b>al final</b> de la frase. <i>aufräumen → Ich räume mein Zimmer auf.</i> <i>aufstehen → Lara steht früh auf.</i> <i>einkaufen → Lara kauft im Supermarkt ein.</i> También: anrufen, fernsehen, anfangen.</p>') +
  conjTable(['aufräumen', 'aufstehen', 'anrufen', 'anfangen']) +
  '<h4>Más frases del libro</h4>' + ex([de('Ich räume mein Zimmer auf.'), de('Lara steht früh auf.'), de('Sofia ruft ihre Familie an.'), de('Wir sehen gern fern.'), de('Mit Lili spielen.'), de('Ins Bett gehen.')]);

LESSONS.order = () => '<h4>La posición del verbo (p. 66)</h4>' + tbl(['Posición 1', 'Posición 2 (verbo)', 'Resto', 'Final'], [
  ['Ich', '<b>räume</b>', 'mein Zimmer', '<b>auf</b>.'], ['Lara', '<b>steht</b>', 'früh', '<b>auf</b>.'], ['Lara', '<b>kauft</b>', 'im Supermarkt', '<b>ein</b>.'], ['Am Nachmittag', '<b>macht</b>', 'Robert Sport', ''], ['Robert', '<b>macht</b>', 'am Nachmittag Sport', '']]) +
  box('Tres reglas que cubren casi todo', '<ol><li><b>Frase normal:</b> el verbo conjugado va en la posición 2 (aunque empieces con el tiempo: <i>Am Nachmittag macht Robert Sport</i>).</li><li><b>Pregunta de sí/no:</b> verbo en la posición 1: <i>Stehst du gern früh auf? Möchtest du ein Würstchen?</i></li><li><b>Pregunta con Wann, Wo, Wie, Was:</b> palabra interrogativa (1), verbo (2): <i>Wann fängt der Kurs an?</i></li></ol>') +
  box('Verbos separables', '<p>El prefijo siempre va <b>al final</b>: <i>Wann fängt die Party denn an? Um sieben Uhr.</i></p>') +
  tbl(['Orden típico', 'Ejemplo'], [['Quién + verbo + cuándo + qué', 'Ich mache am Freitag eine Party.'], ['Cuándo + verbo + quién + qué', 'Am Freitag mache ich eine Party.'], ['Negación', 'Ich stehe nicht gern früh auf.']]) +
  warn('Cuidado con «gern» y «nicht»', '<p>Afirmativo: <i>Ich tanze gern.</i> Negativo: <i>Ich tanze nicht gern.</i> El «nicht» va antes de «gern».</p>');

LESSONS.time = () => '<h4>La hora (pp. 61 y 67)</h4>' + tbl(['Se escribe', 'Hora cotidiana (privat)', 'Hora oficial'], [
  ['01:00 / 13:00', 'ein Uhr / eins', 'ein Uhr / dreizehn Uhr'], ['01:15 / 13:15', 'Viertel nach eins', 'ein Uhr fünfzehn / dreizehn Uhr fünfzehn'], ['01:30 / 13:30', 'halb zwei', 'ein Uhr dreißig / dreizehn Uhr dreißig'], ['01:45 / 13:45', 'Viertel vor zwei', 'ein Uhr fünfundvierzig / dreizehn Uhr fünfundvierzig']]) +
  box('La trampa de «halb»', '<p>halb = media hora <b>hacia</b> la siguiente hora. <b>halb neun = 8:30</b> (no 9:30). halb eins = 12:30.</p>') +
  tbl(['Minutos', 'Se dice', 'Ejemplo con las 8'], [['0', '... Uhr', 'acht Uhr'], ['5', 'fünf nach', 'fünf nach acht (8:05)'], ['10', 'zehn nach', 'zehn nach acht'], ['15', 'Viertel nach', 'Viertel nach acht (8:15)'], ['20', 'zwanzig nach', 'zwanzig nach acht'], ['25', 'fünf vor halb (siguiente)', 'fünf vor halb neun (8:25)'], ['30', 'halb (siguiente)', 'halb neun (8:30)'], ['35', 'fünf nach halb (siguiente)', 'fünf nach halb neun (8:35)'], ['40', 'zwanzig vor (siguiente)', 'zwanzig vor neun (8:40)'], ['45', 'Viertel vor (siguiente)', 'Viertel vor neun (8:45)'], ['50', 'zehn vor (siguiente)', 'zehn vor neun'], ['55', 'fünf vor (siguiente)', 'fünf vor neun']]) +
  box('Hora oficial', '<p>Radio, TV, anuncios, horarios: reloj de 24 h. <i>08:30 = acht Uhr dreißig</i>, <i>19:00 = neunzehn Uhr</i>. No se usa halb ni Viertel.</p>') +
  '<h4>Frases para preguntar y responder</h4>' + tbl(['Pregunta', 'Respuesta'], [
    ['Wie spät ist es (jetzt)?', '(Es ist) Sieben / Neunzehn Uhr. / Acht Uhr dreißig. / halb neun.'], ['Ist es schon zwölf?', 'Nein. Es ist erst Viertel vor zwölf.'], ['', 'Es ist kurz vor zwölf. / gleich zwölf.'], ['', 'Es ist kurz nach zwölf.'], ['Um wie viel Uhr gehst du ins Bett?', 'Um elf Uhr. / Um halb elf.']]) +
  wordTable('Vocabulario de la hora', [['die Uhr', 'reloj / hora', 'ur'], ['das Viertel', 'cuarto', 'fír-tel'], ['halb', 'medio / media', 'jalp'], ['vor', 'antes de / faltan', 'for'], ['nach', 'después de', 'naj'], ['kurz', 'poco / casi', 'kurts'], ['gleich', 'enseguida / justo', 'glaij'], ['schon', 'ya', 'shon'], ['erst', 'apenas / solo', 'ierst']]);

LESSONS.when = () => vocabTable('days') +
  '<h4>Preposiciones de tiempo (pp. 62, 63 y 66)</h4>' + tbl(['¿Cuándo?', 'Usa', 'Ejemplos'], [
    ['Día / parte del día', '<b>am</b>', 'am Montag, am Morgen, am Vormittag, am Mittag, am Nachmittag, am Abend, am Wochenende'],
    ['<b>Excepción</b>', '<b>in der</b>', 'in der Nacht'],
    ['Hora exacta', '<b>um</b>', 'um zehn Uhr, um Viertel vor acht, um halb neun'],
    ['De ... a ...', '<b>von ... bis ...</b>', 'von Montag bis Freitag, von neun bis fünf (Uhr)']]) +
  box('«Todos los...»', '<p>jeden Tag · jeden Morgen · jeden Abend · <b>jede</b> Nacht (Nacht es femenino).</p>') +
  tbl(['Pregunta', 'Significa'], [['Wie spät ist es?', '¿Qué hora es?'], ['Um wie viel Uhr ...?', '¿A qué hora ...?'], ['Wann ...?', '¿Cuándo ...?'], ['Wann ist die Bibliothek geöffnet?', '¿Cuándo está abierta la biblioteca? (von ... bis ...)']]) +
  '<h4>Horario de Tim (p. 62)</h4>' + ex([de('Wann spielt Tim Fußball? Am Dienstag um fünf Uhr.'), de('Am Samstag + am Sonntag = am Wochenende.'), de('Von Montag bis Freitag von acht bis fünf Uhr.')]) +
  wordTable('Aperturas', [['geöffnet', 'abierto', 'ge-öf-net'], ['geschlossen', 'cerrado', 'ge-shló-sen'], ['täglich', 'diario', 'té-glij']]);

LESSONS.acc = () => '<h4>Akkusativ (p. 78)</h4>' + box('Idea central', '<p>Con verbos como <b>haben, nehmen, kaufen, essen, trinken, machen</b> el objeto va en <b>acusativo</b>. Solo cambia el <b>masculino</b>: <b>der → den</b>, <b>ein → einen</b>, <b>kein → keinen</b>. Neutro, femenino y plural quedan igual. Con <b>sein</b> (ist/sind) se usa el nominativo.</p>') +
  '<h4>1. Artículo definido</h4>' + tbl(['', 'Nominativo (Wo ist ...?)', 'Akkusativ (Ich habe ...)'], [
    ['Singular', A('der', 'Käse') + '?', '<span class="art m">den</span> Käse.'], ['', A('das', 'Würstchen') + '?', A('das', 'Würstchen') + '.'], ['', A('die', 'Cola') + '?', A('die', 'Cola') + '.'], ['Plural', A('pl', 'Tomaten') + '?', A('pl', 'Tomaten') + '.']]) +
  '<h4>2. Artículo indefinido</h4>' + tbl(['', 'Nominativo (Ist das ...?)', 'Akkusativ (Ich habe ...)'], [
    ['Singular', 'ein Käse?', '<b>einen</b> Käse.'], ['', 'ein Würstchen?', 'ein Würstchen.'], ['', 'eine Cola?', 'eine Cola.'], ['Plural', 'Tomaten?', 'Tomaten.']]) +
  '<h4>3. Negación (Negativartikel)</h4>' + tbl(['', 'Nominativo (Das ist ...)', 'Akkusativ (Ich habe ...)'], [
    ['Singular', 'kein Käse.', '<b>keinen</b> Käse.'], ['', 'kein Würstchen.', 'kein Würstchen.'], ['', 'keine Cola.', 'keine Cola.'], ['Plural', 'keine Tomaten.', 'keine Tomaten.']]) +
  ex([de('Hast du den Käse? Ich habe den Käse.'), de('Haben wir keinen Käse?'), de('Ich nehme die Würstchen und einen Apfelsaft.'), de('Ich kaufe den Orangensaft.'), de('Wir machen einen Ausflug / ein Picknick.')]) +
  vocabTable('food');

LESSONS.jandoch = () => '<h4>Ja, nein, doch (p. 78)</h4>' + tbl(['Pregunta', 'Sí', 'No'], [
  ['Möchtest du ein Würstchen?', 'Ja.', 'Nein.'], ['Haben wir den Käse <b>nicht</b> dabei?', '<b>Doch.</b>', 'Nein.'], ['Hast du <b>keinen</b> Hunger mehr?', '<b>Doch.</b>', 'Nein.']]) +
  box('La regla para hispanohablantes', '<p>En español contestas «sí» a todo. En alemán:<br>• Pregunta <b>positiva</b>: <b>Ja</b> (sí) o <b>Nein</b> (no).<br>• Pregunta <b>negativa</b> (con nicht, kein-, nie): <b>Doch</b> si contradices (en español «sí») o <b>Nein</b> si confirmas.</p>') +
  ex([de('Du hast keinen Hund? ... Nein.') + ' ' + es('(Cierto, no tengo.)'), de('Du stehst nicht jeden Tag um sechs auf? ... Doch. Ich stehe um sechs auf.'), de('Spielst du nicht gern Fußball? ... Doch!'), de('Wie bitte? = ¿Cómo? / ¿Perdón?')]);

LESSONS.weather = () => '<h4>El clima (pp. 72 y 79)</h4>' + tbl(['Alemán', 'Español'], [
  ['Wie ist das Wetter?', '¿Cómo está el clima?'], ['Gut. / Schön. / Schlecht. / Nicht so gut.', 'Bien. / Bonito. / Mal. / No tan bien.'], ['Die Sonne scheint.', 'Hace sol.'], ['Es regnet.', 'Llueve.'], ['Es schneit.', 'Nieva.'],
  ['Es ist warm / heiß / kalt.', 'Hace calor / mucho calor / frío.'], ['Es ist windig.', 'Hace viento.'], ['Es ist bewölkt. / Es gibt viele Wolken.', 'Está nublado. / Hay muchas nubes.'], ['Es sind 25 Grad.', 'Hay 25 grados.'], ['+8 °C: acht Grad', 'plus acht Grad'], ['-3 °C: minus drei Grad', 'drei Grad unter Null']]) +
  box('«Es» siempre', '<p>Con el clima el sujeto es <b>es</b> (excepto «die Sonne»). El verbo va en tercera persona: es regnet, es schneit, die Sonne scheint.</p>') +
  box('Estaciones y regiones', '<p><b>im</b> Frühling / Sommer / Herbst / Winter · <b>im</b> Norden / Süden / Osten / Westen · <b>in der</b> Mitte.</p>') + vocabTable('weather');

LESSONS.hobby = () => '<h4>Tiempo libre (pp. 75 y 79)</h4>' + tbl(['Pregunta', 'Respuesta'], [
  ['Was sind deine / Ihre Hobbys?', 'Meine Hobbys sind Lesen und Gitarre spielen.'], ['Was machst du / machen Sie gern in der Freizeit?', 'Ich tanze gern. / Ich schwimme viel. / Ich mache gern Sport.'], ['', 'Ich finde Krimis gut / toll / super / interessant.'], ['', 'Das macht Spaß.'], ['Lieblings...', 'Mein Lieblingsbuch / Lieblingsfilm ist ...  Meine Lieblingsmusik ist ...']]) +
  wordTable('Actividades', [['wandern', 'hacer senderismo', 'ván-dern'], ['schwimmen', 'nadar', 'shví-men'], ['Gitarre spielen', 'tocar guitarra', 'gi-tá-re shpí-len'], ['Freunde treffen', 'ver a los amigos', 'frói-nde tré-fen'], ['Ski fahren', 'esquiar', 'shi fá-ren'], ['joggen', 'correr', 'yó-guen'], ['grillen', 'asar (parrillada)', 'grí-len'], ['tanzen', 'bailar', 'tán-tsen'], ['ein Picknick machen', 'hacer un picnic', 'ain pík-nik má-jen'], ['einen Ausflug machen', 'hacer una excursión', 'ái-nen áus-fluk má-jen'], ['Nachrichten schreiben', 'escribir mensajes', 'náj-rij-ten shrái-ben'], ['fotografieren', 'fotografiar', 'fo-to-gra-fí-ren'], ['telefonieren', 'hablar por teléfono', 'te-le-fo-ní-ren']]) +
  box('gern', '<p>Con <b>gern</b> dices lo que te gusta hacer: <i>Ich tanze gern.</i> Negativo: <i>Ich tanze nicht gern.</i> No existe «gern» para sustantivos: usa «Ich finde ... gut».</p>') +
  conjTable(['lesen', 'treffen', 'fahren', 'schwimmen', 'tanzen']) + vocabTable('free');

LESSONS.food = () => '<h4>Pedir en un puesto (p. 73)</h4>' + tbl(['Alemán', 'Español'], [
  ['Was nimmst du?', '¿Qué vas a tomar?'], ['Ich nehme die Würstchen und einen Apfelsaft.', 'Yo tomo las salchichas y un jugo de manzana.'], ['Ich glaube, ich trinke nur eine Cola.', 'Creo que solo tomo una cola.'], ['Möchtest du ein Würstchen?', '¿Quieres una salchicha?'], ['Haben wir keinen Käse?', '¿No tenemos queso?'], ['Wer kauft die Würstchen und den Orangensaft?', '¿Quién compra las salchichas y el jugo de naranja?']]) +
  box('Estrategias (libro pp. 55, 67 y 79)', '<ul><li><b>Na gut.</b> Bueno, está bien.</li><li><b>Ach nein.</b> Ay, no.</li><li><b>Hm, ...</b> Mmm...</li><li><b>Kein Problem.</b> No hay problema.</li><li><b>Ich weiß nicht.</b> No sé.</li><li><b>Moment mal, ...</b> Un momento...</li><li><b>Gute Idee!</b> ¡Buena idea!</li><li><b>Na prima!</b> ¡Excelente!</li><li><b>Stimmt.</b> Es verdad.</li><li><b>Ich glaube, ...</b> Creo que...</li></ul>') +
  conjTable(['nehmen', 'trinken', 'essen']) + vocabTable('food');

const PRON_GUIDE = tbl(['Se escribe', 'Suena como', 'Ejemplo'], [
  ['ä', 'e abierta', 'hässlich → «jés-lij»'], ['ö', 'e con labios de o', 'schön → «shön»'], ['ü', 'i con labios de u', 'Küche → «kü-je»'], ['ei', 'ai', 'Zimmer, nein, klein → «klain»'], ['eu / äu', 'oi', 'neu → «noi», teuer → «tói-a»'], ['ie', 'i larga', 'Dienstag → «dins-tag»'],
  ['ch (después de e, i, ä, ö, ü)', 'j suave, casi un soplido', 'ich, Küche, Milch'], ['ch (después de a, o, u, au)', 'j fuerte', 'Buch → «buj», Nacht → «najt»'], ['sch', 'sh', 'Schrank → «shrank»'], ['sp / st al inicio', 'shp / sht', 'Stuhl → «shtul»'],
  ['z / tz', 'ts', 'Zimmer → «tsímma»'], ['w', 'v', 'Wohnung → «vó-nung»'], ['v', 'f (casi siempre)', 'vor → «for»'], ['j', 'y', 'jogging → «yó-guen»'], ['s antes de vocal', 'z (zumbido)', 'Sofa → «zó-fa»'], ['ß / ss', 's fuerte', 'groß → «gros»'], ['h al inicio', 'j suave aspirada', 'Haus → «jaus»'], ['-er al final', '«a»', 'Fernseher → «férn-ze-a»'], ['d final', 't', 'Bad → «bat», Herd → «jeat»']]) +
  box('Artículos', '<p>der se dice «dea», die «di», das «das». La sílaba con acento va marcada con tilde en la columna «Se pronuncia».</p><p>Es una pronunciación aproximada. Si tu examen es oral, complementa con el audio del libro.</p>');

if (typeof module !== 'undefined') module.exports = { LESSONS, PRON_GUIDE };
