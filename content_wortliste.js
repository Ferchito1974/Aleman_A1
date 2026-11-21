/* Wortliste (Lernwortschatz, págs. LWS 2 a 26 del libro) por lección.
   Formato de cada entrada: 'tipo|palabra|plural|español'
   tipo: der / das / die (sustantivo), v (verbo), w (otra palabra), p (frase hecha)
   plural: forma completa del plural; 'Sg' = solo singular; 'Pl' = solo plural; vacío = no aplica.
   Las traducciones y explicaciones son propias. Del libro solo se toma la lista de palabras. */
'use strict';

const WL = {
/* LWS 1: «Meine Wörter im Kurs» (instrucciones de clase) */
0: [
  'v|ansehen||mirar / ver (con atención)', 'das|Bild|Bilder|imagen / cuadro', 'p|noch einmal||otra vez', 'v|ankreuzen||marcar con una cruz',
  'v|zuordnen||relacionar / asignar', 'v|ergänzen||completar', 'das|Gespräch|Gespräche|conversación', 'v|zeigen||mostrar',
  'v|markieren||marcar / subrayar', 'die|Frage|Fragen|pregunta', 'v|nachsprechen||repetir (en voz alta)', 'das|Wort|Wörter|palabra',
  'die|Lektion|Lektionen|lección', 'v|meinen||opinar / querer decir', 'v|sagen||decir', 'v|notieren||anotar',
  'v|vergleichen||comparar', 'v|variieren||variar', 'v|erzählen||contar (una historia)', 'v|verbinden||unir / conectar',
  'v|antworten||responder'
],
1: [
  'das|Foto|Fotos|foto', 'p|Guten Tag||buenos días / buenas tardes', 'p|Auf Wiedersehen||adiós (formal)', 'w|hallo||hola',
  'w|tschüs||adiós (informal)', 'p|Guten Abend||buenas noches (al llegar)', 'die|Dame|Damen|dama / señora', 'w|willkommen||bienvenido',
  'w|bei||en / con (bei Musik international = en «Musik international»)', 'die|Musik|Sg|música', 'w|international||internacional', 'p|Guten Morgen||buenos días (en la mañana)',
  'die|Frau|Frauen|mujer / señora', 'w|danke||gracias', 'p|Gute Nacht||buenas noches (al despedirse para dormir)', 'der|Herr|Herren|señor',
  'w|ich||yo', 'v|heißen||llamarse', 'v|sein||ser / estar', 'der|Name|Namen|nombre',
  'die|Entschuldigung|Entschuldigungen|disculpa / perdón', 'w|wie||cómo', 'w|Sie||usted / ustedes (formal)', 'w|wer||quién',
  'w|ja||sí', 'w|nein||no', 'v|wissen||saber', 'w|du||tú',
  'w|woher||de dónde', 'v|kommen||venir', 'w|aus||de (origen: aus Mexiko)', 'die|Firma|Firmen|empresa',
  'w|von||de (von Lara = de Lara)', 'das|Deutschland|Sg|Alemania', 'das|Österreich|Sg|Austria', 'die|Schweiz|Sg|Suiza',
  'w|aha||ah, ya entiendo', 'w|und||y', 'w|nur||solo / solamente', 'w|was||qué',
  'v|sprechen||hablar', 'p|ein bisschen||un poco', 'die|Sprache|Sprachen|idioma / lengua', 'der|Buchstabe|Buchstaben|letra (del alfabeto)',
  'das|Alphabet|Sg|alfabeto', 'p|Wie bitte?||¿Cómo dice? / ¿Perdón?', 'v|buchstabieren||deletrear', 'w|bitte||por favor',
  'p|da sein||estar (presente, ahí)', 'der|Moment|Momente|momento', 'p|leid tun||sentirlo (Es tut mir leid = lo siento)', 'w|nicht||no (negación del verbo o adjetivo)',
  'p|Vielen Dank||muchas gracias', 'p|Auf Wiederhören||adiós (por teléfono)', 'die|Adresse|Adressen|dirección', 'die|Visitenkarte|Visitenkarten|tarjeta de presentación',
  'der|Sport|Sg|deporte', 'der|Vorname|Vornamen|nombre de pila', 'der|Familienname|Familiennamen|apellido', 'die|Straße|Straßen|calle',
  'die|Stadt|Städte|ciudad', 'das|Land|Länder|país', 'das|Telefon|Telefone|teléfono', 'das|Fax|Faxe|fax',
  'die|E-Mail|E-Mails|correo electrónico', 'das|Formular|Formulare|formulario', 'die|Postleitzahl|Postleitzahlen|código postal',
  'w|Polen||Polonia', 'w|Polnisch||polaco (idioma)', 'die|Türkei|Sg|Turquía', 'w|Türkisch||turco (idioma)',
  'w|Spanien||España', 'w|Spanisch||español (idioma)', 'w|China||China', 'w|Chinesisch||chino (idioma)',
  'w|Deutsch||alemán (idioma)', 'w|Russland||Rusia', 'w|Russisch||ruso (idioma)', 'w|Großbritannien||Gran Bretaña',
  'w|Englisch||inglés (idioma)', 'w|Frankreich||Francia', 'w|Französisch||francés (idioma)', 'w|Italien||Italia',
  'w|Italienisch||italiano (idioma)', 'w|Griechenland||Grecia', 'w|Griechisch||griego (idioma)'
],
2: [
  'der|Lehrer|Lehrer|maestro / profesor', 'die|Lehrerin|Lehrerinnen|maestra / profesora', 'v|lernen||aprender / estudiar', 'w|auch||también',
  'v|haben||tener', 'die|Pause|Pausen|pausa / descanso', 'der|Park|Parks|parque', 'die|Familie|Familien|familia',
  'der|Vater|Väter|padre', 'die|Großeltern|Pl|abuelos', 'die|Mutter|Mütter|madre', 'die|Eltern|Pl|padres (papá y mamá)',
  'der|Bruder|Brüder|hermano', 'die|Geschwister|Pl|hermanos (hermanos y hermanas)', 'das|Jahr|Jahre|año', 'v|leben||vivir',
  'w|in||en', 'w|super||súper / genial', 'w|sehr||muy', 'w|gut||bien / bueno',
  'p|na ja||bueno... / pues sí, más o menos', 'w|ach||ah / ay', 'w|so||así / tan', 'der|Enkel|Enkel|nieto',
  'die|Enkelin|Enkelinnen|nieta', 'die|Tochter|Töchter|hija', 'der|Sohn|Söhne|hijo', 'das|Kind|Kinder|niño / hijo',
  'die|Schwester|Schwestern|hermana', 'die|Oma|Omas|abuelita', 'die|Großmutter|Großmütter|abuela', 'der|Mann|Männer|hombre / esposo',
  'der|Opa|Opas|abuelito', 'der|Großvater|Großväter|abuelo', 'w|dein||tu (posesivo, informal)', 'w|mein||mi (posesivo)',
  'w|Ihr||su (posesivo de usted)', 'der|Ehemann|Ehemänner|esposo', 'die|Ehefrau|Ehefrauen|esposa', 'w|falsch||falso / incorrecto',
  'w|genau||exacto / exactamente', 'die|Liste|Listen|lista', 'w|sie||ella / ellos / ellas', 'w|zusammen||juntos',
  'w|geschieden||divorciado', 'w|er||él', 'v|wohnen||vivir (residir)', 'w|jetzt||ahora',
  'w|ihr||ustedes / vosotros (informal)', 'w|wir||nosotros', 'die|Zahl|Zahlen|número (cifra)', 'die|Null|Nullen|cero',
  'w|wo||dónde', 'w|geboren||nacido', 'v|liegen||estar situado / estar acostado', 'die|Nummer|Nummern|número (de teléfono, de casa)',
  'w|verheiratet||casado', 'w|alt||viejo / de edad (Wie alt?)', 'der|Geburtsort|Geburtsorte|lugar de nacimiento', 'der|Wohnort|Wohnorte|lugar de residencia',
  'der|Familienstand|Sg|estado civil', 'w|ledig||soltero', 'w|verwitwet||viudo', 'das|Alter|Sg|edad',
  'die|Hauptstadt|Hauptstädte|capital', 'v|kennen||conocer', 'w|also||entonces / o sea', 'w|hier||aquí',
  'w|aber||pero', 'die|Polizei|Sg|policía', 'w|schon||ya', 'w|lange||mucho tiempo',
  'der|Arzt|Ärzte|médico', 'der|Partner|Partner|pareja (hombre) / compañero', 'die|Partnerin|Partnerinnen|pareja (mujer) / compañera', 'w|zurzeit||actualmente / por ahora'
],
3: [
  'die|Banane|Bananen|plátano', 'die|Butter|Sg|mantequilla', 'das|Ei|Eier|huevo', 'das|Mehl|Sg|harina',
  'die|Milch|Sg|leche', 'der|Zucker|Sg|azúcar', 'der|Pfannkuchen|Pfannkuchen|hot cake / panqueque', 'die|Schokolade|Sg|chocolate',
  'v|brauchen||necesitar', 'v|kaufen||comprar', 'der|Hunger|Sg|hambre', 'der|Euro|Sg|euro',
  'w|dann||entonces / luego', 'v|helfen||ayudar', 'die|Welt|Welten|mundo', 'w|kein||ningún / no (artículo negativo)',
  'w|ein||un / uno', 'der|Apfel|Äpfel|manzana', 'die|Orange|Orangen|naranja', 'der|Kuchen|Kuchen|pastel',
  'der|Kaffee|Kaffees|café', 'der|Saft|Säfte|jugo', 'das|Brötchen|Brötchen|bolillo / panecillo', 'das|Würstchen|Würstchen|salchicha',
  'die|Birne|Birnen|pera', 'die|Tomate|Tomaten|jitomate / tomate', 'das|Brot|Brote|pan', 'die|Kartoffel|Kartoffeln|papa',
  'der|Joghurt|Joghurts|yogur (también das Joghurt)', 'die|Zwiebel|Zwiebeln|cebolla', 'der|Fisch|Fische|pescado / pez', 'das|Regal|Regale|estante / repisa',
  'der|Käse|Sg|queso', 'das|Salz|Sg|sal', 'der|Tee|Tees|té', 'das|Obst|Sg|fruta',
  'das|Gemüse|Gemüse|verdura', 'das|Mineralwasser|Sg|agua mineral', 'das|Wasser|Sg|agua', 'das|Fleisch|Sg|carne',
  'der|Reis|Sg|arroz', 'der|Wein|Weine|vino', 'das|Bier|Biere|cerveza', 'der|Preis|Preise|precio',
  'der|Cent|Sg|centavo (de euro)', 'der|Prospekt|Prospekte|folleto', 'das|Sonderangebot|Sonderangebote|oferta especial', 'das|Lebensmittel|Lebensmittel|alimento / víveres',
  'die|Abteilung|Abteilungen|departamento (de una tienda)', 'die|Wurst|Würste|embutido', 'das|Hackfleisch|Sg|carne molida', 'das|Öl|Öle|aceite',
  'p|wie viel||cuánto', 'v|kosten||costar', 'das|Kilo|Sg|kilo', 'das|Gramm|Sg|gramo',
  'das|Pfund|Sg|medio kilo (500 g)', 'der|Liter|Liter|litro', 'die|Flasche|Flaschen|botella', 'die|Dose|Dosen|lata',
  'die|Sahne|Sg|crema (nata)', 'das|Restaurant|Restaurants|restaurante', 'die|Mensa|Mensen|comedor universitario', 'v|essen||comer',
  'das|Steak|Steaks|bistec', 'der|Salat|Salate|ensalada', 'die|Soße|Soßen|salsa', 'das|Hähnchen|Hähnchen|pollo',
  'die|Pommes frites|Pl|papas fritas', 'die|Pizza|Pizzen|pizza', 'die|Cola|Colas|refresco de cola (también das Cola)', 'der|Durst|Sg|sed',
  'v|kochen||cocinar', 'w|für||para', 'w|Lieblings-||favorito (Lieblingsessen = comida favorita)', 'das|Essen|Essen|comida',
  'das|Rezept|Rezepte|receta', 'w|typisch||típico', 'w|ganz||bastante / completamente', 'w|einfach||fácil / sencillo',
  'die|Portion|Portionen|porción', 'w|groß||grande', 'v|schmecken||saber (tener buen sabor)', 'v|trinken||beber / tomar',
  'das|Glas|Gläser|vaso', 'v|studieren||estudiar (en la universidad)', 'die|Suppe|Suppen|sopa', 'p|zum Beispiel||por ejemplo',
  'der|Pfeffer|Sg|pimienta', 'v|reichen||alcanzar / ser suficiente', 'der|Tag|Tage|día', 'w|teuer||caro',
  'w|gern||con gusto (me gusta)', 'das|Getränk|Getränke|bebida'
],
4: [
  'die|Wohnung|Wohnungen|departamento', 'die|Lampe|Lampen|lámpara', 'das|Zimmer|Zimmer|habitación / cuarto', 'die|Küche|Küchen|cocina',
  'das|Bad|Bäder|baño', 'w|neu||nuevo', 'w|klein||pequeño', 'w|hell||claro / luminoso',
  'w|dunkel||oscuro', 'w|billig||barato', 'w|schön||bonito', 'w|hässlich||feo',
  'der|Flur|Flure|pasillo / entrada', 'die|Toilette|Toiletten|inodoro / baño (WC)', 'der|Balkon|Balkone|balcón', 'das|Wohnzimmer|Wohnzimmer|sala de estar',
  'das|Haus|Häuser|casa', 'w|dort||allí', 'der|Monat|Monate|mes', 'das|Beispiel|Beispiele|ejemplo',
  'w|schmal||angosto', 'w|richtig||correcto', 'w|breit||ancho', 'der|Schrank|Schränke|armario / ropero',
  'der|Kühlschrank|Kühlschränke|refrigerador', 'das|Sofa|Sofas|sofá', 'der|Tisch|Tische|mesa', 'der|Stuhl|Stühle|silla',
  'das|Bett|Betten|cama', 'der|Fernseher|Fernseher|televisor', 'die|Dusche|Duschen|regadera / ducha', 'der|Herd|Herde|estufa',
  'die|Badewanne|Badewannen|tina de baño', 'der|Teppich|Teppiche|alfombra', 'der|Sessel|Sessel|sillón', 'die|Möbel|Pl|muebles',
  'das|Gerät|Geräte|aparato', 'v|gefallen||gustar (agradar)', 'die|Farbe|Farben|color', 'v|finden||encontrar / opinar',
  'w|modern||moderno', 'w|schwarz||negro', 'w|grau||gris', 'w|weiß||blanco',
  'w|grün||verde', 'w|braun||café (marrón)', 'w|blau||azul', 'w|rot||rojo',
  'w|gelb||amarillo', 'der|Zentimeter|Zentimeter|centímetro', 'w|mal||por (multiplicado: 2 mal 3)', 'das|Handy|Handys|celular',
  'die|Arbeit|Sg|trabajo', 'die|Anzeige|Anzeigen|anuncio', 'w|nett||amable / simpático', 'das|Ehepaar|Ehepaare|matrimonio (pareja casada)',
  'v|suchen||buscar', 'der|Garten|Gärten|jardín', 'v|vermieten||rentar (dar en alquiler)', 'das|Apartment|Apartments|departamento pequeño (apartment)',
  'der|Raum|Räume|espacio / habitación', 'der|Stock|Sg|piso (planta de un edificio)', 'w|circa||aproximadamente (ca.)', 'w|privat||privado / particular',
  'w|ab||a partir de', 'w|sofort||de inmediato', 'w|maximal||máximo', 'der|Anruf|Anrufe|llamada',
  'w|möbliert||amueblado', 'das|TV|Sg|tele (TV)', 'die|Garage|Garagen|garaje / cochera', 'der|Quadratmeter|Quadratmeter|metro cuadrado',
  'die|Miete|Mieten|renta (alquiler)', 'v|bezahlen||pagar', 'das|Buch|Bücher|libro', 'der|Stift|Stifte|lápiz / pluma',
  'w|welch-||cuál / qué (welcher, welches, welche)', 'der|Schreibtisch|Schreibtische|escritorio', 'das|Holz|Hölzer|madera', 'w|ungefähr||aproximadamente',
  'der|Meter|Meter|metro', 'w|lang||largo', 'w|hoch||alto', 'der|Platz|Sg|espacio / lugar',
  'der|Computer|Computer|computadora', 'das|Heft|Hefte|cuaderno', 'w|ziemlich||bastante', 'w|egal||da igual',
  'v|lieben||amar', 'w|immer||siempre', 'die|Hausaufgabe|Hausaufgaben|tarea (escolar)', 'v|glauben||creer',
  'w|besonders||especialmente / especial',
  /* Vocabulario de anuncios del Arbeitsbuch (AB 48, ejercicio 28) */
  'die|Kaution|Kautionen|depósito (garantía de renta)', 'die|Nebenkosten|Pl|gastos adicionales (agua, calefacción, basura)', 'die|Einbauküche|Einbauküchen|cocina integral', 'die|Tiefgarage|Tiefgaragen|estacionamiento subterráneo'
],
5: [
  'w|bis||hasta', 'v|machen||hacer', 'die|Präsentation|Präsentationen|presentación', 'v|frühstücken||desayunar',
  'v|einkaufen||ir de compras / hacer el súper', 'p|spazieren gehen||ir a pasear', 'v|aufräumen||ordenar / recoger', 'v|aufstehen||levantarse',
  'v|gehen||ir (caminando)', 'w|oder||o', 'v|arbeiten||trabajar', 'w|müde||cansado',
  'v|anrufen||llamar por teléfono', 'w|früh||temprano', 'der|Supermarkt|Supermärkte|supermercado', 'v|fernsehen||ver televisión',
  'w|mit||con', 'v|spielen||jugar / tocar (instrumento)', 'w|spät||tarde (hora)', 'w|erst||apenas / hasta (no antes de)',
  'das|Viertel|Viertel|cuarto (de hora)', 'w|vor||antes de / menos (hora)', 'w|nach||después de / y (hora)', 'w|halb||media (hora)',
  'die|Uhr|Uhren|reloj / hora (um 8 Uhr)', 'v|zeichnen||dibujar', 'w|kurz||corto / breve', 'w|gleich||en seguida / igual',
  'der|Intensivkurs|Intensivkurse|curso intensivo', 'w|wann||cuándo', 'w|am||el (con días y partes del día: am Montag)', 'w|um||a las (con la hora: um 8 Uhr)',
  'p|von ... bis||de ... a ...', 'die|Party|Partys|fiesta', 'die|Zeit|Sg|tiempo', 'der|Fußball|Sg|fútbol',
  'v|anfangen||empezar', 'v|passen||quedar bien / convenir', 'der|Montag|Montage|lunes', 'der|Dienstag|Dienstage|martes',
  'der|Mittwoch|Mittwoche|miércoles', 'der|Donnerstag|Donnerstage|jueves', 'der|Freitag|Freitage|viernes', 'der|Samstag|Samstage|sábado',
  'der|Sonnabend|Sonnabende|sábado (en el norte de Alemania)', 'der|Sonntag|Sonntage|domingo', 'das|Wochenende|Wochenenden|fin de semana', 'die|Mama|Mamas|mamá',
  'v|schlafen||dormir', 'der|Termin|Termine|cita (compromiso)', 'der|Terminkalender|Terminkalender|agenda', 'w|nächst-||próximo (nächste Woche)',
  'die|Woche|Wochen|semana', 'der|Morgen|Morgen|mañana (temprano)', 'der|Vormittag|Vormittage|media mañana', 'der|Mittag|Mittage|mediodía',
  'der|Nachmittag|Nachmittage|tarde (después del mediodía)', 'der|Abend|Abende|noche (tarde-noche)', 'die|Nacht|Nächte|noche (madrugada)', 'das|Kino|Kinos|cine',
  'v|chatten||chatear', 'v|hören||escuchar / oír', 'v|raten||adivinar', 'w|jeder||cada (jeder, jedes, jede)',
  'das|Café|Cafés|cafetería', 'w|täglich||diario / todos los días', 'das|Fahrrad|Fahrräder|bicicleta', 'die|Bibliothek|Bibliotheken|biblioteca',
  'der|Feiertag|Feiertage|día festivo', 'w|geschlossen||cerrado', 'die|Ansage|Ansagen|aviso por altavoz / anuncio hablado', 'w|offiziell||oficial',
  'der|Film|Filme|película', 'v|sehen||ver', 'das|Museum|Museen|museo', 'w|geöffnet||abierto',
  'das|Schiff|Schiffe|barco', 'die|Tour|Touren|recorrido / tour', 'das|Kaufhaus|Kaufhäuser|tienda departamental', 'das|Europa|Sg|Europa',
  'v|kennenlernen||conocer (por primera vez)', 'die|Abfahrt|Abfahrten|salida (de un transporte)', 'der|Erwachsene|Erwachsenen|adulto', 'der|Plan|Pläne|plan'
],
6: [
  'der|Ausflug|Ausflüge|excursión / paseo', 'das|Auto|Autos|coche / carro', 'v|wandern||hacer senderismo / caminar en el campo', 'das|Picknick|Picknicks|picnic',
  'die|Gitarre|Gitarren|guitarra', 'v|telefonieren||hablar por teléfono', 'v|fotografieren||fotografiar', 'die|Sonne|Sg|sol',
  'v|scheinen||brillar', 'v|regnen||llover', 'w|viel||mucho', 'die|Wolke|Wolken|nube',
  'das|Wetter|Sg|clima / tiempo', 'v|losgehen||salir / ponerse en marcha', 'v|vergessen||olvidar', 'v|bringen||traer / llevar',
  'das|Grad|Sg|grado (temperatura)', 'w|warm||caliente / cálido', 'w|windig||ventoso', 'w|kalt||frío',
  'v|schneien||nevar', 'w|bewölkt||nublado', 'der|Norden|Sg|norte', 'der|Osten|Sg|este',
  'der|Süden|Sg|sur', 'der|Westen|Sg|oeste', 'w|schlecht||malo / mal', 'der|Wetterbericht|Wetterberichte|pronóstico del tiempo',
  'das|Radio|Radios|radio', 'das|Internet|Sg|internet', 'w|sonnig||soleado', 'w|morgen||mañana (el día siguiente)',
  'v|steigen||subir', 'w|überall||en todas partes', 'die|Temperatur|Temperaturen|temperatura', 'der|Regen|Sg|lluvia',
  'der|Schnee|Sg|nieve', 'w|heute||hoy', 'v|bleiben||quedarse / permanecer', 'w|minus||menos (bajo cero)',
  'die|Speisekarte|Speisekarten|menú (carta)', 'die|Speise|Speisen|platillo', 'der|Ketchup|Ketchups|cátsup (también das Ketchup)', 'der|Hamburger|Hamburger|hamburguesa',
  'der|Schinken|Schinken|jamón', 'das|Dessert|Desserts|postre', 'v|nehmen||tomar (elegir, pedir)', 'w|doch||sí (al contradecir una pregunta negativa)',
  'der|Papa|Papas|papá', 'v|möchten||querer (forma cortés)', 'w|lieber||mejor / preferiblemente', 'der|Freund|Freunde|amigo / novio',
  'die|Freundin|Freundinnen|amiga / novia', 'w|vielleicht||quizás', 'die|Idee|Ideen|idea', 'das|Problem|Probleme|problema',
  'der|Hund|Hunde|perro', 'die|Freizeit|Sg|tiempo libre', 'das|Hobby|Hobbys|pasatiempo', 'w|wichtig||importante',
  'die|Berge|Pl|montañas', 'der|Ski|Skier|esquí', 'v|fahren||ir (en vehículo) / manejar', 'v|joggen||trotar',
  'v|schwimmen||nadar', 'v|tanzen||bailar', 'v|lesen||leer', 'der|Spaß|Sg|diversión',
  'v|treffen||encontrarse con', 'v|grillen||asar a la parrilla', 'der|Klub|Klubs|club', 'v|surfen||navegar (en internet) / surfear',
  'der|Krimi|Krimis|novela o película policiaca', 'w|toll||genial', 'w|interessant||interesante', 'der|Herbst|Herbste|otoño',
  'der|Winter|Winter|invierno', 'der|Sommer|Sommer|verano', 'der|Frühling|Frühlinge|primavera', 'das|Frühjahr|Frühjahre|primavera (sinónimo)',
  'die|Reise|Reisen|viaje', 'der|Urlaub|Urlaube|vacaciones (del trabajo)', 'w|wunderbar||maravilloso', 'die|Natur|Sg|naturaleza',
  'w|Nord-||norte de (Norddeutschland)', 'w|Ost-||este de (Ostdeutschland)', 'w|Süd-||sur de (Süddeutschland)', 'w|West-||oeste de (Westdeutschland)',
  'v|windsurfen||hacer windsurf', 'das|Programm|Programme|programa', 'w|heiß||muy caliente / caluroso', 'die|Mitte|Sg|centro / mitad',
  'die|Möglichkeit|Möglichkeiten|posibilidad', 'das|Angebot|Angebote|oferta', 'das|Mountainbike|Mountainbikes|bicicleta de montaña', 'v|klettern||escalar',
  'der|Wind|Winde|viento', 'die|Insel|Inseln|isla'
],
7: [
  'der|Reifen|Reifen|aro (de hula hoop) / llanta', 'w|weiter||seguir (weiter üben = seguir practicando)', 'v|üben||practicar', 'v|fragen||preguntar',
  'v|schicken||enviar', 'v|funktionieren||funcionar', 'der|Kommentar|Kommentare|comentario', 'v|aussehen||verse (Das sieht toll aus = se ve genial)',
  'v|können||poder / saber hacer', 'v|stimmen||ser cierto (Das stimmt = es cierto)', 'der|Tipp|Tipps|consejo', 'v|reiten||montar a caballo',
  'v|malen||pintar', 'v|backen||hornear', 'das|Tennis|Sg|tenis', 'v|singen||cantar',
  'das|Klavier|Klaviere|piano', 'w|senkrecht||vertical', 'w|waagerecht||horizontal', 'v|wollen||querer (con decisión)',
  'der|Kurs|Kurse|curso', 'der|Stress|Sg|estrés', 'die|Kommunikation|Sg|comunicación', 'das|Training|Trainings|entrenamiento',
  'die|Psychologie|Sg|psicología', 'das|Theater|Theater|teatro', 'die|Produktion|Produktionen|producción', 'die|Mathematik|Sg|matemáticas',
  'die|Ferien|Pl|vacaciones (escolares)', 'v|schreiben||escribir', 'w|noch||todavía / aún', 'w|gestern||ayer',
  'w|früher||antes (en el pasado)', 'w|oft||a menudo', 'p|nach Hause||a casa (dirección)', 'w|einmal||una vez',
  'w|nie||nunca', 'w|öfter||varias veces / más seguido', 'w|schwer||difícil / pesado', 'w|cool||genial (coloquial)',
  'die|Zeitung|Zeitungen|periódico', 'w|meistens||casi siempre / la mayoría de las veces', 'die|Antwort|Antworten|respuesta', 'w|leicht||fácil / ligero',
  'der|Bus|Busse|autobús', 'das|Plakat|Plakate|cartel', 'der|Comic|Comics|cómic'
]
};

