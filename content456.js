/* Lecciones 4 a 6: lecturas, Zwischendurch, anuncios y niveles intensivos de gramática (temas de la maestra).
   Los textos son resúmenes y ejemplos de redacción propia sobre las páginas del libro indicadas en cada nivel.
   No se copian textos ni letras de canciones del libro. */
'use strict';

/* ====================== LECTURA LECCIÓN 4 ====================== */
const T4_ROOM = 'WG-Zimmer frei! In meiner Wohnung ist ab Juli ein Zimmer frei. Es hat 21 Quadratmeter, ist hell und ruhig und kostet nur 280 Euro im Monat. Im Zimmer sind schon Möbel: ein Bett, ein Schrank, ein Schreibtisch, ein Tisch und zwei Stühle. Küche, Balkon und Bad teilen wir. Im Bad gibt es eine Dusche, aber keine Badewanne. Bitte nicht rauchen!';
const T4_ROOM_ES = '¡Cuarto libre en departamento compartido! En mi departamento queda un cuarto libre a partir de julio. Tiene 21 metros cuadrados, es luminoso y tranquilo y cuesta solo 280 euros al mes. El cuarto ya tiene muebles: una cama, un armario, un escritorio, una mesa y dos sillas. La cocina, el balcón y el baño los compartimos. En el baño hay regadera, pero no tina. ¡Por favor, no fumar!';
const ADS4 = [
  ['Zi.', 'Zimmer', 'cuarto'], ['Whg.', 'Wohnung', 'departamento'], ['qm / m²', 'Quadratmeter', 'metros cuadrados'], ['ca.', 'circa', 'aproximadamente'],
  ['Balk.', 'Balkon', 'balcón'], ['Gart.', 'Garten', 'jardín'], ['EBK', 'Einbauküche', 'cocina integral'], ['NK', 'Nebenkosten', 'gastos adicionales'],
  ['KM', 'Kaltmiete', 'renta sin gastos adicionales'], ['warm', 'Warmmiete', 'renta con calefacción y gastos incluidos'], ['Tel.', 'Telefon', 'teléfono'], ['möbl.', 'möbliert', 'amueblado'],
  ['2 MM Kaution', 'zwei Monatsmieten Kaution', 'depósito de dos meses de renta'], ['ab sof.', 'ab sofort', 'disponible de inmediato'], ['max.', 'maximal', 'máximo'], ['TG', 'Tiefgarage', 'estacionamiento subterráneo']
];
const MY_ADS = [
  { t: '2-Zi.-Whg., ca. 55 qm, Balk., EBK, ab sofort, 640 Euro warm. Tel. 0761/223344', es: 'Departamento de 2 cuartos, unos 55 m², balcón, cocina integral, disponible de inmediato, 640 euros con gastos incluidos.' },
  { t: 'Möbl. Apartment, 28 m², für max. 1 Jahr, 390 Euro + 60 Euro NK, Kaution: 2 Monatsmieten', es: 'Departamento pequeño amueblado, 28 m², por máximo un año, 390 euros más 60 de gastos adicionales; depósito de dos meses.' },
  { t: 'Von privat: helle 4-Zi.-Whg. mit Garten, 3. Stock, 950 Euro + NK, TG-Platz 50 Euro', es: 'De particular: departamento luminoso de 4 cuartos con jardín, tercer piso, 950 euros más gastos; lugar en estacionamiento subterráneo 50 euros.' }
];
function genR4() {
  const M = maker('r4');
  const out = [];
  const Q = (q, a, w, why) => out.push(M.mc(q, a, w, why, 'Lectura'));
  Q('Anuncio «WG-Zimmer frei»: ¿desde cuándo está libre el cuarto?', 'a partir de julio', ['de inmediato', 'desde enero', 'solo en julio'], '«ab Juli» = a partir de julio. ab = a partir de.');
  Q('Anuncio «WG-Zimmer frei»: ¿cuánto mide el cuarto?', '21 metros cuadrados', ['280 metros cuadrados', '12 metros cuadrados', '2 metros cuadrados'], '«Es hat 21 Quadratmeter». 280 es el precio, no el tamaño.');
  Q('Anuncio «WG-Zimmer frei»: ¿cómo es el cuarto?', 'luminoso, tranquilo y barato', ['oscuro y caro', 'grande y ruidoso', 'sin muebles'], 'hell = luminoso, ruhig = tranquilo, nur 280 Euro = barato.');
  Q('Anuncio «WG-Zimmer frei»: ¿cuántas sillas hay?', 'dos', ['tres', 'una', 'ninguna'], '«zwei Stühle».');
  Q('Anuncio «WG-Zimmer frei»: ¿qué hay en el baño?', 'regadera, pero no tina', ['tina y regadera', 'solo tina', 'nada'], '«eine Dusche, aber keine Badewanne».');
  Q('Anuncio «WG-Zimmer frei»: ¿qué se comparte?', 'la cocina, el balcón y el baño', ['el cuarto y la cama', 'solo la cocina', 'el jardín'], '«Küche, Balkon und Bad teilen wir.» teilen = compartir.');
  Q('¿Qué es una «WG» (Wohngemeinschaft)?', 'un departamento compartido entre varias personas', ['un hotel', 'una casa de campo', 'una oficina'], 'WG = Wohngemeinschaft: personas que viven juntas y comparten cocina y baño. Lara vive en una WG en la historia del libro.');
  out.push(M.ty('Corrige: «Das Zimmer ist 280 Quadratmeter groß.» ¿Cuántos son en realidad? Escribe el número.', ['21', 'einundzwanzig'], 'Son 21 m². 280 es la renta en euros.', 'Lectura'));
  out.push(M.ty('Corrige: «Es ist hell, ruhig und teuer.» ¿Qué palabra está mal? Escribe la correcta.', ['billig'], 'El cuarto es barato (billig), no caro (teuer).', 'Lectura'));
  ADS4.forEach(a => {
    out.push(M.mc('En un anuncio de vivienda, ¿qué significa «' + a[0] + '»?', a[1] + ' (' + a[2] + ')', sample(ADS4.map(x => x[1] + ' (' + x[2] + ')'), 3, [a[1] + ' (' + a[2] + ')']), a[0] + ' = ' + a[1] + ' = ' + a[2] + '. Los anuncios abrevian mucho para ahorrar espacio (AB 48).', 'Anuncios'));
  });
  MY_ADS.forEach((ad, i) => {
    out.push(info(M.mc('Lee el anuncio: «' + ad.t + '». ¿Qué dice?', ad.es, MY_ADS.filter((_, j) => j !== i).map(x => x.es).concat(['Casa de 6 cuartos en venta, sin jardín.']), 'Abreviaturas: Zi. = Zimmer, Whg. = Wohnung, NK = Nebenkosten, EBK = Einbauküche, TG = Tiefgarage, möbl. = möbliert.', 'Anuncios'), ad.t, ad.es));
  });
  Q('«Kaution» es:', 'el depósito que se paga al rentar y se devuelve al final', ['la renta de cada mes', 'el precio de compra', 'una multa'], 'die Kaution = depósito de garantía. Suele ser de dos o tres rentas mensuales.');
  Q('«Nebenkosten» son:', 'gastos adicionales: agua, calefacción, basura', ['el precio de los muebles', 'el sueldo', 'la comida'], 'die Nebenkosten (plural): se pagan además de la renta (Kaltmiete).');
  Q('«640 Euro warm» significa:', '640 euros con calefacción y gastos incluidos', ['640 euros sin gastos', 'un departamento con calefacción nueva', 'el precio en verano'], 'warm = Warmmiete (con gastos). kalt = Kaltmiete (sin gastos).');
  Q('«Von privat» en un anuncio significa:', 'lo renta un particular, no una inmobiliaria', ['es un cuarto privado sin baño', 'solo para estudiantes', 'está prohibido'], 'von privat = de particular.');
  /* Foto-Hörgeschichte «Ach so!» (p. 46): solo lo que se ve en las fotos y en el ejemplo del libro.
     TODO: las afirmaciones del ejercicio 3 (p. 47) dependen del audio, que no está en el PDF; no se convirtieron en preguntas. */
  Q('Foto-Hörgeschichte «Ach so!» (p. 46): en el ejemplo del libro, ¿cómo es la lámpara?', 'alt (vieja)', ['neu (nueva)', 'teuer (cara)', 'groß (grande)'], 'El libro marca como ejemplo: «Die Lampe ist alt.» alt ↔ neu.');
  Q('Foto-Hörgeschichte (p. 46): «Wo sind Tim und Lara?» Las opciones del libro son:', 'in Laras Wohnung / in Tims Wohnung', ['im Park / im Kino', 'im Supermarkt / im Café', 'in Berlin / in Wien'], 'in Laras Wohnung = en el departamento de Lara. Escucha el audio del libro para decidir.');
  [['Die Lampe ist', 'alt', 'neu'], ['Das Bad ist', 'groß', 'klein'], ['Laras Zimmer ist', 'hell', 'dunkel'], ['Laras Zimmer ist', 'teuer', 'billig'], ['Die Küche ist', 'schön', 'hässlich']].forEach(x => {
    out.push(M.mc('Opuestos de la p. 46: «' + x[0] + ' ' + x[1] + '». ¿Cuál es el contrario de «' + x[1] + '»?', x[2], ['laut', 'kalt', 'lang'], x[1] + ' ↔ ' + x[2] + '.', 'Adjetivos'));
  });
  out.push(M.bd('El cuarto es luminoso y tranquilo.', ['Das', 'Zimmer', 'ist', 'hell', 'und', 'ruhig'], 'Verbo (ist) en la posición 2.'));
  out.push(M.bd('El departamento cuesta 640 euros al mes.', ['Die', 'Wohnung', 'kostet', '640', 'Euro', 'im', 'Monat'], 'kosten: die Wohnung kostet. im Monat = al mes.'));
  out.push(M.bd('En el baño no hay tina.', ['Im', 'Bad', 'ist', 'keine', 'Badewanne'], 'Badewanne es femenino → keine Badewanne.', [['Im', 'Bad', 'gibt', 'es', 'keine', 'Badewanne']]));
  return out;
}
LESSONS.r4 = () => box('Lectura y anuncios de la lección 4', '<p>Texto escrito para la app sobre el tema de <b>Zwischendurch mal: Zimmer frei!</b> (p. 56) y las abreviaturas de los anuncios de vivienda (pp. 52 y 53, AB 48).</p>') +
  '<h4>Anuncio: WG-Zimmer frei</h4><div class="card reading"><p>' + spk(T4_ROOM) + T4_ROOM + '</p><p class="es" data-reveal>' + T4_ROOM_ES + '</p></div>' +
  '<h4>Abreviaturas de los anuncios</h4>' + tbl(['Abreviatura', 'Palabra completa', 'Español'], ADS4.map(a => ['<b>' + a[0] + '</b>', spk(a[1]) + a[1] + '<small class="pr">' + pron(a[1]) + '</small>', a[2]])) +
  ph('Tres anuncios para practicar', MY_ADS.map(a => [a.t, a.es]));

