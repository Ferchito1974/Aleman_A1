/* v3.2: presentación del quiz en alemán.
   - deView(q): consigna en alemán + traducción al español (para el botón «Übersetzen») + palabras clave.
   - Las preguntas nuevas (q.de) ya vienen en alemán; las antiguas se presentan en alemán con plantillas.
   - No cambia los datos ni los ids de las preguntas: solo cómo se muestran. */
'use strict';

const deMode = () => !store.set || store.set.de !== false; // activado por defecto

/* etiquetas del quiz en alemán */
const TAG_DE = {
  'Conjugación': 'Konjugation', 'Vocabulario': 'Wortschatz', 'Frases': 'Sätze', 'Artículo': 'Artikel', 'Artículos': 'Artikel', 'Plural': 'Plural',
  'Escritura': 'Schreiben', 'Estructura': 'Satzbau', 'Hora': 'Uhrzeit', 'Lectura': 'Lesen', 'Verbos': 'Verben', 'Pronombres': 'Pronomen',
  'Números': 'Zahlen', 'Adjetivos': 'Adjektive', 'Colores': 'Farben', 'Anuncios': 'Anzeigen', 'Horarios': 'Öffnungszeiten', 'Participio': 'Partizip',
  'haben o sein': 'haben oder sein', 'Experiencias': 'Erfahrungen', 'Frecuencia': 'Wie oft?', 'Tiempo': 'Zeit', 'Cursos': 'Kurse', 'Cómic': 'Comic',
  'Lugares': 'Orte', 'Película': 'Film', 'Actividades': 'Aktivitäten', 'Vocabulario en contexto': 'Wörter im Satz', 'Separables': 'Trennbare Verben',
  'Irregulares': 'Unregelmäßige Verben', 'Frases con können': 'Sätze mit können', 'Frases con wollen': 'Sätze mit wollen', 'Verbos de la maestra': 'Verben',
  'Gefallen': 'gefallen', 'kein / keine': 'kein / keine', 'nicht / kein': 'nicht oder kein', 'der / den': 'der oder den', 'ja / nein / doch': 'ja / nein / doch',
  'Artículo definido': 'Bestimmter Artikel', 'Arbeitsbuch': 'Arbeitsbuch', 'Schreiben': 'Schreiben', 'Lesen': 'Lesen', 'Posesivos': 'Possessivartikel', 'Mis preguntas': 'Meine Fragen'
};
const tagDe = t => (deMode() && TAG_DE[t]) || t;