/* ---------- utilidades de la Wortliste ---------- */
function wlParse(s, lesson) {
  const [t, w, pl, es] = s.split('|');
  const isNoun = t === 'der' || t === 'das' || t === 'die';
  return { t, w, pl: pl || '', es, lesson, noun: isNoun, de: isNoun ? t + ' ' + w : w };
}
const WL_ALL = Object.keys(WL).flatMap(k => WL[k].map(s => wlParse(s, +k)));
const wlLesson = n => WL_ALL.filter(e => e.lesson === n);
const wlPlural = e => e.pl === 'Sg' ? 'solo singular' : e.pl === 'Pl' ? 'solo plural' : (e.pl ? 'die ' + e.pl : '');

/* verbos de la Wortliste que el motor todavía no conoce */
const WL_VERB_ES = {};
WL_ALL.filter(e => e.t === 'v').forEach(e => { if (!WL_VERB_ES[e.w]) WL_VERB_ES[e.w] = e.es; });

/* Tabla de vocabulario por lección: Alemán | Se pronuncia | Español */
function wlTable(n) {
  const rows = wlLesson(n);
  const nouns = rows.filter(e => e.noun), other = rows.filter(e => !e.noun);
  const head = '<div class="tw"><table class="t voc ph wl"><thead><tr><th>Alemán</th><th>Se pronuncia</th><th>Español</th></tr></thead><tbody>';
  const nounRows = nouns.map(e => '<tr><td>' + spk(e.de) + A(e.t, '<b>' + e.w + '</b>') + (wlPlural(e) ? '<br><small>' + (e.pl === 'Sg' || e.pl === 'Pl' ? wlPlural(e) : 'pl. ' + wlPlural(e)) + '</small>' : '') + '</td><td class="pr">' + pron(e.de) + '</td><td class="es" data-reveal>' + e.es + '</td></tr>').join('');
  const otherRows = other.map(e => '<tr><td>' + spk(e.w.replace(/-$/, '')) + '<b>' + e.w + '</b>' + (e.t === 'v' ? '<br><small>verbo</small>' : '') + '</td><td class="pr">' + pron(e.w.replace(/\.\.\./g, '')) + '</td><td class="es" data-reveal>' + e.es + '</td></tr>').join('');
  return '<h4>Sustantivos (' + nouns.length + ')</h4>' + head + nounRows + '</tbody></table></div>' +
    '<h4>Verbos, adjetivos, frases y otras palabras (' + other.length + ')</h4>' + head + otherRows + '</tbody></table></div>';
}