/* ====================== LECTURA LECCIÓN 5 ====================== */
const BERLIN = [
  ['Berlin Tourist Info', 'Mo–Sa 9.00–20.00 Uhr, So 10.00–18.00 Uhr', 'de lunes a sábado de 9 a 20 h; domingo de 10 a 18 h'],
  ['Café Einstein', 'täglich 8.00–1.00 Uhr', 'todos los días de 8 a 1 de la madrugada'],
  ['Fahrradstation Mitte', 'Mo–Fr 10.00–19.30 Uhr, Sa 10.00–19.00 Uhr', 'de lunes a viernes de 10 a 19:30; sábado de 10 a 19'],
  ['Kinder- und Jugendbibliothek', 'Mo–Fr 15.00–19.00 Uhr, Sa 10.00–19.00 Uhr, an Feiertagen geschlossen', 'lunes a viernes de 15 a 19; sábado de 10 a 19; cerrada los días festivos'],
  ['KaDeWe', 'Mo–Do 10–20 Uhr, Fr 10–21 Uhr, Sa 9.30–20 Uhr', 'lunes a jueves de 10 a 20; viernes de 10 a 21; sábado de 9:30 a 20'],
  ['Brücke Museum', 'täglich 11–17 Uhr, Dienstag geschlossen', 'todos los días de 11 a 17, cerrado el martes'],
  ['Reichstagskuppel', 'täglich 8–24 Uhr, im Moment geschlossen', 'todos los días de 8 a 24, pero ahora está cerrada por limpieza'],
  ['Schifffahrt (Moltkebrücke)', 'Abfahrten 10.30 / 12.45 / 15.00 / 17.15 / 19.30 Uhr', 'salidas a las 10:30, 12:45, 15:00, 17:15 y 19:30']
];
const T5_FRANZI = 'Franziska ist 23 Jahre alt. Sie kommt aus Bodenheim, einem kleinen Ort mit etwa 7000 Einwohnern. Dort hat sie ihren Beruf gelernt: Sie ist Zahnarzthelferin. Jetzt wohnt und arbeitet sie in Mainz. Ihre Wohnung hat ein Zimmer, eine Küche und ein Bad. Sie ist nicht teuer. Franziska klettert gern. Ihr Freund Nicolas ist 24 und studiert Medizin in Göttingen. Göttingen ist 250 Kilometer weit weg, deshalb sehen sie sich nicht so oft.';
const T5_FRANZI_ES = 'Franziska tiene 23 años. Es de Bodenheim, un pueblo pequeño de unos 7000 habitantes. Allí aprendió su profesión: es asistente dental. Ahora vive y trabaja en Maguncia (Mainz). Su departamento tiene un cuarto, una cocina y un baño. No es caro. A Franziska le gusta escalar. Su novio Nicolas tiene 24 años y estudia medicina en Gotinga. Gotinga está a 250 kilómetros, por eso no se ven muy seguido.';
const COMIC5 = [
  ['Um 7.00 Uhr steht er auf und frühstückt.', 'A las 7:00 se levanta y desayuna.'], ['Um 7.45 Uhr fährt er zur Arbeit.', 'A las 7:45 va al trabajo.'],
  ['Von 8.30 bis 17 Uhr arbeitet er.', 'De 8:30 a 17:00 trabaja.'], ['Von 18 bis 19 Uhr geht er spazieren.', 'De 18 a 19 h sale a pasear.'],
  ['Von 20 bis 23 Uhr sieht er fern.', 'De 20 a 23 h ve televisión.'], ['Von 23.30 bis 7.00 Uhr schläft er.', 'De 23:30 a 7:00 duerme.']
];
function genR5() {
  const M = maker('r5');
  const out = [];
  BERLIN.forEach((b, i) => {
    out.push(info(M.mc('Horarios de Berlín (p. 64 y 65): ¿cuándo abre «' + b[0] + '»?', b[2], sample(BERLIN.filter((_, j) => j !== i).map(x => x[2]), 3), b[0] + ': ' + b[1] + '. Mo = Montag, Di = Dienstag, Mi = Mittwoch, Do = Donnerstag, Fr = Freitag, Sa = Samstag, So = Sonntag. täglich = todos los días.', 'Horarios'), b[1], b[2]));
  });
  const Q = (q, a, w, why) => out.push(M.mc(q, a, w, why, 'Lectura'));
  Q('Berlín: ¿qué día está cerrado el Brücke Museum?', 'el martes', ['el lunes', 'el domingo', 'nunca'], '«Dienstag geschlossen» = cerrado el martes.');
  Q('Berlín: ¿se puede subir hoy a la cúpula del Reichstag?', 'No, ahora está cerrada', ['Sí, de 8 a 24', 'Sí, solo de noche', 'Sí, solo los domingos'], 'Hay un aviso: en este momento está cerrada por trabajos de limpieza.');
  Q('Berlín: el KaDeWe es...', 'un gran almacén (tienda departamental)', ['un museo', 'un barco', 'un cine'], 'KaDeWe = Kaufhaus des Westens, la tienda departamental más grande de Europa según el texto.');
  Q('Berlín: el recorrido en barco dura...', 'dos horas', ['media hora', 'todo el día', 'cuatro horas'], 'El texto ofrece un paseo de dos horas por el centro.');
  Q('Berlín: ¿cuánto paga un adulto (Erwachsene) por el barco?', '8,00 euros', ['5,50 euros', '10 euros', 'nada'], 'Erwachsene 8,00 Euro, Kinder 5,50 Euro.');
  Q('«täglich» significa:', 'todos los días', ['a veces', 'cada semana', 'nunca'], 'täglich = diario, todos los días.');
  Q('«geöffnet» y «geschlossen» significan:', 'abierto y cerrado', ['lleno y vacío', 'temprano y tarde', 'caro y barato'], 'geöffnet = abierto, geschlossen = cerrado.');
  [['08.30', 'acht Uhr dreißig', 'halb neun'], ['19.00', 'neunzehn Uhr', 'sieben Uhr'], ['10.30', 'zehn Uhr dreißig', 'halb elf'], ['12.45', 'zwölf Uhr fünfundvierzig', 'Viertel vor eins'], ['17.15', 'siebzehn Uhr fünfzehn', 'Viertel nach fünf'], ['19.30', 'neunzehn Uhr dreißig', 'halb acht'], ['15.00', 'fünfzehn Uhr', 'drei Uhr'], ['20.00', 'zwanzig Uhr', 'acht Uhr']].forEach(t => {
    out.push(M.mc('Ansage (oficial): «' + t[1] + '». ¿Cómo lo dice un amigo (privat)?', t[2], sample(['halb neun', 'sieben Uhr', 'halb elf', 'Viertel vor eins', 'Viertel nach fünf', 'halb acht', 'drei Uhr', 'acht Uhr', 'halb sieben', 'Viertel nach acht'].filter(x => x !== t[2]), 3), t[0] + ': oficial «' + t[1] + '» (de 0 a 24, minutos al final) = privat «' + t[2] + '» (de 1 a 12, con halb, Viertel, nach y vor).', 'Hora'));
  });
  const F = (q, a, w, why) => out.push(M.mc('Texto de Franziska (p. 68): ' + q, a, w, why, 'Lectura'));
  F('¿Cuántos años tiene?', '23', ['24', '32', '7'], 'Franziska tiene 23 años. Nicolas tiene 24.');
  F('¿De dónde es?', 'de Bodenheim, un pueblo pequeño', ['de Mainz', 'de Göttingen', 'de Berlín'], 'Nació en Bodenheim (unos 7000 habitantes).');
  F('¿Cuál es su profesión?', 'asistente dental (Zahnarzthelferin)', ['médica', 'maestra', 'estudiante de medicina'], 'Zahnarzt = dentista, Helferin = ayudante.');
  F('¿Dónde vive y trabaja ahora?', 'en Mainz', ['en Bodenheim', 'en Göttingen', 'en Berlín'], 'Hoy vive y trabaja en Mainz (más de 200.000 habitantes).');
  F('¿Cómo es su departamento?', 'un cuarto, cocina y baño, no es caro', ['tres cuartos y jardín', 'es muy caro', 'no tiene cocina'], 'ein Zimmer, eine Küche und ein Bad; nicht teuer.');
  F('¿Cuál es su pasatiempo?', 'escalar (klettern)', ['nadar', 'cocinar', 'leer'], 'Mein Hobby ist Klettern.');
  F('¿Qué hace Nicolas?', 'estudia medicina en Göttingen', ['trabaja en Mainz', 'es dentista en Bodenheim', 'escala con Franziska'], 'Nicolas studiert Medizin in Göttingen.');
  F('¿Por qué no se ven seguido?', 'porque viven a 250 km de distancia', ['porque no tienen tiempo los fines de semana', 'porque están peleados', 'porque Nicolas trabaja de noche'], 'Von Mainz nach Göttingen sind es 250 Kilometer.');
  COMIC5.forEach(c => out.push(info(M.mc('Cómic «Der kleine Mann» (p. 68): «' + c[0] + '» significa:', c[1], sample(COMIC5.map(x => x[1]), 3, [c[1]]), c[0] + ' = ' + c[1], 'Cómic'), c[0], c[1])));
  out.push(M.mc('Cómic «Der kleine Mann»: ¿qué hace primero?', 'Se levanta y desayuna a las 7:00', ['Ve televisión', 'Sale a pasear', 'Trabaja'], 'Orden del día: 7.00 aufstehen und frühstücken · 7.45 zur Arbeit · 8.30–17 arbeiten · 18–19 spazieren gehen · 20–23 fernsehen · 23.30 schlafen.', 'Cómic'));
  out.push(M.bd('A las siete se levanta.', ['Um', 'sieben', 'Uhr', 'steht', 'er', 'auf'], 'Inversión + separable: Um sieben Uhr (1) steht (2) er ... auf (final).', [['Er', 'steht', 'um', 'sieben', 'Uhr', 'auf']]));
  out.push(M.bd('Franziska vive en Mainz.', ['Franziska', 'wohnt', 'in', 'Mainz'], 'Verbo en posición 2.'));
  out.push(M.bd('El museo está cerrado el martes.', ['Das', 'Museum', 'ist', 'am', 'Dienstag', 'geschlossen'], 'am + día.', [['Am', 'Dienstag', 'ist', 'das', 'Museum', 'geschlossen']]));
  out.push(M.ty('Escribe en alemán: «todos los días»', ['täglich', 'jeden Tag'], 'täglich = jeden Tag = todos los días.', 'Horarios'));
  out.push(M.ty('Escribe la abreviatura alemana de «Samstag»', ['Sa', 'Sa.'], 'Mo, Di, Mi, Do, Fr, Sa, So.', 'Horarios'));
  return out;
}
LESSONS.r5 = () => box('Lecturas de la lección 5', '<p>Resúmenes en alemán sencillo y redacción propia de los textos de <b>Ein Tag in Berlin</b> (pp. 64 y 65), <b>Zwischendurch mal</b> (pp. 68 y 69: cómic y texto de Franziska).</p>') +
  '<h4>Horarios en Berlín (Öffnungszeiten)</h4>' + tbl(['Lugar', 'Horario', 'Español'], BERLIN.map(b => ['<b>' + b[0] + '</b>', spk(b[1]) + b[1], b[2]])) +
  box('Días abreviados', '<p>Mo · Di · Mi · Do · Fr · Sa · So. <b>täglich</b> = todos los días. <b>geöffnet</b> = abierto. <b>geschlossen</b> = cerrado. <b>Feiertag</b> = día festivo.</p>') +
  '<h4>Franziska (resumen)</h4><div class="card reading"><p>' + spk(T5_FRANZI) + T5_FRANZI + '</p><p class="es" data-reveal>' + T5_FRANZI_ES + '</p></div>' +
  ph('Cómic «Der kleine Mann»: su día', COMIC5);

