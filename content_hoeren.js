/* v3.6: HÖREN (comprensión auditiva) y más ja/nein/doch y der/den. Textos de redacción propia.
   Los textos de Hören solo se escuchan (audio en alemán); se muestran después de responder. */
'use strict';

/* HOR(lección, título, texto que se escucha, [[afirmación, true|false]], explicación) */
function HOR(l, title, text, items, why) {
  X(l, 'H', 'Hören Sie: «' + title + '». Richtig oder falsch?', 'Escucha (🔊) y decide si cada frase es verdadera (richtig) o falsa (falsch). El texto aparece después de comprobar.', why,
    items.map((it, i) => (i + 1) + '. ' + it[0] + ' → [[' + (it[1] ? 'richtig::falsch' : 'falsch::richtig') + ']]'), { listen: text });
}
HOR(1, 'Im Deutschkurs', 'Hallo, ich bin Daniel. Ich komme aus Brasilien, aus São Paulo. Ich wohne jetzt in Stuttgart. Ich spreche Portugiesisch und Englisch und lerne Deutsch.',
  [['Daniel kommt aus Brasilien.', true], ['Er wohnt in München.', false], ['Er spricht Spanisch.', false], ['Er lernt Deutsch.', true]], 'Daniel es de Brasil y vive en Stuttgart. Habla portugués e inglés y aprende alemán.');
HOR(1, 'Am Telefon: Buchstabieren', 'Guten Tag, hier ist Frau Kowalski. Ich buchstabiere: K, O, W, A, L, S, K, I. Meine Telefonnummer ist null, eins, sieben, sechs, drei, vier, fünf, zwei, acht. Auf Wiederhören.',
  [['Die Frau heißt Kowalski.', true], ['Die Telefonnummer beginnt mit null, eins, sieben.', true], ['Sie sagt am Ende «Tschüs».', false]], 'Deletrea Kowalski; el teléfono empieza 0-1-7; se despide con «Auf Wiederhören» (formal, por teléfono).');
HOR(2, 'Meine Familie', 'Das ist meine Familie. Mein Vater heißt Peter und ist 62 Jahre alt. Meine Mutter Anna ist 59. Ich habe einen Bruder, Felix. Er ist verheiratet und hat eine Tochter. Sie heißt Mila und ist drei Jahre alt.',
  [['Der Vater ist 62 Jahre alt.', true], ['Die Mutter heißt Eva.', false], ['Felix ist ledig.', false], ['Mila ist drei Jahre alt.', true]], 'Peter tiene 62, Anna 59. Felix está casado (verheiratet) y tiene una hija, Mila, de tres años.');
HOR(2, 'Zahlen und Adresse', 'Mein Name ist Lukas Brandt. Ich wohne in der Gartenstraße vierzehn, in Bremen. Die Postleitzahl ist zwei, acht, eins, neun, fünf. Ich bin neunzehn Jahre alt.',
  [['Lukas wohnt in der Gartenstraße 40.', false], ['Er wohnt in Bremen.', true], ['Er ist 19 Jahre alt.', true]], 'Gartenstraße 14 (vierzehn, no vierzig). Vive en Bremen y tiene 19 años (neunzehn).');
HOR(3, 'Im Supermarkt', 'Liebe Kunden! Heute im Angebot: Ein Kilo Tomaten nur ein Euro neunundneunzig. Die Milch kostet heute neunundsiebzig Cent. Und Käse aus der Schweiz: hundert Gramm nur ein Euro fünfzig.',
  [['Ein Kilo Tomaten kostet 1,99 Euro.', true], ['Die Milch kostet 97 Cent.', false], ['Der Käse kommt aus Österreich.', false], ['100 Gramm Käse kosten 1,50 Euro.', true]], 'Tomates 1,99 €; leche 79 céntimos (neunundsiebzig = 79); queso de Suiza a 1,50 € los 100 gramos.');
