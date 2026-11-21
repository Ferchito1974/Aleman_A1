/* Vocabulario en contexto: frases de redacción propia para las palabras de la Wortliste
   que antes solo se practicaban sueltas (ver tools/audit-report.md). */
'use strict';

const CTX = {
  13: [
    ['Sehen Sie das Bild an.', 'Mire la imagen.'], ['Hören Sie noch einmal.', 'Escuche otra vez.'], ['Kreuzen Sie an: richtig oder falsch?', 'Marque con una cruz: ¿verdadero o falso?'],
    ['Ordnen Sie die Fotos zu.', 'Relacione las fotos.'], ['Ergänzen Sie das Gespräch.', 'Complete la conversación.'], ['Markieren Sie das Wort.', 'Subraye la palabra.'],
    ['Sprechen Sie nach.', 'Repita (en voz alta).'], ['Wir lernen heute Lektion zwei.', 'Hoy aprendemos la lección dos.'], ['Notieren Sie die Namen.', 'Anote los nombres.'],
    ['Variieren Sie den Dialog.', 'Varíe el diálogo.'], ['Verbinden Sie die Sätze.', 'Una las oraciones.'],
    ['Guten Abend, meine Damen und Herren!', '¡Buenas noches, señoras y señores!'], ['Das ist ein internationaler Kurs.', 'Es un curso internacional.'],
    ['Ist Frau Weber da? Nein, sie ist nicht da.', '¿Está la señora Weber? No, no está.'], ['Das tut mir leid.', 'Lo siento.'], ['Meine Faxnummer ist 089 123 456.', 'Mi número de fax es 089 123 456.'],
    ['Ich komme aus Russland.', 'Soy de Rusia.'], ['London liegt in Großbritannien.', 'Londres está en Gran Bretaña.'], ['Athen ist die Hauptstadt von Griechenland.', 'Atenas es la capital de Grecia.'],
    ['Mein Lehrer heißt Herr Braun.', 'Mi maestro se llama señor Braun.'], ['Unsere Lehrerin kommt aus Wien.', 'Nuestra maestra es de Viena.'], ['Jetzt machen wir eine Pause.', 'Ahora hacemos una pausa.'],
    ['Mein Enkel ist fünf Jahre alt.', 'Mi nieto tiene cinco años.'], ['Das ist mein Ehemann Peter.', 'Este es mi esposo Peter.'], ['Hier ist die Liste mit den Namen.', 'Aquí está la lista con los nombres.'],
    ['Wie ist Ihre Telefonnummer?', '¿Cuál es su número de teléfono?'], ['Also, ich heiße Anna.', 'Bueno, me llamo Anna.'], ['Mein Bruder arbeitet bei der Polizei.', 'Mi hermano trabaja en la policía.'],
    ['Seine Partnerin kommt aus Dänemark.', 'Su pareja es de Dinamarca.'], ['Zurzeit wohne ich in Berlin.', 'Por ahora vivo en Berlín.'],
    ['Kaffee ist das Lieblingsgetränk der Welt.', 'El café es la bebida favorita del mundo.'], ['Wie ist der Preis?', '¿Cuál es el precio?'], ['Im Prospekt sind viele Sonderangebote.', 'En el folleto hay muchas ofertas especiales.'],
    ['Die Lebensmittelabteilung ist im Erdgeschoss.', 'El departamento de alimentos está en la planta baja.'], ['Ich kaufe 200 Gramm Wurst.', 'Compro 200 gramos de embutido.'], ['Für die Soße brauchen wir Hackfleisch.', 'Para la salsa necesitamos carne molida.'],
    ['Ich esse gern Pommes frites mit Ketchup.', 'Me gusta comer papas fritas con cátsup.'], ['Ich esse zum Beispiel gern Fisch.', 'Por ejemplo, me gusta comer pescado.'], ['Bitte noch etwas Salz und Pfeffer.', 'Un poco más de sal y pimienta, por favor.'],
    ['Ein Kilo Kartoffeln reicht.', 'Un kilo de papas alcanza.'], ['Wasser ist mein Lieblingsgetränk.', 'El agua es mi bebida favorita.']
  ],
  46: [
    ['Ein Beispiel, bitte!', '¡Un ejemplo, por favor!'], ['Der Kühlschrank ist ein Elektrogerät.', 'El refrigerador es un aparato eléctrico.'], ['Die Küche ist sehr modern.', 'La cocina es muy moderna.'],
    ['Ich lese die Anzeigen in der Zeitung.', 'Leo los anuncios en el periódico.'], ['Unsere Nachbarn sind sehr nett.', 'Nuestros vecinos son muy amables.'], ['Ein Ehepaar sucht eine Wohnung mit Garten.', 'Un matrimonio busca un departamento con jardín.'],
    ['Die Wohnung hat drei Räume.', 'El departamento tiene tres habitaciones.'], ['Anruf bitte ab 18 Uhr.', 'Llamar por favor a partir de las 18 horas.'], ['Das Auto ist in der Garage.', 'El coche está en el garaje.'],
    ['Der Tisch ist aus Holz.', 'La mesa es de madera.'], ['Das Zimmer ist ziemlich klein.', 'El cuarto es bastante pequeño.'], ['Die Farbe ist mir egal.', 'El color me da igual.'],
    ['Am Schreibtisch mache ich meine Hausaufgaben.', 'En el escritorio hago mi tarea.'], ['Die Lampe finde ich besonders schön.', 'La lámpara me parece especialmente bonita.'],
    ['Am Vormittag habe ich eine Präsentation.', 'En la mañana tengo una presentación.'], ['Im Norden sagt man auch Sonnabend.', 'En el norte también se dice Sonnabend (sábado).'], ['Meine Mama ruft jeden Sonntag an.', 'Mi mamá llama cada domingo.'],
    ['Ich habe am Montag einen Termin.', 'El lunes tengo una cita.'], ['Ich schreibe den Termin in meinen Terminkalender.', 'Anoto la cita en mi agenda.'], ['Nächste Woche habe ich Urlaub.', 'La próxima semana tengo vacaciones.'],
    ['Wir machen eine Tour mit dem Schiff.', 'Hacemos un recorrido en barco.'], ['Die Abfahrt ist um 10.30 Uhr.', 'La salida es a las 10:30.'], ['Was ist dein Plan für heute?', '¿Cuál es tu plan para hoy?'],
    ['Hast du den Wetterbericht gehört?', '¿Escuchaste el pronóstico del tiempo?'], ['Morgen ist es sonnig und warm.', 'Mañana estará soleado y cálido.'], ['Es regnet überall.', 'Llueve en todas partes.'],
    ['Die Temperatur steigt auf 25 Grad.', 'La temperatura sube a 25 grados.'], ['Die Speisekarte, bitte!', '¡El menú, por favor!'], ['Welche Speise empfehlen Sie?', '¿Qué platillo recomienda?'],
    ['Ich nehme einen Hamburger mit Ketchup.', 'Tomo una hamburguesa con cátsup.'], ['Ein Brötchen mit Schinken, bitte.', 'Un panecillo con jamón, por favor.'], ['Als Dessert nehme ich Eis.', 'De postre tomo helado.'],
    ['Ich trinke lieber Tee.', 'Prefiero tomar té.'], ['Im Winter fahren wir in die Berge.', 'En invierno vamos a las montañas.'], ['Im Frühjahr blühen die Bäume.', 'En primavera florecen los árboles.'],
    ['Die Reise nach Wien war wunderbar.', 'El viaje a Viena fue maravilloso.'], ['Ich bin gern in der Natur.', 'Me gusta estar en la naturaleza.'], ['Was ist das Programm für Samstag?', '¿Cuál es el programa para el sábado?'],
    ['Es gibt viele Möglichkeiten.', 'Hay muchas posibilidades.'], ['Das Hotel hat ein gutes Angebot.', 'El hotel tiene una buena oferta.'], ['Mallorca ist eine Insel.', 'Mallorca es una isla.']
  ],
  7: [
    ['Danke für deinen Kommentar!', '¡Gracias por tu comentario!'], ['Das stimmt nicht!', '¡Eso no es cierto!'], ['Ich mache einen Kurs in Kommunikation.', 'Hago un curso de comunicación.'],
    ['Meine Schwester studiert Psychologie.', 'Mi hermana estudia psicología.'], ['Am Freitag gehen wir ins Theater.', 'El viernes vamos al teatro.'], ['Er macht Kurse in Musikproduktion.', 'Él hace cursos de producción musical.'],
    ['Mathematik finde ich schwer.', 'Las matemáticas me parecen difíciles.'], ['Der Tipp ist cool!', '¡El consejo está genial!'], ['Die Antwort ist leicht.', 'La respuesta es fácil.'],
    ['Wir machen ein Plakat mit Tipps.', 'Hacemos un cartel con consejos.'], ['Ich lese gern Comics auf Deutsch.', 'Me gusta leer cómics en alemán.']
  ]
};
function genCtx(key) {
  const level = 'ctx' + key;
  return phraseQs(level, CTX[key], 'Vocabulario en contexto');
}
const CTX_LEVELS = [
  { id: 'ctx13', group: 'Lección 3', exam: 1, icon: '🧾', title: 'Vocabulario en frases (lecciones 1 a 3)', sub: 'Palabras de la Wortliste en contexto', cats: [], gen: () => genCtx(13) },
  { id: 'ctx46', group: 'Lección 6', exam: 2, icon: '🧾', title: 'Vocabulario en frases (lecciones 4 a 6)', sub: 'Palabras de la Wortliste en contexto', cats: [], gen: () => genCtx(46) },
  { id: 'ctx7', group: 'Lección 7', exam: 3, icon: '🧾', title: 'Vocabulario en frases (lección 7)', sub: 'Palabras de la Wortliste en contexto', cats: [], gen: () => genCtx(7) }
];
LESSONS.ctx13 = () => box('Frases con el vocabulario de las lecciones 1 a 3', '<p>Frases de ejemplo propias con las palabras de la Wortliste que no aparecían en otros niveles, incluidas las instrucciones de los ejercicios del libro.</p>') + ph('', CTX[13]);
LESSONS.ctx46 = () => box('Frases con el vocabulario de las lecciones 4 a 6', '<p>Frases de ejemplo propias con palabras de la Wortliste.</p>') + ph('', CTX[46]);
LESSONS.ctx7 = () => box('Frases con el vocabulario de la lección 7', '<p>Frases de ejemplo propias con palabras de la Wortliste.</p>') + ph('', CTX[7]);
