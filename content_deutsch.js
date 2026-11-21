/* v3.2: preguntas TODO EN ALEMÁN centradas en los verbos (aplicar, no solo traducir).
   Cada pregunta lleva q.de = true, q.tr (traducción al español de la consigna, visible con «Übersetzen»)
   y la explicación en español en q.why. Frases de redacción propia con el vocabulario de las lecciones 1 a 7. */
'use strict';

IRR.zeichnen = ['zeichne', 'zeichnest', 'zeichnet', 'zeichnen', 'zeichnet', 'zeichnen'];

/* sujetos: [alemán, persona 0..5, español] */
const DV_SUBJ = [['Ich', 0, 'yo'], ['Du', 1, 'tú'], ['Tim', 2, 'Tim'], ['Lara', 2, 'Lara'], ['Wir', 3, 'nosotros'], ['Ihr', 4, 'ustedes (informal)'], ['Lara und Tim', 5, 'Lara y Tim'], ['Sie', 5, 'usted (formal)']];
const lowSubj = s => (['Ich', 'Du', 'Wir', 'Ihr'].includes(s) ? s.toLowerCase() : s);

/* participios que faltan en PART (separables): [infinitivo, participio, auxiliar] */
const PART_EXTRA = {
  aufstehen: ['aufgestanden', 'sein'], einkaufen: ['eingekauft', 'haben'], anrufen: ['angerufen', 'haben'], fernsehen: ['ferngesehen', 'haben'],
  aufräumen: ['aufgeräumt', 'haben'], anfangen: ['angefangen', 'haben'], kennenlernen: ['kennengelernt', 'haben'], brauchen: ['gebraucht', 'haben'],
  bezahlen: ['bezahlt', 'haben'], grillen: ['gegrillt', 'haben'], wandern: ['gewandert', 'sein']
};
function partOf(inf) {
  const x = PART.find(p => p[0] === inf); if (x) return [x[1], x[2]];
  return PART_EXTRA[inf] || null;
}

/* Marcos de frase: v = verbo, r = resto de la frase, es = significado, l = lección (1-3, 4-6, 7),
   t = false si el resto ya tiene una expresión de tiempo (no se usa para «Heute ...») */
