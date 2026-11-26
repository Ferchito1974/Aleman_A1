/* v3.5: LESEN (textos nuevos con «Richtig oder falsch?») y SCHREIBEN desde cero (oraciones y textos cortos).
   Todos los textos y preguntas son de redacción propia, con el vocabulario y la gramática de cada lección.
   Lesen usa el ejercicio 'cloze' (sección L). Schreiben usa el tipo 'free' (sección S), que corrige con patrones flexibles. */
'use strict';

/* LES(lección, título, párrafos del texto, [[afirmación, true|false], ...], explicación) */
function LES(l, title, text, items, why) {
  X(l, 'L', 'Lesen Sie den Text: «' + title + '». Richtig oder falsch?', 'Lee el texto y decide si cada frase es verdadera (richtig) o falsa (falsch).', why,
    text.map(t => '¶' + t).concat(items.map((it, i) => (i + 1) + '. ' + it[0] + ' → [[' + (it[1] ? 'richtig::falsch' : 'falsch::richtig') + ']]')));
}

/* ---------------- LESEN ---------------- */
LES(1, 'Neu im Kurs', [
  'Hallo! Mein Name ist Marta Silva. Ich komme aus Portugal, aus Porto. Jetzt wohne ich in Frankfurt.',
  'Ich spreche Portugiesisch, Spanisch und Englisch. Deutsch lerne ich erst seit zwei Monaten. Das ist mein Kollege Ahmed. Er kommt aus Ägypten und spricht Arabisch und Französisch.'],
  [['Marta kommt aus Spanien.', false], ['Marta wohnt jetzt in Frankfurt.', true], ['Marta spricht drei Sprachen sehr gut, aber noch nicht gut Deutsch.', true], ['Ahmed kommt aus Frankreich.', false], ['Ahmed spricht Arabisch.', true]],
  'Marta es de Portugal (Porto) y vive en Frankfurt. Habla portugués, español e inglés; aprende alemán desde hace dos meses. Ahmed es de Egipto y habla árabe y francés.');
LES(1, 'Ein Formular', [
  'Familienname: Novak · Vorname: Petra · Straße: Lindenweg 4 · Postleitzahl und Stadt: 1010 Wien · Land: Österreich · Telefon: 0664 2318877 · Sprachen: Tschechisch, Deutsch'],
  [['Die Frau heißt Novak mit Vornamen.', false], ['Sie wohnt in Österreich.', true], ['Ihre Postleitzahl ist 1010.', true], ['Sie spricht Englisch.', false]],
  'Familienname = apellido (Novak); Vorname = nombre (Petra). Vive en Viena, Austria, código postal 1010. Habla checo y alemán.');
LES(2, 'Meine Familie', [
  'Ich heiße Jonas und ich bin 28 Jahre alt. Ich wohne mit meiner Partnerin Lisa in Köln. Wir sind nicht verheiratet.',
  'Meine Eltern leben in Bonn. Mein Vater ist 61 und meine Mutter ist 58. Ich habe eine Schwester, Mia. Sie ist geschieden und hat zwei Kinder, Max und Ella. Mein Bruder Leon wohnt zurzeit in Kanada.'],
  [['Jonas ist mit Lisa verheiratet.', false], ['Die Eltern von Jonas wohnen in Bonn.', true], ['Jonas hat zwei Geschwister.', true], ['Mia hat keine Kinder.', false], ['Leon lebt jetzt nicht in Deutschland.', true]],
  'Jonas vive con su pareja Lisa (no están casados). Sus padres viven en Bonn. Tiene una hermana (Mia, divorciada, dos hijos) y un hermano (Leon, en Canadá): dos hermanos.');
LES(2, 'Eine Nachricht', [
  'Hallo Oma! Wie geht es dir? Mir geht es gut. Mein Deutschkurs ist super. Meine Lehrerin heißt Frau Weiß und kommt aus Hamburg. In meinem Kurs sind zwölf Leute. Viele Grüße, deine Ana'],
  [['Ana schreibt an ihre Großmutter.', true], ['Ana geht es nicht gut.', false], ['Die Lehrerin kommt aus Hamburg.', true], ['Im Kurs sind zwanzig Personen.', false]],
  'Oma = abuela. A Ana le va bien. La maestra es de Hamburgo. En el curso hay doce (zwölf) personas, no veinte.');
LES(3, 'Einkaufszettel und Nachricht', [
  'Hi Paul, ich koche heute Abend Spaghetti mit Tomatensoße. Wir haben Nudeln, aber wir haben keine Tomaten und keine Zwiebeln mehr. Kannst du bitte einkaufen? Wir brauchen auch ein Kilo Äpfel, eine Flasche Milch und 200 Gramm Käse. Butter haben wir noch. Danke! Sara'],
  [['Sara kocht heute Abend.', true], ['Sie haben keine Nudeln.', false], ['Paul soll Tomaten und Zwiebeln kaufen.', true], ['Paul soll auch Butter kaufen.', false], ['Sie brauchen 200 Gramm Käse.', true]],
  'Hay pasta (Nudeln), pero faltan jitomates y cebollas. Paul debe comprar también manzanas, leche y queso. Mantequilla todavía tienen, no hace falta comprar.');