/* ====================== LECTURA LECCIÓN 6 ====================== */
const T6_DACH = 'Reiseland D-A-CH: Deutschland, Österreich und die Schweiz. Im Norden gibt es die Nordsee und die Ostsee. Dort kann man schwimmen, segeln und windsurfen. Der Sommer ist im Norden nicht so heiß und es regnet manchmal. In der Mitte und im Süden von Deutschland gibt es Mittelgebirge und große Wälder. Vom Frühling bis zum Herbst ist das ideal zum Wandern und Fahrradfahren. Im Winter kann man dort Ski fahren. Ganz im Süden, in Österreich und in der Schweiz, sind die Alpen. Dort kann man Mountainbike fahren, klettern oder Paragliding machen. D-A-CH ist zu jeder Jahreszeit schön.';
const T6_DACH_ES = 'Destino D-A-CH: Alemania, Austria y Suiza. En el norte están el mar del Norte y el mar Báltico. Allí se puede nadar, navegar a vela y hacer windsurf. En el norte el verano no es tan caluroso y a veces llueve. En el centro y en el sur de Alemania hay montañas medias y grandes bosques. De la primavera al otoño es ideal para caminar y andar en bicicleta. En invierno allí se puede esquiar. Muy al sur, en Austria y en Suiza, están los Alpes. Allí se puede andar en bicicleta de montaña, escalar o hacer parapente. D-A-CH es bonito en cualquier estación.';
const T6_ALMA = 'Alma Schneider hat ein besonderes Hobby: Sie fotografiert Wolken. Sie geht gern spazieren, sieht in den Himmel und macht Fotos. Wolken und Farben gefallen ihr sehr.';
const VEREIN = [['Fußballverein', 'club de fútbol'], ['Musikverein', 'club de música / banda'], ['Sportverein', 'club deportivo'], ['Schachklub', 'club de ajedrez'], ['Gesangverein', 'coro (club de canto)']];
function genR6() {
  const M = maker('r6');
  const out = [];
  const D = (q, a, w, why) => out.push(M.mc('Folleto «Reiseland D-A-CH» (pp. 76 y 77): ' + q, a, w, why, 'Lectura'));
  D('¿Qué países forman «D-A-CH»?', 'Alemania, Austria y Suiza', ['Dinamarca, Austria y Chile', 'Alemania, Andorra y China', 'Alemania, Austria y Chequia'], 'D = Deutschland, A = Austria (código del país), CH = Confoederatio Helvetica (Suiza).');
  D('¿Qué mares hay en el norte de Alemania?', 'el mar del Norte y el mar Báltico', ['el Mediterráneo', 'el Atlántico', 'ninguno'], 'die Nordsee y die Ostsee (literalmente «mar del Este»).');
  D('¿Cómo es el verano en el norte?', 'no tan caluroso, y a veces llueve', ['muy caluroso y seco', 'nieva siempre', 'igual que en el sur de Europa'], 'El folleto dice que el norte no es el sur de Europa: verano no tan caliente y algo de lluvia.');
  D('¿Para qué es ideal el centro y el sur de Alemania de primavera a otoño?', 'para caminar y andar en bicicleta', ['para hacer windsurf', 'para esquiar', 'para nadar en el mar'], 'Mittelgebirge y bosques: ideal para Wanderer y Radfahrer.');
  D('¿Qué se puede hacer en invierno en el centro y el sur?', 'esquiar', ['nadar en el mar', 'hacer windsurf', 'nada'], 'Hay muchas ofertas para esquiadores, sobre todo de esquí de fondo.');
  D('¿Dónde están los Alpes?', 'muy al sur: en Austria, en Suiza y en el sur de Alemania', ['en el norte', 'junto al mar del Norte', 'en el centro de Alemania'], 'Ganz im Süden ... die Alpen.');
  D('Corrige: «Im Norden ist es sehr warm.»', 'Im Norden ist es nicht so heiß.', ['Im Norden schneit es immer.', 'Im Norden gibt es keine Strände.', 'Im Norden ist es sehr warm.'], 'El norte no es tan caluroso (nicht so heiß).');
  D('Corrige: «In D-A-CH ist es nur im Winter schön.»', 'D-A-CH ist zu jeder Jahreszeit schön.', ['D-A-CH ist nur im Sommer schön.', 'D-A-CH ist nie schön.', 'D-A-CH ist nur im Herbst schön.'], 'El folleto invita a viajar en primavera, verano, otoño e invierno.');
  out.push(M.ty('«Es gibt viele Freizeitmöglichkeiten.» ¿Qué expresión significa «hay»? Escríbela.', ['es gibt', 'Es gibt'], 'es gibt + acusativo = hay. Es gibt viele Angebote.', 'Estructura'));
  [['im Norden', 'en el norte'], ['im Süden', 'en el sur'], ['im Osten', 'en el este'], ['im Westen', 'en el oeste'], ['in der Mitte', 'en el centro']].forEach(x => out.push(M.mc('¿Qué significa «' + x[0] + '»?', x[1], ['en el norte', 'en el sur', 'en el este', 'en el oeste', 'en el centro'].filter(y => y !== x[1]).slice(0, 3), x[0] + ' = ' + x[1] + '. Ojo: «in der Mitte» porque die Mitte es femenino.', 'Lugares')));
  VEREIN.forEach(v => out.push(M.mc('Zwischendurch (p. 80): ¿qué es un «' + v[0] + '»?', v[1], sample(VEREIN.map(x => x[1]), 3, [v[1]]), v[0] + ' = ' + v[1] + '. der Verein / der Klub = club o asociación. En Alemania hay clubes para casi todo.', 'Vereine')));
  out.push(M.mc('La canción de la p. 80 practica sobre todo:', 'la negación con kein / keinen / keine', ['el Perfekt', 'los números', 'la hora'], 'La canción repite frases negativas con kein / keinen / keine. Escúchala con el audio del libro; aquí no se reproduce la letra.', 'Vereine'));
  [['Ich esse keinen Fisch.', 'No como pescado.', 'Fisch es masculino → keinen (acusativo).'], ['Er trinkt kein Bier.', 'Él no toma cerveza.', 'Bier es neutro → kein.'], ['Wir haben keine Butter.', 'No tenemos mantequilla.', 'Butter es femenino → keine.'], ['Sie spielt keinen Tennis.', 'Ella no juega tenis.', 'Ojo: Tennis es neutro (das Tennis), pero con deportes se dice «Sie spielt nicht Tennis» o «kein Tennis».']].slice(0, 3).forEach(x => out.push(info(M.ty('Traduce con «kein»: «' + x[1] + '»', [x[0].replace(/[.?]$/, '')], x[2], 'kein / keine'), x[0], x[1])));
  const A = (q, a, w, why) => out.push(M.mc('Película «Almas Hobby: Wolkenfotos» (p. 80): ' + q, a, w, why, 'Película'));
  A('¿Cuál es el hobby de Alma?', 'fotografiar nubes', ['pintar flores', 'escalar montañas', 'cocinar'], 'Wolkenfotos = fotos de nubes (die Wolke, die Wolken).');
  A('«Wolken und Farben gefallen ihr.» significa:', 'Le gustan las nubes y los colores.', ['Ella pinta nubes de colores.', 'Las nubes son grises.', 'Ella vende fotos.'], 'gefallen + dativo: ihr = a ella. Plural (Wolken und Farben) → gefallen.');
  out.push(M.bd('En el norte se puede hacer windsurf.', ['Im', 'Norden', 'kann', 'man', 'windsurfen'], 'man = uno / se. Modal en posición 2, infinitivo al final.'));
  out.push(M.bd('En invierno esquío.', ['Im', 'Winter', 'fahre', 'ich', 'Ski'], 'Inversión: Im Winter (1) fahre (2) ich.', [['Ich', 'fahre', 'im', 'Winter', 'Ski']]));
  out.push(M.bd('Hay muchas ofertas.', ['Es', 'gibt', 'viele', 'Angebote'], 'es gibt = hay.'));
  return out;
}
LESSONS.r6 = () => box('Lecturas de la lección 6', '<p>Resumen propio del folleto <b>Reiseland D-A-CH</b> (pp. 76 y 77) y de <b>Zwischendurch mal</b> (p. 80: clubes y la película de Alma). La letra de la canción no se reproduce: escúchala en el audio del libro.</p>') +
  '<h4>Reiseland D-A-CH (resumen)</h4><div class="card reading"><p>' + spk(T6_DACH) + T6_DACH + '</p><p class="es" data-reveal>' + T6_DACH_ES + '</p></div>' +
  ph('Clubes (Vereine)', VEREIN.map(v => [v[0], v[1]])) +
  '<h4>Almas Hobby</h4><div class="card reading"><p>' + spk(T6_ALMA) + T6_ALMA + '</p><p class="es" data-reveal>Alma Schneider tiene un pasatiempo especial: fotografía nubes. Le gusta salir a pasear, mira al cielo y toma fotos. Le gustan mucho las nubes y los colores.</p></div>';