/* plantillas: consigna antigua en español → alemán */
const Q_TPL = [
  [/^¿Qué artículo lleva «(.+?)»\?$/, m => 'Welcher Artikel passt? <b>___ ' + m[1] + '</b>'],
  [/^¿Qué significa «(.+?)»\?$/, m => 'Was bedeutet <b>«' + m[1] + '»</b> auf Spanisch?'],
  [/^¿Cómo se dice «(.+?)» en alemán\?$/, m => 'Wie sagt man auf Deutsch: «' + m[1] + '»?'],
  [/^¿Cómo se dice en alemán: «(.+?)»\?$/, m => 'Wie sagt man auf Deutsch: «' + m[1] + '»?'],
  [/^Escribe en alemán con artículo: «(.+?)»$/, m => 'Schreib auf Deutsch (mit Artikel): «' + m[1] + '»'],
  [/^Escribe en alemán: «(.+?)»$/, m => 'Schreib auf Deutsch: «' + m[1] + '»'],
  [/^Plural de «(.+?)»: die ___$/, m => 'Wie heißt der Plural? <b>' + m[1] + '</b> → die ___'],
  [/^Conjuga: <b>(.+?)<\/b> \+ <b>(.+?)<\/b>.*$/, m => 'Konjugiere: <b>' + m[1] + '</b> + <b>' + m[2] + '</b>'],
  [/^¿Cómo se dice <b>(.+?)<\/b> en el lenguaje cotidiano \(privat\)\?$/, m => 'Wie spät ist es? <b>' + m[1] + '</b> (privat, im Alltag)'],
  [/^¿Qué hora es\? «Es ist <b>(.+?)<\/b>»$/, m => 'Wie viel Uhr ist das? «Es ist <b>' + m[1] + '</b>»'],
  [/^Escribe en alemán \(cotidiano\) la hora <b>(.+?)<\/b>.*$/, m => 'Schreib die Uhrzeit <b>' + m[1] + '</b> auf Deutsch (privat).'],
  [/^Hora oficial .*?<b>(.+?)<\/b>\?$/, m => 'Offizielle Uhrzeit (Radio, Bahnhof): Wie sagt man <b>' + m[1] + '</b>?'],
  [/^Participio \(Partizip II\) de «(.+?)» \(.+\):$/, m => 'Wie heißt das Partizip von <b>«' + m[1] + '»</b>?'],
  [/^¿Cuál es el participio de «(.+?)»\?$/, m => 'Wie heißt das Partizip von <b>«' + m[1] + '»</b>?'],
  [/^Infinitivo en alemán de «(.+?)»$/, m => 'Wie heißt das Verb auf Deutsch (Infinitiv)? «' + m[1] + '»'],
  [/^Traduce con «kein»: «(.+?)»$/, m => 'Übersetze mit «kein»: «' + m[1] + '»'],
  [/^Niega la frase: «(.+?)»$/, m => 'Verneine den Satz: <b>' + m[1] + '</b>'],
  [/^Completa: «(.+?)»(.*)$/, m => 'Ergänze: <b>' + m[1] + '</b>' + m[2].replace(/\(([a-zäöüß]+)\)/i, '<small>($1)</small>')],
  [/^Completa con el infinitivo al final: «(.+?)»(.*)$/, m => 'Ergänze das Verb am Ende: <b>' + m[1] + '</b>'],
  [/^(.*___.*)\((no es un\/una|no tengo|un\/una|artículo definido[^)]*|pronombre|nicht o kein-|haben, Perfekt|wollen|können|sein|machen|telefonieren|schreiben|kochen|spielen|arbeiten|fernsehen|einkaufen)([^)]*)\)$/,
    m => '<b>' + m[1].trim() + '</b> <small>(' + ({ 'no es un/una': 'nicht ein/eine → ?', 'no tengo': 'ich habe nicht …', 'un/una': 'ein/eine', 'pronombre': 'Pronomen', 'nicht o kein-': 'nicht oder kein?', 'haben, Perfekt': 'haben, Perfekt' }[m[2]] || m[2].replace(/^artículo definido.*/, 'bestimmter Artikel')) + ')</small>'],
  [/^Pregunta positiva: «(.+?)» Respondes que SÍ:$/, m => '<b>' + m[1] + '</b> Du antwortest positiv:'],
  [/^Pregunta positiva: «(.+?)» Respondes que NO:$/, m => '<b>' + m[1] + '</b> Du antwortest negativ:'],
  [/^Pregunta negativa: «(.+?)» Quieres decir que SÍ \(contradices\):$/, m => '<b>' + m[1] + '</b> Du willst «ja» sagen (widersprechen):'],
  [/^Pregunta negativa: «(.+?)» Confirmas que NO:$/, m => '<b>' + m[1] + '</b> Du bestätigst «nein»:'],
  [/^«(.+?)» Responde que sí, con una sola palabra:$/, m => '<b>' + m[1] + '</b> Antworte mit einem Wort: «ja»!'],
  [/^Walter ___ (.+?)\. ¿hat o ist\?$/, m => 'Walter ___ ' + m[1] + '. <b>hat</b> oder <b>ist</b>?'],
  [/^¿Cuál está bien\?$/, () => 'Welcher Satz ist richtig?'],
  [/^¿Qué frase está bien ordenada\?$/, () => 'Welcher Satz hat die richtige Wortstellung?'],
  [/^¿Cuál frase está bien ordenada\?$/, () => 'Welcher Satz hat die richtige Wortstellung?']
];