const DV = [
  // lecciones 1 a 3
  { v: 'wohnen', r: 'in Berlin', es: 'vivir en Berlín', l: 13 }, { v: 'kommen', r: 'aus Mexiko', es: 'venir de México / ser de México', l: 13, noP: true, noT: true },
  { v: 'heißen', r: 'Anna', es: 'llamarse Anna', l: 13, noP: true, noT: true }, { v: 'sprechen', r: 'ein bisschen Deutsch', es: 'hablar un poco de alemán', l: 13 },
  { v: 'lernen', r: 'Deutsch', es: 'aprender alemán', l: 13 }, { v: 'leben', r: 'in Wien', es: 'vivir en Viena', l: 13, noP: true },
  { v: 'trinken', r: 'gern Kaffee', es: 'tomar café con gusto', l: 13, noP: true }, { v: 'essen', r: 'gern Pizza', es: 'comer pizza con gusto', l: 13, noP: true },
  { v: 'kaufen', r: 'Brot und Milch', es: 'comprar pan y leche', l: 13 }, { v: 'brauchen', r: 'Eier und Mehl', es: 'necesitar huevos y harina', l: 13, noP: true },
  { v: 'kochen', r: 'eine Suppe', es: 'cocinar una sopa', l: 13 }, { v: 'helfen', r: 'der Oma', es: 'ayudar a la abuela (helfen + dativo: der Oma)', l: 13 },
  { v: 'studieren', r: 'Medizin', es: 'estudiar medicina', l: 13 }, { v: 'haben', r: 'zwei Kinder', es: 'tener dos hijos', l: 13, noP: true, noT: true },
  { v: 'sein', r: 'sehr müde', es: 'estar muy cansado', l: 13, noP: true },
  // lecciones 4 a 6
  { v: 'suchen', r: 'eine Wohnung', es: 'buscar un departamento', l: 46 }, { v: 'finden', r: 'die Lampe schön', es: 'encontrar bonita la lámpara', l: 46, noP: true, noT: true },
  { v: 'bezahlen', r: '500 Euro Miete', es: 'pagar 500 euros de renta', l: 46 }, { v: 'aufstehen', r: 'um sieben Uhr', es: 'levantarse a las siete', l: 46, t: false },
  { v: 'einkaufen', r: 'im Supermarkt', es: 'hacer las compras en el supermercado', l: 46 }, { v: 'anrufen', r: 'die Oma', es: 'llamar a la abuela', l: 46 },
  { v: 'fernsehen', r: 'am Abend', es: 'ver televisión en la noche', l: 46, t: false }, { v: 'aufräumen', r: 'die Küche', es: 'ordenar la cocina', l: 46 },
  { v: 'anfangen', r: 'um neun Uhr', es: 'empezar a las nueve', l: 46, t: false }, { v: 'arbeiten', r: 'von neun bis fünf', es: 'trabajar de nueve a cinco', l: 46, t: false },
  { v: 'frühstücken', r: 'um halb acht', es: 'desayunar a las siete y media', l: 46, t: false }, { v: 'schlafen', r: 'lange', es: 'dormir mucho', l: 46 },
  { v: 'spielen', r: 'Fußball', es: 'jugar fútbol', l: 46 }, { v: 'telefonieren', r: 'mit Lara', es: 'hablar por teléfono con Lara', l: 46 },
  { v: 'schreiben', r: 'eine E-Mail', es: 'escribir un correo', l: 46 }, { v: 'machen', r: 'ein Picknick', es: 'hacer un picnic', l: 46 },
  { v: 'lesen', r: 'ein Buch', es: 'leer un libro', l: 46 }, { v: 'sehen', r: 'einen Film', es: 'ver una película', l: 46 },
  { v: 'nehmen', r: 'den Salat', es: 'tomar (pedir) la ensalada', l: 46 }, { v: 'fahren', r: 'nach Hamburg', es: 'ir a Hamburgo (en vehículo)', l: 46 },
  { v: 'treffen', r: 'Freunde', es: 'ver a los amigos', l: 46 }, { v: 'wandern', r: 'in den Bergen', es: 'caminar en las montañas', l: 46 },
  { v: 'grillen', r: 'im Park', es: 'asar en el parque', l: 46 }, { v: 'tanzen', r: 'gern', es: 'bailar con gusto', l: 46, noP: true },
  { v: 'hören', r: 'Musik', es: 'escuchar música', l: 46 }, { v: 'gehen', r: 'ins Kino', es: 'ir al cine', l: 46 },
  // lección 7
  { v: 'üben', r: 'Hula-Hoop', es: 'practicar hula-hoop', l: 7 }, { v: 'malen', r: 'ein Bild', es: 'pintar un cuadro', l: 7 },
  { v: 'backen', r: 'einen Kuchen', es: 'hornear un pastel', l: 7 }, { v: 'singen', r: 'ein Lied', es: 'cantar una canción', l: 7 },
  { v: 'fotografieren', r: 'Wolken', es: 'fotografiar nubes', l: 7 }, { v: 'fragen', r: 'den Lehrer', es: 'preguntar al maestro', l: 7 },
  { v: 'schicken', r: 'ein Foto', es: 'enviar una foto', l: 7 }, { v: 'zeichnen', r: 'ein Haus', es: 'dibujar una casa', l: 7 },
  { v: 'kennenlernen', r: 'neue Leute', es: 'conocer gente nueva', l: 7 }
];

const DV_TIME = [['Heute', 'hoy'], ['Am Montag', 'el lunes'], ['Morgen', 'mañana'], ['Am Wochenende', 'el fin de semana'], ['Jetzt', 'ahora']];
const MOD = { können: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'], wollen: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'] };
const AUX = { haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] };
const vEs = inf => { const v = VERBS.find(x => x[0] === inf); return v ? v[1] : ''; };
const formOf = (inf, p) => { const f = conj(inf)[p].split(' '); return { v: f[0], pre: f[1] || '' }; };
const sent = (s, inf, p, r) => { const f = formOf(inf, p); return [s, f.v, r, f.pre].filter(Boolean).join(' ') + '.'; };

/* glosario de palabras clave para el botón «Übersetzen» */
function dvKeys(inf, extra) { const k = [[inf, vEs(inf)]]; return k.concat(extra || []); }