HOR(3, 'Eine Nachricht von Mama', 'Hallo Tim, hier ist Mama. Kannst du bitte einkaufen? Wir brauchen Brot, sechs Eier und Butter. Milch haben wir noch. Und bitte kauf auch Äpfel, ein Kilo. Danke, bis später!',
  [['Tim soll Brot kaufen.', true], ['Sie brauchen zehn Eier.', false], ['Tim soll Milch kaufen.', false], ['Tim soll ein Kilo Äpfel kaufen.', true]], 'Necesitan pan, seis huevos y mantequilla; leche todavía hay. Además un kilo de manzanas.');
HOR(4, 'Eine Wohnung ansehen', 'Guten Tag! Das hier ist die Wohnung. Sie hat drei Zimmer. Das Wohnzimmer ist groß und hell. Die Küche ist klein, aber neu. Einen Balkon gibt es leider nicht. Die Miete ist siebenhundertfünfzig Euro.',
  [['Die Wohnung hat drei Zimmer.', true], ['Die Küche ist groß.', false], ['Es gibt einen Balkon.', false], ['Die Miete ist 750 Euro.', true]], 'Tres cuartos; la cocina es pequeña pero nueva; no hay balcón; renta 750 € (siebenhundertfünfzig).');
HOR(4, 'Im Möbelhaus', 'Achtung, liebe Kunden! Heute sind alle Sofas zwanzig Prozent billiger. Der Tisch «Oslo» aus Holz kostet nur neunundachtzig Euro. Und die Lampen finden Sie im ersten Stock.',
  [['Die Sofas sind heute billiger.', true], ['Der Tisch kostet 98 Euro.', false], ['Die Lampen sind im ersten Stock.', true]], 'Los sofás tienen 20 % de descuento. La mesa cuesta 89 € (neunundachtzig = 89, no 98). Lámparas en el primer piso.');
HOR(5, 'Eine Ansage am Bahnhof', 'Achtung an Gleis drei: Der Zug nach Hamburg fährt heute nicht um vierzehn Uhr zehn, sondern um vierzehn Uhr vierzig. Wir bitten um Entschuldigung.',
  [['Der Zug fährt nach Hamburg.', true], ['Der Zug fährt um 14:10 Uhr.', false], ['Der Zug fährt um 14:40 Uhr.', true]], 'El tren a Hamburgo no sale a las 14:10 sino a las 14:40 (vierzig).');
HOR(5, 'Eine Nachricht auf der Mailbox', 'Hallo Sara, hier ist Jan. Hast du am Freitag Zeit? Wir gehen ins Kino. Der Film fängt um halb neun an. Wir treffen uns um acht Uhr vor dem Kino. Ruf mich bitte an!',
  [['Jan geht am Freitag ins Kino.', true], ['Der Film beginnt um 9:30 Uhr.', false], ['Sie treffen sich um 20 Uhr.', true], ['Sara soll eine E-Mail schreiben.', false]], 'halb neun = 8:30 (20:30). Se ven a las ocho delante del cine. Jan pide que Sara lo llame (anrufen).');
HOR(5, 'Mein Tag', 'Ich stehe jeden Tag um sechs Uhr auf. Dann frühstücke ich und fahre um sieben zur Arbeit. Ich arbeite von acht bis vier. Am Abend gehe ich oft joggen. Um elf gehe ich ins Bett.',
  [['Er steht um sechs Uhr auf.', true], ['Er arbeitet von acht bis fünf.', false], ['Am Abend geht er oft joggen.', true]], 'Se levanta a las seis, trabaja de ocho a cuatro y por la noche suele correr.');
HOR(6, 'Der Wetterbericht', 'Und jetzt das Wetter für morgen: Im Norden regnet es und es ist windig, nur zwölf Grad. Im Süden scheint die Sonne. Dort wird es warm, bis zu vierundzwanzig Grad.',
  [['Im Norden regnet es.', true], ['Im Norden sind es 20 Grad.', false], ['Im Süden scheint die Sonne.', true], ['Im Süden wird es 24 Grad warm.', true]], 'Norte: lluvia, viento, 12 grados. Sur: sol y hasta 24 grados (vierundzwanzig).');