/* ====================== GRAMÁTICA INTENSIVA (temas de la maestra) ====================== */
/* Sustantivos de las lecciones 1 a 7 con género, para generar práctica de artículos y negación */
const G_NOUNS = [
  ['der', 'Tisch', 'mesa'], ['der', 'Stuhl', 'silla'], ['der', 'Schrank', 'armario'], ['der', 'Kühlschrank', 'refrigerador'], ['der', 'Balkon', 'balcón'],
  ['der', 'Apfel', 'manzana'], ['der', 'Kuchen', 'pastel'], ['der', 'Salat', 'ensalada'], ['der', 'Hund', 'perro'], ['der', 'Computer', 'computadora'],
  ['der', 'Fernseher', 'televisor'], ['der', 'Garten', 'jardín'], ['der', 'Kaffee', 'café'], ['der', 'Saft', 'jugo'], ['der', 'Teppich', 'alfombra'],
  ['das', 'Bett', 'cama'], ['das', 'Sofa', 'sofá'], ['das', 'Regal', 'estante'], ['das', 'Auto', 'coche'], ['das', 'Fahrrad', 'bicicleta'],
  ['das', 'Ei', 'huevo'], ['das', 'Brot', 'pan'], ['das', 'Handy', 'celular'], ['das', 'Buch', 'libro'], ['das', 'Zimmer', 'cuarto'],
  ['die', 'Lampe', 'lámpara'], ['die', 'Küche', 'cocina'], ['die', 'Dusche', 'regadera'], ['die', 'Gitarre', 'guitarra'], ['die', 'Wohnung', 'departamento'],
  ['die', 'Banane', 'plátano'], ['die', 'Pizza', 'pizza'], ['die', 'Zeitung', 'periódico'], ['die', 'Uhr', 'reloj'], ['die', 'Waschmaschine', 'lavadora']
];
const NOM = { der: 'der', das: 'das', die: 'die' }, AKK = { der: 'den', das: 'das', die: 'die' };
const EIN_N = { der: 'ein', das: 'ein', die: 'eine' }, EIN_A = { der: 'einen', das: 'ein', die: 'eine' };
const KEIN_N = { der: 'kein', das: 'kein', die: 'keine' }, KEIN_A = { der: 'keinen', das: 'kein', die: 'keine' };
const PRO = { der: 'er', das: 'es', die: 'sie' };
const GEN = { der: 'masculino', das: 'neutro', die: 'femenino' };

function genGArt() { // artículo definido y pronombres (p. 54)
  const M = maker('gart');
  const out = [];
  G_NOUNS.forEach(n => {
    out.push(M.ty('Artículo definido (nominativo): «___ ' + n[1] + '» (' + n[2] + ')', n[0], n[1] + ' es ' + GEN[n[0]] + ': ' + n[0] + ' ' + n[1] + '. Colores del libro (p. 54): der azul, das verde, die rojo.', 'Artículo definido'));
    out.push(M.ty('Wo ist ' + n[0] + ' ' + n[1] + '? «___ ist hier.» (pronombre)', [PRO[n[0]], PRO[n[0]].charAt(0).toUpperCase() + PRO[n[0]].slice(1)], n[0] + ' → ' + PRO[n[0]] + ' (p. 54). En alemán también las cosas son er, es o sie según su artículo: «' + PRO[n[0]].charAt(0).toUpperCase() + PRO[n[0]].slice(1) + ' ist hier.»', 'Pronombres'));
  });
  const P = [['yo', 'ich'], ['tú', 'du'], ['él', 'er'], ['ella', 'sie'], ['ello (neutro)', 'es'], ['nosotros', 'wir'], ['ustedes (informal)', 'ihr'], ['ellos / ellas', 'sie'], ['usted (formal)', 'Sie']];
  P.forEach(p => out.push(M.ty('Pronombre personal en alemán: «' + p[0] + '»', p[1] === 'Sie' ? ['Sie'] : [p[1]], p[0] + ' = ' + p[1] + '. Tabla: ich, du, er/sie/es, wir, ihr, sie/Sie. «Sie» formal siempre con mayúscula.', 'Pronombres')));
  [['Ich', 'bin'], ['Du', 'bist'], ['Er', 'ist'], ['Wir', 'sind'], ['Ihr', 'seid'], ['Sie', 'sind']].forEach(s => out.push(M.ty(s[0] + ' ___ müde. (sein)', s[1], 'sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.', 'Pronombres')));
  out.push(M.mc('«Das ist Lara. ___ wohnt in München.»', 'Sie', ['Er', 'Es', 'Ihr'], 'Lara es una mujer → sie.', 'Pronombres'));
  out.push(M.mc('«Das ist Tim. ___ kommt aus Kanada.»', 'Er', ['Sie', 'Es', 'Wir'], 'Tim → er.', 'Pronombres'));
  out.push(M.mc('«Lara und Sofia? ___ wohnen zusammen.»', 'Sie', ['Er', 'Ihr', 'Es'], 'Dos personas (plural) → sie + verbo en -en: sie wohnen.', 'Pronombres'));
  out.push(M.mc('«Das ist mein Handy. ___ ist neu.»', 'Es', ['Er', 'Sie', 'Das'], 'das Handy → es.', 'Pronombres'));
  out.push(M.mc('«Wie ist die Wohnung? ___ ist sehr schön.»', 'Sie', ['Er', 'Es', 'Ihr'], 'die Wohnung → sie.', 'Pronombres'));
  out.push(M.mc('«Wo ist der Schlüssel? ___ ist hier.»', 'Er', ['Es', 'Sie', 'Den'], 'der Schlüssel (la llave) → er.', 'Pronombres'));
  out.push(M.mc('El plural siempre lleva el artículo definido:', 'die', ['der', 'das', 'den'], 'die Tische, die Betten, die Lampen. El plural es «naranja» en el libro.', 'Artículo definido'));
  out.push(M.mc('¿Cuándo se usa el artículo definido (der/das/die) en vez de ein/eine?', 'cuando la cosa ya es conocida o se señala', ['siempre la primera vez que se menciona', 'solo en plural', 'solo con personas'], '«Hier ist ein Balkon. Der Balkon ist groß.» Primero ein (nuevo), luego der (conocido).', 'Artículo definido'));
  return out;
}
LESSONS.gart = () => box('Artículo definido y pronombres (p. 54)', tbl(['', 'Artículo', 'Pronombre', 'Ejemplo'], [['<span class="art m">masculino</span>', 'der', 'er', 'Der Tisch ist neu. → Er ist neu.'], ['<span class="art n">neutro</span>', 'das', 'es', 'Das Sofa ist alt. → Es ist alt.'], ['<span class="art f">femenino</span>', 'die', 'sie', 'Die Lampe ist schön. → Sie ist schön.'], ['<span class="art p">plural</span>', 'die', 'sie', 'Die Stühle sind neu. → Sie sind neu.']])) +
  tbl(['Pronombre', 'Español', 'sein'], [['ich', 'yo', 'bin'], ['du', 'tú', 'bist'], ['er / sie / es', 'él / ella / ello', 'ist'], ['wir', 'nosotros', 'sind'], ['ihr', 'ustedes (informal)', 'seid'], ['sie / Sie', 'ellos / usted(es)', 'sind']]) +
  ph('Ejemplos', G_NOUNS.slice(0, 12).map(n => [n[0] + ' ' + n[1] + ' → ' + PRO[n[0]], n[2]]));