LES(3, 'Sonderangebote', [
  'Supermarkt Frischmarkt · Angebote der Woche: Bananen 1 kg 1,29 € · Joghurt 4 Becher 1,99 € · Hähnchen 1 kg 5,49 € (statt 6,99 €) · Mineralwasser 6 Flaschen 2,40 € · Brötchen 10 Stück 2,50 € · Montag bis Samstag 8 bis 20 Uhr'],
  [['Ein Kilo Bananen kostet 1,29 Euro.', true], ['Das Hähnchen kostet jetzt 6,99 Euro.', false], ['Sechs Flaschen Wasser kosten 2,40 Euro.', true], ['Der Supermarkt ist am Sonntag geöffnet.', false]],
  'statt 6,99 € = en lugar de 6,99: el precio de oferta es 5,49. Horario: lunes a sábado, así que el domingo está cerrado.');
LES(4, 'Eine E-Mail über die neue Wohnung', [
  'Liebe Tante Eva, endlich habe ich eine Wohnung! Sie hat zwei Zimmer, eine Küche und ein Bad. Das Wohnzimmer ist groß und sehr hell. Das Schlafzimmer ist klein, aber ruhig.',
  'Die Küche ist neu und modern, nur der Kühlschrank ist alt. Leider gibt es keinen Balkon. Die Miete ist 590 Euro plus Nebenkosten. Das finde ich okay. Liebe Grüße, Tobias'],
  [['Die Wohnung hat drei Zimmer.', false], ['Das Wohnzimmer ist hell.', true], ['Der Kühlschrank ist neu.', false], ['Die Wohnung hat keinen Balkon.', true], ['Tobias findet die Miete zu teuer.', false]],
  'Dos cuartos (zwei Zimmer). El refrigerador es viejo. No hay balcón. Tobias dice que la renta le parece bien (okay).');
LES(4, 'Wohnungsanzeigen', [
  'A) 1-Zi.-Apartment, 32 qm, möbliert, ab sofort, 450 € warm.', 'B) 3-Zi.-Whg., 85 qm, Balkon, Garten, 980 € + 150 € NK, Garage.', 'C) 2-Zi.-Whg., 55 qm, Einbauküche, 4. Stock, ohne Aufzug, 620 € + NK.'],
  [['Wohnung A hat schon Möbel.', true], ['Bei Wohnung A sind die Nebenkosten im Preis.', true], ['Wohnung B ist die größte Wohnung.', true], ['Wohnung C hat keine Küche.', false], ['Wohnung C ist im Erdgeschoss.', false]],
  'möbliert = con muebles. warm = gastos incluidos. B tiene 85 m² (la más grande). C tiene cocina integral (Einbauküche) y está en el 4.º piso.');
LES(5, 'Ein Tag von Herrn Yilmaz', [
  'Kemal Yilmaz ist Busfahrer. Er steht jeden Tag um halb fünf auf, denn seine Arbeit fängt schon um sechs Uhr an. Er frühstückt nicht zu Hause, er trinkt nur schnell einen Kaffee.',
  'Um 14 Uhr hat er Feierabend. Dann kauft er im Supermarkt ein und kocht für seine Familie. Am Abend sieht er ein bisschen fern. Um zehn Uhr geht er schlafen. Am Wochenende arbeitet er nicht.'],
  [['Herr Yilmaz steht um 4.30 Uhr auf.', true], ['Er frühstückt zu Hause.', false], ['Seine Arbeit beginnt um sechs Uhr.', true], ['Am Nachmittag kocht er.', true], ['Er arbeitet auch am Samstag.', false]],
  'halb fünf = 4:30. Solo toma un café, no desayuna en casa. Termina a las 14 h, compra y cocina. El fin de semana no trabaja.');
LES(5, 'Öffnungszeiten', [
  'Stadtbibliothek · Mo, Di, Do, Fr: 10 bis 18 Uhr · Mi: geschlossen · Sa: 10 bis 14 Uhr · So und an Feiertagen geschlossen'],
  [['Am Mittwoch ist die Bibliothek geschlossen.', true], ['Am Samstag ist sie bis 18 Uhr geöffnet.', false], ['Am Donnerstag kann man um 17 Uhr ein Buch holen.', true], ['Am Sonntag ist sie geöffnet.', false]],
  'Miércoles y domingo cerrado. Sábado solo hasta las 14 h. Jueves de 10 a 18 h, así que a las 17 h está abierta.');
