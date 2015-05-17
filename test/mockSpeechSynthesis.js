

module.exports = function() {
  var speechSynthesis = {
    speaking: false,
    paused: false
  };

  speechSynthesis.getVoices = function() {
    return [{ name: "Google UK English Male" }, { name: "Google UK English Female" }];
  };

  speechSynthesis.speak = function() {
    this.speaking = true;
    return;
  };

  speechSynthesis.cancel = function() {
    this.speaking = false;
    return;
  };

  speechSynthesis.pause = function() {
    this.paused = true;
    return;
  };

  speechSynthesis.resume = function() {
    this.paused = false;
    return;
  };

  global.window.speechSynthesis = speechSynthesis;


  global.window.SpeechSynthesisUtterance = function() { return {}; };
}