function genGNeg() { // nicht / kein
  const M = maker('gneg');
  const out = [];
  G_NOUNS.forEach(n => {
    out.push(M.ty('Das ist ___ ' + n[1] + '. (no es un/una: ' + n[2] + ')', KEIN_N[n[0]], n[1] + ' es ' + GEN[n[0]] + ': ein → kein, eine → keine. Con sein (ist) va el nominativo: ' + KEIN_N[n[0]] + ' ' + n[1] + '.', 'kein / keine'));
    out.push(M.ty('Ich habe ___ ' + n[1] + '. (no tengo: ' + n[2] + ')', KEIN_A[n[0]], 'haben lleva acusativo. ' + (n[0] === 'der' ? 'Masculino: kein → keinen.' : 'Neutro y femenino no cambian: ' + KEIN_A[n[0]] + '.') + ' Ich habe ' + KEIN_A[n[0]] + ' ' + n[1] + '.', 'kein / keine'));
  });
  const NI = [
    ['Das Zimmer ist ___ teuer.', 'nicht', 'nicht niega adjetivos: nicht teuer.'], ['Ich komme ___ aus Spanien.', 'nicht', 'nicht niega el lugar o el verbo: nicht aus Spanien.'],
    ['Er arbeitet heute ___.', 'nicht', 'nicht al final niega el verbo: Er arbeitet heute nicht.'], ['Wir haben ___ Zeit.', 'keine', 'Zeit es sustantivo (die Zeit) → keine Zeit.'],
    ['Das ist ___ mein Handy.', 'nicht', 'Con posesivo (mein, dein) se usa nicht: nicht mein Handy.'], ['Ich trinke ___ Kaffee.', 'keinen', 'Kaffee (der) sin artículo → keinen Kaffee.'],
    ['Lara wohnt ___ in Berlin.', 'nicht', 'nicht + lugar: nicht in Berlin.'], ['Das ist ___ der Bus nach Mainz.', 'nicht', 'Con artículo definido (der) se usa nicht: nicht der Bus.'],
    ['Ich spiele ___ gern Fußball.', 'nicht', 'nicht gern = no me gusta.'], ['Wir haben ___ Kinder.', 'keine', 'Plural → keine Kinder.'],
    ['Die Sonne scheint ___.', 'nicht', 'nicht al final niega el verbo.'], ['Es gibt ___ Problem.', 'kein', 'das Problem → kein Problem (acusativo neutro = kein).'],
    ['Ich kann ___ gut singen.', 'nicht', 'nicht + gut: nicht gut.'], ['Er hat ___ Hunger.', 'keinen', 'der Hunger → keinen Hunger.'],
    ['Sie hat ___ Durst.', 'keinen', 'der Durst → keinen Durst.'], ['Das Wetter ist ___ schön.', 'nicht', 'nicht + adjetivo.'],
    ['Ich habe ___ Auto.', 'kein', 'das Auto → kein Auto.'], ['Heute regnet es ___.', 'nicht', 'nicht al final niega el verbo.']
  ];
  NI.forEach(x => out.push(M.ty(x[0] + ' (nicht o kein-)', x[1], x[2] + ' Regla: kein- niega sustantivos con ein/eine o sin artículo; nicht niega todo lo demás (verbos, adjetivos, lugares, nombres, artículos definidos y posesivos).', 'nicht / kein')));
  [['Ich habe einen Hund.', 'Ich habe keinen Hund.'], ['Das ist eine Lampe.', 'Das ist keine Lampe.'], ['Ich bin müde.', 'Ich bin nicht müde.'], ['Wir haben Zeit.', 'Wir haben keine Zeit.'], ['Er kommt heute.', 'Er kommt heute nicht.'], ['Das Bad ist groß.', 'Das Bad ist nicht groß.'], ['Sie trinkt Milch.', 'Sie trinkt keine Milch.'], ['Ich kenne Tim.', 'Ich kenne Tim nicht.']].forEach(x => {
    out.push(info(M.ty('Niega la frase: «' + x[0] + '»', [x[1].replace(/\.$/, '')], 'Negación: ' + x[1] + ' (' + (/kein/.test(x[1]) ? 'sustantivo con ein- o sin artículo → kein-' : 'verbo, adjetivo o nombre propio → nicht') + ').', 'nicht / kein'), x[1], ''));
  });
  out.push(M.mc('¿Cuál está bien?', 'Ich habe keine Zeit.', ['Ich habe nicht Zeit.', 'Ich habe kein Zeit.', 'Ich nicht habe Zeit.'], 'die Zeit → keine Zeit.', 'nicht / kein'));
  out.push(M.mc('¿Cuál está bien?', 'Das Zimmer ist nicht hell.', ['Das Zimmer ist kein hell.', 'Das Zimmer nicht ist hell.', 'Das Zimmer ist keine hell.'], 'Adjetivo → nicht.', 'nicht / kein'));
  out.push(M.mc('¿Cuál está bien?', 'Ich wohne nicht in Köln.', ['Ich wohne kein in Köln.', 'Ich nicht wohne in Köln.', 'Ich wohne keine Köln.'], 'Lugar → nicht.', 'nicht / kein'));
  return out;
}
LESSONS.gneg = () => box('nicht o kein (pp. 42 y 54)', '<p><b>kein-</b> niega un sustantivo que llevaría <b>ein/eine</b> o que va sin artículo. <b>nicht</b> niega todo lo demás.</p>') +
  tbl(['', 'nominativo (sein)', 'acusativo (haben...)'], [['<span class="art m">masculino</span>', 'kein Tisch', '<b>keinen</b> Tisch'], ['<span class="art n">neutro</span>', 'kein Bett', 'kein Bett'], ['<span class="art f">femenino</span>', 'keine Lampe', 'keine Lampe'], ['<span class="art p">plural</span>', 'keine Stühle', 'keine Stühle']]) +
  ph('Ejemplos de nicht', [['Das Zimmer ist nicht teuer.', 'El cuarto no es caro.'], ['Ich komme nicht aus Spanien.', 'No soy de España.'], ['Er arbeitet heute nicht.', 'Hoy él no trabaja.'], ['Das ist nicht mein Handy.', 'Ese no es mi celular.']]) +
  ph('Ejemplos de kein', [['Ich habe keinen Hund.', 'No tengo perro.'], ['Wir haben keine Zeit.', 'No tenemos tiempo.'], ['Das ist kein Problem.', 'No es ningún problema.'], ['Ich habe keine Kinder.', 'No tengo hijos.']]);