LES(6, 'Eine Einladung', [
  'Hallo Leute! Am Samstag machen wir ein Picknick im Stadtpark. Wir treffen uns um 13 Uhr am See. Bitte bringt etwas zu essen oder zu trinken mit. Ich bringe Würstchen und den Grill mit.',
  'Der Wetterbericht sagt: Es wird sonnig und warm, 26 Grad. Wenn es regnet, gehen wir ins Café Mondschein. Wer kommt? Antwortet bitte bis Donnerstag! Lena'],
  [['Das Picknick ist am Sonntag.', false], ['Alle treffen sich um 13 Uhr.', true], ['Lena bringt Würstchen mit.', true], ['Es wird kalt und windig.', false], ['Bei Regen gehen sie in ein Café.', true]],
  'El picnic es el sábado (Samstag). Lena lleva salchichas y el asador. El pronóstico: soleado y cálido. Si llueve, van al café.');
LES(6, 'Speisekarte', [
  'Imbiss am Markt · Currywurst mit Pommes 5,90 € · Hamburger 4,50 € · Gemüsesuppe 3,80 € · Salat mit Hähnchen 6,20 € · Cola 2,20 € · Wasser 1,80 € · Kaffee 2,00 €'],
  [['Die Suppe kostet 3,80 Euro.', true], ['Es gibt keinen Salat.', false], ['Der Hamburger ist teurer als die Currywurst.', false], ['Ein Wasser ist billiger als eine Cola.', true]],
  'Gemüsesuppe = sopa de verduras, 3,80 €. Hay ensalada con pollo. La hamburguesa (4,50) es más barata que la currywurst (5,90). El agua (1,80) es más barata que la cola (2,20).');
LES(7, 'Am Wochenende', [
  'Liebe Sophie, wie war dein Wochenende? Meins war toll! Am Samstag bin ich früh aufgestanden und mit dem Zug nach Heidelberg gefahren. Dort habe ich meine Freundin Clara getroffen.',
  'Wir haben die Altstadt gesehen und viele Fotos gemacht. Am Abend haben wir in einem Restaurant gegessen. Am Sonntag habe ich nur gelesen und lange geschlafen. Nächste Woche will ich einen Kochkurs machen. Kommst du mit? Dein Felix'],
  [['Felix ist mit dem Auto nach Heidelberg gefahren.', false], ['Er hat in Heidelberg eine Freundin getroffen.', true], ['Am Samstagabend hat er zu Hause gekocht.', false], ['Am Sonntag hat er gelesen.', true], ['Felix will einen Kurs machen.', true]],
  'Fue en tren (mit dem Zug). Vio a su amiga Clara. Por la noche comieron en un restaurante. El domingo leyó y durmió mucho. Quiere hacer un curso de cocina.');
LES(7, 'Kursangebot der Volkshochschule', [
  'Volkshochschule · Neue Kurse im Herbst: Gitarre für Anfänger (Di, 18 bis 19.30 Uhr) · Spanisch A1 (Mo und Mi, 19 bis 20.30 Uhr) · Fotografieren mit dem Handy (Sa, 10 bis 13 Uhr) · Yoga gegen Stress (Do, 17 bis 18 Uhr) · Anmeldung im Internet oder Telefon 0711 445566'],
  [['Den Gitarrenkurs gibt es am Dienstag.', true], ['Der Spanischkurs ist an zwei Tagen pro Woche.', true], ['Der Fotokurs ist am Sonntag.', false], ['Man kann sich nur per Telefon anmelden.', false]],
  'Guitarra: martes. Español: lunes y miércoles. Fotografía: sábado. Inscripción por internet o por teléfono (no solo teléfono).');

/* ---------------- SCHREIBEN ---------------- */
/* FREE(lección, pregunta en alemán, traducción, [patrones válidos (texto plegado: ä→ae, ß→ss, minúsculas)], respuesta modelo, explicación) */
const FREE_LIST = [];
function FREE(l, q, tr, pats, model, why) { FREE_LIST.push({ l, q, tr, pats, model, why, mode: 'sentence' }); }
/* TEXT(lección, tarea, traducción, [[punto que se revisa, patrón], ...], texto modelo, mínimo de palabras, explicación) */
function TEXT(l, q, tr, checks, model, min, why) { FREE_LIST.push({ l, q, tr, checks, model, min, why, mode: 'text' }); }

