let React = require('react');
let TestUtils = require('react-addons-test-utils');
let expect = require('chai').expect;
let styles = require('../src/style.js');
let Button = require('../src/button.js');

describe('Button', () => {

  describe('Button on load', () => {
    let component;
    let button;

    before(() =>{
      let html = <Button styles={styles.play} onClick={() => {}} />
      button = TestUtils.renderIntoDocument(html);
      component = TestUtils.findRenderedDOMComponentWithTag(button, 'Button');
    });

    it('should render component', () => {
      expect(TestUtils.isDOMComponent(component)).to.equal(true);
    });

    it('should contain styles for button', () => {
      expect(button.props.styles.button).to.equal(styles.play.button);
    });

    it('should contain styles for active', () => {
      expect(button.props.styles.active).to.equal(styles.play.active);
    });

    it('should contain styles for hover', () => {
      expect(button.props.styles.hover).to.equal(styles.play.hover);
    });

    it('should contain styles for focus', () => {
      expect(button.props.styles.focus).to.equal(styles.play.focus);
    });

    it('should contain hover set to false', () => {
      expect(button.state.hover).to.equal(false);
    });

    it('should contain focus set to false', () => {
      expect(button.state.focus).to.equal(false);
    });
  });

  describe('Button on hover', () => {
    let component;
    let button;

    before(() =>{
      button = TestUtils.renderIntoDocument(
        <Button styles={styles.play} onClick={() => {}}>Play</Button>
      );

      component = TestUtils.findRenderedDOMComponentWithTag(button, 'Button');
    });

    it('should update hover state', () => {
      let input = component;
      TestUtils.SimulateNative.mouseOver(input);
      expect(button.state.hover).to.equal(true);
    });

    it('should update hover state when no longer hovering', () => {
      let input = component;
      TestUtils.SimulateNative.mouseOver(input);
      expect(button.state.hover).to.equal(true);
      TestUtils.SimulateNative.mouseOut(input);

      expect(button.state.hover).to.equal(false);
    });
  });
});
