/* v3.4: «Arbeitsbuch-Training» y «Test Lektion»: ejercicios con el formato del Arbeitsbuch
   (diálogos con varios huecos, banco de palabras, «Was passt nicht?», «Schreiben Sie Sätze»), en tres secciones como los
   tests del libro: Wörter (W), Grammatik (G), Kommunikation (K). Todos los textos son de redacción propia.

   Sintaxis de los huecos dentro de cada línea:
     [[respuesta]]                 campo para escribir
     [[resp1/resp2]]               varias respuestas válidas
     [[respuesta::otra|otra2]]     lista desplegable (la respuesta se mezcla con las otras opciones)
   Si el ejercicio tiene «bank», cada hueco es una lista desplegable con todas las palabras del banco.
   ◆ y ○ marcan a las dos personas de un diálogo. */
'use strict';

const AB = [];
/* X(lección, sección, consigna en alemán, consigna en español, explicación, líneas, opciones) */
function X(l, sec, ins, tr, why, lines, o) { AB.push(Object.assign({ l, sec, ins, tr, why, lines }, o || {})); }
/* «Was passt nicht?»: cada fila es una lista; la palabra que sobra va marcada con * */
function ODD(l, sec, rows, why, tr) {
  X(l, sec, 'Was passt nicht? Wählen Sie.', tr || '¿Qué no encaja? Elige la palabra que sobra en cada fila.', why,
    rows.map((r, i) => String.fromCharCode(97 + i) + ') ' + r.map(w => w.replace('*', '')).join(' – ') + ' → [[' + r.find(w => w.endsWith('*')).replace('*', '') + '::' + r.filter(w => !w.endsWith('*')).join('|') + ']]'));
}

/* ======================= LEKTION 1 ======================= */
X(1, 'W', 'Ergänzen Sie die Begrüßung.', 'Completa el saludo según la hora del día.', 'Mañana: Guten Morgen. Mediodía y tarde: Guten Tag. Noche (al llegar): Guten Abend. Al ir a dormir: Gute Nacht. Despedida: Auf Wiedersehen (formal), Tschüs (informal), Auf Wiederhören (por teléfono).', [
  '7.00 Uhr: Guten [[Morgen]], Frau Weber!', '14.00 Uhr: Guten [[Tag]], Herr Krause!', '19.00 Uhr: Guten [[Abend]], meine Damen und Herren!', '23.00 Uhr: Gute [[Nacht]], Mama!', 'Am Telefon: Auf [[Wiederhören]]!']);
ODD(1, 'W', [['Spanien', 'Polen', 'Italien', 'Englisch*'], ['Deutsch', 'Türkisch', 'Österreich*', 'Russisch'], ['hallo', 'Guten Tag', 'Tschüs*', 'Guten Morgen'], ['Straße', 'Stadt', 'Vorname*', 'Postleitzahl']],
  'Países: Spanien, Polen, Italien (Englisch es un idioma). Idiomas: Deutsch, Türkisch, Russisch (Österreich es un país). Saludos al llegar vs Tschüs (despedida). Dirección: Straße, Stadt, Postleitzahl (Vorname es el nombre).');
X(1, 'W', 'Ergänzen Sie das Formular.', 'Completa el formulario con las palabras del banco.', 'Familienname = apellido, Vorname = nombre de pila, Straße = calle, Postleitzahl = código postal, Stadt = ciudad, Land = país.', [
  '[[Familienname]]: Ortega', '[[Vorname]]: Daniela', '[[Straße]]: Gartenweg 12', '[[Postleitzahl]]: 80331', '[[Stadt]]: München', '[[Land]]: Deutschland'], { bank: ['Familienname', 'Vorname', 'Straße', 'Postleitzahl', 'Stadt', 'Land'] });
X(1, 'W', 'Land oder Sprache? Ergänzen Sie.', 'Completa el país o el idioma.', 'En Spanien se habla Spanisch; en Frankreich, Französisch; en Italien, Italienisch; en Polen, Polnisch; en Österreich y en Deutschland, Deutsch.', [
  'Ich komme aus Spanien. Ich spreche [[Spanisch]].', 'Pierre kommt aus [[Frankreich]]. Er spricht Französisch.', 'Marco kommt aus Italien. Er spricht [[Italienisch]].', 'Anna kommt aus [[Polen]]. Sie spricht Polnisch.', 'Lukas kommt aus Österreich. Er spricht [[Deutsch]].']);