function genGAkk() { // der vs den
  const M = maker('gakk');
  const out = [];
  const VB = [['Ich habe', 'tengo'], ['Ich kaufe', 'compro'], ['Ich brauche', 'necesito'], ['Ich suche', 'busco'], ['Ich nehme', 'tomo'], ['Ich finde', 'encuentro']];
  G_NOUNS.forEach((n, i) => {
    const v = VB[i % VB.length];
    out.push(M.ty(v[0] + ' ___ ' + n[1] + '. (artículo definido: ' + v[1] + ' el/la ' + n[2] + ')', AKK[n[0]], 'Objeto directo = acusativo. ' + (n[0] === 'der' ? 'Solo el masculino cambia: der → den.' : n[1] + ' es ' + GEN[n[0]] + ' y no cambia: ' + AKK[n[0]] + '.') + ' ' + v[0] + ' ' + AKK[n[0]] + ' ' + n[1] + '.', 'der / den'));
    out.push(M.ty('Hier ist ___ ' + n[1] + '. (artículo definido, sujeto)', NOM[n[0]], 'Con sein (ist) no hay objeto directo: nominativo ' + NOM[n[0]] + ' ' + n[1] + '.', 'der / den'));
    if (i % 2 === 0) out.push(M.ty(v[0] + ' ___ ' + n[1] + '. (un/una)', EIN_A[n[0]], 'Acusativo indefinido: ' + (n[0] === 'der' ? 'ein → einen (solo el masculino).' : 'neutro ein y femenino eine no cambian.') + ' ' + v[0] + ' ' + EIN_A[n[0]] + ' ' + n[1] + '.', 'der / den'));
  });
  [['Der Tisch ist neu.', 'nominativo', 'Der Tisch es el sujeto (con sein).'], ['Ich kaufe den Tisch.', 'acusativo', 'den Tisch es lo que compro (objeto).'], ['Der Hund spielt.', 'nominativo', 'El perro hace la acción: sujeto.'], ['Ich habe den Hund.', 'acusativo', 'den Hund es lo que tengo.'], ['Wie gefällt dir der Teppich?', 'nominativo', 'Con gefallen lo que gusta es el sujeto: der Teppich.'], ['Wie findest du den Teppich?', 'acusativo', 'finden lleva acusativo: den Teppich.']].forEach(x => out.push(M.mc('«' + x[0] + '» ¿El sustantivo está en nominativo o en acusativo?', x[1], [x[1] === 'nominativo' ? 'acusativo' : 'nominativo'], x[2], 'der / den')));
  out.push(M.mc('¿Qué artículos cambian en acusativo?', 'Solo el masculino: der → den, ein → einen, kein → keinen', ['Todos', 'Solo el femenino', 'Solo el plural'], 'Neutro, femenino y plural quedan igual (p. 78).', 'der / den'));
  out.push(M.mc('¿Cuál está bien?', 'Ich nehme den Salat.', ['Ich nehme der Salat.', 'Ich nehme dem Salat.', 'Ich nehme die Salat.'], 'der Salat → den Salat (acusativo).', 'der / den'));
  out.push(M.mc('¿Cuál está bien?', 'Der Salat ist gut.', ['Den Salat ist gut.', 'Dem Salat ist gut.', 'Die Salat ist gut.'], 'Sujeto con sein → nominativo: der Salat.', 'der / den'));
  return out;
}
LESSONS.gakk = () => box('der o den: nominativo y acusativo (p. 78)', '<p>El <b>sujeto</b> (quién hace la acción, y todo lo que va con <b>sein</b>) va en <b>nominativo</b>. El <b>objeto directo</b> (lo que tengo, compro, como, busco...) va en <b>acusativo</b>. Solo cambia el masculino.</p>') +
  tbl(['', 'Nominativo', 'Acusativo'], [['<span class="art m">masculino</span>', 'der / ein / kein Tisch', '<b>den / einen / keinen</b> Tisch'], ['<span class="art n">neutro</span>', 'das / ein / kein Bett', 'das / ein / kein Bett'], ['<span class="art f">femenino</span>', 'die / eine / keine Lampe', 'die / eine / keine Lampe'], ['<span class="art p">plural</span>', 'die / — / keine Stühle', 'die / — / keine Stühle']]) +
  ph('Ejemplos', [['Der Tisch ist neu.', 'La mesa es nueva.'], ['Ich kaufe den Tisch.', 'Compro la mesa.'], ['Ich habe einen Hund.', 'Tengo un perro.'], ['Ich brauche keinen Computer.', 'No necesito computadora.']]);

function genGDoch() { // ja / nein / doch
  const M = maker('gdoch');
  const out = [];
  const POS = [['Hast du Zeit?', 'Ja, ich habe Zeit.', 'Nein, ich habe keine Zeit.'], ['Kommst du heute?', 'Ja, ich komme.', 'Nein, ich komme nicht.'], ['Ist das Zimmer teuer?', 'Ja, es ist teuer.', 'Nein, es ist nicht teuer.'], ['Möchtest du Kaffee?', 'Ja, gern.', 'Nein, danke.'], ['Spielst du Fußball?', 'Ja, ich spiele Fußball.', 'Nein, ich spiele nicht Fußball.']];
  const NEGQ = [['Hast du keine Zeit?', 'Doch, ich habe Zeit.', 'Nein, ich habe keine Zeit.'], ['Kommst du nicht?', 'Doch, ich komme.', 'Nein, ich komme nicht.'], ['Hast du keinen Hunger mehr?', 'Doch, ich habe noch Hunger.', 'Nein, ich habe keinen Hunger mehr.'], ['Magst du keine Pizza?', 'Doch, ich mag Pizza.', 'Nein, ich mag keine Pizza.'], ['Ist das Wetter nicht schön?', 'Doch, es ist schön.', 'Nein, es ist nicht schön.'], ['Trinkst du keinen Kaffee?', 'Doch, ich trinke Kaffee.', 'Nein, ich trinke keinen Kaffee.'], ['Kannst du nicht schwimmen?', 'Doch, ich kann schwimmen.', 'Nein, ich kann nicht schwimmen.'], ['Bist du nicht müde?', 'Doch, ich bin müde.', 'Nein, ich bin nicht müde.']];
  POS.forEach(p => {
    out.push(info(M.mc('Pregunta positiva: «' + p[0] + '» Respondes que SÍ:', 'Ja', ['Doch', 'Nein'], 'Pregunta sin negación + respuesta afirmativa = Ja. ' + p[1], 'ja / nein / doch'), p[1], ''));
    out.push(info(M.mc('Pregunta positiva: «' + p[0] + '» Respondes que NO:', 'Nein', ['Doch', 'Ja'], 'Respuesta negativa = Nein. ' + p[2], 'ja / nein / doch'), p[2], ''));
  });
  NEGQ.forEach(p => {
    out.push(info(M.mc('Pregunta negativa: «' + p[0] + '» Quieres decir que SÍ (contradices):', 'Doch', ['Ja', 'Nein'], 'Si la pregunta tiene nicht o kein y respondes afirmando, se usa doch: «' + p[1] + '»', 'ja / nein / doch'), p[1], ''));
    out.push(info(M.mc('Pregunta negativa: «' + p[0] + '» Confirmas que NO:', 'Nein', ['Doch', 'Ja'], 'Confirmas la negación → Nein: «' + p[2] + '»', 'ja / nein / doch'), p[2], ''));
    out.push(info(M.ty('«' + p[0] + '» Responde que sí, con una sola palabra:', ['Doch', 'doch'], 'Pregunta negativa + respuesta positiva = Doch. ' + p[1], 'ja / nein / doch'), p[1], ''));
  });
  out.push(M.mc('«Doch» se usa para:', 'responder «sí» a una pregunta negativa', ['decir «no» con fuerza', 'responder «sí» a cualquier pregunta', 'preguntar algo'], 'Hast du keinen Hunger? → Doch! (= sí tengo).', 'ja / nein / doch'));
  out.push(M.mc('«Hast du kein Auto?» Tienes coche. Respuesta:', 'Doch, ich habe ein Auto.', ['Ja, ich habe ein Auto.', 'Nein, ich habe ein Auto.', 'Doch, ich habe kein Auto.'], 'Contradices la negación → Doch.', 'ja / nein / doch'));
  return out;
}
LESSONS.gdoch = () => box('Ja, nein, doch (p. 78)', tbl(['Pregunta', 'Respuesta positiva', 'Respuesta negativa'], [['Hast du Hunger? (sin negación)', '<b>Ja</b>, ich habe Hunger.', '<b>Nein</b>, ich habe keinen Hunger.'], ['Hast du keinen Hunger? (con negación)', '<b>Doch</b>, ich habe Hunger.', '<b>Nein</b>, ich habe keinen Hunger.']])) +
  '<p>Truco: <b>doch</b> solo aparece cuando la pregunta lleva <b>nicht</b> o <b>kein</b> y tú quieres decir que sí.</p>';

function genGSep() { // separables e irregulares con conjugación completa
  const SEPV = ['aufräumen', 'aufstehen', 'einkaufen', 'anrufen', 'fernsehen', 'anfangen', 'aussehen', 'losgehen', 'kennenlernen', 'ansehen'];
  const IRRV = ['lesen', 'sehen', 'treffen', 'nehmen', 'essen', 'sprechen', 'helfen', 'vergessen', 'fahren', 'schlafen', 'gefallen', 'wissen', 'können', 'wollen'];
  const M = maker('gsep');
  const out = conjQuestions('gsep', SEPV.concat(IRRV));
  SEPV.forEach(v => {
    const [pre, base] = SEP[v];
    const f = conj(v);
    out.push(M.bd('Separable «' + v + '» con «ich» (frase corta): ich + verbo + prefijo', ['Ich', f[0].split(' ')[0], pre], 'El verbo conjugado va en la posición 2 y el prefijo «' + pre + '» al final: Ich ' + f[0] + '.'));
    out.push(M.mc('¿Cuál es el prefijo separable de «' + v + '»?', pre, sample(['auf', 'ein', 'an', 'fern', 'aus', 'los', 'kennen', 'mit', 'zu'], 3, [pre]), v + ' = ' + pre + ' | ' + base + '. El acento va en el prefijo: «' + pron(v) + '».', 'Separables'));
  });
  out.push(M.mc('¿Qué verbos cambian la vocal e → i / ie?', 'lesen, sehen, treffen, nehmen, essen, sprechen, helfen, vergessen', ['fahren, schlafen, gefallen', 'kochen, spielen, machen', 'können, wollen, wissen'], 'Solo en du y er/sie/es: du liest, er sieht, du triffst, er nimmt, du isst, er spricht, du hilfst, er vergisst.', 'Irregulares'));
  out.push(M.mc('¿Qué verbos cambian la vocal a → ä?', 'fahren, schlafen, anfangen, gefallen', ['lesen, sehen, nehmen', 'wohnen, lernen, hören', 'können, wollen'], 'du fährst, er schläft, er fängt an, es gefällt.', 'Irregulares'));
  return out;
}
LESSONS.gsep = () => box('Verbos separables (p. 66)', '<p>El prefijo se separa y va <b>al final</b>: <b>auf|stehen</b> → Ich <b>stehe</b> um sieben Uhr <b>auf</b>. El acento cae en el prefijo.</p>') +
  conjTable(['aufräumen', 'aufstehen', 'einkaufen', 'anrufen', 'fernsehen', 'anfangen', 'aussehen', 'losgehen', 'kennenlernen', 'ansehen']) +
  box('Verbos con cambio de vocal (solo du y er/sie/es)', '<p><b>e → i / ie</b>: lesen, sehen, treffen, nehmen, essen, sprechen, helfen, vergessen. <b>a → ä</b>: fahren, schlafen, anfangen, gefallen. <b>Especiales</b>: wissen, können, wollen.</p>') +
  conjTable(['lesen', 'sehen', 'treffen', 'nehmen', 'essen', 'sprechen', 'helfen', 'vergessen', 'fahren', 'schlafen', 'gefallen', 'wissen', 'können', 'wollen']);

