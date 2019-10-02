export default class SpeechSynthesis {
  constructor(props) {
    this.utterance = new window.SpeechSynthesisUtterance();
    this.selected = SpeechSynthesis.getVoice(props.voice);
    this.utterance.voice = this.selected;
    this.utterance.text = props.text.replace(/\n/g, '');
    this.utterance.lang = props.lang || 'en-GB';
    this.utterance.pitch = parseFloat(props.pitch, 10) || 0.8;
    this.utterance.rate = parseFloat(props.rate, 10) || 1;
    this.utterance.volume = parseFloat(props.volume, 10) || 1;
  }

  static supported(selected) {
    return window.speechSynthesis;
  }

  static getVoice(selected) {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.name === selected);
    return voice !== undefined ? voice : voices[0];
  }

  onend(func) {
    this.utterance.onend = func;
  }

  onerror(func) {
    this.utterance.onerror = func;
  }

  speak() {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utterance);
  }

  pause() {
    window.speechSynthesis.pause();
  }

  cancel() {
    window.speechSynthesis.cancel();
  }

  resume() {
    window.speechSynthesis.resume();
  }
}