X(1, 'G', 'Ergänzen Sie heißen, kommen, sprechen oder sein in der richtigen Form.', 'Completa con heißen, kommen, sprechen o sein en la forma correcta.', 'ich heiße / du heißt / Sie heißen · ich komme / du kommst · ich spreche / du sprichst (e → i) · ich bin / du bist / Sie sind.', [
  '◆ Guten Tag. Ich [[heiße]] Maria Gómez. (heißen)', '○ Guten Tag, Frau Gómez. Woher [[kommen]] Sie? (kommen)', '◆ Ich [[komme]] aus Kolumbien. Und Sie? (kommen)', '○ Ich [[bin]] Thomas Berger, aus der Schweiz. (sein)', '◆ [[Sprechen]] Sie Englisch? (sprechen)', '○ Ja, ein bisschen. Und du, Paul, was [[sprichst]] du? (sprechen)']);
X(1, 'G', 'Ergänzen Sie das Fragewort.', 'Completa con la palabra interrogativa.', 'Wie = cómo (nombre), Woher = de dónde, Wer = quién, Was = qué, Wo = dónde.', [
  '[[Wie]] heißen Sie? – Ich heiße Jonas.', '[[Woher]] kommst du? – Aus Peru.', '[[Wer]] ist das? – Das ist Frau Klein.', '[[Was]] sprechen Sie? – Deutsch und Englisch.', '[[Wo]] wohnst du? – In Bremen.'], { bank: ['Wie', 'Woher', 'Wer', 'Was', 'Wo'] });
X(1, 'G', 'Schreiben Sie Sätze.', 'Escribe oraciones con las palabras dadas. El verbo va en la posición 2.', 'Afirmación: verbo en la posición 2 (Ich komme aus Chile.). W-Frage: palabra interrogativa en 1 y verbo en 2 (Woher kommen Sie?).', [
  '(kommen – aus Chile – ich) → [[Ich komme aus Chile]]', '(Sie – woher – kommen) → [[Woher kommen Sie]]?', '(heißen – wie – du) → [[Wie heißt du]]?', '(sprechen – ein bisschen Deutsch – wir) → [[Wir sprechen ein bisschen Deutsch]]']);
X(1, 'G', 'Ergänzen Sie die Verbformen.', 'Completa la tabla de conjugación.', 'Terminaciones regulares: ich -e, du -st, er/sie -t, wir -en, ihr -t, sie/Sie -en. heißen: du heißt (sin s extra). sein es irregular.', [
  'kommen: ich [[komme]] · du [[kommst]] · er [[kommt]] · wir [[kommen]]', 'heißen: ich heiße · du [[heißt]] · sie [[heißt]] · Sie [[heißen]]', 'sein: ich [[bin]] · du [[bist]] · er [[ist]] · Sie [[sind]]']);
X(1, 'K', 'Ordnen Sie zu.', 'Coloca cada expresión en su lugar en la conversación.', 'Wie bitte? = ¿cómo? (no entendiste). Buchstabieren Sie bitte = deletree. Entschuldigung = disculpe. Vielen Dank = muchas gracias.', [
  '◆ [[Entschuldigung]], wie heißen Sie?', '○ Mein Name ist Szymański.', '◆ [[Wie bitte]]?', '○ Szymański.', '◆ [[Buchstabieren Sie bitte]].', '○ S – Z – Y – M – A – Ń – S – K – I.', '◆ [[Vielen Dank]]!'], { bank: ['Entschuldigung', 'Wie bitte', 'Buchstabieren Sie bitte', 'Vielen Dank'] });
X(1, 'K', 'Ergänzen Sie das Gespräch.', 'Completa la conversación informal.', 'Entre amigos se usa du: Wie heißt du? Woher kommst du? Saludo informal: Hallo; despedida: Tschüs.', [
  '◆ [[Hallo]]! Ich bin Mia. Und wer bist du?', '○ Ich [[heiße]] Kenji.', '◆ Woher [[kommst]] du, Kenji?', '○ Ich komme [[aus]] Japan.', '◆ Ah, super! Bis morgen, [[tschüs]]!']);

