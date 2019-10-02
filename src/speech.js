import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import style from './style';
import SpeechSynthesis from './speechSynthesis';
import Button from './button';

export default class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: this.props.styles !== undefined ? this.props.styles : style
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.onend = this.onend.bind(this);
    this.onerror = this.onerror.bind(this);
  }

  componentDidMount() {
    this.setButtonState('all', 'none', 'none', 'none');
  }

  setButtonState(play, stop, pause, resume) {
    var newState = update(this.state, {
      styles: {
        play: { button: { pointerEvents: { $set: play } } },
        stop: { button: { pointerEvents: { $set: stop } } },
        pause: { button: { pointerEvents: { $set: pause } } },
        resume: { button: { pointerEvents: { $set: resume } } }
      }
    });

    this.setState(newState);
  }

  setSpeechSynthesis() {
    this.speechSynthesis = new SpeechSynthesis(this.props);
    this.speechSynthesis.onend(this.onend);
    this.speechSynthesis.onerror(this.onerror);
  }

  play() {
    this.setSpeechSynthesis();
    this.speechSynthesis.speak();
    this.setButtonState('none', 'all', 'all', 'none');
  }

  pause() {
    this.speechSynthesis.pause();
    this.setButtonState('none', 'all', 'none', 'all');
  }

  resume() {
    this.speechSynthesis.resume();
    this.setButtonState('none', 'all', 'all', 'none');
  }

  stop() {
    this.speechSynthesis.cancel();
    this.setButtonState('all', 'none', 'none', 'none');
  }

  onend() {
    this.stop();
  }

  onerror() {
    this.stop();
  }

  render() {
    if (this.props.disabled || !SpeechSynthesis.supported()) {
      return (
        <span className="rs-container" style={this.state.styles.container}>
          <span className="rs-text" style={this.state.styles.text}>
            {this.props.text}
          </span>
        </span>
      );
    }

    var play;
    var stop;
    var pause;
    var resume;

    if (this.props.textAsButton) {
      play = (
        <Button
          className="rs-play"
          styles={this.state.styles.play}
          onClick={this.play}
        >
          <span className="rs-text" style={this.state.styles.text}>
            {this.props.displayText || this.props.text}
          </span>
        </Button>
      );
    } else {
      play = (
        <Button
          className="rs-play"
          styles={this.state.styles.play}
          onClick={this.play}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.play.width}
            height={this.state.styles.play.height}
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      );
    }

    if (this.props.stop) {
      stop = (
        <Button
          className="rs-stop"
          styles={this.state.styles.stop}
          onClick={this.stop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.stop.width}
            height={this.state.styles.stop.height}
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 6h12v12H6z" />
          </svg>
        </Button>
      );
    }

    if (this.props.pause) {
      pause = (
        <Button
          className="rs-pause"
          styles={this.state.styles.pause}
          onClick={this.pause}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.pause.width}
            height={this.state.styles.pause.height}
            viewBox="0 0 24 24"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      );
    }

    if (this.props.resume) {
      resume = (
        <Button
          className="rs-resume"
          styles={this.state.styles.resume}
          onClick={this.resume}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.resume.width}
            height={this.state.styles.resume.height}
            viewBox="0 0 24 24"
          >
            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      );
    }

    return (
      <span className="rs-container" style={this.state.styles.container}>
        {play} {stop} {pause} {resume}
      </span>
    );
  }
}

Speech.propTypes = {
  styles: PropTypes.object,
  text: PropTypes.string.isRequired,
  pitch: PropTypes.string,
  rate: PropTypes.string,
  volume: PropTypes.string,
  lang: PropTypes.string,
  voiceURI: PropTypes.string,
  voice: PropTypes.string,
  textAsButton: PropTypes.bool,
  displayText: PropTypes.string,
  disabled: PropTypes.bool,
  stop: PropTypes.bool,
  pause: PropTypes.bool,
  resume: PropTypes.bool
};