const W = '[a-zäöüß-]+'; // una palabra cualquiera
const WS = '[a-zäöüß ,.-]+'; // varias palabras
// Lektion 1
FREE(1, 'Antworten Sie mit einem ganzen Satz: Wie heißen Sie?', 'Responde con una oración completa: ¿cómo se llama usted?', ['^(ich heisse|mein name ist|ich bin) ' + W], 'Ich heiße Fernando López.', 'Ich heiße + nombre. También: Mein Name ist ... / Ich bin ...');
FREE(1, 'Antworten Sie mit einem ganzen Satz: Woher kommen Sie?', 'Responde con una oración completa: ¿de dónde es usted?', ['^ich komme aus ' + W], 'Ich komme aus Mexiko.', 'Ich komme aus + país o ciudad.');
FREE(1, 'Antworten Sie mit einem ganzen Satz: Wo wohnen Sie?', 'Responde: ¿dónde vive usted?', ['^ich wohne (jetzt |zurzeit )?in ' + W, '^ich lebe (jetzt |zurzeit )?in ' + W], 'Ich wohne in Puebla.', 'Ich wohne in + ciudad (wohnen = vivir).');
FREE(1, 'Antworten Sie mit einem ganzen Satz: Welche Sprachen sprechen Sie?', 'Responde: ¿qué idiomas habla?', ['^ich spreche ' + WS], 'Ich spreche Spanisch, Englisch und ein bisschen Deutsch.', 'Ich spreche + idiomas (con mayúscula: Spanisch, Deutsch).');
FREE(1, 'Schreiben Sie auf Deutsch: «Me llamo Ana y soy de Colombia.»', 'Traduce sin ayuda.', ['^(ich heisse|mein name ist) ana,? und (ich )?komme aus kolumbien$'], 'Ich heiße Ana und ich komme aus Kolumbien.', 'heißen + nombre; kommen aus + país. «y» = und.');
FREE(1, 'Fragen Sie: ¿De dónde viene usted? (formal)', 'Escribe la pregunta formal.', ['^woher kommen sie$'], 'Woher kommen Sie?', 'W-Frage: Woher (1) kommen (2) Sie (formal, con mayúscula).');
TEXT(1, 'Stellen Sie sich vor: Name, Land, Wohnort, Sprachen. (mindestens 15 Wörter)', 'Preséntate: nombre, país, ciudad donde vives e idiomas (mínimo 15 palabras).',
  [['Nombre (Ich heiße / Mein Name ist)', '(ich heisse|mein name ist|ich bin) '], ['País (Ich komme aus)', 'komme aus '], ['Ciudad (Ich wohne in)', '(wohne|lebe) (ich )?(jetzt |zurzeit )?in '], ['Idiomas (Ich spreche)', 'spreche ']],
  'Hallo! Ich heiße Fernando und ich komme aus Mexiko. Jetzt wohne ich in Puebla. Ich spreche Spanisch, Englisch und ein bisschen Deutsch.', 15, 'Cada idea es una oración corta con el verbo en la posición 2. Une ideas con «und».');
// Lektion 2
FREE(2, 'Antworten Sie mit einem ganzen Satz: Wie alt sind Sie?', 'Responde: ¿cuántos años tiene?', ['^ich bin ' + W + ' (jahre alt|jahre)$', '^ich bin \\d+ (jahre alt|jahre)$'], 'Ich bin 30 Jahre alt.', 'Ich bin + número + Jahre alt.');
FREE(2, 'Antworten Sie mit einem ganzen Satz: Haben Sie Geschwister?', 'Responde: ¿tiene hermanos?', ['^(ja|nein),? ich habe ' + WS, '^ich habe ' + WS, '^nein,? ich habe keine geschwister$'], 'Ja, ich habe einen Bruder und eine Schwester.', 'Ich habe einen Bruder (masculino: einen) / eine Schwester / keine Geschwister.');
FREE(2, 'Antworten Sie mit einem ganzen Satz: Sind Sie verheiratet?', 'Responde: ¿está casado?', ['^(ja|nein),? ich bin (verheiratet|ledig|geschieden|verwitwet|nicht verheiratet)$', '^ich bin (verheiratet|ledig|geschieden|verwitwet|nicht verheiratet)$'], 'Nein, ich bin ledig.', 'Ich bin verheiratet / ledig / geschieden.');
FREE(2, 'Schreiben Sie auf Deutsch: «Mi hermana vive en Berlín.»', 'Traduce sin ayuda.', ['^meine schwester (wohnt|lebt) in berlin$'], 'Meine Schwester wohnt in Berlin.', 'die Schwester → meine Schwester (femenino: meine). er/sie → wohnt.');
FREE(2, 'Schreiben Sie auf Deutsch: «Mis padres tienen dos hijos.»', 'Traduce sin ayuda.', ['^meine eltern haben zwei kinder$'], 'Meine Eltern haben zwei Kinder.', 'die Eltern (plural) → meine Eltern; haben (sie plural) = haben.');
TEXT(2, 'Schreiben Sie über Ihre Familie: Wer? Wie alt? Wo wohnen sie? (mindestens 20 Wörter)', 'Escribe sobre tu familia: quiénes son, qué edad tienen, dónde viven (mínimo 20 palabras).',
  [['Un miembro de la familia con posesivo (mein/meine)', '(mein|meine) (vater|mutter|bruder|schwester|eltern|sohn|tochter|mann|frau|kinder|oma|opa)'], ['Una edad (... Jahre alt)', 'jahre( alt)?'], ['Dónde vive (wohnt/lebt in)', '(wohnt|wohnen|lebt|leben) in '], ['Verbo correcto para él/ella (ist / hat / wohnt)', '\\b(ist|hat|wohnt|lebt|arbeitet)\\b']],
  'Meine Familie ist klein. Mein Vater heißt Luis und ist 60 Jahre alt. Meine Mutter ist 57. Sie wohnen in Puebla. Ich habe eine Schwester. Sie lebt in Monterrey.', 20, 'Usa mein (masculino/neutro) y meine (femenino/plural). Con er/sie el verbo lleva -t: wohnt, lebt, arbeitet.');