/* ======================= LEKTION 2 ======================= */
ODD(2, 'W', [['Vater', 'Mutter', 'Bruder', 'Nummer*'], ['Oma', 'Opa', 'Enkel', 'Lehrer*'], ['ledig', 'verheiratet', 'geschieden', 'genau*'], ['elf', 'zwölf', 'zwanzig', 'Zahl*']],
  'Familia: Vater, Mutter, Bruder. Abuelos y nietos: Oma, Opa, Enkel. Estado civil: ledig, verheiratet, geschieden. Números: elf, zwölf, zwanzig (Zahl es la palabra «número»).');
X(2, 'W', 'Ergänzen Sie die Familie.', 'Completa la pareja de cada miembro de la familia.', 'Vater ↔ Mutter, Sohn ↔ Tochter, Bruder ↔ Schwester, Opa ↔ Oma, Großvater ↔ Großmutter, Mann ↔ Frau.', [
  'der Vater – die [[Mutter]]', 'der Sohn – die [[Tochter]]', 'der Bruder – die [[Schwester]]', 'der Opa – die [[Oma]]', 'der Enkel – die [[Enkelin]]']);
X(2, 'W', 'Schreiben Sie die Zahlen.', 'Escribe los números con letras.', '13 = dreizehn, 16 = sechzehn (sin s), 17 = siebzehn (sin en), 19 = neunzehn, 20 = zwanzig.', [
  '13 [[dreizehn]]', '16 [[sechzehn]]', '17 [[siebzehn]]', '19 [[neunzehn]]', '20 [[zwanzig]]']);
X(2, 'G', 'Ergänzen Sie mein, meine, dein, deine, Ihr oder Ihre.', 'Completa con el posesivo correcto.', 'mein/dein/Ihr con masculino y neutro (mein Bruder, mein Kind). meine/deine/Ihre con femenino y plural (meine Tochter, meine Eltern). Ihr = de usted.', [
  '◆ Ist das [[dein]] Bruder? (du)', '○ Nein, das ist [[mein]] Mann, Jan.', '◆ Und das? Sind das [[deine]] Kinder? (du)', '○ Ja, das sind [[meine]] Kinder, Lea und Tom.', '◆ Frau Roth, ist das [[Ihre]] Tochter? (Sie)', '○ Ja. Und das ist [[mein]] Sohn, Felix.']);
X(2, 'G', 'Ergänzen Sie sein oder haben in der richtigen Form.', 'Completa con sein o haben.', 'sein: bin, bist, ist, sind, seid, sind. haben: habe, hast, hat, haben, habt, haben.', [
  'Das [[ist]] meine Familie.', 'Ich [[habe]] zwei Brüder.', 'Mein Bruder Leo [[ist]] 25 Jahre alt.', 'Er [[hat]] eine Tochter.', 'Wir [[sind]] eine große Familie.', '[[Hast]] du auch Geschwister?']);
X(2, 'G', 'Ergänzen Sie er, sie, wir oder ihr und das Verb.', 'Completa el pronombre y el verbo.', 'er/sie (una persona) → -t. wir → -en. ihr → -t. sie (plural) → -en.', [
  'Das ist Carla. [[Sie]] wohnt in Leipzig.', 'Und das ist Paul. [[Er]] lebt in Graz.', 'Paul und ich: [[Wir]] [[kommen]] aus Österreich. (kommen)', 'Lena und Max, wo [[wohnt]] ihr? (wohnen)', 'Meine Eltern? [[Sie]] [[leben]] in Zürich. (leben)']);
X(2, 'G', 'Schreiben Sie Fragen.', 'Escribe las preguntas.', 'W-Frage: interrogativo (1) + verbo (2) + sujeto. Wie alt bist du? Wo wohnen Sie?', [
  '(alt – du – wie – sein) → [[Wie alt bist du]]?', '(wohnen – wo – Sie) → [[Wo wohnen Sie]]?', '(Geschwister – du – haben) → [[Hast du Geschwister]]?', '(Ihre Telefonnummer – wie – sein) → [[Wie ist Ihre Telefonnummer]]?']);
