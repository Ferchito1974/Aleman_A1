/* v3: audio con voz alemana grabada (Piper «thorsten», licencia CC0), sin depender de las voces de Windows o del teléfono.
   speak(texto) reproduce audio/<hash>.mp3 si existe (lista en audio/manifest.js).
   Si no hay archivo, usa la voz del dispositivo SOLO si es alemana; nunca lee alemán con la voz en español. */
'use strict';

const audioKey = t => String(t || '').replace(/\s+/g, ' ').trim();
const audioHash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
const _speakDevice = speak; // la versión original de pron.js (speechSynthesis)
let _player = null;

function hasAudioFile(text) { return typeof AUDIO_FILES !== 'undefined' && AUDIO_FILES.has(audioHash(audioKey(text))); }
function germanVoice() { return (_voice && /^de/i.test(_voice.lang)) ? _voice : pickVoice(); }

speak = function (text) { // eslint-disable-line no-func-assign
  const key = audioKey(text);
  if (hasAudioFile(key)) {
    try {
      if (canSpeakDevice()) window.speechSynthesis.cancel();
      if (_player) { _player.pause(); }
      _player = new Audio('audio/' + audioHash(key) + '.mp3');
      const p = _player.play();
      if (p && p.catch) p.catch(() => { if (germanVoice()) _speakDevice(text); });
      return true;
    } catch (e) { /* sigue con la voz del dispositivo */ }
  }
  if (canSpeakDevice() && germanVoice()) return _speakDevice(text);
  return false;
};
function canSpeakDevice() { return typeof window !== 'undefined' && 'speechSynthesis' in window; }
canSpeak = function () { return typeof Audio !== 'undefined' || canSpeakDevice(); }; // eslint-disable-line no-func-assign