function genDV(lessonKey) {
  const level = 'dv' + lessonKey;
  const out = [];
  const add = (q, why) => { q.de = true; out.push(q); return q; };
  DV.filter(f => f.l === lessonKey).forEach((f, fi) => {
    const sep = SEP[f.v];
    const keys = dvKeys(f.v, [[f.r, f.es.replace(/^[a-záéíóú]+\s/, '… ')]]);
    // 1) Ergänze das Verb: todas las personas (id con :c:verbo:persona para que el corrector detecte otra persona)
    DV_SUBJ.forEach((s, si) => {
      const fm = formOf(f.v, s[1]);
      const qtxt = s[0] + ' ___ ' + f.r + (fm.pre ? ' ___' : '') + '. <small>(' + f.v + ')</small>';
      const ans = fm.pre ? fm.v + ' ' + fm.pre : fm.v;
      const why = conjWhy(f.v, s[1]) + (fm.pre ? ' Verbo separable: «' + fm.v + '» va en la posición 2 y «' + fm.pre + '» al final: ' + sent(s[0], f.v, s[1], f.r) : ' Frase completa: ' + sent(s[0], f.v, s[1], f.r));
      const q = ty(level + ':s' + si + ':' + f.v + ':c:' + f.v + ':' + s[1], level, 'Ergänze das Verb in der richtigen Form:<br><b>' + qtxt + '</b>', [ans], why, 'Conjugación');
      q.tr = 'Completa el verbo en la forma correcta. «' + f.v + '» = ' + vEs(f.v) + '. Sujeto: «' + s[0] + '» = ' + s[2] + '. Significado: ' + f.es + '.' + (fm.pre ? ' Hay dos huecos: el verbo y el prefijo separable; escribe las dos palabras.' : '');
      q.kw = keys; q.info = { de: sent(s[0], f.v, s[1], f.r), es: '' };
      add(q);
    });
    // 2) Welche Form passt? (opción múltiple con las formas de otras personas)
    [DV_SUBJ[(fi + 1) % 8], DV_SUBJ[(fi + 5) % 8]].forEach((s, k) => {
      const forms = conj(f.v); const right = forms[s[1]];
      const wrong = Array.from(new Set(forms.filter(x => x !== right))).slice(0, 3);
      if (wrong.length < 2) return;
      const q = mc(level + ':mc' + k + ':' + f.v + ':c:' + f.v + ':' + s[1], level, 'Welche Form passt?<br><b>' + s[0] + ' ___ ' + f.r + '.</b> <small>(' + f.v + ')</small>', right, wrong, conjWhy(f.v, s[1]) + ' ' + sent(s[0], f.v, s[1], f.r), 'Conjugación');
      q.tr = '¿Qué forma es la correcta? «' + f.v + '» = ' + vEs(f.v) + '; sujeto «' + s[0] + '» = ' + s[2] + '.'; q.kw = keys; q.info = { de: sent(s[0], f.v, s[1], f.r), es: '' };
      add(q);
    });
    const base = DV_SUBJ[fi % 8], p = base[1], orig = sent(base[0], f.v, p, f.r);
    // 3) Perfekt
    const pt = partOf(f.v);
    if (pt) {
      [base, DV_SUBJ[(fi + 3) % 8]].forEach((s, k) => {
        const o = sent(s[0], f.v, s[1], f.r);
        const ans = s[0] + ' ' + AUX[pt[1]][s[1]] + ' ' + f.r + ' ' + pt[0];
        const q = ty(level + ':perf' + k + ':' + f.v + ':' + s[1], level, 'Schreib den Satz im Perfekt:<br><b>' + o + '</b>', [ans], 'Perfekt = ' + pt[1] + ' conjugado en la posición 2 (' + AUX[pt[1]][s[1]] + ') + participio al final (' + pt[0] + ').' + (pt[1] === 'sein' ? ' ' + f.v + ' usa sein porque indica movimiento o cambio de lugar.' : '') + (sep ? ' En los separables el ge- va entre el prefijo y el verbo: ' + pt[0] + '.' : '') + ' Solución: ' + ans + '.', 'Perfekt');
        q.tr = 'Escribe la frase en Perfekt (pasado). Frase: ' + f.es + ', con el sujeto «' + s[0] + '» (' + s[2] + '). Participio de «' + f.v + '»: ' + pt[0] + ' (auxiliar ' + pt[1] + ').'; q.kw = keys.concat([[pt[0], 'participio de ' + f.v]]); q.info = { de: ans + '.', es: '' };
        add(q);
      });
    }
    // 4) con können o wollen
    if (!f.noP && !['haben', 'sein', 'heißen'].includes(f.v)) {
      const m = fi % 2 ? 'wollen' : 'können'; const s = DV_SUBJ[(fi + 2) % 8];
      const ans = s[0] + ' ' + MOD[m][s[1]] + ' ' + f.r + ' ' + f.v;
      const q = ty(level + ':mod:' + f.v + ':' + m + ':' + s[1], level, 'Schreib den Satz mit «' + m + '»:<br><b>' + sent(s[0], f.v, s[1], f.r) + '</b>', [ans], m + ' va conjugado en la posición 2 (' + MOD[m][s[1]] + ') y el otro verbo en infinitivo al final (' + f.v + ')' + (sep ? '; el separable vuelve a ir junto: ' + f.v : '') + '. Solución: ' + ans + '.', 'Modalverben');
      q.tr = 'Escribe la frase con «' + m + '» (' + (m === 'können' ? 'poder / saber' : 'querer') + '). Significado: ' + f.es + '.'; q.kw = keys.concat([[m, m === 'können' ? 'poder / saber hacer' : 'querer']]); q.info = { de: ans + '.', es: '' };
      add(q);
    }
    // 5) Inversión: empieza con una expresión de tiempo
    if (f.t !== false && !f.noT) {
      const T = DV_TIME[fi % DV_TIME.length]; const fm = formOf(f.v, p);
      const ans = [T[0], fm.v, lowSubj(base[0]), f.r, fm.pre].filter(Boolean).join(' ');
      const q = ty(level + ':inv:' + f.v + ':' + p, level, 'Beginne den Satz mit «' + T[0] + '»:<br><b>' + orig + '</b>', [ans], 'Si la frase empieza con «' + T[0] + '», el verbo conjugado sigue en la posición 2 y el sujeto pasa detrás: ' + ans + '.', 'Satzbau');
      q.tr = 'Empieza la frase con «' + T[0] + '» (' + T[1] + '). Significado: ' + f.es + '.'; q.kw = keys.concat([[T[0], T[1]]]); q.info = { de: ans + '.', es: '' };
      add(q);
    }
    // 6) Ja/Nein-Frage con du
    {
      const fm = formOf(f.v, 1);
      const ans = [fm.v.charAt(0).toUpperCase() + fm.v.slice(1), 'du', f.r, fm.pre].filter(Boolean).join(' ') + '?';
      const q = ty(level + ':frage:' + f.v, level, 'Mach eine Ja/Nein-Frage:<br><b>' + sent('Du', f.v, 1, f.r) + '</b>', [ans.replace(/\?$/, '')], 'En la pregunta de sí/no el verbo conjugado va en la posición 1: ' + ans, 'Satzbau');
      q.tr = 'Convierte la frase en una pregunta de sí o no. Significado: ' + f.es + '.'; q.kw = keys; q.info = { de: ans, es: '' };
      add(q);
    }
    // 7) Cambia la persona
    {
      const from = DV_SUBJ[0], to = DV_SUBJ[[2, 1, 4, 6, 3][fi % 5]];
      const ans = sent(to[0], f.v, to[1], f.r).replace(/\.$/, '');
      if (to[1] !== 0) {
        const q = ty(level + ':pers:' + f.v + ':' + to[1], level, 'Schreib den Satz mit «' + to[0] + '»:<br><b>' + sent(from[0], f.v, 0, f.r) + '</b>', [ans], conjWhy(f.v, to[1]) + ' Solución: ' + ans + '.', 'Conjugación');
        q.tr = 'Escribe la frase con «' + to[0] + '» (' + to[2] + '). Significado: ' + f.es + '.'; q.kw = keys; q.info = { de: ans + '.', es: '' };
        add(q);
      }
    }
  });
  return out;
}

