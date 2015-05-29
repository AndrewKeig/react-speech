var assign = require('object-assign');
var React = require('react');
var Button = require('./button');
var style = require('./style');
var SpeechSynthesis = require('./speechSynthesis');

var Speech = React.createClass({
  displayName: 'react-speech',

  propTypes: {
    styles: React.PropTypes.object,
    autostart: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
    pitch: React.PropTypes.string,
    rate: React.PropTypes.string,
    volume: React.PropTypes.string,
    lang: React.PropTypes.string,
    voiceURI: React.PropTypes.string,
    voice: React.PropTypes.string,
    textAsButton: React.PropTypes.bool
  },

  getInitialState: function(props){
    props = props || this.props;
    return props;
  },

  componentWillMount: function() {
    this.setState(this.getState());
  },

  componentDidMount: function() {
    this.setButtonState('all', 'none', 'none', 'none');

    if (SpeechSynthesis.supported() && this.props.autostart) {
      this.play();
    }
  },

  getState: function() {
    var styles = JSON.parse(JSON.stringify(style));

    for (var key in this.props.styles) {
      if (this.props.styles.hasOwnProperty(key)) {
        styles[key] = assign(styles[key], this.props.styles[key]);
      }
    }

    return { styles: styles };
  },

  play: function() {
    this.setSpeechSynthesis();
    this.speechSynthesis.speak();
    this.setButtonState('none', 'all', 'all', 'none');
  },

  pause: function() {
    this.speechSynthesis.pause();
    this.setButtonState('none', 'all', 'none', 'all');
  },

  resume: function() {
    this.speechSynthesis.resume();
    this.setButtonState('none', 'all', 'all', 'none');
  },

  stop: function() {
    this.speechSynthesis.cancel();
    this.setButtonState('all', 'none', 'none', 'none');
  },

  setButtonState: function(play, stop, pause, resume) {
    var newState = React.addons.update(this.state, {
      styles: {
        play: { button: { pointerEvents: { $set: play } } },
        stop: { button: { pointerEvents: { $set: stop } } },
        pause: { button: { pointerEvents: { $set: pause } } },
        resume: { button: { pointerEvents: { $set: resume } } }
      }
    });

    this.setState(newState);
  },

  setSpeechSynthesis: function() {
    this.speechSynthesis = new SpeechSynthesis(this.props);
    this.speechSynthesis.onend(this.onend);
    this.speechSynthesis.onerror(this.onerror);
  },

  onend: function() {
    this.stop();
  },

  onerror: function() {
    this.stop();
  },

  render: function() {
    if (!SpeechSynthesis.supported()) {
      return (
        <div className="rs-container" style={this.state.styles.container}>
          <div className="rs-text" style={this.state.styles.text}>{this.props.text}</div>
        </div>
      );
    }

    if (this.props.textAsButton) {
      return (
        <div className="rs-container" style={this.state.styles.container}>
            <Button className="rs-play" styles={this.state.styles.play} onClick={this.play} >
              <div className="rs-text" style={this.state.styles.text}>{this.props.text}</div>
            </Button>
        </div>
      );
    }

    return (
      <div className="rs-container" style={this.state.styles.container}>
        <div className="rs-text" style={this.state.styles.text}>{this.props.text}</div>
        <div className="rs-buttons" style={this.state.styles.buttons}>
          <Button className="rs-play" styles={this.state.styles.play} onClick={this.play} >
            <svg xmlns="http://www.w3.org/2000/svg" width={this.state.styles.play.width} height={this.state.styles.play.height} viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
          <Button className="rs-stop" styles={this.state.styles.stop} onClick={this.stop}>
            <svg xmlns="http://www.w3.org/2000/svg" width={this.state.styles.stop.width} height={this.state.styles.stop.height} viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 6h12v12H6z"/>
            </svg>
          </Button>
          <Button className="rs-pause" styles={this.state.styles.pause} onClick={this.pause} >
            <svg xmlns="http://www.w3.org/2000/svg" width={this.state.styles.pause.width} height={this.state.styles.pause.height} viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
          <Button className="rs-resume" styles={this.state.styles.resume} onClick={this.resume} >
            <svg xmlns="http://www.w3.org/2000/svg" width={this.state.styles.resume.width} height={this.state.styles.resume.height} viewBox="0 0 24 24">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
        </div>
      </div>
    );
  }
});

module.exports = Speech;