// Lektion 3
FREE(3, 'Antworten Sie mit einem ganzen Satz: Was essen Sie gern?', 'Responde: ¿qué le gusta comer?', ['^ich esse (sehr )?gern ' + WS], 'Ich esse gern Fisch und Salat.', 'Ich esse gern + comida. essen: ich esse, du isst.');
FREE(3, 'Antworten Sie mit einem ganzen Satz: Was trinken Sie zum Frühstück?', 'Responde: ¿qué toma en el desayuno?', ['^(ich trinke|zum fruehstueck trinke ich) ' + WS], 'Ich trinke Kaffee mit Milch.', 'Ich trinke ... / Zum Frühstück trinke ich ... (inversión: verbo en la posición 2).');
FREE(3, 'Schreiben Sie auf Deutsch: «No tenemos huevos.»', 'Traduce sin ayuda.', ['^wir haben keine eier$'], 'Wir haben keine Eier.', 'Plural (Eier) → keine.');
FREE(3, 'Schreiben Sie auf Deutsch: «¿Cuánto cuesta un kilo de manzanas?»', 'Traduce sin ayuda.', ['^was kostet (ein|1) kilo aepfel$', '^wie viel kostet (ein|1) kilo aepfel$'], 'Was kostet ein Kilo Äpfel?', 'Was kostet ...? / Wie viel kostet ...? ein Kilo Äpfel (sin «von»).');
FREE(3, 'Schreiben Sie auf Deutsch: «Necesito un kilo de jitomates.»', 'Traduce sin ayuda.', ['^ich brauche (ein|1) kilo tomaten$'], 'Ich brauche ein Kilo Tomaten.', 'brauchen = necesitar: ich brauche.');
TEXT(3, 'Schreiben Sie eine Nachricht an Ihren Mitbewohner: Was kochen Sie? Was haben Sie nicht? Was soll er kaufen? (mindestens 20 Wörter)', 'Escribe un mensaje a tu compañero de piso: qué cocinas, qué falta y qué debe comprar (mínimo 20 palabras).',
  [['Saludo (Hallo / Hi / Lieber / Liebe)', '^(hallo|hi|lieber|liebe)'], ['Qué cocinas (ich koche)', 'koche'], ['Lo que falta (kein/keine/keinen)', '\\bkeine?n?\\b'], ['Lo que hay que comprar (kaufen / brauchen)', '(kauf|brauche)'], ['Despedida (Danke / Gruß / Grüße / Tschüs)', '(danke|gruss|gruesse|tschues|bis spaeter)']],
  'Hallo Tim, ich koche heute Abend Gemüsesuppe. Wir haben keine Zwiebeln und keine Kartoffeln. Kannst du bitte ein Kilo Kartoffeln und drei Zwiebeln kaufen? Danke! Viele Grüße, Fernando', 20, 'Nota corta: saludo, información, petición y despedida. kein-: kein (neutro), keine (femenino y plural), keinen (masculino acusativo).');