/* Preguntas de la Wortliste de una lección */
function genWortliste(n) {
  const level = 'wl' + n;
  const rows = wlLesson(n);
  const out = [];
  const nounRows = rows.filter(e => e.noun);
  const pool = WL_ALL.filter(e => e.noun);
  const gen = { der: 'masculino', das: 'neutro', die: 'femenino' };
  nounRows.forEach(e => {
    const id = level + ':' + e.w;
    const p = pron(e.de);
    const plNote = e.pl === 'Pl' ? ' Esta palabra se usa solo en plural, por eso lleva «die».' : e.pl === 'Sg' ? ' Se usa normalmente solo en singular.' : (e.pl ? ' Plural: die ' + e.pl + '.' : '');
    if (e.pl !== 'Pl') out.push(mc(id + ':art', level, '¿Qué artículo lleva «' + e.w + '»?', e.t, ['der', 'das', 'die'].filter(x => x !== e.t),
      e.de + ' es ' + gen[e.t] + '. Se pronuncia «' + p + '». Aprende siempre artículo + palabra + plural.' + plNote, 'Artículo'));
    out.push(info(mc(id + ':de', level, '¿Qué significa «' + e.de + '»?', e.es, sample(pool.filter(x => x.es !== e.es).map(x => x.es), 3),
      e.de + ' = ' + e.es + '. Se pronuncia «' + p + '».' + plNote, 'Vocabulario'), e.de, e.es));
    out.push(info(mc(id + ':es', level, '¿Cómo se dice «' + e.es + '» en alemán?', e.de, sample(pool.filter(x => x.w !== e.w && x.es !== e.es).map(x => x.de), 3),
      e.de + ' (' + (e.pl === 'Pl' ? 'plural' : gen[e.t]) + '). Se pronuncia «' + p + '».' + plNote, 'Vocabulario'), e.de, e.es));
    out.push(info(ty(id + ':ty', level, 'Escribe en alemán con artículo: «' + e.es + '»', [e.de], e.de + '. Sustantivo con mayúscula y con su artículo. Se pronuncia «' + p + '».' + plNote, 'Escritura'), e.de, e.es));
    if (e.pl && e.pl !== 'Sg' && e.pl !== 'Pl') {
      out.push(info(ty(id + ':pl', level, 'Plural de «' + e.de + '»: die ___', [e.pl, 'die ' + e.pl],
        'El plural de ' + e.de + ' es die ' + e.pl + (e.pl === e.w ? ' (igual que el singular; solo cambia el artículo a «die»).' : '.') + ' En plural el artículo siempre es «die». Se pronuncia «' + pron('die ' + e.pl) + '».', 'Plural'), 'die ' + e.pl, e.es + ' (plural)'));
    }
  });
  const other = rows.filter(e => !e.noun);
  const opool = WL_ALL.filter(e => !e.noun);
  other.forEach(e => {
    const id = level + ':w:' + e.w;
    const w = e.w;
    const p = pron(w.replace(/\.\.\./g, ''));
    const kind = e.t === 'v' ? 'Verbos' : e.t === 'p' ? 'Frases' : 'Vocabulario';
    out.push(info(mc(id + ':de', level, '¿Qué significa «' + w + '»?', e.es, sample(opool.filter(x => x.es !== e.es && x.t === e.t).map(x => x.es), 3),
      '«' + w + '» = ' + e.es + '. Se pronuncia «' + p + '».' + (e.t === 'v' ? ' Es un verbo (infinitivo).' : ''), kind), w, e.es));
    out.push(info(mc(id + ':es', level, '¿Cómo se dice «' + e.es + '» en alemán?', w, sample(opool.filter(x => x.w !== w && x.es !== e.es && x.t === e.t).map(x => x.w), 3),
      '«' + e.es + '» = ' + w + '. Se pronuncia «' + p + '».', kind), w, e.es));
    if (!/[-.]/.test(w.slice(-1)) && w.split(' ').length <= 3) {
      const alts = [w.replace(/[?!]$/, '')];
      if (w === 'gern') alts.push('gerne');
      if (w === 'tschüs') alts.push('tschüss');
      if (w === 'circa') alts.push('ca.', 'zirka');
      out.push(info(ty(id + ':ty', level, 'Escribe en alemán: «' + e.es + '»', alts, '«' + e.es + '» = ' + w + '. Se pronuncia «' + p + '».' + (/^[A-ZÄÖÜ]/.test(w) && e.t !== 'p' && !['Sie', 'Ihr'].includes(w) ? ' Los países y los idiomas se escriben con mayúscula.' : ''), 'Escritura'), w, e.es));
    }
  });
  return out;
}