/* ---------- Situaciones y preguntas con respuesta (todo en alemán) ---------- */
/* [lección, pregunta/situación, respuesta correcta, [incorrectas], traducción de la consigna, explicación] */
const DSIT = [
  [13, 'Es ist 8 Uhr morgens. Du triffst deine Lehrerin. Was sagst du?', 'Guten Morgen!', ['Gute Nacht!', 'Guten Abend!', 'Tschüs!'], 'Son las 8 de la mañana. Te encuentras con tu maestra. ¿Qué dices?', 'Por la mañana: Guten Morgen. Gute Nacht solo al ir a dormir.'],
  [13, 'Du gehst nach Hause. Was sagst du zu deinem Freund?', 'Tschüs!', ['Hallo!', 'Guten Tag!', 'Willkommen!'], 'Te vas a casa. ¿Qué le dices a tu amigo?', 'Tschüs = adiós informal. Hallo y Guten Tag son saludos al llegar.'],
  [13, 'Am Telefon sagst du am Ende:', 'Auf Wiederhören!', ['Auf Wiedersehen!', 'Guten Appetit!', 'Willkommen!'], 'Al final de una llamada dices:', 'Auf Wiederhören (hören = oír) se usa por teléfono; Auf Wiedersehen (sehen = ver) en persona.'],
  [13, 'Frage: «Wie heißen Sie?» Welche Antwort passt?', 'Ich heiße Fernando.', ['Ich komme aus Mexiko.', 'Mir geht es gut.', 'Ich wohne in Puebla.'], 'Pregunta: «¿Cómo se llama usted?» ¿Qué respuesta encaja?', 'heißen = llamarse: Ich heiße ...'],
  [13, 'Frage: «Woher kommst du?» Welche Antwort passt?', 'Aus Mexiko.', ['In Berlin.', 'Sehr gut, danke.', 'Ich bin 25.'], 'Pregunta: «¿De dónde eres?» ¿Qué respuesta encaja?', 'woher = de dónde → aus + país.'],
  [13, 'Frage: «Wo wohnen Sie?» Welche Antwort passt?', 'In Hamburg.', ['Aus Spanien.', 'Spanisch und Englisch.', 'Danke, gut.'], 'Pregunta: «¿Dónde vive usted?» ¿Qué respuesta encaja?', 'wo = dónde → in + ciudad.'],
  [13, 'Frage: «Welche Sprachen sprichst du?» Welche Antwort passt?', 'Spanisch und ein bisschen Deutsch.', ['In Wien.', 'Aus Italien.', 'Ich heiße Ana.'], 'Pregunta: «¿Qué idiomas hablas?» ¿Qué respuesta encaja?', 'Sprachen = idiomas.'],
  [13, 'Frage: «Wie geht es Ihnen?» Welche Antwort passt?', 'Danke, sehr gut. Und Ihnen?', ['Ich heiße Müller.', 'Aus Österreich.', 'Zwei Kilo, bitte.'], 'Pregunta: «¿Cómo está usted?» ¿Qué respuesta encaja?', 'Respuesta cortés: Danke, gut. Und Ihnen?'],
  [13, 'Du verstehst etwas nicht. Was sagst du?', 'Wie bitte?', ['Vielen Dank!', 'Tschüs!', 'Guten Appetit!'], 'No entiendes algo. ¿Qué dices?', 'Wie bitte? = ¿Cómo dice? / ¿Perdón?'],
  [13, 'Frage: «Wie alt ist dein Sohn?» Welche Antwort passt?', 'Er ist sieben Jahre alt.', ['Er heißt Paul.', 'Er wohnt in Bonn.', 'Er ist mein Bruder.'], 'Pregunta: «¿Cuántos años tiene tu hijo?» ¿Qué respuesta encaja?', 'Wie alt? → ... Jahre alt.'],
  [13, 'Frage: «Bist du verheiratet?» Welche Antwort passt?', 'Nein, ich bin ledig.', ['Nein, ich bin müde.', 'Ja, ich bin aus Polen.', 'Ja, ich habe Hunger.'], 'Pregunta: «¿Estás casado?» ¿Qué respuesta encaja?', 'ledig = soltero.'],
  [13, 'Im Supermarkt. Frage: «Was kostet das Brot?» Welche Antwort passt?', '2,50 Euro.', ['Zwei Kilo.', 'Im Regal.', 'Ja, gern.'], 'En el súper: «¿Cuánto cuesta el pan?» ¿Qué respuesta encaja?', 'kosten = costar → un precio.'],
  [13, 'Im Supermarkt. Frage: «Was brauchen wir?» Welche Antwort passt?', 'Wir brauchen Eier und Milch.', ['Wir kosten drei Euro.', 'Wir heißen Müller.', 'Wir sind aus Peru.'], 'En el súper: «¿Qué necesitamos?» ¿Qué respuesta encaja?', 'brauchen = necesitar.'],
  [13, 'Frage: «Haben wir noch Zucker?» Es gibt keinen Zucker. Was sagst du?', 'Nein, wir haben keinen Zucker.', ['Ja, wir haben keinen Zucker.', 'Doch, wir haben Zucker.', 'Nein, wir haben nicht Zucker.'], 'Pregunta: «¿Todavía tenemos azúcar?» No hay. ¿Qué dices?', 'der Zucker → keinen Zucker (acusativo).'],
  [13, 'Frage: «Was isst du gern?» Welche Antwort passt?', 'Ich esse gern Fisch.', ['Ich trinke gern Fisch.', 'Ich heiße gern Fisch.', 'Ich bin gern Fisch.'], 'Pregunta: «¿Qué te gusta comer?» ¿Qué respuesta encaja?', 'essen = comer: ich esse, du isst.'],
  [46, 'Frage: «Wie gefällt dir die Wohnung?» Welche Antwort passt?', 'Sehr gut! Sie ist hell und groß.', ['Sie kostet 600 Euro.', 'Sie ist im zweiten Stock.', 'Ich wohne allein.'], 'Pregunta: «¿Qué te parece el departamento?» ¿Qué respuesta encaja?', 'gefallen pide una opinión: sehr gut, schön, hell...'],
  [46, 'Frage: «Wie viel kostet die Wohnung?» Welche Antwort passt?', '650 Euro warm.', ['Drei Zimmer.', 'Im Zentrum.', 'Ab sofort.'], 'Pregunta: «¿Cuánto cuesta el departamento?» ¿Qué respuesta encaja?', 'warm = con gastos incluidos.'],
  [46, 'Frage: «Wo ist die Küche?» Welche Antwort passt?', 'Die Küche ist dort links.', ['Die Küche ist modern.', 'Ich koche gern.', 'Sie kostet viel.'], 'Pregunta: «¿Dónde está la cocina?» ¿Qué respuesta encaja?', 'wo = dónde → dort, hier, links...'],
  [46, 'Frage: «Wie spät ist es?» Es ist 8:30. Was sagst du?', 'Es ist halb neun.', ['Es ist halb acht.', 'Es ist acht nach halb.', 'Es ist neun Uhr dreißig.'], 'Pregunta: «¿Qué hora es?» Son las 8:30. ¿Qué dices?', 'halb neun = 8:30 (media hora antes de las nueve).'],
  [46, 'Frage: «Wann fängt der Kurs an?» Welche Antwort passt?', 'Um neun Uhr.', ['Am Abend um.', 'Von Montag.', 'Neun Stunden.'], 'Pregunta: «¿Cuándo empieza el curso?» ¿Qué respuesta encaja?', 'um + hora.'],
  [46, 'Frage: «Wann hast du Zeit?» Welche Antwort passt?', 'Am Freitag um drei.', ['Um Freitag am drei.', 'Im Freitag.', 'Drei Freitage.'], 'Pregunta: «¿Cuándo tienes tiempo?» ¿Qué respuesta encaja?', 'am + día, um + hora.'],
  [46, 'Frage: «Was machst du am Wochenende?» Welche Antwort passt?', 'Ich mache ein Picknick mit Freunden.', ['Ich bin am Wochenende.', 'Das Wochenende ist schön.', 'Am Wochenende ist Samstag.'], 'Pregunta: «¿Qué haces el fin de semana?» ¿Qué respuesta encaja?', 'Responde con una actividad: Ich mache / spiele / gehe ...'],
  [46, 'Frage: «Stehst du gern früh auf?» Du stehst nicht gern früh auf. Was sagst du?', 'Nein, ich stehe nicht gern früh auf.', ['Nein, ich stehe auf nicht gern früh.', 'Doch, ich stehe gern früh auf.', 'Nein, ich aufstehe nicht gern.'], 'Pregunta: «¿Te gusta levantarte temprano?» No te gusta. ¿Qué dices?', 'Separable: stehe ... auf; nicht gern va antes de früh.'],
  [46, 'Frage: «Hast du keinen Hunger?» Doch, du hast Hunger. Was sagst du?', 'Doch, ich habe Hunger.', ['Ja, ich habe Hunger.', 'Nein, ich habe Hunger.', 'Doch, ich habe keinen Hunger.'], 'Pregunta: «¿No tienes hambre?» Sí tienes. ¿Qué dices?', 'Pregunta negativa + respuesta positiva = Doch.'],
  [46, 'Im Imbiss. Was sagst du?', 'Ich möchte eine Currywurst, bitte.', ['Ich möchte eine Currywurst, danke schön.', 'Du möchtest eine Currywurst.', 'Ich möchten eine Currywurst.'], 'En un puesto de comida. ¿Qué dices?', 'ich möchte (sin -n) + bitte para pedir.'],
  [46, 'Frage: «Wie ist das Wetter heute?» Welche Antwort passt?', 'Es regnet und es ist kalt.', ['Es ist Montag.', 'Es ist halb drei.', 'Es ist mein Hobby.'], 'Pregunta: «¿Cómo está el clima hoy?» ¿Qué respuesta encaja?', 'Clima: Es regnet, es schneit, die Sonne scheint, es ist kalt/warm.'],
  [46, 'Frage: «Was ist dein Hobby?» Welche Antwort passt?', 'Ich wandere gern in den Bergen.', ['Ich wohne in den Bergen.', 'Mein Hobby ist Montag.', 'Ich bin Hobby.'], 'Pregunta: «¿Cuál es tu pasatiempo?» ¿Qué respuesta encaja?', 'Hobby → actividad que te gusta: Ich ... gern.'],
  [46, 'Frage: «Kommst du mit ins Kino?» Du hast keine Zeit. Was sagst du?', 'Tut mir leid, ich habe keine Zeit.', ['Ja, ich habe keine Zeit.', 'Doch, ich habe Zeit.', 'Gute Idee, ich habe keine Zeit.'], 'Pregunta: «¿Vienes al cine?» No tienes tiempo. ¿Qué dices?', 'Tut mir leid = lo siento.'],
  [46, 'Frage: «Was nimmst du?» Welche Antwort passt?', 'Ich nehme den Salat.', ['Ich nehme der Salat.', 'Ich nimmst den Salat.', 'Ich nehme dem Salat.'], 'Pregunta: «¿Qué vas a pedir?» ¿Qué respuesta encaja?', 'nehmen + acusativo: der Salat → den Salat.'],
  [46, 'Frage: «Wann stehst du auf?» Welche Antwort passt?', 'Ich stehe um sechs Uhr auf.', ['Ich stehe auf um sechs Uhr.', 'Ich aufstehe um sechs Uhr.', 'Um sechs Uhr ich stehe auf.'], 'Pregunta: «¿A qué hora te levantas?» ¿Qué respuesta encaja?', 'Satzklammer: stehe ... auf.'],
  [7, 'Frage: «Kannst du schwimmen?» Welche Antwort passt?', 'Ja, ich kann sehr gut schwimmen.', ['Ja, ich kann schwimme sehr gut.', 'Ja, ich kanne schwimmen.', 'Ja, ich schwimmen kann.'], 'Pregunta: «¿Sabes nadar?» ¿Qué respuesta encaja?', 'kann en posición 2 e infinitivo al final.'],
  [7, 'Frage: «Was willst du in den Ferien machen?» Welche Antwort passt?', 'Ich will lange schlafen.', ['Ich will lange geschlafen.', 'Ich willst lange schlafen.', 'Ich will schlafe lange.'], 'Pregunta: «¿Qué quieres hacer en las vacaciones?» ¿Qué respuesta encaja?', 'wollen + infinitivo al final.'],
  [7, 'Du machst einen Vorschlag: Ihr geht zusammen joggen. Was sagst du?', 'Wollen wir zusammen joggen?', ['Wollt wir zusammen joggen?', 'Wir wollen joggen zusammen?', 'Willst wir joggen?'], 'Haces una propuesta: ir a trotar juntos. ¿Qué dices?', 'Propuesta: Wollen wir ...?'],
  [7, 'Frage: «Was hast du gestern gemacht?» Welche Antwort passt?', 'Ich habe Fußball gespielt.', ['Ich habe Fußball spielen.', 'Ich bin Fußball gespielt.', 'Ich spiele gestern Fußball gespielt.'], 'Pregunta: «¿Qué hiciste ayer?» ¿Qué respuesta encaja?', 'Perfekt: habe + participio (gespielt).'],
  [7, 'Frage: «Wie bist du nach Hause gekommen?» Welche Antwort passt?', 'Ich bin mit dem Bus gefahren.', ['Ich habe mit dem Bus gefahren.', 'Ich bin mit dem Bus fahren.', 'Ich bin mit dem Bus gefahrt.'], 'Pregunta: «¿Cómo llegaste a casa?» ¿Qué respuesta encaja?', 'fahren → ist gefahren (movimiento → sein).'],
  [7, 'Frage: «Bist du schon mal Ski gefahren?» Du hast es nie gemacht. Was sagst du?', 'Nein, noch nie.', ['Ja, schon öfter.', 'Ja, schon einmal.', 'Doch, noch nie.'], 'Pregunta: «¿Ya esquiaste alguna vez?» Nunca lo has hecho. ¿Qué dices?', 'noch nie = nunca.'],
  [7, 'Frage: «Hast du gut geschlafen?» Welche Antwort passt?', 'Ja, ich habe sehr gut geschlafen.', ['Ja, ich bin sehr gut geschlafen.', 'Ja, ich habe sehr gut schlafen.', 'Ja, ich schlafe sehr gut geschlafen.'], 'Pregunta: «¿Dormiste bien?» ¿Qué respuesta encaja?', 'schlafen → hat geschlafen.'],
  [7, 'Frage: «Was hast du am Wochenende gemacht?» Welche Antwort passt?', 'Ich bin in die Stadt gegangen.', ['Ich habe in die Stadt gegangen.', 'Ich bin in die Stadt gehen.', 'Ich gehe in die Stadt gegangen.'], 'Pregunta: «¿Qué hiciste el fin de semana?» ¿Qué respuesta encaja?', 'gehen → bin gegangen.'],
  [7, 'Ein Freund sagt: «Ich lerne Vokabeln im Bus.» Du findest den Tipp gut. Was sagst du?', 'Gute Idee! Das mache ich auch.', ['Nein, nicht so gern.', 'Das stimmt nicht.', 'Noch nie.'], 'Un amigo dice: «Aprendo vocabulario en el autobús.» Te parece bueno el consejo. ¿Qué dices?', 'Gute Idee = buena idea.'],
  [7, 'Frage: «Kann ich dir helfen?» Du brauchst Hilfe. Was sagst du?', 'Ja, gern. Danke!', ['Nein, gar nicht.', 'Ich kann nicht.', 'Noch nie.'], 'Pregunta: «¿Te puedo ayudar?» Necesitas ayuda. ¿Qué dices?', 'Ja, gern = sí, con gusto.']
];
function genDSit(lessonKey) {
  const level = 'dsit' + lessonKey;
  return DSIT.filter(x => x[0] === lessonKey).map(x => {
    const q = mc(level + ':' + hash(x[1] + x[2]), level, x[1], x[2], x[3], x[5], 'Situationen');
    q.de = true; q.tr = x[4]; q.info = { de: x[2], es: '' };
    return q;
  });
}