// Lektion 4
FREE(4, 'Antworten Sie mit einem ganzen Satz: Wie ist Ihre Wohnung?', 'Responde: ¿cómo es su departamento?', ['^(meine wohnung|sie) ist ' + WS], 'Meine Wohnung ist klein, aber sehr hell.', 'Meine Wohnung ist + adjetivos (groß, klein, hell, dunkel, teuer, billig...).');
FREE(4, 'Antworten Sie mit einem ganzen Satz: Wie viele Zimmer hat Ihre Wohnung?', 'Responde: ¿cuántos cuartos tiene su departamento?', ['^(meine wohnung|sie) hat ' + W + ' zimmer', '^(meine wohnung|sie) hat \\d+ zimmer'], 'Meine Wohnung hat drei Zimmer.', 'haben → sie hat. Zimmer no cambia en plural.');
FREE(4, 'Schreiben Sie auf Deutsch: «La cocina es pequeña, pero el baño es grande.»', 'Traduce sin ayuda.', ['^die kueche ist klein,? aber das bad ist gross$'], 'Die Küche ist klein, aber das Bad ist groß.', 'die Küche, das Bad. aber = pero.');
FREE(4, 'Schreiben Sie auf Deutsch: «No tengo balcón.»', 'Traduce sin ayuda.', ['^ich habe keinen balkon$'], 'Ich habe keinen Balkon.', 'der Balkon → acusativo: keinen Balkon.');
FREE(4, 'Schreiben Sie auf Deutsch: «¿Te gusta la lámpara?»', 'Traduce sin ayuda.', ['^gefaellt dir die lampe$', '^wie gefaellt dir die lampe$'], 'Gefällt dir die Lampe?', 'gefallen: lo que gusta es el sujeto → die Lampe gefällt (singular).');
TEXT(4, 'Beschreiben Sie Ihre Wohnung: Zimmer, Möbel, was gefällt Ihnen? (mindestens 20 Wörter)', 'Describe tu departamento: cuartos, muebles y qué te gusta (mínimo 20 palabras).',
  [['Cuántos cuartos (hat ... Zimmer)', 'hat .{0,15}zimmer'], ['Un adjetivo (groß, klein, hell, schön...)', '\\b(gross|klein|hell|dunkel|schoen|modern|ruhig|teuer|billig|neu|alt)\\b'], ['Un mueble con artículo', '\\b(ein|eine|einen|der|die|das|den|kein|keinen)\\b (sofa|tisch|bett|schrank|stuhl|sessel|teppich|regal|lampe|kuehlschrank|herd|fernseher|schreibtisch)'], ['Tu opinión (gefällt mir / finde)', '(gefaellt|gefallen|finde)']],
  'Meine Wohnung hat zwei Zimmer und eine Küche. Das Wohnzimmer ist groß und hell. Dort habe ich ein Sofa und einen Tisch. Die Küche ist klein, aber modern. Der Balkon gefällt mir sehr gut.', 20, 'Usa haben + acusativo (einen Tisch, ein Sofa, eine Lampe) y sein + adjetivo (Das Zimmer ist hell).');
// Lektion 5
FREE(5, 'Antworten Sie mit einem ganzen Satz: Wann stehen Sie auf?', 'Responde: ¿a qué hora se levanta?', ['^ich stehe (um )?' + WS + ' auf$', '^um ' + WS + ' stehe ich auf$'], 'Ich stehe um halb sieben auf.', 'Separable: Ich stehe um ... auf (auf al final). Inversión: Um sieben Uhr stehe ich auf.');
FREE(5, 'Antworten Sie mit einem ganzen Satz: Was machen Sie am Wochenende?', 'Responde: ¿qué hace el fin de semana?', ['^am wochenende ' + W + ' ich ' + WS, '^ich ' + W + ' am wochenende ' + WS, '^ich ' + W + ' ' + WS + ' am wochenende'], 'Am Wochenende treffe ich Freunde.', 'Si empiezas con «Am Wochenende», el verbo va en la posición 2 y luego ich: Am Wochenende spiele ich ...');
FREE(5, 'Schreiben Sie auf Deutsch: «El curso empieza a las nueve.»', 'Traduce sin ayuda.', ['^der kurs faengt um (neun|9)( uhr)? an$', '^um (neun|9)( uhr)? faengt der kurs an$'], 'Der Kurs fängt um neun Uhr an.', 'anfangen: fängt ... an (separable, a → ä).');
FREE(5, 'Schreiben Sie auf Deutsch: «El lunes por la tarde voy de compras.»', 'Traduce sin ayuda.', ['^am montagnachmittag kaufe ich ein$', '^am montag(nachmittag| am nachmittag| nachmittag) kaufe ich ein$', '^ich kaufe am montag(nachmittag| am nachmittag| nachmittag) ein$'], 'Am Montagnachmittag kaufe ich ein.', 'einkaufen es separable: kaufe ... ein. Inversión: Am Montag... kaufe ich ein.');
FREE(5, 'Fragen Sie: ¿Tienes tiempo el viernes?', 'Escribe la pregunta.', ['^hast du am freitag zeit$', '^hast du freitag zeit$'], 'Hast du am Freitag Zeit?', 'Pregunta de sí/no: verbo en la posición 1. am + día.');
TEXT(5, 'Schreiben Sie über Ihren Tag: Wann stehen Sie auf? Was machen Sie am Vormittag, Nachmittag und Abend? (mindestens 25 Wörter)', 'Escribe sobre tu día (mínimo 25 palabras).',
  [['Hora de levantarte (stehe ... auf)', 'stehe .{0,25}auf'], ['Una hora con «um»', '\\bum \\S+'], ['Una parte del día con «am» (am Vormittag, am Abend...)', 'am (morgen|vormittag|mittag|nachmittag|abend)'], ['Inversión (Am Abend sehe ich... / Dann ...)', '(am \\w+|um \\S+ uhr|dann|danach|heute) (\\w+) (ich|wir)\\b']],
  'Ich stehe um sechs Uhr auf. Dann frühstücke ich. Am Vormittag arbeite ich von acht bis eins. Am Nachmittag kaufe ich ein. Am Abend koche ich und sehe ein bisschen fern. Um elf Uhr gehe ich schlafen.', 25, 'Verbos separables con el prefijo al final. Después de «Dann / Am Abend» viene el verbo y luego ich.');