X(2, 'K', 'Ordnen Sie zu.', 'Coloca cada respuesta en su lugar.', 'Respuestas a «Wie geht\'s?»: Sehr gut! / Gut, danke. / Es geht. / Nicht so gut.', [
  '◆ Hallo Sara! Wie geht\'s?', '○ [[Danke, gut]]. Und dir?', '◆ Ach, [[es geht]]. Ich bin müde.', '◆ Und wie geht es Ihnen, Herr Braun?', '○ [[Sehr gut]], danke!', '◆ Und Ihrer Frau?', '○ Leider [[nicht so gut]]. Sie ist krank.'], { bank: ['Danke, gut', 'es geht', 'Sehr gut', 'nicht so gut'] });
X(2, 'K', 'Ergänzen Sie das Gespräch.', 'Completa la conversación sobre datos personales.', 'Wie alt? → Jahre alt. Wo geboren? → in + lugar. verheiratet = casado; Kinder = hijos.', [
  '◆ Wie alt [[sind]] Sie?', '○ Ich bin 34 [[Jahre]] alt.', '◆ Wo sind Sie [[geboren]]?', '○ In Lima.', '◆ Sind Sie [[verheiratet]]?', '○ Ja, und ich habe zwei [[Kinder]].']);

/* ======================= LEKTION 3 ======================= */
ODD(3, 'W', [['Apfel', 'Banane', 'Birne', 'Käse*'], ['Milch', 'Saft', 'Wasser', 'Brot*'], ['Flasche', 'Dose', 'Packung', 'Zucker*'], ['Kilo', 'Gramm', 'Liter', 'Euro*']],
  'Frutas: Apfel, Banane, Birne. Bebidas: Milch, Saft, Wasser. Envases: Flasche, Dose, Packung. Medidas: Kilo, Gramm, Liter (Euro es dinero).');
X(3, 'W', 'Ergänzen Sie den Plural.', 'Escribe el plural.', 'Apfel → Äpfel, Ei → Eier, Banane → Bananen, Brötchen → Brötchen (igual), Tomate → Tomaten, Kartoffel → Kartoffeln.', [
  'ein Apfel – zwei [[Äpfel]]', 'ein Ei – sechs [[Eier]]', 'eine Banane – drei [[Bananen]]', 'ein Brötchen – vier [[Brötchen]]', 'eine Tomate – fünf [[Tomaten]]', 'eine Kartoffel – ein Kilo [[Kartoffeln]]']);
X(3, 'W', 'Ordnen Sie zu: Was passt?', 'Relaciona el envase o la cantidad con el alimento.', 'eine Flasche Wasser, eine Dose Tomaten, eine Packung Tee, ein Becher Joghurt, ein Kilo Äpfel, 200 Gramm Käse.', [
  'eine [[Flasche]] Wasser', 'eine [[Dose]] Tomaten', 'eine [[Packung]] Tee', 'ein [[Kilo]] Äpfel', '200 [[Gramm]] Käse'], { bank: ['Flasche', 'Dose', 'Packung', 'Kilo', 'Gramm'] });
X(3, 'G', 'Ergänzen Sie ein, eine, kein oder keine.', 'Completa con ein/eine/kein/keine.', 'ein (masculino y neutro), eine (femenino). Negación: kein / keine. Plural: sin artículo, y en negación keine.', [
  '◆ Ist das [[eine]] Orange? (die Orange)', '○ Nein, das ist [[keine]] Orange. Das ist [[eine]] Mandarine.', '◆ Und das? Ist das [[ein]] Ei? (das Ei)', '○ Nein, das ist [[kein]] Ei. Das ist ein Schokoladenei!', '◆ Haben wir Äpfel?', '○ Nein, wir haben [[keine]] Äpfel.']);
