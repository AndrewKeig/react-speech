import React from 'react';
import Speech from '../src/speech';
import renderer from 'react-test-renderer';

describe('Speech', () => {
  describe('Speech on load with no speech synthesis support', () => {
    it('should render component as text', () => {
      const tree = renderer.create(<Speech text="hello" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Speech on load', () => {
    beforeEach(() => {
      require('./setup');
      require('./mockSpeechSynthesis')();
    });

    it('should render component as default button', () => {
      const tree = renderer.create(<Speech text="hello" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Speech with text as button', () => {
    beforeEach(() => {
      require('./setup');
      require('./mockSpeechSynthesis')();
    });

    it('should render component as default button', () => {
      const tree = renderer
        .create(<Speech text="hello" textAsButton={true} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Speech with stop, pause and resume button', () => {
    beforeEach(() => {
      require('./setup');
      require('./mockSpeechSynthesis')();
    });

    it('should render component as default button', () => {
      const tree = renderer
        .create(<Speech text="hello" stop={true} pause={true} resume={true} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Speech on load with all settings', () => {
    beforeEach(() => {
      require('./setup');
      require('./mockSpeechSynthesis')();
    });

    it('should render component with all props', () => {
      const tree = renderer
        .create(
          <Speech
            text="hello"
            pitch="1"
            rate="1"
            volume="1"
            lang="en-GB"
            voice="Google UK English Male"
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