function genGUhr() { // Uhrzeiten formal e informal comparadas (pp. 66 y 78)
  const M = maker('guhr');
  const out = [];
  const L = [[7, 0], [7, 15], [7, 30], [7, 45], [8, 5], [8, 20], [8, 25], [8, 35], [8, 40], [8, 50], [9, 55], [10, 10], [11, 30], [12, 15], [12, 45], [1, 30], [2, 20], [3, 45], [4, 5], [5, 55], [6, 30], [9, 15]];
  L.forEach(([h, m], i) => {
    const h24 = h + 12 * (i % 2); // la mitad por la tarde, para practicar la hora oficial de 13 a 24
    const o = offi(h24, m), p = priv(h, m);
    out.push(M.mc('Hora oficial: «' + o + '». ¿Cómo se dice de forma informal (privat)?', p, sample(L.map(([a, b]) => priv(a, b)).filter(x => x !== p), 3), timeStr(h24, m) + ' = oficial «' + o + '» = informal «' + p + '». ' + privWhy(h, m) + ' En la forma informal se usan las horas de 1 a 12.', 'Hora'));
    out.push(M.mc('Informal: «' + p + '» (de ' + (i % 2 ? 'la tarde' : 'la mañana') + '). ¿Cómo lo dice la radio (offiziell)?', o, sample(L.map(([a, b], j) => offi(a + 12 * (j % 2), b)).filter(x => x !== o), 3), 'Oficial = de 0 a 24 y los minutos al final, sin halb ni Viertel: ' + o + ' (' + timeStr(h24, m) + ').', 'Hora'));
    if (i % 3 === 0) out.push(M.ty('Escribe la hora oficial de ' + timeStr(h24, m) + ' (con palabras, termina con los minutos).', [o, 'Es ist ' + o], 'Oficial: hora + «Uhr» + minutos: ' + o + '.', 'Hora'));
  });
  out.push(M.mc('¿Cuál de estas formas es SOLO informal?', 'Viertel nach acht', ['acht Uhr fünfzehn', 'zwanzig Uhr fünfzehn', 'acht Uhr'], 'Viertel, halb, nach y vor se usan en la forma informal (privat).', 'Hora'));
  out.push(M.mc('¿Dónde se usa la hora oficial?', 'radio, televisión, trenes, avisos', ['entre amigos', 'en la familia', 'solo por escrito en cartas'], 'El libro (p. 64): offiziell (Radio, Fernsehen, Ansagen) / privat (Familie, Freunde).', 'Hora'));
  out.push(M.mc('«Wie spät ist es?» y «Wie viel Uhr ist es?» significan:', '¿Qué hora es?', ['¿Cuándo empieza?', '¿Hasta qué hora?', '¿Ya es tarde?'], 'Las dos preguntan la hora.', 'Hora'));
  out.push(M.mc('«Um wie viel Uhr ...?» pregunta:', '¿a qué hora ...?', ['¿qué hora es?', '¿cuántas horas?', '¿desde cuándo?'], 'Um wie viel Uhr fängt der Kurs an? Um neun Uhr.', 'Hora'));
  return out;
}
LESSONS.guhr = () => box('Hora formal (offiziell) e informal (privat), pp. 61, 64 y 67', tbl(['Se escribe', 'Oficial (radio, tren)', 'Informal (amigos)'], [['08:30', 'acht Uhr dreißig', 'halb neun'], ['19:00', 'neunzehn Uhr', 'sieben Uhr'], ['12:45', 'zwölf Uhr fünfundvierzig', 'Viertel vor eins'], ['17:15', 'siebzehn Uhr fünfzehn', 'Viertel nach fünf'], ['20:25', 'zwanzig Uhr fünfundzwanzig', 'fünf vor halb neun'], ['21:40', 'einundzwanzig Uhr vierzig', 'zwanzig vor zehn']].map(r => [r[0], spk(r[1]) + r[1], spk(r[2]) + r[2]]))) +
  '<p>Regla: <b>oficial</b> = hora de 0 a 24 + Uhr + minutos. <b>Informal</b> = hora de 1 a 12 con <b>nach</b> (pasadas), <b>vor</b> (para), <b>Viertel</b> (cuarto) y <b>halb</b> (media hacia la hora siguiente).</p>';

function genGOrder() { // estructura de frases intensiva
  const M = maker('gord');
  const out = [];
  const S = [
    // verbo en posición 2
    ['Yo vivo en Hamburgo.', ['Ich', 'wohne', 'in', 'Hamburg'], 'Verbo en la posición 2.', []],
    ['Hoy voy al cine.', ['Heute', 'gehe', 'ich', 'ins', 'Kino'], 'Inversión: tiempo en 1, verbo en 2, sujeto en 3.', [['Ich', 'gehe', 'heute', 'ins', 'Kino']]],
    ['En Berlín hay muchos museos.', ['In', 'Berlin', 'gibt', 'es', 'viele', 'Museen'], 'Lugar en 1, verbo en 2.', [['Es', 'gibt', 'in', 'Berlin', 'viele', 'Museen']]],
    ['El sábado mi hermano juega tenis.', ['Am', 'Samstag', 'spielt', 'mein', 'Bruder', 'Tennis'], 'Tiempo en 1, verbo en 2, sujeto después.', [['Mein', 'Bruder', 'spielt', 'am', 'Samstag', 'Tennis']]],
    ['En la noche leo un libro.', ['Am', 'Abend', 'lese', 'ich', 'ein', 'Buch'], 'Tiempo en 1, verbo en 2.', [['Ich', 'lese', 'am', 'Abend', 'ein', 'Buch']]],
    ['En el verano hace calor.', ['Im', 'Sommer', 'ist', 'es', 'heiß'], 'Im Sommer (1) ist (2) es heiß.', [['Es', 'ist', 'im', 'Sommer', 'heiß']]],
    // W-Fragen
    ['¿Dónde vives?', ['Wo', 'wohnst', 'du'], 'W-Frage: palabra interrogativa en 1, verbo en 2.', []],
    ['¿De dónde viene usted?', ['Woher', 'kommen', 'Sie'], 'W-Frage: Woher (1) kommen (2) Sie.', []],
    ['¿Qué haces el domingo?', ['Was', 'machst', 'du', 'am', 'Sonntag'], 'W-Frage con complemento de tiempo al final.', []],
    ['¿Cuánto cuesta el sofá?', ['Wie', 'viel', 'kostet', 'das', 'Sofa'], '«Wie viel» ocupa la posición 1 completa.', []],
    ['¿Cuándo empieza el curso?', ['Wann', 'fängt', 'der', 'Kurs', 'an'], 'W-Frage + separable: an al final.', []],
    ['¿Cómo te gusta el departamento?', ['Wie', 'gefällt', 'dir', 'die', 'Wohnung'], 'Wie (1) gefällt (2).', []],
    // Ja/Nein-Fragen
    ['¿Tienes hambre?', ['Hast', 'du', 'Hunger'], 'Pregunta de sí/no: verbo en 1.', []],
    ['¿Vive Lara en Múnich?', ['Wohnt', 'Lara', 'in', 'München'], 'Verbo en 1, sujeto en 2.', []],
    ['¿Te levantas temprano?', ['Stehst', 'du', 'früh', 'auf'], 'Verbo en 1 y prefijo al final.', []],
    ['¿Ves televisión en la noche?', ['Siehst', 'du', 'am', 'Abend', 'fern'], 'Verbo en 1 y «fern» al final.', []],
    // Satzklammer separables y modales
    ['Llamo a mi madre por la tarde.', ['Ich', 'rufe', 'am', 'Nachmittag', 'meine', 'Mutter', 'an'], 'Satzklammer: rufe (2) ... an (final).', [['Am', 'Nachmittag', 'rufe', 'ich', 'meine', 'Mutter', 'an']]],
    ['El sábado hago las compras.', ['Am', 'Samstag', 'kaufe', 'ich', 'ein'], 'Inversión + separable.', [['Ich', 'kaufe', 'am', 'Samstag', 'ein']]],
    ['Hoy ordeno la cocina.', ['Heute', 'räume', 'ich', 'die', 'Küche', 'auf'], 'Inversión + separable.', [['Ich', 'räume', 'heute', 'die', 'Küche', 'auf']]],
    ['El curso empieza a las nueve.', ['Der', 'Kurs', 'fängt', 'um', 'neun', 'Uhr', 'an'], 'Separable: an al final.', [['Um', 'neun', 'Uhr', 'fängt', 'der', 'Kurs', 'an']]],
    ['El domingo quiero dormir mucho.', ['Am', 'Sonntag', 'will', 'ich', 'lange', 'schlafen'], 'Modal en 2 e infinitivo al final.', [['Ich', 'will', 'am', 'Sonntag', 'lange', 'schlafen']]],
    ['Mañana puedo trabajar en casa.', ['Morgen', 'kann', 'ich', 'zu', 'Hause', 'arbeiten'], 'Modal en 2 e infinitivo al final.', [['Ich', 'kann', 'morgen', 'zu', 'Hause', 'arbeiten']]],
    ['Ayer jugamos fútbol.', ['Gestern', 'haben', 'wir', 'Fußball', 'gespielt'], 'Perfekt: haben en 2, participio al final.', [['Wir', 'haben', 'gestern', 'Fußball', 'gespielt']]],
    // tiempo y lugar
    ['Trabajo de lunes a viernes en una oficina.', ['Ich', 'arbeite', 'von', 'Montag', 'bis', 'Freitag', 'in', 'einem', 'Büro'], 'Orden habitual: tiempo antes que lugar.', [['Von', 'Montag', 'bis', 'Freitag', 'arbeite', 'ich', 'in', 'einem', 'Büro']]],
    ['Hoy en la noche cocino en casa.', ['Heute', 'Abend', 'koche', 'ich', 'zu', 'Hause'], '«Heute Abend» ocupa la posición 1; verbo en 2.', [['Ich', 'koche', 'heute', 'Abend', 'zu', 'Hause']]],
    ['En invierno esquiamos en Austria.', ['Im', 'Winter', 'fahren', 'wir', 'in', 'Österreich', 'Ski'], 'Tiempo en 1, verbo en 2, lugar después, Ski al final.', [['Wir', 'fahren', 'im', 'Winter', 'in', 'Österreich', 'Ski']]]
  ];
  S.forEach(s => out.push(M.bd(s[0], s[1], s[2], s[3])));
  const Q = (q, a, w, why) => out.push(M.mc(q, a, w, why, 'Estructura'));
  Q('¿Qué frase está bien ordenada?', 'Heute gehe ich ins Kino.', ['Heute ich gehe ins Kino.', 'Heute ins Kino ich gehe.', 'Gehe heute ich ins Kino.'], 'Si empiezas con «Heute», el verbo sigue en la posición 2 y el sujeto va después.');
  Q('¿Qué frase está bien ordenada?', 'Ich kann gut kochen.', ['Ich kann kochen gut.', 'Ich gut kann kochen.', 'Kochen ich kann gut.'], 'Modal en 2 e infinitivo al final.');
  Q('¿Qué frase está bien ordenada?', 'Wir haben viel gelernt.', ['Wir haben gelernt viel.', 'Wir viel haben gelernt.', 'Gelernt wir haben viel.'], 'Perfekt: haben en 2 y participio al final.');
  Q('¿Qué frase está bien ordenada?', 'Wann stehst du auf?', ['Wann du stehst auf?', 'Wann aufstehst du?', 'Wann stehst auf du?'], 'W-Frage: Wann (1) stehst (2) du ... auf (final).');
  Q('¿Qué frase está bien ordenada?', 'Kaufst du heute ein?', ['Du kaufst heute ein?', 'Einkaufst du heute?', 'Kaufst heute du ein?'], 'Pregunta de sí/no: verbo en 1, prefijo al final.');
  Q('«Satzklammer» (paréntesis verbal) significa:', 'el verbo conjugado en 2 y la otra parte del verbo al final', ['dos verbos juntos al principio', 'el verbo siempre al final', 'que no hay verbo'], 'Ejemplos: Ich stehe ... auf. Ich kann ... schwimmen. Ich habe ... gespielt.');
  Q('En «Am Montag arbeite ich.», ¿qué hay en la posición 1?', 'Am Montag', ['arbeite', 'ich', 'Am'], 'La posición 1 puede tener varias palabras (Am Montag). El verbo va en la 2.');
  return out;
}
LESSONS.gord = () => box('Estructura de la frase: resumen', '') +
  tbl(['Tipo', 'Posición 1', 'Posición 2', 'Resto', 'Final'], [
    ['Afirmación', 'Ich', '<b>wohne</b>', 'in Hamburg.', ''], ['Inversión', 'Heute', '<b>gehe</b>', 'ich ins Kino.', ''], ['W-Frage', 'Wo', '<b>wohnst</b>', 'du?', ''],
    ['Ja/Nein-Frage', '<b>Hast</b>', 'du', 'Hunger?', ''], ['Separable', 'Ich', '<b>stehe</b>', 'um sieben Uhr', '<b>auf</b>.'], ['Modal', 'Ich', '<b>kann</b>', 'gut', '<b>kochen</b>.'], ['Perfekt', 'Ich', '<b>habe</b>', 'Fußball', '<b>gespielt</b>.']]) +
  '<p>Si la frase empieza con tiempo o lugar (<i>Heute</i>, <i>Am Montag</i>, <i>In Berlin</i>), el verbo <b>sigue en la posición 2</b> y el sujeto pasa detrás del verbo.</p>';