HOR(6, 'Im Imbiss', 'Hallo, was möchtest du? Ich nehme eine Currywurst mit Pommes, aber ohne Ketchup. Und was möchtest du trinken? Eine Cola, bitte. Keinen Kaffee? Nein, danke. Das macht sieben Euro zwanzig.',
  [['Die Person nimmt Pommes.', true], ['Sie möchte Ketchup.', false], ['Sie trinkt einen Kaffee.', false], ['Es kostet 7,20 Euro.', true]], 'Pide currywurst con papas sin cátsup y una cola; no quiere café. Total 7,20 €.');
HOR(7, 'Mein Wochenende', 'Am Samstag habe ich lange geschlafen. Dann bin ich mit meiner Freundin in die Stadt gefahren. Wir haben Kaffee getrunken und ein Buch gekauft. Am Sonntag habe ich Gitarre gespielt und meine Eltern angerufen.',
  [['Am Samstag ist sie früh aufgestanden.', false], ['Sie ist mit ihrer Freundin in die Stadt gefahren.', true], ['Sie haben eine Zeitung gekauft.', false], ['Am Sonntag hat sie Gitarre gespielt.', true]], 'Durmió mucho (no se levantó temprano). Fue al centro con su amiga; compraron un libro. El domingo tocó la guitarra y llamó a sus padres.');
HOR(7, 'Kurse an der Volkshochschule', 'Sie wollen etwas Neues lernen? Unser Malkurs ist am Dienstag um achtzehn Uhr. Den Fotokurs gibt es am Samstagvormittag. Und Sie können bei uns auch Klavier spielen lernen, immer am Donnerstag.',
  [['Der Malkurs ist am Dienstag.', true], ['Der Fotokurs ist am Sonntag.', false], ['Klavierunterricht gibt es am Donnerstag.', true]], 'Pintura: martes 18 h. Fotografía: sábado por la mañana. Piano: jueves.');

/* ---- más ja / nein / doch y der / den (lo que más cuesta en el examen) ---- */
X(6, 'G', 'Ja, nein oder doch? Ergänzen Sie.', 'Completa con ja, nein o doch.', 'Pregunta sin negación → Ja (sí) / Nein (no). Pregunta con nicht o kein → Doch (sí) / Nein (no).', [
  '◆ Kommst du heute nicht? ○ [[Doch]], ich komme um acht.', '◆ Ist das dein Fahrrad? ○ [[Nein]], das ist das Fahrrad von Tom.', '◆ Isst du kein Fleisch? ○ [[Nein]], ich bin Vegetarier.', '◆ Hast du heute Zeit? ○ [[Ja]], am Nachmittag.', '◆ Gefällt dir die Wohnung nicht? ○ [[Doch]], sie ist super!', '◆ Trinkst du keinen Kaffee? ○ [[Doch]], aber nur am Morgen.'], { bank: ['Ja', 'Nein', 'Doch'] });
X(6, 'K', 'Antworten Sie: Ja, nein oder doch + Satz.', 'Responde con ja/nein/doch y completa la oración.', 'Doch contradice una pregunta negativa: «Hast du keinen Hunger?» – «Doch, ich habe Hunger.»', [
  '◆ Hast du keinen Hunger? ○ (Du hast Hunger.) [[Doch]], ich [[habe]] Hunger.', '◆ Spielst du nicht Fußball? ○ (Du spielst nicht.) [[Nein]], ich spiele [[nicht]] Fußball.', '◆ Hast du ein Auto? ○ (Du hast kein Auto.) [[Nein]], ich habe [[kein]] Auto.', '◆ Kannst du nicht schwimmen? ○ (Du kannst schwimmen.) [[Doch]], ich [[kann]] schwimmen.']);