// Lektion 6
FREE(6, 'Antworten Sie mit einem ganzen Satz: Was machen Sie gern in Ihrer Freizeit?', 'Responde: ¿qué le gusta hacer en su tiempo libre?', ['^(ich|in meiner freizeit) ' + W + ' (ich )?(sehr )?gern ' + WS, '^ich ' + W + ' ' + WS + ' gern', '^in meiner freizeit ' + W + ' ich ' + WS], 'Ich lese gern und spiele Fußball.', 'Ich + verbo + gern: Ich schwimme gern. In meiner Freizeit spiele ich gern Gitarre.');
FREE(6, 'Antworten Sie mit einem ganzen Satz: Wie ist das Wetter heute?', 'Responde: ¿cómo está el clima hoy?', ['^(heute )?(es ist|ist es|es regnet|regnet es|es schneit|schneit es|die sonne scheint|scheint die sonne)' + '[a-zäöüß ,.0-9-]*$'], 'Heute ist es sonnig und warm.', 'Es ist sonnig / kalt / warm. Es regnet. Die Sonne scheint. Con «Heute» al inicio: Heute ist es ...');
FREE(6, 'Schreiben Sie auf Deutsch: «Tomo una salchicha y un agua.»', 'Traduce sin ayuda.', ['^ich nehme (eine )?(bratwurst|wurst|currywurst|ein wuerstchen) und (ein|eine) (wasser|mineralwasser)$'], 'Ich nehme ein Würstchen und ein Wasser.', 'nehmen: ich nehme. das Würstchen / das Wasser → ein.');
FREE(6, 'Schreiben Sie auf Deutsch: «¿No tienes hambre? – Sí, tengo hambre.» (con doch)', 'Traduce sin ayuda (dos oraciones).', ['^hast du keinen hunger,? doch,? ich habe hunger$'], 'Hast du keinen Hunger? – Doch, ich habe Hunger.', 'Pregunta negativa con keinen (der Hunger); respuesta positiva = Doch.');
FREE(6, 'Schreiben Sie auf Deutsch: «Mi hermano lee un libro.»', 'Traduce sin ayuda.', ['^mein bruder liest ein buch$'], 'Mein Bruder liest ein Buch.', 'lesen: er liest (e → ie). das Buch → ein Buch.');
TEXT(6, 'Antworten Sie auf eine Einladung zum Picknick am Samstag: Sie kommen, was bringen Sie mit, und Sie fragen nach der Uhrzeit. (mindestens 20 Wörter)', 'Responde a una invitación a un picnic: vas, qué llevas y pregunta la hora (mínimo 20 palabras).',
  [['Saludo', '^(hallo|hi|liebe|lieber)'], ['Que vas (ich komme gern / gern!)', '(komme|gern|gute idee|super)'], ['Qué llevas (ich bringe ... mit)', 'bringe .{0,30}mit'], ['Pregunta por la hora (Wann / Um wie viel Uhr)', '(wann|um wie viel uhr|wie spaet)'], ['Despedida', '(gruss|gruesse|bis samstag|tschues|bis dann)']],
  'Hallo Lena, danke für die Einladung! Ich komme gern zum Picknick. Ich bringe einen Kuchen und Saft mit. Um wie viel Uhr treffen wir uns? Bis Samstag! Viele Grüße, Fernando', 20, 'mitbringen es separable: Ich bringe einen Kuchen mit. Pregunta con «Um wie viel Uhr ...?».');