/* diccionario para el glosario (alemán → español) */
let _DICT = null;
function deDict() {
  if (_DICT) return _DICT;
  const d = new Map();
  const put = (k, v) => { k = String(k).toLowerCase().trim(); if (k && v && !d.has(k)) d.set(k, v); };
  VERBS.forEach(v => { put(v[0], v[1]); try { conj(v[0]).forEach(f => put(f.split(' ')[0], v[1] + ' (' + v[0] + ')')); } catch (e) { /* ignorar */ } });
  if (typeof PART !== 'undefined') PART.forEach(p => put(p[1], 'participio de ' + p[0] + ' (' + p[3] + ')'));
  if (typeof WL_ALL !== 'undefined') WL_ALL.forEach(e => { put(e.w.replace(/[-.]+$/, ''), e.es); if (e.pl && !/^(Sg|Pl)$/.test(e.pl)) put(e.pl, e.es + ' (plural)'); });
  Object.values(CATS).forEach(c => c.items.forEach(n => put(n.w, n.es)));
  [['ich', 'yo'], ['du', 'tú'], ['er', 'él'], ['es', 'ello / eso'], ['wir', 'nosotros'], ['ihr', 'ustedes'], ['mit', 'con'], ['am', 'el (día)'], ['um', 'a las (hora)'], ['im', 'en el'], ['ins', 'al / a la'],
    ['den', 'el (acusativo)'], ['dem', 'el (dativo)'], ['einen', 'un (acusativo)'], ['eine', 'una'], ['nach', 'a / hacia / después'], ['gern', 'con gusto'], ['heute', 'hoy'], ['morgen', 'mañana'],
    ['gestern', 'ayer'], ['schreib', 'escribe'], ['ergänze', 'completa'], ['beginne', 'empieza'], ['satz', 'frase'], ['form', 'forma'], ['richtigen', 'correcta'], ['passt', 'encaja'], ['welche', 'cuál'],
    ['antwort', 'respuesta'], ['frage', 'pregunta'], ['was', 'qué'], ['sagst', 'dices (sagen)'], ['mach', 'haz'], ['konjugiere', 'conjuga'], ['trenne', 'separa'], ['kommas', 'comas']].forEach(x => put(x[0], x[1]));
  _DICT = d; return d;
}
function glossary(html, extra) {
  const txt = String(html || '').replace(/<[^>]+>/g, ' ');
  const d = deDict(); const seen = new Set(); const out = [];
  (extra || []).forEach(k => { if (k && k[0] && !seen.has(k[0].toLowerCase())) { seen.add(k[0].toLowerCase()); out.push(k); } });
  (txt.match(/[A-Za-zÄÖÜäöüß]+/g) || []).forEach(w => {
    const k = w.toLowerCase(); if (k.length < 3 || seen.has(k) || /^(der|die|das|und|ein|ist|sind|auf|aus|von|zu|ja|nein|oder|nicht)$/.test(k)) return;
    const v = d.get(k); if (v) { seen.add(k); out.push([w, v]); }
  });
  return out.slice(0, 10);
}

/* consigna, traducción y palabras clave de una pregunta */
function deView(q) {
  if (q.kind === 'build') {
    return { html: 'Bring die Wörter in die richtige Reihenfolge.', tr: 'Ordena las palabras para decir: «' + q.es + '»', kw: glossary(q.tokens.join(' ')) };
  }
  if (q.kind === 'free') return { html: q.q, tr: q.tr || '', kw: glossary(q.q) };
  if (q.kind === 'cloze') return { html: q.q, tr: q.tr || '', kw: glossary(q.q + ' ' + q.plain) };
  if (q.de) return { html: q.q, tr: q.tr || '', kw: glossary(q.q, q.kw) };
  for (const [rx, f] of Q_TPL) {
    const m = rx.exec(q.q);
    if (m) return { html: f(m), tr: q.q.replace(/<[^>]+>/g, ''), kw: glossary(q.q) };
  }
  return { html: q.q, tr: '', kw: glossary(q.q) };
}

/* bloque de traducción que se abre con «Übersetzen» */
function trBlock(v) {
  if (!v.tr && !v.kw.length) return '';
  return '<div class="trbox" id="trbox">' + (v.tr ? '<p><span class="trlab">Español:</span> ' + esc(v.tr) + '</p>' : '') +
    (v.kw.length ? '<p class="trlab">Palabras clave</p><ul class="kw">' + v.kw.map(k => '<li><b>' + esc(k[0]) + '</b> <span>= ' + esc(k[1]) + '</span></li>').join('') + '</ul>' : '') + '</div>';
}

/* repasos mezclados: más verbos, menos «qué significa» */
const isSimpleMeaning = q => /^¿(Qué significa|Cómo se dice)/.test(q.q || '');
const VERB_TAGS = /^(Conjugación|Verbos|Perfekt|Participio|Modalverben|Satzbau|Situationen|können|wollen|haben o sein|Perfekt con sein|Separables|Irregulares|Estructura|Verbos de la maestra|Frases con können|Frases con wollen)$/;
const isVerbish = q => (q.kind === 'cloze' ? q.sec === 'G' : (q.de || q.kind === 'build' || VERB_TAGS.test(q.tag || '')));
function pickBalanced(list, n) {
  const verb = list.filter(isVerbish), simple = list.filter(q => !isVerbish(q) && isSimpleMeaning(q)), other = list.filter(q => !isVerbish(q) && !isSimpleMeaning(q));
  const nv = Math.min(verb.length, Math.round(n * 0.4)), ns = Math.min(simple.length, Math.round(n * 0.15));
  let chosen = pick(verb, nv).concat(pick(simple, ns));
  chosen = chosen.concat(pick(other, Math.min(other.length, n - chosen.length)));
  if (chosen.length < n) { const ids = new Set(chosen.map(q => q.id)); chosen = chosen.concat(pick(list.filter(q => !ids.has(q.id)), n - chosen.length)); }
  return shuffle(chosen.slice(0, n));
}