X(6, 'G', 'der oder den? Ergänzen Sie.', 'Completa con der (nominativo) o den (acusativo).', 'Sujeto (y todo lo que va con sein) → der. Objeto directo (haben, kaufen, nehmen, suchen, finden, brauchen, sehen...) → den.', [
  '[[Der]] Kaffee ist heiß.', 'Ich trinke [[den]] Kaffee ohne Milch.', 'Wo ist [[der]] Schlüssel?', 'Ich suche [[den]] Schlüssel.', '[[Der]] Film ist sehr gut.', 'Hast du [[den]] Film schon gesehen?', 'Wie findest du [[den]] Teppich?', 'Wie gefällt dir [[der]] Teppich?'], { bank: ['der', 'den', 'Der', 'Den'] });
X(6, 'G', 'Nominativ oder Akkusativ? Ergänzen Sie den Artikel.', 'Completa el artículo (definido o indefinido) en el caso correcto.', 'Solo cambia el masculino en acusativo: der → den, ein → einen, kein → keinen.', [
  'Ich brauche [[einen]] Stift. (der Stift)', '[[Der]] Stift ist blau. (der Stift)', 'Wir kaufen [[ein]] Sofa. (das Sofa)', 'Nimmst du [[die]] Suppe? (die Suppe)', 'Ich habe [[keinen]] Hund. (der Hund)', '[[Ein]] Hund ist im Park. (der Hund)']);
X(7, 'G', 'Wiederholung: ja/nein/doch und der/den. Ergänzen Sie.', 'Repaso: completa ja/nein/doch y der/den.', 'Doch = sí ante una pregunta negativa. der = sujeto; den = objeto directo masculino.', [
  '◆ Hast du [[den]] Kurs schon gemacht? ○ [[Nein]], noch nicht.', '◆ Kannst du nicht Ski fahren? ○ [[Doch]], ich kann sehr gut Ski fahren!', '◆ Wo ist [[der]] Reifen? ○ Er ist im Wohnzimmer.', '◆ Hast du keinen Tipp für mich? ○ [[Doch]], lern jeden Tag zehn Wörter!']);