/* Verbos de la maestra: cada uno con conjugación completa y frases propias */
function genGTeacher2() {
  const M = maker('gteach');
  const V = ['spielen', 'fernsehen', 'kochen', 'arbeiten', 'telefonieren', 'einkaufen', 'schreiben', 'machen'];
  const out = conjQuestions('gteach', V);
  const F = [
    ['Am Wochenende spielen wir Fußball.', 'El fin de semana jugamos fútbol.'], ['Mein Vater sieht jeden Abend fern.', 'Mi papá ve televisión todas las noches.'],
    ['Heute kocht meine Schwester.', 'Hoy cocina mi hermana.'], ['Du arbeitest zu viel!', '¡Trabajas demasiado!'],
    ['Am Sonntag machen wir ein Picknick im Park.', 'El domingo hacemos un picnic en el parque.'], ['Sie telefoniert mit ihrer Mutter.', 'Ella habla por teléfono con su mamá.'],
    ['Wann kaufst du ein?', '¿Cuándo vas de compras?'], ['Ich schreibe eine E-Mail an Tim.', 'Le escribo un correo a Tim.'],
    ['Machst du jetzt deine Hausaufgaben?', '¿Haces ahora tu tarea?'], ['Nach dem Essen sehen wir fern.', 'Después de comer vemos televisión.'],
    ['Er arbeitet von neun bis fünf.', 'Él trabaja de nueve a cinco.'], ['Ihr kocht sehr gut!', '¡Ustedes cocinan muy bien!']
  ];
  return out.concat(phraseQs('gteach', F, 'Verbos de la maestra'));
}
LESSONS.gteach = () => box('Los verbos que pidió la maestra', '<p>spielen, fernsehen, kochen, arbeiten, ein Picknick machen, telefonieren, einkaufen, schreiben y Hausaufgaben machen, con su conjugación completa.</p>') +
  conjTable(['spielen', 'fernsehen', 'kochen', 'arbeiten', 'telefonieren', 'einkaufen', 'schreiben', 'machen']) +
  ph('Frases de ejemplo', [['Am Wochenende spielen wir Fußball.', 'El fin de semana jugamos fútbol.'], ['Mein Vater sieht jeden Abend fern.', 'Mi papá ve televisión todas las noches.'], ['Am Sonntag machen wir ein Picknick im Park.', 'El domingo hacemos un picnic en el parque.'], ['Wann kaufst du ein?', '¿Cuándo vas de compras?'], ['Machst du jetzt deine Hausaufgaben?', '¿Haces ahora tu tarea?']]);

const L456_LEVELS = [
  { id: 'r4', group: 'Lección 4', exam: 2, icon: '🏠', title: 'Lectura: cuarto libre y anuncios de vivienda', sub: 'Lección 4 (pp. 46, 52, 53 y 56; AB 48)', cats: [], gen: genR4 },
  { id: 'r5', group: 'Lección 5', exam: 2, icon: '🕘', title: 'Lectura: Berlín, Franziska y el cómic', sub: 'Lección 5 E y Zwischendurch (pp. 64 a 69)', cats: [], gen: genR5 },
  { id: 'r6', group: 'Lección 6', exam: 2, icon: '🏔️', title: 'Lectura: Reiseland D-A-CH y clubes', sub: 'Lección 6 E y Zwischendurch (pp. 76, 77 y 80)', cats: [], gen: genR6 },
  { id: 'gart', group: 'Temas de la maestra', exam: 2, icon: '🔵', title: 'Artículo definido y pronombres personales', sub: 'Gramática p. 54 (práctica intensiva)', cats: [], gen: genGArt },
  { id: 'gneg', group: 'Temas de la maestra', exam: 2, icon: '🚫', title: 'Negación: nicht o kein (intensivo)', sub: 'Gramática pp. 42 y 54', cats: [], gen: genGNeg },
  { id: 'gakk', group: 'Temas de la maestra', exam: 2, icon: '🎯', title: 'der o den: nominativo y acusativo', sub: 'Gramática p. 78 (práctica intensiva)', cats: [], gen: genGAkk },
  { id: 'gdoch', group: 'Temas de la maestra', exam: 2, icon: '💬', title: 'ja, nein, doch (intensivo)', sub: 'Lección 6 C (p. 78)', cats: [], gen: genGDoch },
  { id: 'guhr', group: 'Temas de la maestra', exam: 2, icon: '⏰', title: 'Uhrzeiten: hora formal e informal', sub: 'pp. 61, 64, 66 y 78', cats: [], gen: genGUhr },
  { id: 'gteach', group: 'Temas de la maestra', exam: 2, icon: '🧑‍🏫', title: 'Verbos de la maestra: conjugación completa', sub: 'spielen, fernsehen, kochen, arbeiten...', cats: [], gen: genGTeacher2 },
  { id: 'gsep', group: 'Temas de la maestra', exam: 2, icon: '🔀', title: 'Separables e irregulares (e/i, a/ä)', sub: 'Conjugación completa (pp. 66 y 78)', cats: [], gen: genGSep },
  { id: 'gord', group: 'Temas de la maestra', exam: 2, icon: '🧩', title: 'Orden de palabras (intensivo)', sub: 'Posición 2, W-Fragen, Satzklammer, inversión', cats: [], gen: genGOrder }
];