X(3, 'G', 'Ergänzen Sie die Verben in der richtigen Form.', 'Completa los verbos.', 'brauchen y kaufen son regulares. essen cambia e → i: du isst, er isst. helfen: du hilfst, er hilft.', [
  '◆ Was [[brauchen]] wir? (brauchen)', '○ Wir [[brauchen]] Mehl und Eier. (brauchen)', '◆ Gut, ich [[kaufe]] auch Milch. (kaufen)', '○ Was [[isst]] du gern zum Frühstück? (essen)', '◆ Ich [[esse]] gern Brötchen mit Käse. (essen)', '○ [[Hilfst]] du mir beim Kochen? (helfen)']);
X(3, 'G', 'Schreiben Sie Fragen.', 'Escribe preguntas de sí/no o W-Fragen.', 'Ja/Nein-Frage: verbo en posición 1 (Brauchen Sie Salz?). W-Frage: interrogativo + verbo (Was kostet ...?).', [
  '(Zucker – wir – haben) → [[Haben wir Zucker]]?', '(kosten – ein Kilo Tomaten – was) → [[Was kostet ein Kilo Tomaten]]?', '(gern – du – Fisch – essen) → [[Isst du gern Fisch]]?', '(trinken – was – Sie) → [[Was trinken Sie]]?']);
X(3, 'G', 'Ja/Nein-Frage oder W-Frage? Ergänzen Sie die Antwort.', 'Completa la respuesta adecuada.', 'Ja/Nein-Frage → Ja. / Nein. W-Frage → información (precio, cosa...).', [
  '◆ Brauchen Sie Salz? ○ [[Nein]], danke.', '◆ Was kostet das Brot? ○ [[2,80 Euro::Ja, gern|Nein, danke]].', '◆ Trinkst du gern Tee? ○ [[Ja]], sehr gern.', '◆ Was möchten Sie? ○ [[Ein Kilo Äpfel, bitte::Ja, bitte|Nein, danke]].']);
X(3, 'K', 'Ordnen Sie zu.', 'Coloca las expresiones en la conversación en la tienda.', 'Was kostet ...? = ¿cuánto cuesta? Haben Sie ...? = ¿tiene ...? Das macht ... = son ... (total). Hier, bitte = aquí tiene.', [
  '◆ Guten Tag. [[Haben Sie]] Tomaten?', '○ Ja, natürlich.', '◆ [[Was kostet]] ein Kilo?', '○ 2,50 Euro.', '◆ Gut, ein Kilo bitte. Und 200 Gramm Käse.', '○ [[Das macht]] 5,40 Euro.', '◆ [[Hier, bitte]].'], { bank: ['Haben Sie', 'Was kostet', 'Das macht', 'Hier, bitte'] });
X(3, 'K', 'Ergänzen Sie: Was essen Sie gern?', 'Completa hablando de gustos.', 'gern = con gusto, sehr gern = me encanta, nicht so gern = no tanto. Lieblingsessen = comida favorita.', [
  '◆ Was isst du [[gern]]?', '○ Ich esse sehr gern Pizza. Das ist mein [[Lieblingsessen]].', '◆ Und Fisch?', '○ Fisch esse ich [[nicht]] so gern.', '◆ Ich auch nicht. Und was [[trinkst]] du gern?']);

/* ======================= LEKTION 4 ======================= */
X(4, 'W', 'Wie heißt das Gegenteil?', 'Escribe el contrario.', 'billig ↔ teuer, groß ↔ klein, alt ↔ neu, dunkel ↔ hell, hässlich ↔ schön, schmal ↔ breit.', [
  'billig – [[teuer]]', 'groß – [[klein]]', 'alt – [[neu]]', 'dunkel – [[hell]]', 'hässlich – [[schön]]', 'schmal – [[breit]]']);
ODD(4, 'W', [['Sofa', 'Sessel', 'Stuhl', 'Herd*'], ['Kühlschrank', 'Waschmaschine', 'Fernseher', 'Teppich*'], ['Küche', 'Bad', 'Flur', 'Lampe*'], ['rot', 'blau', 'gelb', 'hell*']],
  'Muebles: Sofa, Sessel, Stuhl (Herd es un aparato). Aparatos: Kühlschrank, Waschmaschine, Fernseher (Teppich es mueble/decoración). Cuartos: Küche, Bad, Flur. Colores: rot, blau, gelb (hell es claro).');
