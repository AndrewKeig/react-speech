(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSpeech"] = factory(require("react"));
	else
		root["ReactSpeech"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/***/ (function(module, exports, __webpack_require__) {

	const React = __webpack_require__(1);
	const update = __webpack_require__(2);
	const Button = __webpack_require__(4);
	const style = __webpack_require__(5);
	const SpeechSynthesis = __webpack_require__(6);

	const Speech = React.createClass({
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
	    const styles = JSON.parse(JSON.stringify(style));

	    for (var key in this.props.styles) {
	      if (this.props.styles.hasOwnProperty(key)) {
	        styles[key] = Object.assign(styles[key], this.props.styles[key]);
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
	    const newState = update(this.state, {
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var invariant = __webpack_require__(3);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var splice = Array.prototype.splice;
	var toString = Object.prototype.toString;
	function type(obj) {
	    return toString.call(obj).slice(8, -1);
	}
	var assign = Object.assign || /* istanbul ignore next */ (function (target, source) {
	    getAllKeys(source).forEach(function (key) {
	        if (hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	        }
	    });
	    return target;
	});
	var getAllKeys = typeof Object.getOwnPropertySymbols === 'function'
	    ? function (obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)); }
	    /* istanbul ignore next */
	    : function (obj) { return Object.keys(obj); };
	function copy(object) {
	    return Array.isArray(object)
	        ? assign(object.constructor(object.length), object)
	        : (type(object) === 'Map')
	            ? new Map(object)
	            : (type(object) === 'Set')
	                ? new Set(object)
	                : (object && typeof object === 'object')
	                    ? assign(Object.create(Object.getPrototypeOf(object)), object)
	                    /* istanbul ignore next */
	                    : object;
	}
	var Context = /** @class */ (function () {
	    function Context() {
	        this.commands = assign({}, defaultCommands);
	        this.update = this.update.bind(this);
	        // Deprecated: update.extend, update.isEquals and update.newContext
	        this.update.extend = this.extend = this.extend.bind(this);
	        this.update.isEquals = function (x, y) { return x === y; };
	        this.update.newContext = function () { return new Context().update; };
	    }
	    Object.defineProperty(Context.prototype, "isEquals", {
	        get: function () {
	            return this.update.isEquals;
	        },
	        set: function (value) {
	            this.update.isEquals = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Context.prototype.extend = function (directive, fn) {
	        this.commands[directive] = fn;
	    };
	    Context.prototype.update = function (object, $spec) {
	        var _this = this;
	        var spec = (typeof $spec === 'function') ? { $apply: $spec } : $spec;
	        if (!(Array.isArray(object) && Array.isArray(spec))) {
	            invariant(!Array.isArray(spec), 'update(): You provided an invalid spec to update(). The spec may ' +
	                'not contain an array except as the value of $set, $push, $unshift, ' +
	                '$splice or any custom command allowing an array value.');
	        }
	        invariant(typeof spec === 'object' && spec !== null, 'update(): You provided an invalid spec to update(). The spec and ' +
	            'every included key path must be plain objects containing one of the ' +
	            'following commands: %s.', Object.keys(this.commands).join(', '));
	        var nextObject = object;
	        getAllKeys(spec).forEach(function (key) {
	            if (hasOwnProperty.call(_this.commands, key)) {
	                var objectWasNextObject = object === nextObject;
	                nextObject = _this.commands[key](spec[key], nextObject, spec, object);
	                if (objectWasNextObject && _this.isEquals(nextObject, object)) {
	                    nextObject = object;
	                }
	            }
	            else {
	                var nextValueForKey = type(object) === 'Map'
	                    ? _this.update(object.get(key), spec[key])
	                    : _this.update(object[key], spec[key]);
	                var nextObjectValue = type(nextObject) === 'Map'
	                    ? nextObject.get(key)
	                    : nextObject[key];
	                if (!_this.isEquals(nextValueForKey, nextObjectValue)
	                    || typeof nextValueForKey === 'undefined'
	                        && !hasOwnProperty.call(object, key)) {
	                    if (nextObject === object) {
	                        nextObject = copy(object);
	                    }
	                    if (type(nextObject) === 'Map') {
	                        nextObject.set(key, nextValueForKey);
	                    }
	                    else {
	                        nextObject[key] = nextValueForKey;
	                    }
	                }
	            }
	        });
	        return nextObject;
	    };
	    return Context;
	}());
	exports.Context = Context;
	var defaultCommands = {
	    $push: function (value, nextObject, spec) {
	        invariantPushAndUnshift(nextObject, spec, '$push');
	        return value.length ? nextObject.concat(value) : nextObject;
	    },
	    $unshift: function (value, nextObject, spec) {
	        invariantPushAndUnshift(nextObject, spec, '$unshift');
	        return value.length ? value.concat(nextObject) : nextObject;
	    },
	    $splice: function (value, nextObject, spec, originalObject) {
	        invariantSplices(nextObject, spec);
	        value.forEach(function (args) {
	            invariantSplice(args);
	            if (nextObject === originalObject && args.length) {
	                nextObject = copy(originalObject);
	            }
	            splice.apply(nextObject, args);
	        });
	        return nextObject;
	    },
	    $set: function (value, _nextObject, spec) {
	        invariantSet(spec);
	        return value;
	    },
	    $toggle: function (targets, nextObject) {
	        invariantSpecArray(targets, '$toggle');
	        var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;
	        targets.forEach(function (target) {
	            nextObjectCopy[target] = !nextObject[target];
	        });
	        return nextObjectCopy;
	    },
	    $unset: function (value, nextObject, _spec, originalObject) {
	        invariantSpecArray(value, '$unset');
	        value.forEach(function (key) {
	            if (Object.hasOwnProperty.call(nextObject, key)) {
	                if (nextObject === originalObject) {
	                    nextObject = copy(originalObject);
	                }
	                delete nextObject[key];
	            }
	        });
	        return nextObject;
	    },
	    $add: function (values, nextObject, _spec, originalObject) {
	        invariantMapOrSet(nextObject, '$add');
	        invariantSpecArray(values, '$add');
	        if (type(nextObject) === 'Map') {
	            values.forEach(function (_a) {
	                var key = _a[0], value = _a[1];
	                if (nextObject === originalObject && nextObject.get(key) !== value) {
	                    nextObject = copy(originalObject);
	                }
	                nextObject.set(key, value);
	            });
	        }
	        else {
	            values.forEach(function (value) {
	                if (nextObject === originalObject && !nextObject.has(value)) {
	                    nextObject = copy(originalObject);
	                }
	                nextObject.add(value);
	            });
	        }
	        return nextObject;
	    },
	    $remove: function (value, nextObject, _spec, originalObject) {
	        invariantMapOrSet(nextObject, '$remove');
	        invariantSpecArray(value, '$remove');
	        value.forEach(function (key) {
	            if (nextObject === originalObject && nextObject.has(key)) {
	                nextObject = copy(originalObject);
	            }
	            nextObject.delete(key);
	        });
	        return nextObject;
	    },
	    $merge: function (value, nextObject, _spec, originalObject) {
	        invariantMerge(nextObject, value);
	        getAllKeys(value).forEach(function (key) {
	            if (value[key] !== nextObject[key]) {
	                if (nextObject === originalObject) {
	                    nextObject = copy(originalObject);
	                }
	                nextObject[key] = value[key];
	            }
	        });
	        return nextObject;
	    },
	    $apply: function (value, original) {
	        invariantApply(value);
	        return value(original);
	    },
	};
	var defaultContext = new Context();
	exports.isEquals = defaultContext.update.isEquals;
	exports.extend = defaultContext.extend;
	exports.default = defaultContext.update;
	// @ts-ignore
	exports.default.default = module.exports = assign(exports.default, exports);
	// invariants
	function invariantPushAndUnshift(value, spec, command) {
	    invariant(Array.isArray(value), 'update(): expected target of %s to be an array; got %s.', command, value);
	    invariantSpecArray(spec[command], command);
	}
	function invariantSpecArray(spec, command) {
	    invariant(Array.isArray(spec), 'update(): expected spec of %s to be an array; got %s. ' +
	        'Did you forget to wrap your parameter in an array?', command, spec);
	}
	function invariantSplices(value, spec) {
	    invariant(Array.isArray(value), 'Expected $splice target to be an array; got %s', value);
	    invariantSplice(spec.$splice);
	}
	function invariantSplice(value) {
	    invariant(Array.isArray(value), 'update(): expected spec of $splice to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?', value);
	}
	function invariantApply(fn) {
	    invariant(typeof fn === 'function', 'update(): expected spec of $apply to be a function; got %s.', fn);
	}
	function invariantSet(spec) {
	    invariant(Object.keys(spec).length === 1, 'Cannot have more than one key in an object with $set');
	}
	function invariantMerge(target, specValue) {
	    invariant(specValue && typeof specValue === 'object', 'update(): $merge expects a spec of type \'object\'; got %s', specValue);
	    invariant(target && typeof target === 'object', 'update(): $merge expects a target of type \'object\'; got %s', target);
	}
	function invariantMapOrSet(target, command) {
	    var typeOfTarget = type(target);
	    invariant(typeOfTarget === 'Map' || typeOfTarget === 'Set', 'update(): %s expects a target of type Set or Map; got %s', command, typeOfTarget);
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
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

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const React = __webpack_require__(1);

	const Button = React.createClass({
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
	    const backgroundColor = this.state.hover ? this.props.styles.hover.backgroundColor : this.state.backgroundColor;
	    const color = this.state.hover ? this.props.styles.hover.color : this.state.color;
	    const style = Object.assign({}, this.props.styles.button, { color: color, backgroundColor: backgroundColor });

	    return (
	      React.createElement("button", React.__spread({type: "button"},  this.props, {style: style, 
	        onMouseEnter: this.enter, 
	        onMouseLeave: this.leave}))
	    );
	  }
	});

	module.exports = Button;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	
	const SpeechSynthesis = function(props){
	  this.utterance = new window.SpeechSynthesisUtterance();
	  this.selected = SpeechSynthesis.getVoice(props.voice);
	  this.utterance.voice = this.selected && this.selected.count > 0 ? this.selected[0] : 'Fiona';
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


/***/ })
/******/ ])
});
;