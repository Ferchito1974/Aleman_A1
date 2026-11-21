/* Lecciones 1, 2 y 3 (Schritte international Neu 1): vocabulario, frases, gramática y preguntas */
'use strict';

/* ---------- utilidades ---------- */
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
const info = (q, de, esx) => { q.info = { de, es: esx }; return q; };
const NN = (a, w, es, pl, hint) => N(a, w, es, pron(w), pl, hint);
const spk = t => '<button class="spk" data-say="' + String(t).replace(/"/g, '&quot;') + '" title="Escuchar" aria-label="Escuchar">🔊</button>';

/* Tabla de frases: Alemán | Se pronuncia | Español. rows = [de, es, nota?] */
function ph(title, rows) {
  return (title ? '<h4>' + title + '</h4>' : '') + '<div class="tw"><table class="t voc ph"><thead><tr><th>Alemán</th><th>Se pronuncia</th><th>Español</th></tr></thead><tbody>' +
    rows.map(r => '<tr><td>' + spk(r[0]) + '<b>' + r[0] + '</b>' + (r[2] ? '<br><small>' + r[2] + '</small>' : '') + '</td><td class="pr">' + pron(r[0]) + '</td><td class="es" data-reveal>' + r[1] + '</td></tr>').join('') + '</tbody></table></div>';
}

/* Preguntas a partir de frases: significado, traducción inversa, ordenar y escribir */
function phraseQs(level, rows, tag) {
  const out = [];
  rows.forEach((r, i) => {
    const de = r[0], esx = r[1], note = r[2] ? ' ' + r[2] : '';
    const id = level + ':p:' + hash(de);
    PHR.set(de, esx);
    const others = rows.filter((x, j) => j !== i && x[0] !== de && x[1] !== esx);
    const say = '«' + de + '» = «' + esx + '». Se pronuncia «' + pron(de) + '».' + note;
    out.push(info(mc(id + ':a', level, '¿Qué significa «' + de + '»?', esx, sample(others.map(x => x[1]), 3), say, tag || 'Frases'), de, esx));
    out.push(info(mc(id + ':b', level, '¿Cómo se dice en alemán: «' + esx + '»?', de, sample(others.map(x => x[0]), 3), say, tag || 'Frases'), de, esx));
    const words = de.replace(/[.!?¿¡,]/g, '').split(/\s+/).filter(Boolean);
    if (words.length >= 3 && words.length <= 7) out.push(info(bd(id + ':c', level, esx, words, say + ' Recuerda: en la frase, el verbo conjugado va en la posición 2.', [], []), de, esx));
    if (words.length >= 1 && words.length <= 4 && !/\.\.\./.test(de)) out.push(info(ty(id + ':d', level, 'Escribe en alemán: «' + esx + '»', [de.replace(/[.!?]$/, '')], say, tag || 'Escritura'), de, esx));
  });
  return out;
}

function maker(level) {
  return {
    mc: (q, ans, wrong, why, tag) => mc(level + ':h:' + hash(q + ans), level, q, ans, wrong, why, tag),
    ty: (q, ans, why, tag) => ty(level + ':h:' + hash(q + String(ans)), level, q, ans, why, tag),
    bd: (esx, tokens, why, alts) => bd(level + ':h:' + hash(esx + tokens.join(' ')), level, esx, tokens, why, alts || [], [])
  };
}

/* números 0 a 99 en alemán */
const TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
function numDe(n) {
  if (n === 100) return 'hundert';
  if (n < 20) return n === 1 ? 'eins' : ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return o === 0 ? TENS[t] : ONES[o] + 'und' + TENS[t];
}
const SMALL_PRON = ['nul', 'ains', 'tsvai', 'drai', 'fia', 'fünf', 'seks', 'zí-ben', 'ajt', 'noin', 'tsen', 'elf', 'tsvölf', 'drái-tsen', 'fír-tsen', 'fünf-tsen', 'séj-tsen', 'zíp-tsen', 'áj-tsen', 'nóin-tsen', 'tsván-tsij'];

/* verbos nuevos */
[['heißen', 'llamarse', 'jái-sen'], ['leben', 'vivir', 'lé-ben'], ['brauchen', 'necesitar', 'bráu-jen'], ['kaufen', 'comprar', 'káu-fen'],
  ['buchstabieren', 'deletrear', 'buj-shta-bí-ren'], ['schmecken', 'saber (tener sabor)', 'shmé-ken'], ['studieren', 'estudiar (en la universidad)', 'shtu-dí-ren'],
  ['helfen', 'ayudar', 'jél-fen'], ['essen', 'comer', 'é-sen']].forEach(v => { if (!VERBS.find(x => x[0] === v[0])) VERBS.push(v); });
IRR.helfen = ['helfe', 'hilfst', 'hilft', 'helfen', 'helft', 'helfen'];
VOWEL.helfen = 'e → i';

/* ---------- sustantivos nuevos ---------- */
CATS.addr = { title: 'Datos y tarjeta de visita (Lección 1 E)', items: [
  NN('das', 'Land', 'país', 'Länder'), NN('die', 'Stadt', 'ciudad', 'Städte'), NN('die', 'Straße', 'calle', 'Straßen'),
  NN('der', 'Vorname', 'nombre de pila', 'Vornamen'), NN('der', 'Familienname', 'apellido', 'Familiennamen'), NN('der', 'Nachname', 'apellido (otra palabra)', 'Nachnamen'),
  NN('die', 'Postleitzahl', 'código postal', 'Postleitzahlen', 'Palabra compuesta; las palabras en -zahl son femeninas (die Zahl).'),
  NN('die', 'Adresse', 'dirección', 'Adressen', 'Las palabras en -e suelen ser femeninas.'), NN('der', 'Name', 'nombre', 'Namen'),
  NN('die', 'Sprache', 'idioma', 'Sprachen'), NN('das', 'Telefon', 'teléfono', 'Telefone'), NN('die', 'Visitenkarte', 'tarjeta de visita', 'Visitenkarten'),
  NN('das', 'Formular', 'formulario', 'Formulare'), NN('die', 'Firma', 'empresa', 'Firmen'), NN('der', 'Buchstabe', 'letra', 'Buchstaben'), NN('das', 'Alphabet', 'alfabeto')
]};
CATS.family = { title: 'La familia (Lección 2 B)', items: [
  NN('der', 'Vater', 'padre', 'Väter'), NN('die', 'Mutter', 'madre', 'Mütter'), NN('die', 'Eltern', 'padres (siempre plural)', null, 'Solo existe en plural: die Eltern.'),
  NN('der', 'Bruder', 'hermano', 'Brüder'), NN('die', 'Schwester', 'hermana', 'Schwestern'), NN('die', 'Geschwister', 'hermanos (hermanos y hermanas)', null, 'Solo existe en plural: die Geschwister.'),
  NN('das', 'Kind', 'niño / hijo(a)', 'Kinder'), NN('der', 'Sohn', 'hijo', 'Söhne'), NN('die', 'Tochter', 'hija', 'Töchter'),
  NN('die', 'Großeltern', 'abuelos (siempre plural)', null, 'Solo existe en plural: die Großeltern.'), NN('die', 'Oma', 'abuela', 'Omas'), NN('der', 'Opa', 'abuelo', 'Opas'),
  NN('die', 'Großmutter', 'abuela (formal)', 'Großmütter'), NN('der', 'Großvater', 'abuelo (formal)', 'Großväter'),
  NN('die', 'Enkelin', 'nieta', 'Enkelinnen', 'Las palabras en -in (mujeres) son femeninas.'), NN('die', 'Frau', 'esposa / mujer / señora', 'Frauen'), NN('der', 'Mann', 'esposo / hombre', 'Männer'),
  NN('die', 'Ehefrau', 'esposa', 'Ehefrauen'), NN('die', 'Familie', 'familia', 'Familien')
]};
CATS.data2 = { title: 'Datos personales y lugares (Lección 2 D, E)', items: [
  NN('das', 'Heimatland', 'país de origen', 'Heimatländer', 'Palabra compuesta: toma el género de la última parte, das Land.'), NN('der', 'Geburtsort', 'lugar de nacimiento', 'Geburtsorte'),
  NN('der', 'Wohnort', 'lugar de residencia', 'Wohnorte'), NN('die', 'Telefonnummer', 'número de teléfono', 'Telefonnummern'), NN('der', 'Familienstand', 'estado civil'),
  NN('das', 'Alter', 'edad'), NN('die', 'Hauptstadt', 'capital', 'Hauptstädte'), NN('der', 'Norden', 'norte'), NN('der', 'Süden', 'sur'), NN('der', 'Osten', 'este'), NN('der', 'Westen', 'oeste')
]};
CATS.food3 = { title: 'Alimentos (Lección 3)', items: [
  NN('das', 'Ei', 'huevo', 'Eier'), NN('der', 'Apfel', 'manzana', 'Äpfel'), NN('die', 'Banane', 'plátano', 'Bananen'), NN('die', 'Orange', 'naranja', 'Orangen'),
  NN('der', 'Kuchen', 'pastel', 'Kuchen'), NN('der', 'Kaffee', 'café', null), NN('der', 'Saft', 'jugo', 'Säfte'), NN('das', 'Brötchen', 'panecillo', 'Brötchen', 'Las palabras en -chen son siempre neutras (das).'),
  NN('das', 'Würstchen', 'salchicha', 'Würstchen', 'Las palabras en -chen son siempre neutras (das).'), NN('die', 'Birne', 'pera', 'Birnen'), NN('die', 'Tomate', 'jitomate', 'Tomaten'), NN('die', 'Kiwi', 'kiwi', 'Kiwis'),
  NN('das', 'Brot', 'pan', 'Brote'), NN('der', 'Pfannkuchen', 'panqué (hot cake)', 'Pfannkuchen'), NN('die', 'Schokolade', 'chocolate', 'Schokoladen'), NN('die', 'Milch', 'leche'),
  NN('die', 'Butter', 'mantequilla'), NN('das', 'Mehl', 'harina'), NN('der', 'Zucker', 'azúcar'), NN('das', 'Fleisch', 'carne'), NN('der', 'Fisch', 'pescado', 'Fische'),
  NN('der', 'Reis', 'arroz'), NN('der', 'Wein', 'vino', 'Weine'), NN('das', 'Bier', 'cerveza', 'Biere'), NN('der', 'Tee', 'té'), NN('das', 'Obst', 'fruta'), NN('das', 'Gemüse', 'verdura'),
  NN('der', 'Käse', 'queso'), NN('das', 'Salz', 'sal'), NN('das', 'Mineralwasser', 'agua mineral'), NN('die', 'Kartoffel', 'papa', 'Kartoffeln'), NN('der', 'Joghurt', 'yogur', 'Joghurts'),
  NN('die', 'Zwiebel', 'cebolla', 'Zwiebeln'), NN('das', 'Wasser', 'agua'), NN('die', 'Cola', 'cola'), NN('die', 'Sahne', 'crema'), NN('das', 'Öl', 'aceite')
]};
CATS.eat3 = { title: 'Platillos, medidas y lugares (Lección 3 D, E)', items: [
  NN('das', 'Steak', 'bistec', 'Steaks'), NN('der', 'Salat', 'ensalada', 'Salate'), NN('die', 'Pizza', 'pizza', 'Pizzen'), NN('das', 'Hähnchen', 'pollo'), NN('die', 'Pommes', 'papas fritas (plural)', null, 'Siempre en plural: die Pommes.'),
  NN('die', 'Suppe', 'sopa', 'Suppen'), NN('die', 'Gemüsesuppe', 'sopa de verduras', 'Gemüsesuppen'), NN('die', 'Gemüsebrühe', 'caldo de verduras'), NN('das', 'Rezept', 'receta', 'Rezepte'),
  NN('die', 'Flasche', 'botella', 'Flaschen'), NN('die', 'Packung', 'paquete', 'Packungen', 'Las palabras en -ung son siempre femeninas.'), NN('die', 'Dose', 'lata', 'Dosen'), NN('der', 'Becher', 'vaso / envase', 'Becher'),
  NN('das', 'Glas', 'vaso (de vidrio)', 'Gläser'), NN('das', 'Kilo', 'kilo'), NN('das', 'Pfund', 'libra (500 g)'), NN('das', 'Gramm', 'gramo'), NN('der', 'Liter', 'litro'), NN('der', 'Euro', 'euro', 'Euros'), NN('der', 'Cent', 'centavo', 'Cents'),
  NN('die', 'Mensa', 'comedor universitario'), NN('das', 'Restaurant', 'restaurante', 'Restaurants'), NN('das', 'Lieblingsessen', 'comida favorita'), NN('das', 'Lieblingsgetränk', 'bebida favorita'),
  NN('der', 'Hunger', 'hambre'), NN('der', 'Durst', 'sed')
]};

/* ============ NIVEL: Saludos ============ */
const R_GREET = [
  ['Hallo.', 'Hola.'], ['Guten Morgen.', 'Buenos días (de 6 a 11 h).'], ['Guten Tag.', 'Buenas tardes / buen día (de 11 a 18 h).'], ['Guten Abend.', 'Buenas noches (al llegar, desde las 18 h).'],
  ['Gute Nacht.', 'Buenas noches (al despedirse para dormir).'], ['Auf Wiedersehen.', 'Adiós (hasta volver a vernos).'], ['Auf Wiederhören.', 'Adiós (solo por teléfono).'], ['Tschüs.', 'Chao (informal).'],
  ['Bis später.', 'Hasta luego.'], ['Herzlich willkommen.', 'Bienvenido de todo corazón.'], ['Willkommen.', 'Bienvenido.'], ['Freut mich.', 'Mucho gusto.'],
  ['Guten Morgen, Frau Eco.', 'Buenos días, señora Eco.'], ['Guten Tag, Herr Díaz.', 'Buenas tardes, señor Díaz.'], ['Guten Abend, Alexander.', 'Buenas noches, Alexander.'],
  ['Guten Abend, meine Damen und Herren.', 'Buenas noches, damas y caballeros.'], ['Gute Nacht, Herr Schröder.', 'Buenas noches, señor Schröder.'], ['Tschüs, Heike.', 'Chao, Heike.']
];
const R_REGION = [['Moin.', 'Hola (norte de Alemania).'], ['Servus.', 'Hola / adiós (sur de Alemania y Austria).'], ['Grüezi.', 'Hola (Suiza).'], ['Grüß Gott.', 'Hola (sur de Alemania y Austria).'], ['Tach.', 'Hola (coloquial, centro-norte).'], ['Uf Wiederluege.', 'Adiós (Suiza).']];

function genGreet() {
  const M = maker('l1greet'); const out = phraseQs('l1greet', R_GREET, 'Saludos').concat(phraseQs('l1greet', R_REGION, 'Regional'));
  [['6:30', 'Guten Morgen', '6 a 11 h = Guten Morgen.'], ['9:00', 'Guten Morgen', '6 a 11 h = Guten Morgen.'], ['13:00', 'Guten Tag', '11 a 18 h = Guten Tag.'], ['15:30', 'Guten Tag', '11 a 18 h = Guten Tag.'],
    ['17:30', 'Guten Tag', 'Hasta las 18 h todavía es Guten Tag.'], ['19:30', 'Guten Abend', 'Desde las 18 h = Guten Abend.'], ['20:45', 'Guten Abend', 'Desde las 18 h = Guten Abend.'], ['22:00', 'Guten Abend', 'Al llegar o saludar de noche = Guten Abend. (Gute Nacht es solo para despedirse).']].forEach(x => {
    out.push(M.mc('Son las ' + x[0] + ' h y saludas a alguien. ¿Qué dices?', x[1], ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'].filter(y => y !== x[1]), x[2], 'Hora del día'));
  });
  out.push(M.mc('Te vas a dormir y te despides de tu familia:', 'Gute Nacht.', ['Guten Abend.', 'Guten Tag.', 'Hallo.'], 'Gute Nacht se dice solo al despedirse para dormir. Guten Abend se usa al llegar.', 'Hora del día'));
  out.push(M.mc('Terminas una llamada de teléfono formal. ¿Qué dices?', 'Auf Wiederhören.', ['Auf Wiedersehen.', 'Guten Tag.', 'Willkommen.'], 'Wiederhören = volver a oírse (por teléfono). Wiedersehen = volver a verse.', 'Despedidas'));
  out.push(M.mc('Con un amigo, para despedirte de manera informal:', 'Tschüs!', ['Auf Wiedersehen.', 'Guten Abend.', 'Freut mich.'], 'Tschüs es la despedida informal. Auf Wiedersehen es más formal.', 'Despedidas'));
  out.push(M.mc('Una persona llega a tu casa. Le dices:', 'Herzlich willkommen!', ['Gute Nacht!', 'Bis später!', 'Tut mir leid.'], 'Herzlich willkommen = bienvenido de todo corazón.', 'Frases'));
  out.push(M.mc('Estás en Suiza y alguien te dice «Grüezi». Significa:', 'Hola', ['Adiós', 'Gracias', 'Lo siento'], 'Grüezi es el saludo suizo. Servus y Grüß Gott se usan en el sur de Alemania y Austria; Moin en el norte.', 'Regional'));
  out.push(M.mc('¿Qué saludo es típico del norte de Alemania?', 'Moin', ['Servus', 'Grüezi', 'Grüß Gott'], 'Moin se oye en el norte. Servus y Grüß Gott en el sur y Austria; Grüezi en Suiza.', 'Regional'));
  out.push(M.mc('¿Qué significa «Herr» y «Frau» antes de un apellido?', 'señor y señora', ['hermano y hermana', 'hola y adiós', 'padre y madre'], 'Herr Díaz = señor Díaz, Frau Eco = señora Eco. Frau también significa «esposa».', 'Vocabulario'));
  out.push(M.ty('Completa: «Guten ___, Frau Eco.» (son las 6:30)', 'Morgen', 'A las 6:30 es «Guten Morgen». Los sustantivos se escriben con mayúscula.', 'Hora del día'));
  out.push(M.ty('Completa con una sola palabra: «Auf ___!» (adiós, cara a cara)', 'Wiedersehen', 'Auf Wiedersehen. Si es por teléfono: Auf Wiederhören.', 'Despedidas'));
  out.push(M.bd('Buenas tardes, señor Díaz.', ['Guten', 'Tag', 'Herr', 'Díaz'], 'Guten Tag, Herr Díaz. Primero el saludo, después Herr/Frau y el apellido.'));
  return out;
}
LESSONS.l1greet = () => box('Cómo usar esta lección', '<p>Cada frase trae su <b>pronunciación</b> en letras españolas y su <b>traducción</b>. Toca 🔊 para oírla con voz alemana. La pronunciación escrita es aproximada: usa el audio para afinarla.</p>') +
  ph('Saludos y despedidas (p. 12 y 18)', R_GREET) +
  box('Regla de las horas del día (p. 12)', tbl(['Hora', 'Saludo'], [['6 a 11 h', '(Guten) Morgen'], ['11 a 18 h', '(Guten) Tag'], ['desde las 18 h', 'Guten Abend']]) + '<p><b>Gute Nacht</b> solo para despedirse e irse a dormir. <b>Herr</b> = señor, <b>Frau</b> = señora.</p>') +
  ph('Saludos regionales (p. 21)', R_REGION);

/* ============ NIVEL: Nombre, origen, idiomas ============ */
const R_NAME = [
  ['Wie heißen Sie?', '¿Cómo se llama usted?'], ['Wie heißt du?', '¿Cómo te llamas?'], ['Ich heiße Lara Nowak.', 'Me llamo Lara Nowak.'], ['Mein Name ist Walter Baumann.', 'Mi nombre es Walter Baumann.'],
  ['Ich bin Lili.', 'Soy Lili.'], ['Wer ist das?', '¿Quién es?'], ['Das ist Herr Yulu.', 'Este es el señor Yulu.'], ['Wer sind Sie?', '¿Quién es usted?'], ['Wer bist du?', '¿Quién eres?'],
  ['Wie ist Ihr Name?', '¿Cuál es su nombre?'], ['Woher kommen Sie?', '¿De dónde viene usted?'], ['Woher kommst du?', '¿De dónde vienes?'], ['Ich komme aus Polen.', 'Vengo de Polonia.'],
  ['Aus Deutschland.', 'De Alemania.'], ['Ich komme von der Firma Teletec.', 'Vengo de la empresa Teletec.'], ['Was sprechen Sie?', '¿Qué habla usted?'], ['Was sprichst du?', '¿Qué hablas?'],
  ['Ich spreche Deutsch und Englisch.', 'Hablo alemán e inglés.'], ['Ich spreche ein bisschen Deutsch.', 'Hablo un poco de alemán.'], ['Sie sprechen gut Deutsch.', 'Usted habla bien alemán.'],
  ['Nein, nein. Nur ein bisschen.', 'No, no. Solo un poquito.'], ['Freut mich.', 'Mucho gusto.']
];
const R_POLITE = [
  ['Entschuldigung.', 'Disculpe / perdón.'], ['Entschuldigung, wie heißen Sie?', 'Disculpe, ¿cómo se llama usted?'], ['Tut mir leid.', 'Lo siento.'], ['Vielen Dank.', 'Muchas gracias.'], ['Danke.', 'Gracias.'],
  ['Wie bitte?', '¿Cómo dijo? / ¿Perdón?'], ['Einen Moment, bitte.', 'Un momento, por favor.'], ['Ich weiß es nicht.', 'No lo sé.'], ['Ja, stimmt.', 'Sí, es cierto.'], ['Ja, gut.', 'Sí, está bien.'],
  ['Ah, schön.', 'Ah, qué bien.'], ['Aha!', '¡Ajá!'], ['Ah ja.', 'Ah, sí.'], ['Nein, falsch.', 'No, es falso.'], ['Ja, genau.', 'Sí, exacto.'], ['Ist Frau Beck da, bitte?', '¿Está la señora Beck, por favor?']
];
const COUNTRIES = [
  ['Deutschland', 'Alemania', '', 'aus Deutschland'], ['Österreich', 'Austria', '', 'aus Österreich'], ['Polen', 'Polonia', '', 'aus Polen'], ['Spanien', 'España', '', 'aus Spanien'],
  ['Frankreich', 'Francia', '', 'aus Frankreich'], ['Italien', 'Italia', '', 'aus Italien'], ['Finnland', 'Finlandia', '', 'aus Finnland'], ['Portugal', 'Portugal', '', 'aus Portugal'],
  ['Ungarn', 'Hungría', '', 'aus Ungarn'], ['Marokko', 'Marruecos', '', 'aus Marokko'], ['Kanada', 'Canadá', '', 'aus Kanada'], ['Mexiko', 'México', '', 'aus Mexiko'],
  ['die Schweiz', 'Suiza', 'f', 'aus der Schweiz'], ['die Türkei', 'Turquía', 'f', 'aus der Türkei'], ['der Jemen', 'Yemen', 'm', 'aus dem Jemen'], ['der Sudan', 'Sudán', 'm', 'aus dem Sudan'], ['die USA', 'Estados Unidos', 'p', 'aus den USA']
];
const LANGS = [['Deutsch', 'alemán'], ['Englisch', 'inglés'], ['Spanisch', 'español'], ['Französisch', 'francés'], ['Italienisch', 'italiano'], ['Polnisch', 'polaco'], ['Russisch', 'ruso'], ['Türkisch', 'turco'],
  ['Arabisch', 'árabe'], ['Chinesisch', 'chino'], ['Griechisch', 'griego'], ['Ungarisch', 'húngaro']];

function genName() {
  const M = maker('l1name'); const out = phraseQs('l1name', R_NAME, 'Presentarse').concat(phraseQs('l1name', R_POLITE, 'Estrategias'));
  COUNTRIES.forEach(c => {
    const nm = c[0].replace(/^(die|der) /, '');
    out.push(info(M.mc('¿Cómo se dice «' + c[1] + '» en alemán?', c[0], sample(COUNTRIES.filter(x => x[0] !== c[0]).map(x => x[0]), 3), c[0] + ' = ' + c[1] + '. «Ich komme ' + c[3] + '». Se pronuncia «' + pron(c[0]) + '».', 'Países'), c[0], c[1]));
    out.push(info(M.ty('Escribe la frase corta «Vengo de ' + c[1] + '» empezando con «Ich komme».', ['Ich komme ' + c[3]], 'Ich komme ' + c[3] + '. ' + (c[2] === 'f' ? 'Países femeninos: aus der.' : c[2] === 'm' ? 'Países masculinos: aus dem.' : c[2] === 'p' ? 'Países plurales: aus den.' : 'La mayoría de los países no llevan artículo.'), 'Países'), 'Ich komme ' + c[3], 'Vengo de ' + c[1]));
  });
  out.push(M.mc('Completa: «Ich komme aus ___ Schweiz.»', 'der', ['dem', 'den', 'das'], 'die Schweiz es femenino: aus der Schweiz. Lo mismo: aus der Türkei.', 'Países'));
  out.push(M.mc('Completa: «Ich komme aus ___ USA.»', 'den', ['der', 'dem', 'die'], 'die USA es plural: aus den USA.', 'Países'));
  out.push(M.mc('Completa: «Er kommt aus ___ Jemen.»', 'dem', ['der', 'den', 'das'], 'der Jemen es masculino: aus dem Jemen. Lo mismo: aus dem Sudan.', 'Países'));
  out.push(M.mc('Completa: «Wir kommen aus ___ Spanien.»', 'ø (sin artículo)', ['der', 'dem', 'den'], 'Spanien, Polen, Deutschland, Österreich... no llevan artículo: aus Spanien.', 'Países'));
  LANGS.forEach(l => out.push(info(M.mc('¿Qué idioma es «' + l[0] + '»?', l[1], sample(LANGS.filter(x => x[1] !== l[1]).map(x => x[1]), 3), l[0] + ' = ' + l[1] + '. Se pronuncia «' + pron(l[0]) + '». Los idiomas se escriben con mayúscula.', 'Idiomas'), l[0], l[1])));
  LANGS.slice(0, 8).forEach(l => out.push(M.ty('Escribe en alemán el idioma «' + l[1] + '».', l[0], l[0] + ' (' + l[1] + '). Los idiomas llevan mayúscula.', 'Idiomas')));
  out.push(M.mc('Con tu profesor (formal) preguntas el nombre:', 'Wie heißen Sie?', ['Wie heißt du?', 'Wie heiße Sie?', 'Wie heißt Sie?'], 'Con Sie (formal) el verbo va en plural: heißen Sie. Con du: heißt du.', 'du / Sie'));
  out.push(M.mc('A un compañero de clase (informal) le preguntas:', 'Woher kommst du?', ['Woher kommen Sie?', 'Woher komme du?', 'Woher kommt du?'], 'Con du el verbo termina en -st: kommst du. Con Sie: kommen Sie.', 'du / Sie'));
  out.push(M.mc('¿Qué terminación lleva el verbo con «Sie» (usted)?', '-en', ['-st', '-e', '-t'], 'Sie → -en (igual que el plural): Sie sprechen, Sie heißen. Recuerda: ich -e, du -st, Sie -en.', 'du / Sie'));
  out.push(M.mc('¿Cómo se escribe «usted» en alemán?', 'Sie (con mayúscula)', ['sie', 'du', 'Du'], 'El «usted» formal siempre se escribe Sie con mayúscula. «sie» en minúscula es ella o ellos.', 'du / Sie'));
  out.push(M.mc('«Wie heißt du?» → «Wie heißen Sie?». ¿Qué cambió?', 'Pronombre y terminación del verbo', ['Solo el pronombre', 'Solo la pregunta', 'Nada'], 'Cambian ambos: du + heißt (-st/-t) y Sie + heißen (-en).', 'du / Sie'));
  out.push(M.mc('En «Woher kommst du?», ¿qué palabra está en la posición 2?', 'kommst', ['Woher', 'du', 'Ninguna'], 'En las preguntas con W (W-Frage) el verbo conjugado va siempre en la posición 2: Woher (1) kommst (2) du.', 'Estructura'));
  out.push(M.mc('En «Ich heiße Lara.», ¿en qué posición está el verbo?', 'Posición 2', ['Posición 1', 'Posición 3', 'Al final'], 'En una afirmación el verbo va en la posición 2: Ich (1) heiße (2) Lara.', 'Estructura'));
  out.push(M.mc('¿Qué significa Wer / Wie / Woher / Was?', 'quién / cómo / de dónde / qué', ['qué / quién / cómo / de dónde', 'cuándo / dónde / cómo / quién', 'quién / qué / dónde / cuándo'], 'Wer = quién, Wie = cómo, Woher = de dónde, Was = qué. Son las W-Fragen.', 'W-Fragen'));
  out.push(M.mc('«Das ist Herr Yulu» sirve para:', 'presentar a otra persona', ['presentarte a ti', 'despedirte', 'preguntar la edad'], 'Das ist + nombre presenta a otra persona. Para ti: Ich bin... / Ich heiße...', 'Presentarse'));
  ['Ich ___ Lara Nowak. (heißen)|heiße', 'Du ___ aus Polen. (kommen)|kommst', 'Wie ___ du? (heißen)|heißt', 'Woher ___ Sie? (kommen)|kommen', 'Ich ___ Eduardo. (sein)|bin', 'Du ___ Sara. (sein)|bist', 'Sie ___ Herr Lutz. (sein, formal)|sind', 'Was ___ du? (sprechen)|sprichst', 'Ich ___ Deutsch. (sprechen)|spreche', 'Er ___ gut Deutsch. (sprechen)|spricht'].forEach(s => {
    const [a, b] = s.split('|'); out.push(M.ty('Escribe la forma correcta: ' + a, b, 'La forma es «' + b + '». heißen: -ß + st = heißt. sein es irregular: bin, bist, ist, sind, seid, sind. sprechen: e → i en du y er (sprichst, spricht).', 'Conjugación'));
  });
  out.push(M.bd('Me llamo Lara.', ['Ich', 'heiße', 'Lara'], 'Ich (1) heiße (2) Lara.', [['Ich', 'bin', 'Lara']]));
  out.push(M.bd('¿De dónde vienes?', ['Woher', 'kommst', 'du'], 'Pregunta con W: Woher (1) kommst (2) du.'));
  out.push(M.bd('Yo hablo un poco de alemán.', ['Ich', 'spreche', 'ein', 'bisschen', 'Deutsch'], 'Ich (1) spreche (2) ein bisschen Deutsch.'));
  out.push(M.bd('Vengo de Polonia.', ['Ich', 'komme', 'aus', 'Polen'], 'Ich (1) komme (2) aus Polen.'));
  return out;
}
LESSONS.l1name = () => ph('Presentarse (p. 10 a 15, 18)', R_NAME) + ph('Cortesía y estrategias (p. 19)', R_POLITE) +
  '<h4>Conjugación: kommen, heißen, sein, sprechen (p. 18)</h4>' + conjTable(['kommen', 'heißen', 'sein', 'sprechen']) +
  box('Regla: -e / -st / -en', '<p><b>ich -e</b>, <b>du -st</b>, <b>Sie -en</b>. Atención: <i>du heißt</i> (no «heißst»: la ß ya es una s), <i>du sprichst</i> (e → i). <b>sein</b> es irregular: bin, bist, sind.</p>') +
  box('du o Sie', '<p><b>du</b> = amigos, compañeros, niños. <b>Sie</b> = personas que no conoces o con las que eres formal (maestros, jefes). Preguntas: <i>Wie heißt du?</i> / <i>Wie heißen Sie?</i>; <i>Woher kommst du?</i> / <i>Woher kommen Sie?</i></p>') +
  box('Estructura (p. 18)', tbl(['Posición 1', 'Posición 2 (verbo)', 'Resto'], [['Mein Name', 'ist', 'Walter Baumann.'], ['Ich', 'komme', 'aus Deutschland.'], ['Wer', 'ist', 'das?'], ['Woher', 'kommen', 'Sie?'], ['Was', 'sprechen', 'Sie?']]) + '<p>El verbo conjugado siempre va en la <b>posición 2</b>, tanto en afirmaciones como en preguntas con W (Wer, Wie, Woher, Was).</p>') +
  '<h4>Países (p. 14)</h4>' + tbl(['Alemán', 'Se pronuncia', 'Español', 'Frase'], COUNTRIES.map(c => [spk(c[0]) + '<b>' + c[0] + '</b>', '<span class="pr">' + pron(c[0]) + '</span>', c[1], 'Ich komme ' + c[3]])) +
  box('aus + país', tbl(['aus', 'aus dem', 'aus der', 'aus den'], [['Deutschland, Österreich, Polen, Spanien', 'der Jemen, der Sudan', 'die Schweiz, die Türkei', 'die USA']])) +
  '<h4>Idiomas (p. 15)</h4>' + tbl(['Alemán', 'Se pronuncia', 'Español'], LANGS.map(l => [spk(l[0]) + '<b>' + l[0] + '</b>', '<span class="pr">' + pron(l[0]) + '</span>', l[1]]));

/* ============ NIVEL: Alfabeto, deletrear, datos ============ */
const ABC = [['A', 'a', 'a'], ['B', 'be', 'be'], ['C', 'tse', 'tse'], ['D', 'de', 'de'], ['E', 'e', 'e'], ['F', 'ef', 'ef'], ['G', 'ge', 'gue'], ['H', 'ha', 'ja'], ['I', 'i', 'i'], ['J', 'jot', 'yot'], ['K', 'ka', 'ka'],
  ['L', 'el', 'el'], ['M', 'em', 'em'], ['N', 'en', 'en'], ['O', 'o', 'o'], ['P', 'pe', 'pe'], ['Q', 'ku', 'ku'], ['R', 'er', 'er'], ['S', 'es', 'es'], ['T', 'te', 'te'], ['U', 'u', 'u'], ['V', 'vau', 'fau'],
  ['W', 'we', 've'], ['X', 'iks', 'iks'], ['Y', 'ypsilon', 'üpsilon'], ['Z', 'tsett', 'tset'], ['Ä', 'ä', 'e abierta'], ['Ö', 'ö', 'ö'], ['Ü', 'ü', 'ü'], ['ß', 'eszett', 'estset']];
const R_ABC = [
  ['Wie bitte?', '¿Cómo dijo?'], ['Buchstabieren Sie, bitte.', 'Deletree, por favor.'], ['Ich buchstabiere: Y-U-L-U.', 'Deletreo: Y-U-L-U.'], ['Wie ist Ihr Name?', '¿Cuál es su nombre?'],
  ['Firma Microlab, Tina Schwarz, guten Tag.', 'Empresa Microlab, Tina Schwarz, buenas tardes.'], ['Ist Frau Beck da, bitte?', '¿Está la señora Beck, por favor?'], ['Einen Moment, bitte.', 'Un momento, por favor.'],
  ['Tut mir leid, Frau Beck ist nicht da.', 'Lo siento, la señora Beck no está.'], ['Ja, gut. Vielen Dank.', 'Sí, bien. Muchas gracias.'], ['Auf Wiederhören.', 'Adiós (por teléfono).'],
  ['Ich heiße Maria Bari.', 'Me llamo Maria Bari.'], ['Wie heißt das auf Deutsch?', '¿Cómo se dice eso en alemán?']
];
const R_CARD = [['Familienname', 'apellido'], ['Vorname', 'nombre de pila'], ['Straße', 'calle'], ['Stadt', 'ciudad'], ['Land', 'país'], ['Postleitzahl', 'código postal'], ['Telefon', 'teléfono']];

function genAbc() {
  const M = maker('l1abc'); const out = phraseQs('l1abc', R_ABC, 'Teléfono y deletreo');
  const letters = ABC.slice(0, 26);
  letters.forEach(l => {
    out.push(M.mc('¿Cómo se llama la letra «' + l[0] + '» en alemán?', l[1], sample(ABC.filter(x => x[1] !== l[1]).map(x => x[1]), 3), 'La letra ' + l[0] + ' se llama «' + l[1] + '» (se oye «' + l[2] + '»).', 'Alfabeto'));
  });
  ['ß', 'Ä', 'Ö', 'Ü'].forEach(c => { const l = ABC.find(x => x[0] === c); out.push(M.mc('¿Cómo se llama el signo «' + c + '»?', l[1], sample(ABC.filter(x => x[1] !== l[1]).map(x => x[1]), 3), c + ' se llama «' + l[1] + '». ' + (c === 'ß' ? 'Es una s fuerte (Straße = «shtrá-se»).' : 'Es un umlaut: cambia el sonido de la vocal.'), 'Alfabeto'));});
  [['ha-a-el-el-o', 'Hallo'], ['te-a-ge', 'Tag'], ['de-a-en-ka-e', 'Danke'], ['be-i-te-te-e', 'bitte'], ['en-a-em-e', 'Name'], ['ge-u-te-en', 'guten'], ['ef-er-a-u', 'Frau']].forEach(x => {
    out.push(M.mc('Alguien deletrea «' + x[0] + '». ¿Qué palabra es?', x[1], sample(['Hallo', 'Tag', 'Danke', 'bitte', 'Name', 'guten', 'Frau', 'Land'].filter(y => y !== x[1]), 3), 'Letra por letra: ' + x[0] + ' = ' + x[1] + '.', 'Deletreo'));
  });
  [['J', 'jot'], ['W', 'we'], ['V', 'vau'], ['Q', 'ku'], ['Y', 'ypsilon'], ['Z', 'tsett'], ['H', 'ha'], ['C', 'tse']].forEach(x => out.push(M.ty('Escribe cómo se llama en alemán la letra «' + x[0] + '».', x[1], 'La letra ' + x[0] + ' se llama «' + x[1] + '».', 'Alfabeto')));
  R_CARD.forEach(c => out.push(info(M.mc('¿Qué significa «' + c[0] + '» en una tarjeta o formulario?', c[1], sample(R_CARD.filter(x => x[1] !== c[1]).map(x => x[1]), 3), c[0] + ' = ' + c[1] + '. Se pronuncia «' + pron(c[0]) + '».', 'Formulario'), c[0], c[1])));
  [['D', 'Deutschland'], ['A', 'Österreich'], ['CH', 'die Schweiz'], ['FL', 'Liechtenstein']].forEach(x => out.push(info(M.mc('¿Qué país indica la abreviatura «' + x[0] + '» (p. 17)?', x[1], ['Deutschland', 'Österreich', 'die Schweiz', 'Liechtenstein'].filter(y => y !== x[1]), x[0] + ' = ' + x[1] + '. D, A, CH, FL son los países de lengua alemana en las tarjetas de visita.', 'Países'), x[1], '')));
  out.push(M.mc('Quieres que te repitan o deletreen algo. ¿Qué dices?', 'Wie bitte? Buchstabieren Sie, bitte.', ['Tut mir leid.', 'Vielen Dank.', 'Ich weiß es nicht.'], 'Wie bitte? = ¿cómo dijo? Buchstabieren Sie, bitte = deletree, por favor.', 'Teléfono y deletreo'));
  out.push(M.mc('En el teléfono te dicen «Einen Moment, bitte». ¿Qué piden?', 'Que esperes un momento', ['Que deletrees', 'Que cuelgues', 'Que repitas'], 'Einen Moment, bitte = un momento, por favor.', 'Teléfono y deletreo'));
  out.push(M.bd('¿Está la señora Beck?', ['Ist', 'Frau', 'Beck', 'da'], 'Ist Frau Beck da? Pregunta de sí/no: el verbo va en la posición 1.'));
  return out;
}
LESSONS.l1abc = () => '<h4>Das Alphabet (p. 16)</h4>' + tbl(['Letra', 'Se llama (libro)', 'Se oye'], ABC.map(l => [spk(l[1]) + '<b>' + l[0] + '</b>', l[1], '<span class="pr">' + l[2] + '</span>'])) +
  box('Letras especiales', '<p><b>ä</b>, <b>ö</b>, <b>ü</b> (umlaut) y <b>ß</b> (eszett, una s fuerte). Si no tienes el teclado alemán, ä = ae, ö = oe, ü = ue, ß = ss. En esta app tienes botones para escribirlas.</p>') +
  ph('Al teléfono y deletrear (p. 16 y 19)', R_ABC) +
  vocabTable('addr') +
  box('Países en las tarjetas (p. 17)', tbl(['Abreviatura', 'País'], [['D', 'Deutschland (Alemania)'], ['A', 'Österreich (Austria)'], ['CH', 'die Schweiz (Suiza)'], ['FL', 'Liechtenstein']]));

/* ============ LECCIÓN 2 ============ */
const R_FAMILY = [
  ['Das ist mein Vater.', 'Este es mi padre.'], ['Das ist meine Mutter.', 'Esta es mi madre.'], ['Das sind meine Eltern.', 'Ellos son mis padres.'], ['Das sind meine Großeltern.', 'Ellos son mis abuelos.'],
  ['Das ist mein Bruder.', 'Este es mi hermano.'], ['Das ist meine Schwester.', 'Esta es mi hermana.'], ['Das ist meine Tochter.', 'Esta es mi hija.'], ['Das ist mein Sohn.', 'Este es mi hijo.'],
  ['Das ist meine Enkelin.', 'Esta es mi nieta.'], ['Das ist meine Frau.', 'Esta es mi esposa.'], ['Wer ist das?', '¿Quién es?'], ['Wer ist das? Dein Bruder?', '¿Quién es? ¿Tu hermano?'],
  ['Nein, das ist mein Vater.', 'No, es mi padre.'], ['Wer ist das? Ihre Tochter?', '¿Quién es? ¿Su hija?'], ['Nein, das ist meine Enkelin Lili.', 'No, es mi nieta Lili.'],
  ['Wer ist María?', '¿Quién es María?'], ['María ist deine Schwester, oder?', 'María es tu hermana, ¿verdad?'], ['Ja, genau.', 'Sí, exacto.'], ['Nein, falsch.', 'No, está mal.'],
  ['Ihre Familie: Das ist meine Tochter.', 'Su familia: esta es mi hija.']
];
function genFamily() {
  const M = maker('l2family'); const out = nounQuestions('l2family', ['family']).concat(phraseQs('l2family', R_FAMILY, 'Familia'));
  const poss = [['ich', 'm', 'Bruder', 'mein'], ['ich', 'n', 'Kind', 'mein'], ['ich', 'f', 'Tochter', 'meine'], ['ich', 'p', 'Kinder', 'meine'], ['du', 'm', 'Bruder', 'dein'], ['du', 'n', 'Kind', 'dein'], ['du', 'f', 'Tochter', 'deine'], ['du', 'p', 'Kinder', 'deine'],
    ['Sie', 'm', 'Bruder', 'Ihr'], ['Sie', 'n', 'Kind', 'Ihr'], ['Sie', 'f', 'Tochter', 'Ihre'], ['Sie', 'p', 'Kinder', 'Ihre']];
  const G = { m: 'masculino (der)', n: 'neutro (das)', f: 'femenino (die)', p: 'plural (die)' };
  poss.forEach(p => {
    out.push(M.ty('Completa con el posesivo: «___ ' + p[2] + '» (' + (p[0] === 'Sie' ? 'de usted' : p[0] === 'ich' ? 'mi' : 'tu') + ', ' + G[p[1]] + ')', p[3], p[3] + ' ' + p[2] + '. Posesivos: ich → mein, du → dein, Sie → Ihr. Con femenino y plural se añade -e: ' + p[3].replace(/^./, c => c.toLowerCase()) + (p[1] === 'f' || p[1] === 'p' ? ' (con -e)' : ' (sin -e)') + '. ' + (p[0] === 'Sie' ? 'Ihr/Ihre siempre con mayúscula.' : ''), 'Posesivos'));
  });
  out.push(M.mc('¿Qué posesivo va con «Tochter»?', 'meine', ['mein', 'meins', 'meinen'], 'die Tochter es femenina: meine Tochter (con -e).', 'Posesivos'));
  out.push(M.mc('¿Qué posesivo va con «Kinder» (plural)?', 'meine', ['mein', 'meiner', 'meinen'], 'En plural siempre -e: meine Kinder.', 'Posesivos'));
  out.push(M.mc('¿Qué posesivo va con «Kind» (neutro)?', 'mein', ['meine', 'meinen', 'meins'], 'das Kind es neutro: mein Kind (sin -e).', 'Posesivos'));
  out.push(M.mc('Completa: «Frau Möller, ist das ___ Tochter?» (usted)', 'Ihre', ['Ihr', 'deine', 'meine'], 'Con Sie: Ihr / Ihre. Tochter es femenino → Ihre.', 'Posesivos'));
  out.push(M.mc('«Tim, ist das ___ Bruder?» (a Tim, informal)', 'dein', ['Ihr', 'deine', 'mein'], 'Con du: dein. Bruder es masculino → dein Bruder (sin -e).', 'Posesivos'));
  out.push(M.mc('¿Qué significa «die Eltern»?', 'los padres (papá y mamá)', ['los abuelos', 'los hermanos', 'los hijos'], 'Eltern = padres. Großeltern = abuelos. Geschwister = hermanos. Kinder = hijos / niños.', 'Familia'));
  out.push(M.mc('«Das ___ meine Großeltern.» ¿Qué verbo va?', 'sind', ['ist', 'bin', 'bist'], 'Plural (Großeltern) → Das sind. Singular → Das ist.', 'Estructura'));
  out.push(M.mc('Walter dice de Luise (su esposa): «Das ist ___ Frau.»', 'meine', ['mein', 'dein', 'Ihr'], 'die Frau es femenino: meine Frau.', 'Posesivos'));
  out.push(M.mc('Walter dice de Lili (su nieta): «Das ist ___ Enkelin.»', 'meine', ['mein', 'meinen', 'deine'], 'die Enkelin es femenino: meine Enkelin.', 'Posesivos'));
  out.push(M.mc('Walter dice de Tobias (su hijo): «Das ist ___ Sohn.»', 'mein', ['meine', 'dein', 'meiner'], 'der Sohn es masculino: mein Sohn.', 'Posesivos'));
  out.push(M.bd('Este es mi hermano.', ['Das', 'ist', 'mein', 'Bruder'], 'Das ist mein Bruder. Bruder es masculino: mein.'));
  out.push(M.bd('Ellos son mis abuelos.', ['Das', 'sind', 'meine', 'Großeltern'], 'Plural: Das sind meine Großeltern.'));
  out.push(M.bd('María es tu hermana, ¿verdad?', ['María', 'ist', 'deine', 'Schwester', 'oder'], 'María ist deine Schwester, oder? «oder» al final pide confirmar.'));
  return out;
}
LESSONS.l2family = () => vocabTable('family') +
  box('Posesivos (p. 25 y 30)', tbl(['Persona', 'masculino', 'neutro', 'femenino', 'plural'], [['ich', 'mein Bruder', 'mein Kind', 'meine Tochter', 'meine Kinder'], ['du', 'dein Bruder', 'dein Kind', 'deine Tochter', 'deine Kinder'], ['Sie', 'Ihr Bruder', 'Ihr Kind', 'Ihre Tochter', 'Ihre Kinder']]) +
    '<p>Misma idea que ein / eine: <b>femenino y plural llevan -e</b>. Ihr / Ihre siempre con mayúscula (es el «su» de usted).</p>') +
  ph('Frases de la familia (p. 22, 25 y 30)', R_FAMILY) +
  box('Das ist / Das sind', '<p><b>Das ist</b> + una persona: <i>Das ist mein Vater.</i> <b>Das sind</b> + varias: <i>Das sind meine Großeltern.</i></p>');

/* ---- Cómo estás y pronombres ---- */
const R_FEEL = [
  ['Wie geht\'s?', '¿Cómo estás? (informal)'], ['Wie geht es dir?', '¿Cómo estás? (a ti)'], ['Wie geht es Ihnen?', '¿Cómo está usted?'], ['Und wie geht es dir?', 'Y a ti, ¿cómo te va?'],
  ['Und Ihnen?', '¿Y a usted?'], ['Super.', 'Genial.'], ['Danke, sehr gut.', 'Gracias, muy bien.'], ['Gut, danke.', 'Bien, gracias.'], ['Sehr gut, danke.', 'Muy bien, gracias.'],
  ['Auch gut, danke.', 'También bien, gracias.'], ['Na ja, es geht.', 'Pues, regular.'], ['Ach, nicht so gut.', 'Ay, no tan bien.'], ['Hallo, Tim. Wie geht\'s?', 'Hola, Tim. ¿Cómo estás?'],
  ['Guten Morgen, Herr Baumann. Wie geht es Ihnen?', 'Buenos días, señor Baumann. ¿Cómo está usted?']
];
const R_PRON = [
  ['Das ist Lara. Sie kommt aus Polen.', 'Esta es Lara. Ella viene de Polonia.'], ['Das ist Tim. Er kommt aus Kanada.', 'Este es Tim. Él viene de Canadá.'], ['Er spricht ein bisschen Deutsch.', 'Él habla un poco de alemán.'],
  ['Lara und Tim wohnen jetzt in München.', 'Lara y Tim viven ahora en Múnich.'], ['Laras Vater lebt in Poznań.', 'El padre de Lara vive en Poznań.'], ['Sie sind geschieden.', 'Están divorciados.'],
  ['Wer seid ihr?', '¿Quiénes son ustedes?'], ['Ihr kommt aus Frankreich.', 'Ustedes vienen de Francia.'], ['Wir kommen aus Genf.', 'Venimos de Ginebra.'], ['Woher kommt ihr?', '¿De dónde vienen ustedes?'],
  ['Wir sind Leonie und Pierre.', 'Somos Leonie y Pierre.'], ['Das sind Lara und Tim. Sie kommen aus Polen und Kanada.', 'Ellos son Lara y Tim. Vienen de Polonia y Canadá.']
];
function genFeel() {
  const M = maker('l2feel'); const out = phraseQs('l2feel', R_FEEL, 'Wie geht\'s?').concat(phraseQs('l2feel', R_PRON, 'Pronombres'));
  out.push(M.mc('Un amigo te pregunta «Wie geht\'s?». Respondes que estás muy bien:', 'Danke, sehr gut.', ['Wie heißt du?', 'Tut mir leid.', 'Auf Wiedersehen.'], 'Wie geht\'s? = ¿cómo estás? Respuestas: Super / Danke, sehr gut / Gut, danke.', 'Wie geht\'s?'));
  out.push(M.mc('A tu maestro (formal) le preguntas cómo está:', 'Wie geht es Ihnen?', ['Wie geht es dir?', 'Wie geht es du?', 'Wie geht Ihnen?'], 'Con Sie → Ihnen. Con du → dir.', 'du / Sie'));
  out.push(M.mc('A un amigo le preguntas cómo está:', 'Wie geht es dir?', ['Wie geht es Ihnen?', 'Wie geht es dich?', 'Wie geht dir?'], 'Con du → dir. Con Sie → Ihnen (con mayúscula).', 'du / Sie'));
  out.push(M.mc('Te va regular. ¿Qué dices?', 'Na ja, es geht.', ['Super.', 'Sehr gut, danke.', 'Auch gut, danke.'], 'Na ja, es geht = regular. Ach, nicht so gut = no tan bien.', 'Wie geht\'s?'));
  out.push(M.mc('¿Qué pronombre usas para «Tim»?', 'er', ['sie', 'es', 'wir'], 'Tim es hombre → er. Lara → sie (ella).', 'Pronombres'));
  out.push(M.mc('¿Qué pronombre usas para «Lara und Tim»?', 'sie (plural)', ['er', 'ihr', 'Sie'], 'Varias personas de las que hablas → sie (ellos). El verbo toma la forma del infinitivo: sie kommen.', 'Pronombres'));
  out.push(M.mc('Hablas con Leonie y Pierre (informal). ¿Cómo les preguntas?', 'Woher kommt ihr?', ['Woher kommen sie?', 'Woher kommst du?', 'Woher kommt wir?'], 'ihr = ustedes (informal, plural): ihr kommt (-t).', 'Pronombres'));
  out.push(M.mc('¿Qué terminación lleva el verbo con «ihr»?', '-t', ['-st', '-en', '-e'], 'ihr → -t: ihr kommt, ihr wohnt, ihr habt, ihr seid.', 'Conjugación'));
  out.push(M.mc('¿Qué terminación lleva el verbo con «wir»?', '-en', ['-t', '-st', '-e'], 'wir → -en (igual que el infinitivo): wir kommen.', 'Conjugación'));
  out.push(M.mc('«Sie kommt aus Polen» vs «Sie kommen aus Polen». ¿Cuál es ella?', 'Sie kommt (singular)', ['Sie kommen (singular)', 'Ninguna', 'Las dos'], 'sie + -t = ella (singular). sie + -en = ellos (plural). El verbo te dice cuál es.', 'Pronombres'));
  [['Lara ___ in München. (leben)', 'lebt'], ['Tim und Lara ___ in München. (wohnen)', 'wohnen'], ['Er ___ aus Kanada. (kommen)', 'kommt'], ['Wir ___ aus Genf. (kommen)', 'kommen'], ['Ihr ___ aus Frankreich. (kommen)', 'kommt'],
    ['Wer ___ ihr? (sein)', 'seid'], ['Wir ___ Leonie und Pierre. (sein)', 'sind'], ['Ich ___ Deutsch. (lernen)', 'lerne'], ['Du ___ in Berlin. (wohnen)', 'wohnst'], ['Sie (ella) ___ gut Deutsch. (sprechen)', 'spricht'], ['Ihr ___ Deutsch. (sprechen)', 'sprecht']].forEach(x =>
    out.push(M.ty('Escribe la forma correcta: ' + x[0], x[1], 'La forma es «' + x[1] + '». wir/sie/Sie → -en; ihr → -t; er/sie → -t; ich -e; du -st. sein: seid con ihr, sind con wir.', 'Conjugación')));
  out.push(M.bd('Lara y Tim viven ahora en Múnich.', ['Lara', 'und', 'Tim', 'wohnen', 'jetzt', 'in', 'München'], 'Sujeto compuesto (plural) → wohnen. Verbo en la posición 2 después de «Lara und Tim».'));
  out.push(M.bd('Él habla un poco de alemán.', ['Er', 'spricht', 'ein', 'bisschen', 'Deutsch'], 'sprechen: er spricht (e → i).'));
  out.push(M.bd('Nosotros venimos de Ginebra.', ['Wir', 'kommen', 'aus', 'Genf'], 'wir → kommen.'));
  return out;
}
LESSONS.l2feel = () => ph('Wie geht\'s? (p. 24 y 30)', R_FEEL) +
  box('du / Sie', tbl(['', 'Pregunta', 'Respuesta'], [['du', 'Wie geht\'s? / Wie geht es dir?', 'Gut, danke.'], ['Sie', 'Wie geht\'s? / Wie geht es Ihnen?', 'Gut, danke.']]) + '<p><b>dir</b> (a ti) y <b>Ihnen</b> (a usted) son las formas que usa «Wie geht es...?».</p>') +
  '<h4>Pronombres personales (p. 26)</h4>' + tbl(['Pronombre', 'Significa', 'Verbo (kommen)', 'Ejemplo'], [['ich', 'yo', 'komme', 'Ich komme aus Polen.'], ['du', 'tú', 'kommst', 'Du kommst aus Kanada.'], ['er', 'él', 'kommt', 'Er kommt aus Kanada.'], ['sie', 'ella', 'kommt', 'Sie kommt aus Polen.'],
    ['es', 'ello', 'kommt', '—'], ['wir', 'nosotros', 'kommen', 'Wir kommen aus Genf.'], ['ihr', 'ustedes (informal)', 'kommt', 'Ihr kommt aus Frankreich.'], ['sie', 'ellos / ellas', 'kommen', 'Sie kommen aus Polen.'], ['Sie', 'usted / ustedes', 'kommen', 'Woher kommen Sie?']]) +
  '<h4>Conjugación (p. 30)</h4>' + conjTable(['leben', 'wohnen', 'heißen', 'sprechen', 'sein', 'haben']) +
  box('Resumen', '<p><b>ich -e · du -st · er/sie -t · wir -en · ihr -t · sie/Sie -en.</b> Funcionan igual: leben, wohnen, lernen, kommen. Irregulares: sein, haben, sprechen (e → i).</p>') +
  ph('Frases con pronombres (p. 26)', R_PRON);

/* ---- Números, datos, lugares ---- */
const R_DATA = [
  ['Wie heißen Sie?', '¿Cómo se llama usted?'], ['Wo sind Sie geboren?', '¿Dónde nació usted?'], ['In Biasca. Das liegt in der Schweiz.', 'En Biasca. Eso está en Suiza.'], ['Wo wohnen Sie?', '¿Dónde vive usted?'],
  ['Ich wohne in Hamburg.', 'Vivo en Hamburgo.'], ['Wie ist Ihre Adresse?', '¿Cuál es su dirección?'], ['Marktstraße 1, 20249 Hamburg.', 'Marktstraße 1, 20249 Hamburgo.'], ['Wie ist Ihre Telefonnummer?', '¿Cuál es su número de teléfono?'],
  ['Sind Sie verheiratet?', '¿Es usted casado(a)?'], ['Ja, ich bin verheiratet.', 'Sí, estoy casado(a).'], ['Nein, ich bin ledig.', 'No, soy soltero(a).'], ['Nein, ich bin geschieden.', 'No, estoy divorciado(a).'],
  ['Haben Sie Kinder?', '¿Tiene usted hijos?'], ['Ja, ein Kind.', 'Sí, un hijo.'], ['Ja, zwei Kinder.', 'Sí, dos hijos.'], ['Nein.', 'No.'], ['Wie alt ist Ihr Kind?', '¿Qué edad tiene su hijo?'], ['Drei.', 'Tres.'],
  ['Wie alt sind Ihre Kinder?', '¿Qué edad tienen sus hijos?'], ['Acht und fünf.', 'Ocho y cinco.']
];
const R_PLACE = [
  ['Hamburg ist in Deutschland.', 'Hamburgo está en Alemania.'], ['Hamburg liegt in Deutschland.', 'Hamburgo queda en Alemania.'], ['Wien ist die Hauptstadt von Österreich.', 'Viena es la capital de Austria.'], ['Berlin ist die Hauptstadt von Deutschland.', 'Berlín es la capital de Alemania.'],
  ['Bern ist die Hauptstadt der Schweiz.', 'Berna es la capital de Suiza.'], ['Zürich ist in der Schweiz.', 'Zúrich está en Suiza.'], ['Linz ist in Österreich.', 'Linz está en Austria.'], ['Hamburg und Kiel liegen in Norddeutschland.', 'Hamburgo y Kiel están en el norte de Alemania.'],
  ['München liegt in Süddeutschland.', 'Múnich está en el sur de Alemania.']
];
function genData() {
  const M = maker('l2data'); const out = nounQuestions('l2data', ['data2']).concat(phraseQs('l2data', R_DATA, 'Datos personales')).concat(phraseQs('l2data', R_PLACE, 'Lugares'));
  for (let n = 0; n <= 20; n++) {
    const w = n === 1 ? 'eins' : ONES[n] === 'ein' ? 'ein' : numDe(n);
    out.push(M.mc('¿Cómo se dice el número ' + n + ' en alemán?', w, sample(Array.from({ length: 21 }, (_, i) => numDe(i)).filter(x => x !== w), 3), n + ' = ' + w + '. Se pronuncia «' + SMALL_PRON[n] + '».', 'Números'));
    out.push(M.mc('¿Qué número es «' + w + '»?', String(n), sample(Array.from({ length: 21 }, (_, i) => String(i)).filter(x => x !== String(n)), 3), w + ' = ' + n + '. Se pronuncia «' + SMALL_PRON[n] + '».', 'Números'));
    out.push(M.ty('Escribe en alemán el número ' + n + ' (con letras).', [w], n + ' = ' + w + '. Todo en minúscula: los números no son sustantivos. ' + (n === 1 ? 'Solo, el 1 es «eins»; antes de un sustantivo es «ein».' : ''), 'Números'));
  }
  [['11 12 20', 'elf zwölf zwanzig'], ['19 16 10', 'neunzehn sechzehn zehn'], ['16 17 13', 'sechzehn siebzehn dreizehn'], ['12 11 20', 'zwölf elf zwanzig']].forEach(x => out.push(M.ty('Escribe con letras el número de teléfono: ' + x[0], x[1], x[0] + ' = ' + x[1] + '. Los números de teléfono se dicen en grupos de dos.', 'Números')));
  out.push(M.mc('¿Qué significa «ledig»?', 'soltero(a)', ['casado(a)', 'divorciado(a)', 'viudo(a)'], 'ledig = soltero. verheiratet = casado, geschieden = divorciado, verwitwet = viudo.', 'Estado civil'));
  out.push(M.mc('¿Qué significa «verheiratet»?', 'casado(a)', ['soltero(a)', 'divorciado(a)', 'viudo(a)'], 'verheiratet = casado. Se pronuncia «fer-jái-ra-tet».', 'Estado civil'));
  out.push(M.mc('¿Qué significa «geschieden»?', 'divorciado(a)', ['casado(a)', 'soltero(a)', 'viudo(a)'], 'geschieden = divorciado. Se pronuncia «gue-shí-den».', 'Estado civil'));
  out.push(M.mc('¿Qué significa «verwitwet»?', 'viudo(a)', ['casado(a)', 'divorciado(a)', 'soltero(a)'], 'verwitwet = viudo. Se pronuncia «fer-vít-vet».', 'Estado civil'));
  out.push(M.mc('«Wo sind Sie geboren?» pregunta por:', 'el lugar de nacimiento', ['el estado civil', 'la edad', 'el teléfono'], 'geboren = nacido. Geburtsort = lugar de nacimiento.', 'Datos personales'));
  out.push(M.mc('«Wie alt ist Ihr Kind?» pregunta por:', 'la edad', ['el nombre', 'el país', 'el teléfono'], 'alt = viejo; Wie alt = qué edad. Alter = edad.', 'Datos personales'));
  out.push(M.mc('«Wie alt ___ Ihre Kinder?» ¿Qué verbo va?', 'sind', ['ist', 'bist', 'seid'], 'Kinder es plural → sind. Singular (Kind) → ist.', 'Conjugación'));
  out.push(M.mc('Hamburg ___ in Deutschland. Las dos formas válidas son:', 'ist / liegt', ['ist / lebt', 'liegt / wohnt', 'hat / liegt'], 'Hamburg ist/liegt in Deutschland. liegen = estar situado.', 'Lugares'));
  out.push(M.mc('Wien ist die Hauptstadt ___ Österreich.', 'von', ['in', 'aus', 'bei'], 'die Hauptstadt von + país: von Österreich, von Deutschland. Con die Schweiz: der Schweiz.', 'Lugares'));
  out.push(M.mc('München liegt in Süd___.', 'deutschland', ['österreich', 'polen', 'italien'], 'Süddeutschland = sur de Alemania. Norden/Süden/Osten/Westen.', 'Lugares'));
  out.push(M.mc('Hamburg und Kiel liegen in ___.', 'Norddeutschland', ['Süddeutschland', 'Österreich', 'der Schweiz'], 'Hamburg y Kiel están en el norte: Norddeutschland.', 'Lugares'));
  out.push(M.mc('¿Qué ciudad es la capital de Austria?', 'Wien', ['Bern', 'Berlin', 'Zürich'], 'Wien (Viena) = capital de Österreich. Bern = Schweiz. Berlin = Deutschland.', 'Lugares'));
  out.push(M.mc('¿Qué ciudad es la capital de Suiza?', 'Bern', ['Zürich', 'Wien', 'Berlin'], 'Bern es la capital de la Schweiz (Zürich es la ciudad más grande).', 'Lugares'));
  [['ich', 'habe'], ['du', 'hast'], ['er/sie', 'hat'], ['wir', 'haben'], ['ihr', 'habt'], ['sie/Sie', 'haben']].forEach(x => out.push(M.ty('haben: ' + x[0] + ' ___ ein Kind.', x[1], 'haben: habe, hast, hat, haben, habt, haben. Irregular en du y er/sie.', 'Conjugación')));
  out.push(M.mc('Peter y Maria Waldherr viven en...', 'Stuttgart', ['Heidelberg', 'Kiel', 'Wien'], 'En el texto de la familia Waldherr: Peter y Maria viven en Stuttgart.', 'Lectura'));
  out.push(M.mc('Benno Gebhardt viene de Kiel, es decir, de...', 'Norddeutschland', ['Süddeutschland', 'Österreich', 'der Schweiz'], 'Benno: «Ich komme aus Kiel» → Kiel está en el norte.', 'Lectura'));
  out.push(M.mc('Maria Waldherr nació en...', 'Österreich', ['der Schweiz', 'Stuttgart', 'Polen'], 'Maria: «Ich komme aus Österreich, aber ich lebe schon sehr lange hier in Stuttgart.»', 'Lectura'));
  out.push(M.mc('Franz Waldherr está...', 'soltero (ledig)', ['casado', 'divorciado', 'viudo'], 'Franz: «Ich bin ledig und habe keine Kinder.» Su pareja Mailin viene de Dänemark.', 'Lectura'));
  out.push(M.bd('¿Cómo se llama usted?', ['Wie', 'heißen', 'Sie'], 'Wie (1) heißen (2) Sie?'));
  out.push(M.bd('¿Tiene usted hijos?', ['Haben', 'Sie', 'Kinder'], 'Pregunta de sí/no: el verbo va en la posición 1.'));
  out.push(M.bd('Hamburgo es una ciudad en Alemania.', ['Hamburg', 'liegt', 'in', 'Deutschland'], 'Hamburg (1) liegt (2) in Deutschland.', [['Hamburg', 'ist', 'in', 'Deutschland']]));
  return out;
}
LESSONS.l2data = () => '<h4>Números 0 a 20 (p. 27)</h4>' + tbl(['Número', 'Alemán', 'Se pronuncia'], Array.from({ length: 21 }, (_, n) => [String(n), spk(numDe(n)) + '<b>' + (n === 1 ? 'eins' : numDe(n)) + '</b>', '<span class="pr">' + SMALL_PRON[n] + '</span>'])) +
  box('Números de teléfono', '<p>Se leen en pares: <b>11 12 20 → elf zwölf zwanzig</b>. Los números no llevan mayúscula.</p>') +
  vocabTable('data2') +
  box('Estado civil (Familienstand)', tbl(['Alemán', 'Se pronuncia', 'Español'], [['ledig', 'lé-dij', 'soltero(a)'], ['verheiratet', 'fer-jái-ra-tet', 'casado(a)'], ['verwitwet', 'fer-vít-vet', 'viudo(a)'], ['geschieden', 'gue-shí-den', 'divorciado(a)']])) +
  ph('Datos personales (p. 27 y 31)', R_DATA) +
  ph('Lugares (p. 28 y 31)', R_PLACE) +
  box('haben', conjTable(['haben']) + '<p>Irregular: du <b>hast</b>, er/sie <b>hat</b>. ich habe, wir haben, ihr habt, sie/Sie haben.</p>') +
  box('Texto de la familia Waldherr (p. 29)', '<p>Peter y Maria Waldherr viven en Stuttgart. Benno Gebhardt es de Kiel (norte). Maria nació en Austria. Su hija Katharina tiene dos hijos: Sebastian (16) y Antonia (19, Au-pair en Inglaterra). Franz Waldherr es médico (Arzt), soltero; su pareja Mailin es de Dinamarca; viven en Basilea (Schweiz). Antonia (19) es Au-pair en Inglaterra.</p>');

/* ============ LECCIÓN 3 ============ */
function genFood() {
  const M = maker('l3food'); const out = nounQuestions('l3food', ['food3']);
  [['Kuchen', 'Kuchen'], ['Apfel', 'Äpfel'], ['Ei', 'Eier'], ['Brot', 'Brote']].forEach(x => out.push(M.mc('Singular y plural: ¿cuál es el plural de «' + x[0] + '»?', x[1], sample(['Kuchen', 'Äpfel', 'Eier', 'Brote', 'Bananen', 'Kiwis'].filter(y => y !== x[1]), 3), x[0] + ' → ' + x[1] + '. El plural del alemán no tiene regla única: aprende el plural con cada palabra.', 'Plural')));
  out.push(M.mc('¿Qué sustantivos cambian a «Ä» en plural?', 'der Apfel → die Äpfel', ['das Ei → die Äier', 'die Banane → die Bänänen', 'der Kuchen → die Küchen'], 'Apfel → Äpfel lleva umlaut. Ei → Eier, Banane → Bananen, Kuchen → Kuchen.', 'Plural'));
  out.push(M.mc('¿Qué tienen en común «das Brötchen» y «das Würstchen»?', 'terminan en -chen y son neutros', ['terminan en -e y son femeninos', 'son plurales', 'son masculinos'], 'Todas las palabras en -chen son neutras: das Brötchen, das Würstchen, das Hähnchen.', 'Género'));
  out.push(M.mc('Los alimentos como Milch, Butter, Schokolade son...', 'die (femeninos)', ['der (masculinos)', 'das (neutros)', 'plurales'], 'die Milch, die Butter, die Schokolade, die Sahne. Pero der Zucker, das Mehl.', 'Género'));
  out.push(M.mc('«das Ei» en plural es:', 'die Eier', ['die Eis', 'die Eien', 'die Ei'], 'Ei → Eier. El plural siempre lleva «die».', 'Plural'));
  out.push(M.mc('«die Kiwi» en plural es:', 'die Kiwis', ['die Kiwien', 'die Kiwi', 'die Kiwiä'], 'Las palabras extranjeras suelen tomar -s: Kiwi → Kiwis.', 'Plural'));
  return out;
}
LESSONS.l3food = () => box('Cómo estudiar el vocabulario', '<p>Aprende <b>artículo + palabra + plural</b> (como en el libro, p. 37). Colores: <span class="art m">der</span> <span class="art n">das</span> <span class="art f">die</span> <span class="art p">plural</span>.</p>') +
  vocabTable('food3') +
  box('Plural (p. 37 y 42)', tbl(['Singular', 'Plural'], [['ein Apfel', 'Äpfel'], ['ein Kuchen', 'Kuchen'], ['ein Brot', 'Brote'], ['ein Ei', 'Eier'], ['eine Banane', 'Bananen'], ['eine Kiwi', 'Kiwis']]) +
    '<p>Consejo del libro: <b>busca los plurales en el diccionario</b> y aprende cada sustantivo con su plural.</p>');

const R_ART = [
  ['Das ist doch kein Ei!', '¡Pero eso no es un huevo!'], ['Das ist Schokolade.', 'Eso es chocolate.'], ['Nein, das ist keine Schokolade.', 'No, eso no es chocolate.'], ['Das ist ein Schokoladenei.', 'Eso es un huevo de chocolate.'],
  ['Was ist das?', '¿Qué es esto?'], ['Das ist ein Würstchen.', 'Esto es una salchicha.'], ['Das ist kein Würstchen.', 'Esto no es una salchicha.'], ['Das ist eine Banane.', 'Esto es un plátano.'],
  ['Wie heißt das auf Deutsch?', '¿Cómo se dice esto en alemán?'], ['Das ist eine Orange.', 'Esto es una naranja.'], ['Haben wir Zucker?', '¿Tenemos azúcar?'], ['Haben wir Brot?', '¿Tenemos pan?'],
  ['Ja, natürlich.', 'Sí, claro.'], ['Nein, tut mir leid.', 'No, lo siento.'], ['Brauchen Sie Salz?', '¿Necesita sal?'], ['Was brauchen Sie?', '¿Qué necesita usted?'], ['Brauchst du Reis?', '¿Necesitas arroz?'],
  ['Wir brauchen Eier.', 'Necesitamos huevos.'], ['Wir brauchen aber Eier.', 'Pero necesitamos huevos.'], ['Im Einkaufswagen sind keine Äpfel.', 'En el carrito no hay manzanas.'], ['In Regal A sind drei Bananen.', 'En el estante A hay tres plátanos.'],
  ['In Regal B sind keine Bananen.', 'En el estante B no hay plátanos.']
];
function genArt() {
  const M = maker('l3art'); const out = phraseQs('l3art', R_ART, 'Frases');
  const items = [['Apfel', 'm', 'Äpfel'], ['Ei', 'n', 'Eier'], ['Schokolade', 'f', null], ['Banane', 'f', 'Bananen'], ['Kuchen', 'm', 'Kuchen'], ['Würstchen', 'n', 'Würstchen'], ['Tomate', 'f', 'Tomaten'], ['Kiwi', 'f', 'Kiwis'], ['Brot', 'n', 'Brote'], ['Birne', 'f', 'Birnen']];
  items.forEach(x => {
    const ein = x[1] === 'f' ? 'eine' : 'ein', kein = x[1] === 'f' ? 'keine' : 'kein';
    const gen = x[1] === 'm' ? 'masculino' : x[1] === 'n' ? 'neutro' : 'femenino';
    out.push(M.ty('Das ist ___ ' + x[0] + '. (un/una)', ein, x[0] + ' es ' + gen + ' → ' + ein + ' ' + x[0] + '. ein para masculino y neutro; eine para femenino.', 'ein / eine'));
    out.push(M.ty('Das ist ___ ' + x[0] + '. (no es / negación)', kein, x[0] + ' es ' + gen + ' → ' + kein + ' ' + x[0] + '. La negación de ein es kein; de eine es keine.', 'kein / keine'));
    if (x[2]) out.push(M.ty('Plural con negación: «Das sind ___ ' + x[2] + '.» (no son)', 'keine', 'En plural la negación siempre es keine: keine ' + x[2] + '. El plural no lleva artículo indefinido (Das sind Äpfel).', 'kein / keine'));
  });
  out.push(M.mc('¿Cuál es la negación de «ein Apfel»?', 'kein Apfel', ['keine Apfel', 'nicht Apfel', 'keinen Apfel'], 'ein → kein; eine → keine. Con sustantivos, la negación es kein-.', 'kein / keine'));
  out.push(M.mc('¿Cuál es la negación de «eine Schokolade»?', 'keine Schokolade', ['kein Schokolade', 'nicht Schokolade', 'keinen Schokolade'], 'eine → keine (femenino).', 'kein / keine'));
  out.push(M.mc('¿Cuál es la negación de «Äpfel» (plural)?', 'keine Äpfel', ['kein Äpfel', 'nicht Äpfel', 'ein Äpfel'], 'En plural siempre keine: keine Äpfel.', 'kein / keine'));
  out.push(M.mc('El plural de «ein Ei» al decir «Das sind ___»:', 'Eier (sin artículo)', ['eine Eier', 'ein Eier', 'keine Eier'], 'El plural no tiene artículo indefinido: Das sind Eier.', 'ein / eine'));
  out.push(M.mc('¿Qué tipo de pregunta es «Haben wir Zucker?»', 'Ja/Nein-Frage (el verbo va primero)', ['W-Frage', 'Afirmación', 'Orden'], 'Ja/Nein-Frage: verbo en posición 1 (Haben wir Zucker?). Respuesta: Ja. / Nein.', 'Estructura'));
  out.push(M.mc('¿Dónde va el verbo en «Was brauchen Sie?»', 'Posición 2', ['Posición 1', 'Al final', 'Posición 3'], 'En una W-Frage el verbo va en la posición 2: Was (1) brauchen (2) Sie?', 'Estructura'));
  out.push(M.mc('¿Qué diferencia hay entre «Wir haben Zucker.» y «Haben wir Zucker?»', 'La primera es afirmación; la segunda es pregunta de sí/no', ['Son iguales', 'La primera es pregunta', 'La segunda es orden'], 'Afirmación: sujeto primero. Ja/Nein-Frage: verbo primero (se invierte el orden).', 'Estructura'));
  out.push(M.mc('Respuesta a «Haben Sie Eier?» cuando sí hay:', 'Ja, natürlich.', ['Nein, tut mir leid.', 'Kein Problem.', 'Wie bitte?'], 'Ja, natürlich = sí, claro. Si no hay: Nein, tut mir leid.', 'Frases'));
  out.push(M.mc('Respuesta a «Haben Sie Milch?» cuando no hay:', 'Nein, tut mir leid.', ['Ja, natürlich.', 'Hier, bitte.', 'Vielen Dank.'], 'Nein, tut mir leid = no, lo siento.', 'Frases'));
  out.push(M.bd('¿Tenemos azúcar?', ['Haben', 'wir', 'Zucker'], 'Ja/Nein-Frage: Haben (1) wir Zucker?'));
  out.push(M.bd('¿Qué necesita usted?', ['Was', 'brauchen', 'Sie'], 'W-Frage: Was (1) brauchen (2) Sie?'));
  out.push(M.bd('Necesitamos huevos.', ['Wir', 'brauchen', 'Eier'], 'Afirmación: Wir (1) brauchen (2) Eier.'));
  out.push(M.bd('Eso no es una salchicha.', ['Das', 'ist', 'kein', 'Würstchen'], 'Würstchen es neutro → kein Würstchen.'));
  out.push(M.bd('Eso no es una banana.', ['Das', 'ist', 'keine', 'Banane'], 'Banane es femenino → keine Banane.'));
  out.push(M.bd('¿Necesitas arroz?', ['Brauchst', 'du', 'Reis'], 'Ja/Nein-Frage con du: Brauchst (1) du Reis?'));
  return out;
}
LESSONS.l3art = () => '<h4>Artículo indefinido y negación (p. 36 y 42)</h4>' + tbl(['', 'indefiniter Artikel', 'Negativartikel'], [
    ['<span class="art m">masc.</span>', 'ein Apfel', 'kein Apfel'], ['<span class="art n">neutro</span>', 'ein Ei', 'kein Ei'], ['<span class="art f">fem.</span>', 'eine Schokolade', 'keine Schokolade'], ['<span class="art p">plural</span>', '— Äpfel', 'keine Äpfel']]) +
  box('Truco del libro: la «K»', '<p><b>ein → kein</b>, <b>ein → kein</b>, <b>eine → keine</b>: solo agregas una <b>k</b>. En plural no hay artículo indefinido, pero sí negación: <b>keine</b>.</p>') +
  box('Ja/Nein-Frage vs W-Frage (p. 42)', tbl(['Tipo', 'Posición 1', 'Posición 2', 'Resto', 'Respuesta'], [['Ja/Nein-Frage', '<b>Haben</b>', 'wir', 'Zucker?', 'Ja. / Nein.'], ['Ja/Nein-Frage', '<b>Brauchen</b>', 'Sie', 'Salz?', 'Ja. / Nein.'], ['W-Frage', 'Was', '<b>brauchen</b>', 'Sie?', 'Eier.']]) +
    '<p>Afirmación: <i>Wir haben Zucker.</i> → pregunta de sí/no: <i>Haben wir Zucker?</i> (el verbo salta a la posición 1).</p>') +
  ph('Frases (p. 36, 37, 38, 42)', R_ART);

/* ---- Precios y cantidades ---- */
const R_SHOP = [
  ['Ich brauche Eier.', 'Necesito huevos.'], ['Haben Sie Eier?', '¿Tiene huevos?'], ['Hier, bitte.', 'Aquí tiene, por favor.'], ['Sonst noch etwas?', '¿Algo más?'], ['Ja, bitte.', 'Sí, por favor.'], ['Nein, danke.', 'No, gracias.'],
  ['Was kostet ein Kilo Orangen?', '¿Cuánto cuesta un kilo de naranjas?'], ['Wie viel kostet ein Kilo Orangen?', '¿Cuánto cuesta un kilo de naranjas?'], ['Ein Kilo Orangen kostet 2 Euro 50.', 'Un kilo de naranjas cuesta 2 euros con 50.'],
  ['Was kosten 100 Gramm Käse?', '¿Cuánto cuestan 100 gramos de queso?'], ['Wie viel kosten sechs Eier?', '¿Cuánto cuestan seis huevos?'], ['Das macht dann zusammen 3 Euro 87.', 'Eso hace 3 euros con 87 en total.'],
  ['Kaufst du bitte zehn Eier?', '¿Compras diez huevos, por favor?'], ['Kann ich dir helfen?', '¿Puedo ayudarte?'], ['Entschuldigung. Haben Sie auch Milch?', 'Disculpe. ¿Tiene también leche?'],
  ['Ja, natürlich.', 'Sí, claro.'], ['Nein, tut mir leid.', 'No, lo siento.']
];
const UNITS = [['ein Kilo(gramm)', '1 kg'], ['100 Gramm', '100 g'], ['ein Pfund', '500 g'], ['ein Liter', '1 l']];
const PACK = [['eine Flasche Saft', 'una botella de jugo'], ['eine Packung Tee', 'un paquete de té'], ['eine Dose Tomaten', 'una lata de tomates'], ['ein Becher Sahne', 'un envase de crema'], ['ein Liter Milch', 'un litro de leche'], ['100 Gramm Käse', '100 gramos de queso'], ['ein Kilo Orangen', 'un kilo de naranjas'], ['ein Pfund Brot', 'media libra (500 g) de pan']];
function priceDe(c) { const e = Math.floor(c / 100), ct = c % 100; if (e === 0) return numDe(ct) + ' Cent'; return (e === 1 ? 'ein' : numDe(e)) + ' Euro' + (ct ? ' ' + numDe(ct) : ''); }
function genShop() {
  const M = maker('l3shop'); const out = phraseQs('l3shop', R_SHOP, 'Compras').concat(phraseQs('l3shop', PACK, 'Cantidades'));
  nounQuestions('l3shop', ['eat3']).forEach(q => out.push(q));
  [20, 30, 40, 50, 60, 70, 80, 90, 100].forEach(n => {
    out.push(M.mc('¿Cómo se dice ' + n + ' en alemán?', numDe(n), sample([20, 30, 40, 50, 60, 70, 80, 90, 100].filter(x => x !== n).map(numDe), 3), n + ' = ' + numDe(n) + '. -zig = decenas (-ßig en 30).', 'Números'));
    out.push(M.ty('Escribe ' + n + ' en alemán.', numDe(n), n + ' = ' + numDe(n) + '. Todo en minúscula y pegado.', 'Números'));
  });
  [21, 35, 41, 45, 53, 64, 72, 85, 99, 38, 67, 94].forEach(n => {
    out.push(M.ty('Escribe ' + n + ' en alemán (todo junto).', numDe(n), n + ' = ' + numDe(n) + '. En alemán se dice primero la unidad: ' + n % 10 + ' + und + ' + Math.floor(n / 10) * 10 + ' (la unidad va antes). Todo pegado.', 'Números'));
    out.push(M.mc('¿Qué número es «' + numDe(n) + '»?', String(n), sample([n + 1, n - 1, n + 10, n - 10, +(String(n).split('').reverse().join(''))].filter(x => x !== n && x > 0).map(String), 3), numDe(n) + ' = ' + n + '. Unidad primero: ' + n % 10 + ' y ' + Math.floor(n / 10) * 10 + '.', 'Números'));
  });
  [20, 30, 40, 50, 60, 70, 80, 90, 100, 35, 99].forEach(c => { const p = c === 100 ? '1,00' : '0,' + String(c).padStart(2, '0'); out.push(M.mc('El precio ' + p + ' € se dice:', priceDe(c), sample([20, 30, 40, 50, 60, 70, 80, 90, 35, 99].filter(x => x !== c).map(priceDe), 3), p + ' € = ' + priceDe(c) + '.', 'Precios')); });
  [[150, '1,50 €'], [245, '2,45 €'], [250, '2,50 €'], [299, '2,99 €'], [499, '4,99 €'], [690, '6,90 €'], [145, '1,45 €']].forEach(x => out.push(M.ty('Escribe con letras el precio ' + x[1] + ' (usa «Euro» y el número, en el formato «zwei Euro fünfzig»).', priceDe(x[0]), x[1] + ' = ' + priceDe(x[0]) + '. Euro no cambia en plural al hablar. Se dice: euros + centavos.', 'Precios')));
  out.push(M.mc('Un Pfund son...', '500 g', ['100 g', '1 kg', '250 g'], 'ein Pfund = 500 Gramm. ein Kilo = 1000 g. ein Liter = 1 l.', 'Cantidades'));
  out.push(M.mc('¿Cómo se dice 1 kg en alemán?', 'ein Kilo', ['ein Pfund', 'ein Liter', 'hundert Gramm'], 'ein Kilo(gramm) = 1 kg.', 'Cantidades'));
  out.push(M.mc('«Was ___ ein Kilo Orangen?»', 'kostet', ['kosten', 'kostest', 'koste'], 'ein Kilo (singular) → kostet.', 'Conjugación'));
  out.push(M.mc('«Was ___ 100 Gramm Käse?»', 'kosten', ['kostet', 'kostest', 'koste'], '100 Gramm es plural → kosten. Con sechs Eier también: kosten.', 'Conjugación'));
  out.push(M.mc('Después de una cantidad, el sustantivo va...', 'sin artículo y sin cambio (ein Liter Milch)', ['con artículo (ein Liter die Milch)', 'siempre en plural', 'con kein'], 'ein Liter Milch, eine Dose Tomaten, ein Kilo Orangen: cantidad + sustantivo, sin artículo.', 'Cantidades'));
  out.push(M.mc('El vendedor pregunta «Sonst noch etwas?». No quieres nada más:', 'Nein, danke.', ['Ja, natürlich.', 'Hier, bitte.', 'Tut mir leid.'], 'Sonst noch etwas? = ¿algo más? Respuestas: Ja, bitte. / Nein, danke.', 'Compras'));
  out.push(M.bd('¿Cuánto cuesta un kilo de naranjas?', ['Was', 'kostet', 'ein', 'Kilo', 'Orangen'], 'W-Frage: Was (1) kostet (2) ein Kilo Orangen?', [['Wie', 'viel', 'kostet', 'ein', 'Kilo', 'Orangen']]));
  out.push(M.bd('¿Cuánto cuestan 100 gramos de queso?', ['Was', 'kosten', '100', 'Gramm', 'Käse'], 'Plural → kosten.'));
  return out;
}
LESSONS.l3shop = () => '<h4>Números 20 a 100 (p. 39)</h4>' + tbl(['Número', 'Alemán', 'Se pronuncia'], [20, 30, 40, 50, 60, 70, 80, 90, 100].map(n => [String(n), spk(numDe(n)) + '<b>' + numDe(n) + '</b>', '<span class="pr">' + pron(numDe(n)) + '</span>'])) +
  box('Cómo se forman los números 21 a 99', '<p>Primero la <b>unidad</b>, luego <b>und</b>, luego la decena, todo pegado: 41 = <i>ein·und·vierzig</i>, 85 = <i>fünf·und·achtzig</i>, 99 = <i>neun·und·neunzig</i>. El 1 se queda en <b>ein</b>: einundzwanzig.</p>') +
  ph('Precios y compras (p. 39 y 43)', R_SHOP) +
  box('Precios', tbl(['Número', 'Se dice'], [['0,10 €', 'zehn Cent'], ['1,00 €', 'ein Euro'], ['1,10 €', 'ein Euro zehn'], ['2,50 €', 'zwei Euro fünfzig'], ['3,87 €', 'drei Euro siebenundachtzig']])) +
  box('Medidas', tbl(['Medida', 'Equivale'], UNITS)) + ph('Cantidades (p. 43)', PACK) + vocabTable('eat3');

/* ---- Comer y beber ---- */
const R_EAT = [
  ['Ich habe Hunger.', 'Tengo hambre.'], ['Ich habe Durst.', 'Tengo sed.'], ['Was isst du gern?', '¿Qué te gusta comer?'], ['Was essen Sie gern?', '¿Qué le gusta comer a usted?'], ['Ich esse gern Fleisch.', 'Me gusta comer carne.'],
  ['Was trinkst du gern?', '¿Qué te gusta beber?'], ['Was trinken Sie gern?', '¿Qué le gusta beber?'], ['Ich trinke gern Saft.', 'Me gusta beber jugo.'], ['Ich trinke sehr gern Cola.', 'Me gusta mucho beber cola.'],
  ['Isst du gern Fisch?', '¿Te gusta comer pescado?'], ['Trinkst du gern Saft?', '¿Te gusta beber jugo?'], ['Ja, sehr.', 'Sí, mucho.'], ['Ja, total gern.', 'Sí, muchísimo.'], ['Nein, nicht so gern.', 'No, no tanto.'],
  ['Mein Lieblingsessen ist Pizza.', 'Mi comida favorita es la pizza.'], ['Mein Lieblingsgetränk ist Cola.', 'Mi bebida favorita es la cola.'], ['Das schmeckt sehr gut.', 'Eso sabe muy bien.'], ['Das ist sehr lecker.', 'Eso es muy rico.'],
  ['Superlecker.', 'Riquísimo.'], ['Zu Hause.', 'En casa.'], ['Im Restaurant.', 'En el restaurante.'], ['In der Mensa.', 'En el comedor universitario.'], ['Ich esse Hähnchen und Pommes.', 'Como pollo y papas fritas.'],
  ['Ich trinke Wasser oder Tee.', 'Bebo agua o té.'], ['Ich studiere in Berlin.', 'Estudio en Berlín.'], ['Ich bin Vegetarierin.', 'Soy vegetariana.'], ['Das Rezept ist ganz einfach.', 'La receta es muy sencilla.'], ['Fertig!', '¡Listo!']
];
function genEat() {
  const M = maker('l3eat'); const out = phraseQs('l3eat', R_EAT, 'Comer y beber');
  [['ich', 'esse'], ['du', 'isst'], ['er/sie', 'isst'], ['wir', 'essen'], ['ihr', 'esst'], ['sie/Sie', 'essen']].forEach(x => out.push(M.ty('essen: ' + x[0] + ' ___ gern Fisch.', x[1], 'essen: esse, isst, isst, essen, esst, essen. Irregular: du y er/sie cambian e → i y la t se une con la s (isst).', 'Conjugación')));
  [['ich', 'trinke'], ['du', 'trinkst'], ['er/sie', 'trinkt'], ['wir', 'trinken'], ['ihr', 'trinkt'], ['sie/Sie', 'trinken']].forEach(x => out.push(M.ty('trinken: ' + x[0] + ' ___ gern Saft.', x[1], 'trinken es regular: trinke, trinkst, trinkt, trinken, trinkt, trinken.', 'Conjugación')));
  [['brauchen', 'brauchst', 'du'], ['kaufen', 'kaufst', 'du'], ['kosten', 'kostet', 'er/sie'], ['schmecken', 'schmeckt', 'es']].forEach(x => out.push(M.ty('Escribe la forma: ' + x[2] + ' ___ (' + x[0] + ')', x[1], x[0] + ' regular: ' + x[1] + '. ' + (x[0] === 'kosten' ? 'La raíz termina en t, así que er → kostet (con e).' : ''), 'Conjugación')));
  out.push(M.mc('¿Qué significa «gern»?', 'con gusto / me gusta (hacer algo)', ['nunca', 'mucho dinero', 'rápido'], 'gern = con gusto. Ich esse gern Fleisch = me gusta comer carne. Lo contrario: nicht gern.', 'gern'));
  out.push(M.mc('¿Dónde va «gern» en la frase?', 'Después del verbo: Ich esse gern Fisch.', ['Al inicio: Gern ich esse Fisch.', 'Al final: Ich esse Fisch gern.', 'Antes del sujeto'], 'Ich (1) esse (2) gern Fisch. El verbo sigue en la posición 2 y gern va justo detrás.', 'gern'));
  out.push(M.mc('Quieres decir que NO te gusta mucho el pescado:', 'Ich esse nicht so gern Fisch.', ['Ich esse kein Fisch.', 'Ich esse nicht gern.', 'Ich nicht esse gern Fisch.'], 'Nein, nicht so gern. En una frase: Ich esse nicht so gern Fisch.', 'gern'));
  out.push(M.mc('Tienes hambre. ¿Qué dices?', 'Ich habe Hunger.', ['Ich bin Hunger.', 'Ich habe hungrig.', 'Ich esse Hunger.'], 'En alemán «tener hambre» = Hunger haben. Igual: Durst haben.', 'Frases'));
  out.push(M.mc('«Das schmeckt sehr gut» significa:', 'Eso sabe muy bien', ['Eso huele mal', 'Eso es muy caro', 'Eso es muy grande'], 'schmecken = tener sabor. Das schmeckt gut = sabe bien. Das ist lecker = es rico.', 'Frases'));
  out.push(M.mc('¿Dónde comes en un lugar de la universidad?', 'In der Mensa', ['Im Restaurant', 'Zu Hause', 'Im Bad'], 'In der Mensa = en el comedor universitario. Im Restaurant = en el restaurante. Zu Hause = en casa.', 'Lugares'));
  out.push(M.mc('Hisako dice «Ich bin Vegetarierin». ¿Qué significa?', 'Es vegetariana', ['Es alemana', 'Es cocinera', 'Es estudiante de Berlín'], 'Vegetarierin = vegetariana (mujer). Su plato es la Gemüsesuppe.', 'Lectura'));
  out.push(M.mc('¿De dónde es Jens?', 'De Emden, en el norte de Alemania', ['De Berlín', 'De Klagenfurt, Austria', 'De Zúrich'], 'Jens: «Ich komme aus Norddeutschland, aus Emden.» Plato: Kartoffelpuffer mit Apfelmus.', 'Lectura'));
  out.push(M.mc('¿De dónde es Hans y cuál es su plato favorito?', 'Klagenfurt (Austria), Wiener Apfelstrudel', ['Emden, Kartoffelpuffer', 'Berlin, Gemüsesuppe', 'Hamburg, Pizza'], 'Hans Hofmann viene de Österreich (Klagenfurt) y le gusta el Wiener Apfelstrudel.', 'Lectura'));
  out.push(M.mc('¿Qué bebe Hisako con su sopa?', 'Wasser oder Tee', ['Kaffee oder Tee', 'Wasser oder Bier', 'Cola'], 'Hisako: «Dazu trinke ich Wasser oder Tee.» Jens: Wasser o Bier. Hans: Kaffee o Tee.', 'Lectura'));
  out.push(M.mc('«Dazu trinke ich...» significa:', 'Con eso bebo...', ['Antes bebo...', 'No bebo...', 'Nunca bebo...'], 'dazu = con eso / además. Dazu trinke ich Tee = con eso bebo té.', 'Lectura'));
  out.push(M.bd('Me gusta comer carne.', ['Ich', 'esse', 'gern', 'Fleisch'], 'Ich (1) esse (2) gern Fleisch.'));
  out.push(M.bd('¿Te gusta beber jugo?', ['Trinkst', 'du', 'gern', 'Saft'], 'Ja/Nein-Frage: Trinkst (1) du gern Saft?'));
  out.push(M.bd('Mi comida favorita es la pizza.', ['Mein', 'Lieblingsessen', 'ist', 'Pizza'], 'Mein Lieblingsessen (1) ist (2) Pizza. Lieblings + essen es una palabra compuesta.'));
  out.push(M.bd('¿Qué te gusta beber?', ['Was', 'trinkst', 'du', 'gern'], 'W-Frage: Was (1) trinkst (2) du gern?'));
  return out;
}
LESSONS.l3eat = () => ph('Comer, beber y gustos (p. 40 y 43)', R_EAT) +
  '<h4>Conjugación: essen, trinken, brauchen, kaufen, kosten (p. 42)</h4>' + conjTable(['essen', 'trinken', 'brauchen', 'kaufen', 'kosten', 'schmecken']) +
  box('Platos de las personas del texto (p. 41)', tbl(['Persona', 'De dónde', 'Plato', 'Bebe'], [['Jens', 'Emden (norte)', 'Kartoffelpuffer mit Apfelmus', 'Wasser oder Bier'], ['Hisako', 'Berlín (estudia), es vegetariana', 'Gemüsesuppe', 'Wasser oder Tee'], ['Hans', 'Klagenfurt (Austria)', 'Wiener Apfelstrudel', 'Kaffee oder Tee']])) +
  tbl(['Alemán', 'Español'], [['Kartoffelpuffer', 'tortitas de papa'], ['Apfelmus', 'puré de manzana'], ['Apfelstrudel', 'pastel enrollado de manzana'], ['Gemüsesuppe', 'sopa de verduras'], ['Gemüsebrühe', 'caldo de verduras'], ['Portion', 'porción'], ['Rezept', 'receta'],
    ['Paprikaschote', 'pimiento'], ['Karotte', 'zanahoria'], ['Nüsse', 'nueces'], ['Rosinen', 'pasas'], ['Staubzucker', 'azúcar glas'], ['ganz einfach', 'muy sencillo'], ['nicht teuer', 'no caro'], ['typisch deutsch', 'típicamente alemán']]) +
  box('gern', '<p>Ich esse <b>gern</b> Fleisch. / Ich trinke <b>sehr gern</b> Cola. / Nein, <b>nicht so gern</b>. El verbo va en posición 2 y gern va después.</p>');

/* ---- Verbos de las lecciones 1 a 3 ---- */
const VERBS123 = ['sein', 'haben', 'heißen', 'kommen', 'wohnen', 'leben', 'sprechen', 'lernen', 'essen', 'trinken', 'brauchen', 'kaufen', 'kosten', 'schmecken', 'buchstabieren', 'studieren', 'helfen'];
function genVerbs123() {
  const M = maker('verbs123');
  const out = conjQuestions('verbs123', VERBS123).concat(verbQuestions('verbs123', VERBS123));
  out.push(M.mc('¿Qué verbos son irregulares en la conjugación del presente de las lecciones 1 a 3?', 'sein, haben, sprechen, essen, helfen', ['kommen, wohnen, leben', 'heißen, lernen, kaufen', 'trinken, brauchen, kosten'], 'Irregulares: sein (bin, bist, ist...), haben (hast, hat), sprechen (sprichst, spricht), essen (isst), helfen (hilfst, hilft). Los demás son regulares.', 'Resumen'));
  out.push(M.mc('¿Qué terminaciones lleva un verbo regular? (ich, du, er, wir, ihr, sie)', '-e, -st, -t, -en, -t, -en', ['-e, -t, -st, -en, -en, -t', '-en, -st, -t, -e, -t, -en', '-e, -st, -en, -t, -t, -en'], 'ich -e · du -st · er/sie/es -t · wir -en · ihr -t · sie/Sie -en.', 'Resumen'));
  out.push(M.ty('«du heißen»: escribe la forma correcta con du.', 'heißt', 'Raíz heiß- (termina en ß, sonido s): du solo recibe -t: du heißt.', 'Conjugación'));
  return out;
}
LESSONS.verbs123 = () => box('Los verbos de las lecciones 1 a 3', '<p>En <b>rojo</b> están las formas irregulares. Repasa primero <b>sein</b> y <b>haben</b>: se usan en todas partes.</p>') +
  conjTable(VERBS123) + wordTable('Significado', VERBS123.map(v => { const x = VERBS.find(y => y[0] === v); return [v, x[1], x[2]]; }));

/* ---------- registro de niveles ---------- */
const NEW_LEVELS = [
  { id: 'l1greet', group: 'Lección 1', exam: 1, title: 'Saludos y despedidas', sub: 'Lección 1 A (pp. 12, 18, 21)', cats: [], gen: genGreet },
  { id: 'l1name', group: 'Lección 1', exam: 1, title: 'Nombre, origen e idiomas', sub: 'Lección 1 B, C (pp. 13 a 15, 18)', cats: [], gen: genName },
  { id: 'l1abc', group: 'Lección 1', exam: 1, title: 'Alfabeto, deletrear y datos', sub: 'Lección 1 D, E (pp. 16 y 17)', cats: ['addr'], gen: () => nounQuestions('l1abc', ['addr']).concat(genAbc()) },
  { id: 'l2family', group: 'Lección 2', exam: 1, title: 'La familia y los posesivos', sub: 'Lección 2 B (pp. 25 y 30)', cats: ['family'], gen: genFamily },
  { id: 'l2feel', group: 'Lección 2', exam: 1, title: '¿Cómo estás? y los pronombres', sub: 'Lección 2 A, C (pp. 24, 26, 30)', cats: [], gen: genFeel },
  { id: 'l2data', group: 'Lección 2', exam: 1, title: 'Números 0 a 20, datos y lugares', sub: 'Lección 2 D, E (pp. 27 a 31)', cats: ['data2'], gen: genData },
  { id: 'l3food', group: 'Lección 3', exam: 1, title: 'Alimentos y plurales', sub: 'Lección 3 A, B, C (pp. 36 a 38)', cats: ['food3'], gen: genFood },
  { id: 'l3art', group: 'Lección 3', exam: 1, title: 'ein / kein y preguntas de sí o no', sub: 'Lección 3 A (pp. 36 y 42)', cats: [], gen: genArt },
  { id: 'l3shop', group: 'Lección 3', exam: 1, title: 'Precios, cantidades y compras', sub: 'Lección 3 D (pp. 39 y 43)', cats: ['eat3'], gen: genShop },
  { id: 'l3eat', group: 'Lección 3', exam: 1, title: 'Comer, beber y gustos', sub: 'Lección 3 E (pp. 40 y 41)', cats: [], gen: genEat },
  { id: 'verbs123', group: 'Lección 3', exam: 1, title: 'Verbos de las lecciones 1 a 3', sub: 'Repaso de conjugación', cats: [], gen: genVerbs123 }
];

const OLD_GROUP = { rooms: 'Lección 4', furniture: 'Lección 4', adj: 'Lección 4', numbers: 'Lección 4', art: 'Gramática y verbos (4 a 6)', neg: 'Gramática y verbos (4 a 6)', verbs: 'Gramática y verbos (4 a 6)', teacher: 'Gramática y verbos (4 a 6)', order: 'Gramática y verbos (4 a 6)',
  time: 'Lección 5', when: 'Lección 5', acc: 'Lección 6', jandoch: 'Lección 6', weather: 'Lección 6', hobby: 'Lección 6', food: 'Lección 6' };
const uniq = fn => () => { const seen = new Set(); return fn().filter(q => !seen.has(q.id) && seen.add(q.id)); };
LEVELS.forEach(l => { l.group = OLD_GROUP[l.id]; l.exam = 2; const g = l.gen; l.gen = uniq(g); });
NEW_LEVELS.forEach(l => { const g = l.gen; l.gen = uniq(g); });
LEVELS.unshift(...NEW_LEVELS);
LEVELS.forEach((l, i) => { l.n = i + 1; });
