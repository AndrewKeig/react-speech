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
	var update = __webpack_require__(3);
	var Button = __webpack_require__(8);
	var style = __webpack_require__(9);
	var SpeechSynthesis = __webpack_require__(10);

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
	    displayText: React.PropTypes.string,
	    disabled: React.PropTypes.bool
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
	    var newState = update(this.state, {
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
	    if (this.props.disabled || !SpeechSynthesis.supported()) {
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

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
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

	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var assign = __webpack_require__(5);
	var keyOf = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var hasOwnProperty = ({}).hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });

	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? (undefined) !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? (undefined) !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
	}

	function update(value, spec) {
	  !(typeof spec === 'object') ? (undefined) !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? (undefined) !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? (undefined) !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
	    !(nextValue && typeof nextValue === 'object') ? (undefined) !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? (undefined) !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? (undefined) !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? (undefined) !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? (undefined) !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";

	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	
	var SpeechSynthesis = function(props){
	  this.utterance = new window.SpeechSynthesisUtterance();
	  this.selected = SpeechSynthesis.getVoice(props.voice);
	  this.utterance.voice = this.selected[0] || 'Fiona';
	  this.utterance.voiceURI = 'Fiona';
	  this.utterance.text = props.text.replace(/\n/g, '');
	  this.utterance.lang = props.lang || 'en-GB';
	  this.utterance.pitch = parseFloat(props.pitch, 10) || 0.8;
	  this.utterance.rate = parseFloat(props.rate, 10) || 1;
	  this.utterance.volume = parseFloat(props.volume, 10) || 1;
	};

	SpeechSynthesis.supported = function(selected) {
	  return window.speechSynthesis;
	};

	SpeechSynthesis.getVoice = function(selected) {
	  return window.speechSynthesis.getVoices().filter(function(voice) {
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