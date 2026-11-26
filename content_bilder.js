/* v3.6: ejercicios con IMÁGENES (emojis y relojes dibujados en SVG por la app; no se usan imágenes del libro).
   «Was ist das?» (palabra con artículo), «Was macht Lara?» (actividades), «Was hat Tim gestern gemacht?» (Perfekt)
   y «Wie spät ist es?» con relojes. Para todas las lecciones. */
'use strict';

/* [emoji, artículo, palabra, español, lección] */
const PICS = [
  ['📷', 'das', 'Foto', 'foto', 1], ['☎️', 'das', 'Telefon', 'teléfono', 1], ['🗺️', 'das', 'Land', 'país', 1],
  ['👨', 'der', 'Mann', 'hombre', 2], ['👩', 'die', 'Frau', 'mujer', 2], ['👴', 'der', 'Opa', 'abuelito', 2], ['👵', 'die', 'Oma', 'abuelita', 2], ['👨‍👩‍👧', 'die', 'Familie', 'familia', 2], ['🧒', 'das', 'Kind', 'niño', 2], ['👮', 'die', 'Polizei', 'policía', 2],
  ['🍎', 'der', 'Apfel', 'manzana', 3], ['🍌', 'die', 'Banane', 'plátano', 3], ['🍐', 'die', 'Birne', 'pera', 3], ['🍊', 'die', 'Orange', 'naranja', 3], ['🍅', 'die', 'Tomate', 'jitomate', 3], ['🥔', 'die', 'Kartoffel', 'papa', 3],
  ['🧅', 'die', 'Zwiebel', 'cebolla', 3], ['🥚', 'das', 'Ei', 'huevo', 3], ['🍞', 'das', 'Brot', 'pan', 3], ['🧀', 'der', 'Käse', 'queso', 3], ['🥛', 'die', 'Milch', 'leche', 3], ['🧈', 'die', 'Butter', 'mantequilla', 3],
  ['🐟', 'der', 'Fisch', 'pescado', 3], ['🥩', 'das', 'Fleisch', 'carne', 3], ['🍚', 'der', 'Reis', 'arroz', 3], ['🍰', 'der', 'Kuchen', 'pastel', 3], ['🍫', 'die', 'Schokolade', 'chocolate', 3], ['☕', 'der', 'Kaffee', 'café', 3],
  ['🍵', 'der', 'Tee', 'té', 3], ['🍷', 'der', 'Wein', 'vino', 3], ['🍺', 'das', 'Bier', 'cerveza', 3], ['🧃', 'der', 'Saft', 'jugo', 3], ['🥗', 'der', 'Salat', 'ensalada', 3], ['🍕', 'die', 'Pizza', 'pizza', 3],
  ['🍗', 'das', 'Hähnchen', 'pollo', 3], ['🍲', 'die', 'Suppe', 'sopa', 3], ['🧂', 'das', 'Salz', 'sal', 3], ['🍾', 'die', 'Flasche', 'botella', 3], ['🥫', 'die', 'Dose', 'lata', 3], ['🌭', 'das', 'Würstchen', 'salchicha', 3],
  ['🛋️', 'das', 'Sofa', 'sofá', 4], ['🛏️', 'das', 'Bett', 'cama', 4], ['🪑', 'der', 'Stuhl', 'silla', 4], ['🚿', 'die', 'Dusche', 'regadera', 4], ['🛁', 'die', 'Badewanne', 'tina', 4], ['💡', 'die', 'Lampe', 'lámpara', 4],
  ['📺', 'der', 'Fernseher', 'televisor', 4], ['🖥️', 'der', 'Computer', 'computadora', 4], ['📖', 'das', 'Buch', 'libro', 4], ['✏️', 'der', 'Stift', 'lápiz', 4], ['📓', 'das', 'Heft', 'cuaderno', 4], ['🏠', 'das', 'Haus', 'casa', 4], ['📱', 'das', 'Handy', 'celular', 4], ['🪴', 'der', 'Garten', 'jardín', 4],
  ['🚲', 'das', 'Fahrrad', 'bicicleta', 5], ['🎬', 'der', 'Film', 'película', 5], ['🏛️', 'das', 'Museum', 'museo', 5], ['🚢', 'das', 'Schiff', 'barco', 5], ['⌚', 'die', 'Uhr', 'reloj', 5], ['🎉', 'die', 'Party', 'fiesta', 5], ['🌙', 'die', 'Nacht', 'noche', 5],
  ['☀️', 'die', 'Sonne', 'sol', 6], ['🌧️', 'der', 'Regen', 'lluvia', 6], ['❄️', 'der', 'Schnee', 'nieve', 6], ['☁️', 'die', 'Wolke', 'nube', 6], ['💨', 'der', 'Wind', 'viento', 6], ['🏝️', 'die', 'Insel', 'isla', 6],
  ['🐕', 'der', 'Hund', 'perro', 6], ['🎸', 'die', 'Gitarre', 'guitarra', 6], ['🧺', 'das', 'Picknick', 'picnic', 6], ['🚗', 'das', 'Auto', 'coche', 6], ['🍔', 'der', 'Hamburger', 'hamburguesa', 6], ['⚽', 'der', 'Fußball', 'fútbol (balón)', 6],
  ['🎹', 'das', 'Klavier', 'piano', 7], ['🚌', 'der', 'Bus', 'autobús', 7], ['📰', 'die', 'Zeitung', 'periódico', 7], ['🎭', 'das', 'Theater', 'teatro', 7], ['🛞', 'der', 'Reifen', 'llanta / aro', 7], ['🪧', 'das', 'Plakat', 'cartel', 7]
];
/* actividades: [emoji, verbo, resto, español, lección] */
const ACTS = [
  ['🍳', 'kochen', '', 'cocinar', 3], ['🛒', 'einkaufen', '', 'hacer las compras', 5], ['📺', 'fernsehen', '', 'ver televisión', 5], ['🧹', 'aufräumen', 'das Zimmer', 'ordenar el cuarto', 5],
  ['⏰', 'aufstehen', 'um sieben Uhr', 'levantarse a las siete', 5], ['📞', 'telefonieren', '', 'hablar por teléfono', 6], ['😴', 'schlafen', '', 'dormir', 5], ['🥐', 'frühstücken', '', 'desayunar', 5], ['💼', 'arbeiten', '', 'trabajar', 5],
  ['✍️', 'schreiben', 'eine E-Mail', 'escribir un correo', 6], ['🎧', 'hören', 'Musik', 'escuchar música', 6], ['📖', 'lesen', 'ein Buch', 'leer un libro', 6], ['⚽', 'spielen', 'Fußball', 'jugar fútbol', 6], ['🏊', 'schwimmen', '', 'nadar', 6],
  ['🚴', 'fahren', 'Fahrrad', 'andar en bicicleta', 6], ['🥾', 'wandern', '', 'caminar en la montaña', 6], ['🏃', 'joggen', '', 'trotar', 6], ['💃', 'tanzen', '', 'bailar', 6], ['🍖', 'grillen', '', 'asar a la parrilla', 6], ['📷', 'fotografieren', '', 'fotografiar', 6],
  ['🎸', 'spielen', 'Gitarre', 'tocar la guitarra', 7], ['🎹', 'spielen', 'Klavier', 'tocar el piano', 7], ['🎨', 'malen', '', 'pintar', 7], ['🎤', 'singen', '', 'cantar', 7], ['🎂', 'backen', 'einen Kuchen', 'hornear un pastel', 7],
  ['🐎', 'reiten', '', 'montar a caballo', 7], ['⛷️', 'fahren', 'Ski', 'esquiar', 7], ['🎾', 'spielen', 'Tennis', 'jugar tenis', 7], ['🧗', 'klettern', '', 'escalar', 7]
];
const actSent = (a, subj, p) => { const f = conj(a[1])[p].split(' '); return [subj, f[0], a[2], f[1] || ''].filter(Boolean).join(' '); };
const actInf = a => (a[2] ? a[2] + ' ' : '') + a[1];
const pic = e => '<span class="pic" aria-hidden="true">' + e + '</span>';