// Lektion 7
FREE(7, 'Antworten Sie mit einem ganzen Satz im Perfekt: Was haben Sie gestern gemacht?', 'Responde en Perfekt: ¿qué hizo ayer?', ['^(ich|gestern) (habe|bin) (ich )?' + WS + ' ge' + W + '$', '^(ich|gestern) (habe|bin) (ich )?' + WS + ' ' + W + 'iert$'], 'Gestern habe ich Fußball gespielt.', 'Perfekt: habe/bin en la posición 2 + participio al final. Gestern habe ich ... gemacht / Ich bin ... gegangen.');
FREE(7, 'Antworten Sie mit einem ganzen Satz im Perfekt: Wohin sind Sie am Wochenende gefahren?', 'Responde en Perfekt: ¿a dónde fue el fin de semana?', ['^(ich bin|am wochenende bin ich) ' + WS + ' gefahren$'], 'Am Wochenende bin ich nach Oaxaca gefahren.', 'fahren → sein: Ich bin ... gefahren.');
FREE(7, 'Antworten Sie mit einem ganzen Satz: Was können Sie gut?', 'Responde: ¿qué sabe hacer bien?', ['^ich kann (sehr )?gut ' + WS], 'Ich kann gut kochen.', 'können + infinitivo al final: Ich kann gut schwimmen.');
FREE(7, 'Antworten Sie mit einem ganzen Satz: Was wollen Sie in den Ferien machen?', 'Responde: ¿qué quiere hacer en las vacaciones?', ['^(ich will|in den ferien will ich) ' + WS], 'In den Ferien will ich nach Deutschland fahren.', 'wollen + infinitivo al final. Inversión: In den Ferien will ich ...');
FREE(7, 'Schreiben Sie auf Deutsch: «Ayer comí pizza.»', 'Traduce sin ayuda.', ['^(ich habe gestern|gestern habe ich) pizza gegessen$'], 'Gestern habe ich Pizza gegessen.', 'essen → hat gegessen (haben).');
FREE(7, 'Schreiben Sie auf Deutsch: «Fuimos al cine.»', 'Traduce sin ayuda.', ['^wir sind ins kino gegangen$'], 'Wir sind ins Kino gegangen.', 'gehen → sind gegangen (sein, movimiento). ins = in das.');
FREE(7, 'Schreiben Sie auf Deutsch: «¿Ya aprendiste las palabras?»', 'Traduce sin ayuda.', ['^hast du (die woerter|die vokabeln) schon gelernt$', '^hast du schon (die woerter|die vokabeln) gelernt$'], 'Hast du schon die Wörter gelernt?', 'Pregunta en Perfekt: Hast (1) du ... gelernt (final)?');
FREE(7, 'Schreiben Sie auf Deutsch: «No sé nadar.»', 'Traduce sin ayuda.', ['^ich kann nicht schwimmen$'], 'Ich kann nicht schwimmen.', 'können = saber hacer. nicht antes del infinitivo.');
TEXT(7, 'Schreiben Sie eine E-Mail an einen Freund: Was haben Sie am Wochenende gemacht (zwei Sachen, im Perfekt)? Was wollen Sie nächste Woche machen? (mindestens 25 Wörter)', 'Escribe un correo a un amigo: dos cosas que hiciste el fin de semana (en Perfekt) y qué quieres hacer la próxima semana (mínimo 25 palabras). Como en «Schreiben, Teil 2».',
  [['Saludo (Lieber / Liebe / Hallo)', '^(lieber|liebe|hallo|hi)'], ['Una frase en Perfekt con haben (habe ... ge...)', '\\bhabe\\b.{0,40}\\b(ge\\w+|\\w+iert)\\b'], ['Una frase en Perfekt con sein (bin ... gegangen/gefahren/gekommen)', '\\b(bin|sind)\\b.{0,40}\\b(gegangen|gefahren|gekommen|gewandert|aufgestanden)\\b'], ['Un plan con wollen (will ... infinitivo)', '\\b(will|wollen)\\b'], ['Despedida (Viele Grüße / Liebe Grüße / Bis bald)', '(gruss|gruesse|bis bald|tschues)']],
  'Lieber Max, wie geht es dir? Am Samstag habe ich lange geschlafen und dann habe ich Freunde getroffen. Am Sonntag bin ich mit dem Fahrrad zum See gefahren. Nächste Woche will ich einen Deutschkurs machen. Kommst du mit? Viele Grüße, Fernando', 25, 'Perfekt: haben + participio (geschlafen, getroffen) y sein con movimiento (gefahren, gegangen). Planes: will + infinitivo al final.');
TEXT(7, 'Schreiben Sie: Was können Sie gut, was nicht? Was wollen Sie lernen? (mindestens 20 Wörter)', 'Escribe qué sabes hacer bien, qué no y qué quieres aprender (mínimo 20 palabras).',
  [['Algo que sabes hacer (ich kann ... gut)', 'kann .{0,20}gut|kann gut'], ['Algo que no sabes (kann ... nicht / gar nicht)', 'kann (nicht|gar nicht|.{0,20}nicht)'], ['Algo que quieres aprender (will ... lernen)', 'will .{0,30}lernen'], ['Infinitivo al final de la frase', '\\b(kann|will)\\b[a-z ]{0,40}\\b[a-z]+en( und| aber|,|$)']],
  'Ich kann gut kochen und ich kann ein bisschen Gitarre spielen. Aber ich kann nicht gut singen. Ich will Deutsch lernen und ich will auch schwimmen lernen.', 20, 'können y wollen van en la posición 2 y el otro verbo en infinitivo al final de la frase.');
