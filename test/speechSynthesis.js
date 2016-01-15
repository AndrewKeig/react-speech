let expect = require('chai').expect;
let SpeechSynthesis = require('../src/speechSynthesis');

describe('Speech Synthesis', () => {

  before(() =>{
    require('./setup');
    require('./mockSpeechSynthesis')();
  });

  describe('Speech Synthesis instantiate', () => {
    let speechSynthesis;
    let props;

    before(() => {
      props = {
        text: "Hello",
        pitch: "2",
        rate: "0.5",
        volume: "0.2",
        lang: "en-GB",
        voice: "Google UK English Male",
      };

      speechSynthesis = new SpeechSynthesis(props);
    });

    it('should contain a text', () => {
      expect(speechSynthesis.utterance.text).to.equal(props.text);
    });

    it('should contain a pitch', () => {
      expect(speechSynthesis.utterance.pitch).to.equal(parseFloat(props.pitch));
    });

    it('should contain a rate', () => {
      expect(speechSynthesis.utterance.rate).to.equal(parseFloat(props.rate));
    });

    it('should contain a volume', () => {
      expect(speechSynthesis.utterance.volume).to.equal(parseFloat(props.volume));
    });

    it('should contain a lang', () => {
      expect(speechSynthesis.utterance.lang).to.equal(props.lang);
    });

    it('should contain a voice', () => {
      expect(speechSynthesis.utterance.voice.name).to.equal(props.voice);
    });
  });

  describe('Speech Synthesis events', () => {
    let speechSynthesis;
    let props;

    before(() => {
      props = {
        text: "Hello",
        pitch: "2",
        rate: "0.5",
        volume: "0.2",
        lang: "en-GB",
        voice: "Google UK English Male",
      };

      speechSynthesis = new SpeechSynthesis(props);
    });

    it('should speak', () => {
      speechSynthesis.speak();
      expect(SpeechSynthesis.supported().speaking).to.equal(true);
    });

    it('should stop speaking', () => {
      speechSynthesis.cancel();
      expect(SpeechSynthesis.supported().speaking).to.equal(false);
    });

    it('should pause speaking', () => {
      speechSynthesis.pause();
      expect(SpeechSynthesis.supported().paused).to.equal(true);
    });

    it('should resume speaking', () => {
      speechSynthesis.resume();
      expect(SpeechSynthesis.supported().paused).to.equal(false);
    });
  });
});