const WL_TITLES = { 0: 'Meine Wörter im Kurs', 1: 'Guten Tag. Mein Name ist ...', 2: 'Meine Familie', 3: 'Essen und Trinken', 4: 'Meine Wohnung', 5: 'Mein Tag', 6: 'Freizeit', 7: 'Lernen, ein Leben lang' };
const WL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7].map(n => ({
  id: 'wl' + n, group: n === 0 ? 'Lección 1' : 'Lección ' + n, exam: n <= 3 ? 1 : n <= 6 ? 2 : 3, icon: '📚',
  title: n === 0 ? 'Palabras de la clase (instrucciones)' : 'Wortliste completa de la lección ' + n,
  sub: 'Lernwortschatz «' + WL_TITLES[n] + '» (' + wlLesson(n).length + ' palabras)', cats: [], gen: () => genWortliste(n)
}));
[0, 1, 2, 3, 4, 5, 6, 7].forEach(n => {
  LESSONS['wl' + n] = () => box(n === 0 ? 'Las instrucciones del libro' : 'Toda la lista de vocabulario de la lección ' + n,
    n === 0 ? '<p>Estas palabras aparecen en los enunciados de los ejercicios del libro (LWS 1): <i>Hören Sie</i>, <i>Ergänzen Sie</i>, <i>Kreuzen Sie an</i>... Si las entiendes, entiendes cada ejercicio.</p>'
      : '<p>Estas son todas las palabras del <b>Lernwortschatz</b> de la lección ' + n + ' («' + WL_TITLES[n] + '»). Los sustantivos llevan su artículo con el color del libro y su plural. Toca 🔊 para oír cada palabra.</p>') + wlTable(n);
});
