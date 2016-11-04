let React = require('react');
let TestUtils = require('react-addons-test-utils');
let expect = require('chai').expect;
let Speech = require('../src/speech');

let style = {
  play: { button: { color: 'black', backgroundColor: 'yellow' } },
  stop: { button: { backgroundColor: 'yellow' } }
};

describe('Speech', () => {

  before(() =>{
    require('./setup');
    require('./mockSpeechSynthesis')();
  });

  describe('Speech on load', () => {
    let component;
    let speech;

    before(() =>{
      let html = <Speech text="hello"></Speech>
      speech = TestUtils.renderIntoDocument(html);
      component = TestUtils.findRenderedComponentWithType(speech, Speech);
    });

    it('should render component', () => {
      expect(TestUtils.isElementOfType(component), Speech);
    });

    it('should contain default text', () => {
      expect(component.props.text).to.equal('hello');
    });

    it('should have play button in correct state', () => {
      expect(component.state.styles.play.button.pointerEvents).to.equal('all');
    });

    it('should have stop button in correct state', () => {
      expect(component.state.styles.stop.button.pointerEvents).to.equal('none');
    });

    it('should have pause button in correct state', () => {
      expect(component.state.styles.pause.button.pointerEvents).to.equal('none');
    });

    it('should have resume button in correct state', () => {
      expect(component.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on load with autostart', () => {
    let component;
    let speech;

    before(() =>{
      let html = <Speech text="hello" autostart={true}></Speech>
      speech = TestUtils.renderIntoDocument(html);
      component = TestUtils.findRenderedComponentWithType(speech, Speech);
    });

    it('should have play button in correct state', () => {
      expect(component.state.styles.play.button.pointerEvents).to.equal('none');
    });

    it('should have stop button in correct state', () => {
      expect(component.state.styles.stop.button.pointerEvents).to.equal('all');
    });

    it('should have pause button in correct state', () => {
      expect(component.state.styles.pause.button.pointerEvents).to.equal('all');
    });

    it('should have resume button in correct state', () => {
      expect(component.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on load with properties', () => {
    let component;
    let speech;

    before(() =>{
      let html = <Speech style={style} text="Hello" pitch='0.8' rate='0.1' volume='0.1' lang='en-US' voice='other'></Speech>
      speech = TestUtils.renderIntoDocument(html);
      component = TestUtils.findRenderedComponentWithType(speech, Speech);
    });

    it('should render component', () => {
      expect(TestUtils.isElementOfType(component), Speech);
    });

    it('should contain default voice', () => {
      expect(component.props.voice).to.equal('other');
    });

    it('should contain default text', () => {
      expect(component.props.text).to.equal('Hello');
    });

    it('should contain default lang', () => {
      expect(component.props.lang ).to.equal('en-US');
    });

    it('should contain default pitch', () => {
      expect(component.props.pitch).to.equal('0.8');
    });

    it('should contain default rate', () => {
      expect(component.props.rate).to.equal('0.1');
    });

    it('should contain default volume', () => {
      expect(component.props.volume).to.equal('0.1');
    });

    it('should have play button in correct state', () => {
      expect(component.state.styles.play.button.pointerEvents).to.equal('all');
    });

    it('should have stop button in correct state', () => {
      expect(component.state.styles.stop.button.pointerEvents).to.equal('none');
    });

    it('should have pause button in correct state', () => {
      expect(component.state.styles.pause.button.pointerEvents).to.equal('none');
    });

    it('should have resume button in correct state', () => {
      expect(component.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on click play', () => {
    let component;
    let speech;

    before(() =>{
      speech = TestUtils.renderIntoDocument(<Speech text="hello"></Speech>);
      component = TestUtils.scryRenderedDOMComponentsWithTag(speech, 'button');
      let input1 = component[0];
      TestUtils.SimulateNative.click(input1);
    });

    it('should contain default voiceURI', () => {
      expect(speech.speechSynthesis.utterance.voiceURI).to.equal('Fiona');
    });

    it('should contain default voice', () => {
      expect(speech.speechSynthesis.utterance.voice).to.equal('Fiona');
    });

    it('should contain default text', () => {
      expect(speech.speechSynthesis.utterance.text).to.equal('hello');
    });

    it('should contain default lang', () => {
      expect(speech.speechSynthesis.utterance.lang ).to.equal('en-GB');
    });

    it('should contain default pitch', () => {
      expect(speech.speechSynthesis.utterance.pitch).to.equal(0.8);
    });

    it('should contain default rate', () => {
      expect(speech.speechSynthesis.utterance.rate).to.equal(1);
    });

    it('should contain default volume', () => {
      expect(speech.speechSynthesis.utterance.volume).to.equal(1);
    });

    it('should have play button in correct state', () => {
      expect(speech.state.styles.play.button.pointerEvents).to.equal('none');
    });

    it('should have stop button in correct state', () => {
      expect(speech.state.styles.stop.button.pointerEvents).to.equal('all');
    });

    it('should have pause button in correct state', () => {
      expect(speech.state.styles.pause.button.pointerEvents).to.equal('all');
    });

    it('should have resume button in correct state', () => {
      expect(speech.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on click play then stop', () => {
    let component;
    let speech;

    before(() =>{
      speech = TestUtils.renderIntoDocument(<Speech text="hello" stop={true}></Speech>);
      component = TestUtils.scryRenderedDOMComponentsWithTag(speech, 'button');
      let input1 = component[0];
      TestUtils.SimulateNative.click(input1);
      let input2 = component[1];
      TestUtils.SimulateNative.click(input2);
    });

    it('should have play button in correct state', () => {
      expect(speech.state.styles.play.button.pointerEvents).to.equal('all');
    });

    it('should have stop button in correct state', () => {
      expect(speech.state.styles.stop.button.pointerEvents).to.equal('none');
    });

    it('should have pause button in correct state', () => {
      expect(speech.state.styles.pause.button.pointerEvents).to.equal('none');
    });

    it('should have resume button in correct state', () => {
      expect(speech.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on click play then pause', () => {
    let component;
    let speech;

    before(() =>{
      speech = TestUtils.renderIntoDocument(<Speech text="hello" pause={true}></Speech>);
      component = TestUtils.scryRenderedDOMComponentsWithTag(speech, 'button');
      let input1 = component[0];
      TestUtils.SimulateNative.click(input1);
      let input2 = component[1];
      TestUtils.SimulateNative.click(input2);
    });

    it('should have play button in correct state', () => {
      expect(speech.state.styles.play.button.pointerEvents).to.equal('none');
    });

    it('should have stop button in correct state', () => {
      expect(speech.state.styles.stop.button.pointerEvents).to.equal('all');
    });

    it('should have pause button in correct state', () => {
      expect(speech.state.styles.pause.button.pointerEvents).to.equal('none');
    });

    it('should have resume button in correct state', () => {
      expect(speech.state.styles.resume.button.pointerEvents).to.equal('all');
    });
  });

  describe('Speech on click play then pause then resume', () => {
    let component;
    let speech;

    before(() =>{
      speech = TestUtils.renderIntoDocument(<Speech text="hello" pause={true} resume={true}></Speech>);
      component = TestUtils.scryRenderedDOMComponentsWithTag(speech, 'button');
      let input1 = component[0];
      TestUtils.SimulateNative.click(input1);
      let input2 = component[1];
      TestUtils.SimulateNative.click(input2);
      let input3 = component[2];
      TestUtils.SimulateNative.click(input3);
    });

    it('should have play button in correct state', () => {
      expect(speech.state.styles.play.button.pointerEvents).to.equal('none');
    });

    it('should have stop button in correct state', () => {
      expect(speech.state.styles.stop.button.pointerEvents).to.equal('all');
    });

    it('should have pause button in correct state', () => {
      expect(speech.state.styles.pause.button.pointerEvents).to.equal('all');
    });

    it('should have resume button in correct state', () => {
      expect(speech.state.styles.resume.button.pointerEvents).to.equal('none');
    });
  });

  describe('Speech on load with no speechSynthesis', () => {
    let component;
    let speech;

    before(() =>{
      global.window.speechSynthesis = null;
      let html = <Speech text="hello"></Speech>
      speech = TestUtils.renderIntoDocument(html);
      component = TestUtils.findRenderedComponentWithType(speech, Speech);
    });

    it('should render component', () => {
      expect(TestUtils.isElementOfType(component), Speech);
    });

    it('should display text', () => {
      expect(component.props.text).to.equal('hello');
    });
  });
});