/* reloj analógico dibujado en SVG */
function clockSvg(h, m) {
  const ah = ((h % 12) + m / 60) * 30 * Math.PI / 180, am = m * 6 * Math.PI / 180;
  const hand = (a, len, w) => '<line x1="50" y1="50" x2="' + (50 + len * Math.sin(a)).toFixed(1) + '" y2="' + (50 - len * Math.cos(a)).toFixed(1) + '" stroke="currentColor" stroke-width="' + w + '" stroke-linecap="round"/>';
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i * 30 * Math.PI / 180; ticks += '<line x1="' + (50 + 38 * Math.sin(a)).toFixed(1) + '" y1="' + (50 - 38 * Math.cos(a)).toFixed(1) + '" x2="' + (50 + 44 * Math.sin(a)).toFixed(1) + '" y2="' + (50 - 44 * Math.cos(a)).toFixed(1) + '" stroke="currentColor" stroke-width="' + (i % 3 ? 2 : 4) + '"/>'; }
  return '<svg class="clock" viewBox="0 0 100 100" role="img" aria-label="Reloj"><circle cx="50" cy="50" r="47" fill="var(--surface)" stroke="currentColor" stroke-width="3"/>' + ticks + hand(ah, 24, 6) + hand(am, 36, 3.5) + '<circle cx="50" cy="50" r="4" fill="currentColor"/></svg>';
}
const CLOCKS = [[7, 30], [8, 15], [9, 45], [10, 0], [11, 20], [12, 50], [1, 5], [2, 30], [3, 40], [4, 25], [5, 55], [6, 10], [7, 35], [9, 15], [10, 30], [11, 45]];

