
var SpeechSynthesis = function(props){
  this.utterance = new window.SpeechSynthesisUtterance();
  this.selected = SpeechSynthesis.getVoice(props.voice);
  this.utterance.voice = this.selected[0] || 'Fiona';
  this.utterance.voiceURI = 'Fiona';
  this.utterance.text = props.text.replace(/\n/g, '');
  this.utterance.lang = props.lang || 'en-GB';
  this.utterance.pitch = parseFloat(props.pitch, 10) || 0.8;
  this.utterance.rate = parseFloat(props.rate, 10) || 1;
  this.utterance.volume = parseFloat(props.volume, 10) || 1;
};

SpeechSynthesis.supported = function(selected) {
  return window.speechSynthesis;
};

SpeechSynthesis.getVoice = function(selected) {
  return window.speechSynthesis.getVoices().filter(function(voice) {
    return voice.name === selected;
  });
};

SpeechSynthesis.prototype.onend = function(func) {
  this.utterance.onend = func;
};

SpeechSynthesis.prototype.onerror = function(func) {
  this.utterance.onerror = func;
};

SpeechSynthesis.prototype.speak = function() {
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(this.utterance);
};

SpeechSynthesis.prototype.pause = function() {
  window.speechSynthesis.pause();
};

SpeechSynthesis.prototype.cancel = function() {
  window.speechSynthesis.cancel();
};

SpeechSynthesis.prototype.resume = function() {
  window.speechSynthesis.resume();
};

module.exports = SpeechSynthesis;