/* Konjugationstrainer: tablas completas en alemán (escribe las seis formas) */
function genKonj(lessonKey) {
  const level = 'dk' + lessonKey;
  const verbs = Array.from(new Set(DV.filter(f => f.l === lessonKey).map(f => f.v)));
  const out = [];
  verbs.forEach(v => {
    const f = conj(v);
    const ans = f.join(', ');
    const q = ty(level + ':tab:' + v, level, 'Konjugiere «' + v + '» (ich, du, er/sie/es, wir, ihr, sie/Sie). Trenne mit Kommas:', [ans, f.join(' ')], 'Conjugación completa de «' + v + '» (' + vEs(v) + '): ' + PERSONS.map((p, i) => p + ' ' + f[i]).join(' · ') + '.', 'Conjugación');
    q.de = true; q.tr = 'Conjuga «' + v + '» (' + vEs(v) + ') en las seis personas, separadas por comas.'; q.kw = [[v, vEs(v)]];
    out.push(q);
  });
  return out;
}

const DE_LEVELS = [
  { id: 'dv13', group: 'Auf Deutsch: Verben anwenden', exam: 1, icon: '✍️', title: 'Verben im Satz: Lektion 1–3', sub: 'Konjugieren, umformen, fragen (alles auf Deutsch)', cats: [], gen: () => genDV(13).concat(genKonj(13)) },
  { id: 'dv46', group: 'Auf Deutsch: Verben anwenden', exam: 2, icon: '✍️', title: 'Verben im Satz: Lektion 4–6', sub: 'Trennbare Verben, Perfekt, Modalverben', cats: [], gen: () => genDV(46).concat(genKonj(46)) },
  { id: 'dv7', group: 'Auf Deutsch: Verben anwenden', exam: 3, icon: '✍️', title: 'Verben im Satz: Lektion 7', sub: 'können, wollen, Perfekt', cats: [], gen: () => genDV(7).concat(genKonj(7)) },
  { id: 'dsit13', group: 'Auf Deutsch: Verben anwenden', exam: 1, icon: '💬', title: 'Situationen: Lektion 1–3', sub: 'Was sagst du? Welche Antwort passt?', cats: [], gen: () => genDSit(13) },
  { id: 'dsit46', group: 'Auf Deutsch: Verben anwenden', exam: 2, icon: '💬', title: 'Situationen: Lektion 4–6', sub: 'Was sagst du? Welche Antwort passt?', cats: [], gen: () => genDSit(46) },
  { id: 'dsit7', group: 'Auf Deutsch: Verben anwenden', exam: 3, icon: '💬', title: 'Situationen: Lektion 7', sub: 'Was sagst du? Welche Antwort passt?', cats: [], gen: () => genDSit(7) }
];
const dvTable = key => conjTable(Array.from(new Set(DV.filter(f => f.l === key).map(f => f.v))));
const dvIntro = '<p>En este nivel <b>todo está en alemán</b>. Si no entiendes la consigna, toca <b>🌐 Übersetzen</b> debajo de la pregunta. Practicas los verbos en frases: conjugar, pasar a Perfekt, usar können/wollen, empezar con «Heute» y hacer preguntas.</p>';
LESSONS.dv13 = () => box('Verben anwenden', dvIntro) + dvTable(13);
LESSONS.dv46 = () => box('Verben anwenden', dvIntro) + dvTable(46);
LESSONS.dv7 = () => box('Verben anwenden', dvIntro) + dvTable(7) + conjTable(['können', 'wollen']);
const sitLesson = k => () => box('Situationen', '<p>Lee la situación o la pregunta en alemán y elige lo que dirías. Toca <b>🌐 Übersetzen</b> si necesitas la traducción.</p>') + ph('Respuestas modelo', DSIT.filter(x => x[0] === k).map(x => [x[2], x[4]]));
LESSONS.dsit13 = sitLesson(13); LESSONS.dsit46 = sitLesson(46); LESSONS.dsit7 = sitLesson(7);

/* explicación para verbos con raíz en consonante + n (zeichnen): llevan -e en du, er/sie/es e ihr */
{
  const _cw = conjWhy;
  conjWhy = function (inf, p) { // eslint-disable-line no-func-assign
    if (inf === 'zeichnen' && (p === 1 || p === 2 || p === 4)) return 'La raíz «zeichn» termina en consonante + n, por eso se añade una -e para poder pronunciarlo (como en arbeiten): ' + conj(inf)[p] + '.';
    return _cw(inf, p);
  };
}