function genBilder(lo, hi, perfAll) {
  const level = 'bild' + lo + hi; const M = maker(level); const out = [];
  const ps = PICS.filter(x => x[4] >= lo && x[4] <= hi);
  const gen = { der: 'masculino', das: 'neutro', die: 'femenino' };
  ps.forEach(x => {
    const full = x[1] + ' ' + x[2];
    const q1 = M.ty('Was ist das? Schreiben Sie das Wort mit Artikel.<br>' + pic(x[0]), [full], full + ' = ' + x[3] + ' (' + gen[x[1]] + '). Aprende cada sustantivo con su artículo.', 'Bilder');
    q1.de = true; q1.tr = '¿Qué es esto? Escribe la palabra con su artículo (der, das o die).'; q1.info = { de: full, es: x[3] }; out.push(q1);
    const q2 = M.mc('Was ist das?<br>' + pic(x[0]), full, sample(ps.filter(y => y[2] !== x[2]).map(y => y[1] + ' ' + y[2]), 2).concat([['der', 'das', 'die'].filter(a => a !== x[1])[0] + ' ' + x[2]]), full + ' = ' + x[3] + '. Ojo con el artículo: ' + x[1] + ' (' + gen[x[1]] + ').', 'Bilder');
    q2.de = true; q2.tr = '¿Qué es esto? Elige la palabra con el artículo correcto.'; q2.info = { de: full, es: x[3] }; out.push(q2);
  });
  ACTS.filter(a => perfAll || (a[4] >= lo && a[4] <= hi)).forEach(a => {
    const inRange = a[4] >= lo && a[4] <= hi;
    const s3 = actSent(a, 'Sie', 2), s3b = actSent(a, 'Lara', 2);
    const q1 = M.ty('Was macht Lara? Schreiben Sie einen Satz.<br>' + pic(a[0]), [s3, s3b], 'Lara = sie → ' + s3 + '. «' + actInf(a) + '» = ' + a[3] + '. ' + conjWhy(a[1], 2), 'Aktivitäten');
    q1.de = true; q1.tr = '¿Qué hace Lara? Escribe una oración (Sie ... / Lara ...).'; q1.info = { de: s3b + '.', es: '' }; if (inRange) out.push(q1);
    const q2 = M.mc('Was macht Tim gern?<br>' + pic(a[0]), 'Er ' + conj(a[1])[2].split(' ')[0] + ' gern ' + [a[2], conj(a[1])[2].split(' ')[1] || ''].filter(Boolean).join(' '),
      sample(ACTS.filter(b => b[0] !== a[0] && b[1] + b[2] !== a[1] + a[2]), 3).map(b => 'Er ' + conj(b[1])[2].split(' ')[0] + ' gern ' + [b[2], conj(b[1])[2].split(' ')[1] || ''].filter(Boolean).join(' ')),
      '«' + actInf(a) + '» = ' + a[3] + '. Tim = er → ' + conj(a[1])[2] + '. «gern» va después del verbo.', 'Aktivitäten');
    q2.de = true; q2.tr = '¿Qué le gusta hacer a Tim?'; if (inRange) out.push(q2);
    const q3 = M.ty('Was machen Sie gern? Antworten Sie mit «ich».<br>' + pic(a[0]), [actSent(a, 'Ich', 0).replace(/^Ich (\S+)/, 'Ich $1 gern'), actSent(a, 'Ich', 0)],
      'Con ich el verbo termina en -e: ' + actSent(a, 'Ich', 0) + '. Con gern: ' + actSent(a, 'Ich', 0).replace(/^Ich (\S+)/, 'Ich $1 gern') + '.', 'Aktivitäten');
    q3.de = true; q3.tr = '¿Qué te gusta hacer? Responde con «ich» (por ejemplo: Ich ... gern ...).'; if (inRange) out.push(q3);
    // Perfekt con imágenes (solo desde la lección 7 o en el repaso general)
    if (hi >= 7 && typeof partOf === 'function' && partOf(a[1])) {
      const pt = partOf(a[1]); const aux = pt[1] === 'sein' ? 'ist' : 'hat';
      const ans = ['Er', aux, a[2], pt[0]].filter(Boolean).join(' ');
      const q4 = M.ty('Was hat Tim gestern gemacht? Schreiben Sie im Perfekt.<br>' + pic(a[0]), [ans, ans.replace(/^Er/, 'Tim'), 'Gestern ' + aux + ' er ' + [a[2], pt[0]].filter(Boolean).join(' '), 'Gestern ' + aux + ' Tim ' + [a[2], pt[0]].filter(Boolean).join(' ')],
        'Perfekt: ' + aux + ' (de ' + pt[1] + ') + participio al final: ' + ans + '.' + (pt[1] === 'sein' ? ' ' + a[1] + ' usa sein (movimiento).' : ''), 'Perfekt');
      q4.de = true; q4.tr = '¿Qué hizo Tim ayer? Escribe en Perfekt (Er hat/ist ... + participio).'; q4.info = { de: ans + '.', es: '' }; out.push(q4);
    }
  });
  if (lo <= 5 && hi >= 5) CLOCKS.forEach(([h, m]) => {
    const p = priv(h, m);
    const q = M.ty('Wie spät ist es? (privat)<br><span class="pic clockwrap">' + clockSvg(h, m) + '</span>', [p, 'Es ist ' + p], privWhy(h, m), 'Uhrzeit');
    q.de = true; q.tr = '¿Qué hora es? Escríbela de forma informal (halb, Viertel, nach, vor).'; q.info = { de: 'Es ist ' + p + '.', es: '' }; out.push(q);
  });
  return out;
}
const BILD_LEVELS = [
  { id: 'bild13', group: 'Lección 3', exam: 1, icon: '🖼️', title: 'Bilder: Was ist das? (Lektion 1–3)', sub: 'Personas, comida y bebida con imágenes', cats: [], gen: () => genBilder(1, 3) },
  { id: 'bild46', group: 'Lección 6', exam: 2, icon: '🖼️', title: 'Bilder: Wohnung, Tag, Freizeit (Lektion 4–6)', sub: 'Muebles, relojes, clima y actividades', cats: [], gen: () => genBilder(4, 6) },
  { id: 'bild7', group: 'Lección 7', exam: 3, icon: '🖼️', title: 'Bilder: Hobbys und Perfekt (Lektion 7)', sub: 'Gitarre spielen, malen, fotografieren... y en Perfekt', cats: [], gen: () => genBilder(7, 7, true) }
];
const bildLesson = (lo, hi) => () => box('Aprender con imágenes', '<p>Mira la imagen y escribe la palabra <b>con su artículo</b>, o la actividad en una oración. Toca 🌐 Übersetzen si no entiendes la consigna.</p>') +
  '<div class="picgrid">' + PICS.filter(x => x[4] >= lo && x[4] <= hi).map(x => '<div class="picitem">' + pic(x[0]) + '<b>' + A(x[1], x[2]) + '</b><small>' + x[3] + '</small></div>').join('') + '</div>' +
  '<h4>Actividades</h4><div class="picgrid">' + ACTS.filter(a => a[4] >= lo && a[4] <= hi).map(a => '<div class="picitem">' + pic(a[0]) + '<b>' + actInf(a) + '</b><small>' + a[3] + '</small></div>').join('') + '</div>';
