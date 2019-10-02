import SpeechSynthesis from '../src/speechSynthesis';

describe('Speech Synthesis', () => {
  beforeEach(() => {
    require('./setup');
    require('./mockSpeechSynthesis')();
  });

  describe('Speech Synthesis instantiate', () => {
    let speechSynthesis;
    let props;

    beforeEach(() => {
      props = {
        text: 'Hello',
        pitch: '2',
        rate: '0.5',
        volume: '0.2',
        lang: 'en-GB',
        voice: 'Google UK English Male'
      };
      speechSynthesis = new SpeechSynthesis(props);
      setTimeout(() => {}, 2000);
    });

    it('should contain a text', () => {
      expect(speechSynthesis.utterance.text).toBe(props.text);
    });

    it('should contain a pitch', () => {
      expect(speechSynthesis.utterance.pitch).toBe(parseFloat(props.pitch));
    });

    it('should contain a rate', () => {
      expect(speechSynthesis.utterance.rate).toBe(parseFloat(props.rate));
    });

    it('should contain a volume', () => {
      expect(speechSynthesis.utterance.volume).toBe(parseFloat(props.volume));
    });

    it('should contain a lang', () => {
      expect(speechSynthesis.utterance.lang).toBe(props.lang);
    });

    it('should contain a voice', () => {
      // console.log('----', speechSynthesis.utterance)
      expect(speechSynthesis.utterance.voice.name).toBe(props.voice);
    });
  });

  describe('Speech Synthesis events', () => {
    let speechSynthesis;
    let props;

    beforeEach(() => {
      props = {
        text: 'Hello',
        pitch: '2',
        rate: '0.5',
        volume: '0.2',
        lang: 'en-GB',
        voice: 'Alex en-US'
      };

      speechSynthesis = new SpeechSynthesis(props);
    });

    it('should speak', () => {
      speechSynthesis.speak();
      expect(SpeechSynthesis.supported().speaking).toBe(true);
    });

    it('should stop speaking', () => {
      speechSynthesis.cancel();
      expect(SpeechSynthesis.supported().speaking).toBe(false);
    });

    it('should pause speaking', () => {
      speechSynthesis.pause();
      expect(SpeechSynthesis.supported().paused).toBe(true);
    });

    it('should resume speaking', () => {
      speechSynthesis.resume();
      expect(SpeechSynthesis.supported().paused).toBe(false);
    });
  });
});