X(4, 'W', 'Ergänzen Sie den Artikel und den Plural.', 'Completa el artículo y el plural.', 'der Tisch → die Tische, der Stuhl → die Stühle, das Bett → die Betten, die Lampe → die Lampen, der Schrank → die Schränke.', [
  '[[der]] Tisch – die [[Tische]]', '[[der]] Stuhl – die [[Stühle]]', '[[das]] Bett – die [[Betten]]', '[[die]] Lampe – die [[Lampen]]', '[[der]] Schrank – die [[Schränke]]']);
X(4, 'G', 'Im Möbelhaus: Ergänzen Sie er, es oder sie.', 'En la mueblería: completa con er, es o sie.', 'der → er, das → es, die → sie, plural → sie.', [
  '◆ Wie findest du das Sofa?', '○ [[Es]] ist sehr bequem, aber teuer.', '◆ Und der Tisch? Wie viel kostet [[er]]?', '○ 89 Euro. [[Er]] ist aus Holz.', '◆ Und die Lampe? Ist [[sie]] neu?', '○ Ja. Und die Stühle? [[Sie]] sind auch schön.']);
X(4, 'G', 'Ergänzen Sie den Artikel: der, das, die oder ein, eine.', 'Completa con el artículo definido o indefinido.', 'Primera vez: ein/eine (Hier ist ein Balkon). Ya conocido: der/das/die (Der Balkon ist groß).', [
  'Hier ist [[eine]] Küche. [[Die]] Küche ist klein.', 'Hier ist [[ein]] Bad. [[Das]] Bad ist modern.', 'Dort ist [[ein]] Balkon. [[Der]] Balkon ist sehr groß.']);
X(4, 'G', 'Ergänzen Sie nicht oder kein- (kein, keine, keinen).', 'Completa con nicht o con kein/keine/keinen.', 'kein/keine niega sustantivos; nicht niega adjetivos, verbos y lugares.', [
  'Die Wohnung ist [[nicht]] teuer.', 'Sie hat [[keinen]] Balkon, aber einen Garten.', 'Im Bad ist [[keine]] Badewanne.', 'Das Zimmer ist [[nicht]] hell.', 'Ich habe [[kein]] Sofa.']);
X(4, 'G', 'Ergänzen Sie gefällt oder gefallen.', 'Completa con gefällt (singular) o gefallen (plural).', 'Lo que gusta es el sujeto: un objeto → gefällt; varios → gefallen.', [
  'Wie [[gefällt]] dir die Lampe?', 'Wie [[gefallen]] Ihnen die Stühle?', 'Der Teppich [[gefällt]] mir sehr gut.', 'Die Farben [[gefallen]] mir nicht.']);
X(4, 'K', 'Ordnen Sie zu.', 'Coloca las expresiones en la conversación sobre el departamento.', 'Sag mal = oye. Wie gefällt dir ...? = ¿qué te parece? Ich finde ... = me parece. ziemlich = bastante.', [
  '◆ [[Sag mal]], wie ist deine neue Wohnung?', '○ Super! Das Wohnzimmer ist [[ziemlich]] groß.', '◆ Und die Küche?', '○ [[Ich finde]] sie zu klein.', '◆ [[Wie gefällt]] dir der Balkon?', '○ Sehr gut, er ist sonnig!'], { bank: ['Sag mal', 'ziemlich', 'Ich finde', 'Wie gefällt'] });
X(4, 'K', 'Lesen Sie die Anzeige und ergänzen Sie.', 'Lee el anuncio abreviado y completa.', 'Zi. = Zimmer, Whg. = Wohnung, qm = Quadratmeter, NK = Nebenkosten, Balk. = Balkon.', [
  'Anzeige: «3-Zi.-Whg., 70 qm, Balk., 750 € + 120 € NK»', 'Die Wohnung hat drei [[Zimmer]].', 'Sie ist 70 [[Quadratmeter]] groß.', 'Es gibt einen [[Balkon]].', 'Die Miete ist 750 Euro plus 120 Euro [[Nebenkosten]].']);
