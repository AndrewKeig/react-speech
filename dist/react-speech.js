(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSpeech"] = factory(require("react"));
	else
		root["ReactSpeech"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(1);
	var React = __webpack_require__(2);
	var Button = __webpack_require__(3);
	var style = __webpack_require__(4);
	var SpeechSynthesis = __webpack_require__(5);

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
	    textAsButton: React.PropTypes.bool,
	    displayText: React.PropTypes.string
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
	        React.createElement("span", {className: "rs-container", style: this.state.styles.container}, 
	          React.createElement("span", {className: "rs-text", style: this.state.styles.text}, this.props.text)
	        )
	      );
	    }

	    var play;
	    var stop;
	    var pause;
	    var resume;

	    if (this.props.textAsButton) {
	      play = (
	        React.createElement(Button, {className: "rs-play", styles: this.state.styles.play, onClick: this.play}, 
	          React.createElement("span", {className: "rs-text", style: this.state.styles.text}, this.props.displayText || this.props.text)
	        )
	      );
	    } else {
	      play = (
	        React.createElement(Button, {className: "rs-play", styles: this.state.styles.play, onClick: this.play}, 
	          React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: this.state.styles.play.width, height: this.state.styles.play.height, viewBox: "0 0 24 24"}, 
	              React.createElement("path", {d: "M8 5v14l11-7z"}), 
	              React.createElement("path", {d: "M0 0h24v24H0z", fill: "none"})
	          )
	        )
	      );
	    }

	    if (this.props.stop) {
	      stop = (
	        React.createElement(Button, {className: "rs-stop", styles: this.state.styles.stop, onClick: this.stop}, 
	          React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: this.state.styles.stop.width, height: this.state.styles.stop.height, viewBox: "0 0 24 24"}, 
	              React.createElement("path", {d: "M0 0h24v24H0z", fill: "none"}), 
	              React.createElement("path", {d: "M6 6h12v12H6z"})
	          )
	        )
	      );
	    }

	    if (this.props.pause) {
	      pause = (
	        React.createElement(Button, {className: "rs-pause", styles: this.state.styles.pause, onClick: this.pause}, 
	          React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: this.state.styles.pause.width, height: this.state.styles.pause.height, viewBox: "0 0 24 24"}, 
	              React.createElement("path", {d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"}), 
	              React.createElement("path", {d: "M0 0h24v24H0z", fill: "none"})
	          )
	        )
	      );
	    }

	    if (this.props.resume) {
	      resume = (
	        React.createElement(Button, {className: "rs-resume", styles: this.state.styles.resume, onClick: this.resume}, 
	          React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: this.state.styles.resume.width, height: this.state.styles.resume.height, viewBox: "0 0 24 24"}, 
	              React.createElement("path", {d: "M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"}), 
	              React.createElement("path", {d: "M0 0h24v24H0z", fill: "none"})
	          )
	        )
	      );
	    }

	    return (
	      React.createElement("span", {className: "rs-container", style: this.state.styles.container}, 
	        play, " ", stop, " ", pause, " ", resume
	      )
	    );
	  }
	});

	Speech.SpeechSynthesis = SpeechSynthesis;
	module.exports = Speech;


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(1);
	var React = __webpack_require__(2);

	var Button = React.createClass({
	  displayName: 'react-speech-button',

	  propTypes: {
	    styles: React.PropTypes.object.isRequired,
	    onClick: React.PropTypes.func.isRequired
	  },

	  getInitialState: function(props){
	    props = props || this.props;
	    return props;
	  },

	  componentDidMount: function() {
	    this.setState({
	      focus: false,
	      hover: false,
	      color: this.props.styles.button.Color,
	      backgroundColor: this.props.styles.button.backgroundColor
	    });
	  },

	  enter: function() {
	    this.setState({ hover: true });
	  },

	  leave: function() {
	    this.setState({ hover: false });
	  },

	  render: function() {
	    var style = {};
	    var backgroundColor = this.state.hover ? this.props.styles.hover.backgroundColor : this.state.backgroundColor;
	    var color = this.state.hover ? this.props.styles.hover.color : this.state.color;
	    assign(style, this.props.styles.button, { color: color, backgroundColor: backgroundColor });

	    return (
	      React.createElement("button", React.__spread({type: "button"},  this.props, {style: style, 
	        onMouseEnter: this.enter, 
	        onMouseLeave: this.leave}))
	    );
	  }
	});

	module.exports = Button;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  container: {
	    width: '100%'
	  },
	  text: {
	    width: '100%',
	    display: ''
	  },
	  play: {
	    hover: {
	      backgroundColor: 'GhostWhite'
	    },
	    button: {
	      width: '34',
	      height: '34',
	      cursor: 'pointer',
	      pointerEvents: 'none',
	      outline: 'none',
	      backgroundColor: 'Gainsboro',
	      border: 'solid 1px rgba(255,255,255,1)',
	      borderRadius: 6
	    }
	  },
	  stop: {
	    hover: {
	      backgroundColor: 'GhostWhite'
	    },
	    button: {
	      width: '34',
	      height: '34',
	      cursor: 'pointer',
	      pointerEvents: 'none',
	      outline: 'none',
	      backgroundColor: 'Gainsboro',
	      border: 'solid 1px rgba(255,255,255,1)',
	      borderRadius: 6
	    }
	  },
	  pause: {
	    hover: {
	      backgroundColor: 'GhostWhite'
	    },
	    button: {
	      width: '34',
	      height: '34',
	      cursor: 'pointer',
	      pointerEvents: 'none',
	      outline: 'none',
	      backgroundColor: 'Gainsboro',
	      border: 'solid 1px rgba(255,255,255,1)',
	      borderRadius: 6
	    }
	  },
	  resume: {
	    hover: {
	      backgroundColor: 'GhostWhite'
	    },
	    button: {
	      width: '34',
	      height: '34',
	      cursor: 'pointer',
	      pointerEvents: 'none',
	      outline: 'none',
	      backgroundColor: 'Gainsboro',
	      border: 'solid 1px rgba(255,255,255,1)',
	      borderRadius: 6
	    }
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	// var _iOS9voices = [
	//   { name: "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", lang: "ar-SA", localService: true, "default": true },
	//   { name: "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", lang: "cs-CZ", localService: true, "default": true },
	//   { name: "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", lang: "da-DK", localService: true, "default": true },
	//   { name: "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", lang: "de-DE", localService: true, "default": true },
	//   { name: "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", lang: "el-GR", localService: true, "default": true },
	//   { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: true, "default": true },
	//   { name: "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", lang: "en-GB", localService: true, "default": true },
	//   { name: "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", lang: "en-IE", localService: true, "default": true },
	//   { name: "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", lang: "en-US", localService: true, "default": true },
	//   { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "en-US", localService: true, "default": true },
	//   { name: "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", lang: "en-ZA", localService: true, "default": true },
	//   { name: "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", lang: "es-ES", localService: true, "default": true },
	//   { name: "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", lang: "es-MX", localService: true, "default": true },
	//   { name: "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", lang: "fi-FI", localService: true, "default": true },
	//   { name: "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", lang: "fr-CA", localService: true, "default": true },
	//   { name: "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", lang: "fr-FR", localService: true, "default": true },
	//   { name: "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", lang: "he-IL", localService: true, "default": true },
	//   { name: "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", lang: "hi-IN", localService: true, "default": true },
	//   { name: "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", lang: "hu-HU", localService: true, "default": true },
	//   { name: "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", lang: "id-ID", localService: true, "default": true },
	//   { name: "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", lang: "it-IT", localService: true, "default": true },
	//   { name: "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", lang: "ja-JP", localService: true, "default": true },
	//   { name: "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", lang: "ko-KR", localService: true, "default": true },
	//   { name: "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", lang: "nl-BE", localService: true, "default": true },
	//   { name: "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", lang: "nl-NL", localService: true, "default": true },
	//   { name: "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", lang: "no-NO", localService: true, "default": true },
	//   { name: "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", lang: "pl-PL", localService: true, "default": true },
	//   { name: "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", lang: "pt-BR", localService: true, "default": true },
	//   { name: "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", lang: "pt-PT", localService: true, "default": true },
	//   { name: "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", lang: "ro-RO", localService: true, "default": true },
	//   { name: "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", lang: "ru-RU", localService: true, "default": true },
	//   { name: "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", lang: "sk-SK", localService: true, "default": true },
	//   { name: "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", lang: "sv-SE", localService: true, "default": true },
	//   { name: "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", lang: "th-TH", localService: true, "default": true },
	//   { name: "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", lang: "tr-TR", localService: true, "default": true },
	//   { name: "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", lang: "zh-CN", localService: true, "default": true },
	//   { name: "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", lang: "zh-HK", localService: true, "default": true },
	//   { name: "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", lang: "zh-TW", localService: true, "default": true }
	// ];

	var SpeechSynthesis = function(props){
	  var voice = { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: true, "default": true };
	  this.utterance = new window.SpeechSynthesisUtterance();
	  this.selected = SpeechSynthesis.getVoice(props.voice);
	  this.utterance.voice = this.selected[0] || voice;
	  this.utterance.voiceURI = 'com.apple.ttsbundle.Karen-compact';
	  this.utterance.text = props.text.replace(/\n/g, '');
	  this.utterance.lang = props.lang || 'en-GB';
	  this.utterance.pitch = parseFloat(props.pitch, 10) || 1;
	  this.utterance.rate = parseFloat(props.rate, 10) || 0.8;
	  this.utterance.volume = parseFloat(props.volume, 10) || 1;
	  console.log('this.utterance', this.utterance);
	};

	SpeechSynthesis.supported = function(selected) {
	  return window.speechSynthesis;
	};

	SpeechSynthesis.getVoice = function(selected) {
	  return window.speechSynthesis.getVoices().filter(function(voice) {
	    console.log('voice', voice);
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


/***/ }
/******/ ])
});
;