/* ---- Diktat y números/precios/horas de oído (preguntas sueltas, tipo 'type' con audio) ---- */
const DIKTAT = {
  13: ['Ich komme aus Mexiko.', 'Wie heißen Sie?', 'Meine Schwester wohnt in Berlin.', 'Wir brauchen Eier und Milch.', 'Was kostet das Brot?', 'Ich esse gern Fisch.'],
  46: ['Die Wohnung ist hell und groß.', 'Ich stehe um sieben Uhr auf.', 'Der Kurs fängt um neun Uhr an.', 'Hast du keinen Hunger?', 'Ich nehme den Salat.', 'Am Wochenende spiele ich Fußball.'],
  7: ['Ich kann gut kochen.', 'Was willst du lernen?', 'Ich habe Gitarre gespielt.', 'Wir sind ins Kino gegangen.', 'Hast du schon gefrühstückt?', 'Sie hat ein Foto gemacht.']
};
function genHoer(key) {
  const level = 'hoer' + key; const M = maker(level); const out = [];
  DIKTAT[key].forEach(t => {
    const q = M.ty('Hören Sie und schreiben Sie den Satz.', t.replace(/[.?!]$/, ''), 'El dictado entrena el oído y la ortografía: sustantivos con mayúscula, verbo en la posición 2. Frase: «' + t + '».', 'Diktat');
    q.de = true; q.say = t; q.tr = 'Escucha (🔊) y escribe la frase que oyes.'; q.info = { de: t, es: '' }; out.push(q);
  });
  if (key === 13) [[390, 'Das kostet drei Euro neunzig.'], [125, 'Das macht ein Euro fünfundzwanzig.'], [999, 'Das kostet neun Euro neunundneunzig.'], [1450, 'Zusammen vierzehn Euro fünfzig.'], [79, 'Die Milch kostet neunundsiebzig Cent.']].forEach(([c, t]) => {
    const e = Math.floor(c / 100), ct = String(c % 100).padStart(2, '0');
    const q = M.ty('Hören Sie: Wie viel kostet das? Schreiben Sie den Preis (z. B. 2,50).', [e + ',' + ct, e + ',' + ct + ' €', e + ',' + ct + ' Euro', e + '.' + ct], 'Se oye: «' + t + '» = ' + e + ',' + ct + ' €. Los números de dos cifras se dicen al revés: neunundsiebzig = nueve y setenta = 79.', 'Zahlen');
    q.de = true; q.say = t; q.tr = 'Escucha y escribe el precio.'; out.push(q);
  });
  if (key === 46) [[8, 15], [6, 30], [9, 45], [11, 20], [2, 50]].forEach(([h, m]) => {
    const t = 'Es ist ' + priv(h, m) + '.'; const hh = String(h), mm = String(m).padStart(2, '0');
    const q = M.ty('Hören Sie: Wie spät ist es? Schreiben Sie die Uhrzeit in Zahlen (z. B. 7:30).', [hh + ':' + mm, '0' + hh + ':' + mm, (h + 12) + ':' + mm, hh + '.' + mm], 'Se oye: «' + t + '» = ' + hh + ':' + mm + '. ' + privWhy(h, m), 'Uhrzeit');
    q.de = true; q.say = t; q.tr = 'Escucha y escribe la hora en números.'; out.push(q);
  });
  if (key === 13) [[17, 'siebzehn'], [70, 'siebzig'], [36, 'sechsunddreißig'], [63, 'dreiundsechzig'], [12, 'zwölf'], [98, 'achtundneunzig']].forEach(([n, w]) => {
    const q = M.ty('Hören Sie: Welche Zahl ist das? Schreiben Sie die Zahl.', [String(n)], 'Se oye «' + w + '» = ' + n + '. Ojo: en alemán las unidades van antes de las decenas (dreiundsechzig = 3 y 60 = 63).', 'Zahlen');
    q.de = true; q.say = w; q.tr = 'Escucha y escribe el número en cifras.'; out.push(q);
  });
  // los textos de Hören de la sección H, como preguntas sueltas del nivel
  AB.filter(x => x.sec === 'H' && (key === 13 ? x.l <= 3 : key === 46 ? x.l >= 4 && x.l <= 6 : x.l === 7)).forEach(x => { const q = abToQ(x); out.push(Object.assign(q, { level, id: level + ':' + q.id.split(':')[1] })); });
  return out;
}
const HOER_LEVELS = [
  { id: 'hoer13', group: 'Lección 3', exam: 1, icon: '🎧', title: 'Hören: Lektion 1–3', sub: 'Escuchar: presentaciones, números, precios y dictado', cats: [], gen: () => genHoer(13) },
  { id: 'hoer46', group: 'Lección 6', exam: 2, icon: '🎧', title: 'Hören: Lektion 4–6', sub: 'Escuchar: anuncios, horas, el clima y dictado', cats: [], gen: () => genHoer(46) },
  { id: 'hoer7', group: 'Lección 7', exam: 3, icon: '🎧', title: 'Hören: Lektion 7', sub: 'Escuchar: Perfekt, cursos y dictado', cats: [], gen: () => genHoer(7) }
];
const hoerLesson = () => box('Hören: entrenar el oído', '<p>Toca <b>🔊 Anhören</b> para escuchar. Puedes escuchar las veces que quieras. En los textos de «Richtig oder falsch?» el texto escrito aparece <b>después</b> de comprobar, como en el examen. En el dictado escribe exactamente lo que oyes.</p>');
LESSONS.hoer13 = hoerLesson; LESSONS.hoer46 = hoerLesson; LESSONS.hoer7 = hoerLesson;