LESSONS.bild13 = bildLesson(1, 3); LESSONS.bild46 = bildLesson(4, 6); LESSONS.bild7 = bildLesson(7, 7);

/* ejercicios con imágenes para el Arbeitsbuch-Training y los tests (sección Wörter) */
(function () {
  for (let l = 1; l <= 7; l++) {
    const ps = PICS.filter(x => x[4] === l);
    for (let i = 0; i < ps.length; i += 4) {
      if (ps.length - i < 3) break;
      X(l, 'W', 'Was ist das? Schreiben Sie das Wort mit Artikel.', '¿Qué es? Escribe cada palabra con su artículo.', 'Los sustantivos se aprenden con artículo: ' + ps.slice(i, i + 4).map(x => x[1] + ' ' + x[2] + ' (' + x[3] + ')').join(', ') + '.',
        ps.slice(i, i + 4).map(x => '{{' + x[0] + '}} → [[' + x[1] + ' ' + x[2] + ']]'));
    }
    const as = ACTS.filter(a => a[4] === l);
    for (let i = 0; i + 3 <= as.length; i += 3) {
      X(l, 'W', 'Was macht Lara? Ergänzen Sie den Satz.', '¿Qué hace Lara? Completa cada oración.', 'Actividades: ' + as.slice(i, i + 3).map(a => actInf(a) + ' = ' + a[3]).join(', ') + '. Con Lara (sie) el verbo lleva -t; los separables llevan el prefijo al final.',
        as.slice(i, i + 3).map(a => '{{' + a[0] + '}} → Lara [[' + actSent(a, '', 2).trim() + ']].'));
      if (l === 7) {
        X(l, 'G', 'Was hat Tim gestern gemacht? Ergänzen Sie das Perfekt.', '¿Qué hizo Tim ayer? Completa el Perfekt.', 'Perfekt: hat/ist + participio al final.',
          as.slice(i, i + 3).filter(a => partOf(a[1])).map(a => { const pt = partOf(a[1]); return '{{' + a[0] + '}} → Tim [[' + (pt[1] === 'sein' ? 'ist' : 'hat') + ']] ' + (a[2] ? a[2] + ' ' : '') + '[[' + pt[0] + ']].'; }));
      }
    }
    if (l === 5) {
      [[0, 4], [4, 8], [8, 12]].forEach(([a, b]) => X(5, 'G', 'Wie spät ist es? Schreiben Sie die Uhrzeit (privat).', '¿Qué hora es? Escribe la hora de forma informal.', 'halb = media hacia la hora siguiente; Viertel nach / vor; nach = pasadas; vor = para.',
        CLOCKS.slice(a, b).map(([h, m]) => '{{clock:' + h + ':' + m + '}} → Es ist [[' + priv(h, m) + ']].')));
    }
  }
  // actividades de la lección 6 también en la 7 (repaso con las palabras que más cuestan)
  X(7, 'W', 'Was machen die Leute gern? Ergänzen Sie.', '¿Qué les gusta hacer? Completa.', 'Gitarre spielen, malen, fotografieren, singen, Ski fahren: el verbo concuerda con la persona.', [
    '{{🎸}} Ich [[spiele]] gern Gitarre.', '{{🎨}} Du [[malst]] sehr schön.', '{{📷}} Paula [[fotografiert]] gern Blumen.', '{{🎤}} Wir [[singen]] im Chor.', '{{⛷️}} Fahrt ihr gern Ski? – Ja, wir [[fahren]] sehr gern Ski.']);
})();
