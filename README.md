# react-speech 

React component for the [Web Speech](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) api. 

[![react-speech](https://github.com/andrewkeig/react-speech/raw/master/logo.png?sanitize=1)](https://www.npmjs.org/package/react-speech)

[![Current Version](https://flat.badgen.net/npm/v/react-speech?icon=npm)](https://www.npmjs.org/package/react-speech)
![build](https://travis-ci.org/AndrewKeig/react-speech.svg)



The Web Speech API aims to enable web developers to provide, in a web browser, `speech-input` and `text-to-speech` output.  

The Web Speech API comes in two parts,  [speech synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section) and [speech recognition](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section). This react component supports `speech synthesis`, `text-to-speech`.


## Install

In order to install `react-speech`, simply run

```
$ npm install react-speech --save 
```

## Simple Usage

Using `react-speech`, is pretty simple, simply `React.render` the speech component, setting the `text` property, which is rendered to speech.

```
  import React from 'react';
  import Speech from 'react-speech';

  React.render(
    <Speech text="Welcome to react speech" />,
    document.getElementById('node')
  );

```

## Speech Component API

Here is the full API for the `<Speech>` component, these properties can be set on an instance of Speech:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
styles | `Object` | [Styles](#Styles) | no | see [Styles](#styles)
text | `String` | none | yes | This attribute specifies the text to be synthesized and spoken for this utterance. Max `250` characters. See [Issues with long text](#user-content-issues-with-long-text)
pitch | `Number` | 1 | no | This attribute specifies the speaking pitch for the utterance. `min=0 max=2 step=1`
rate | `Number` | 1 | no | This attribute specifies the speaking rate for the utterance. `max=3.5 min=0.5 step=0.5`
volume | `Number` | 1 | no | This attribute specifies the speaking volume for the utterance. `max=1 min=0 step=0.1`
lang | `String` | `en-GB` | no | This attribute specifies the language of the speech synthesis for the utterance. `EN-GB`, `EN-US`|
voice | `String` | `Daniel` | no | A voice as a string, please check supported voices for your browser.|
textAsButton | `bool`| no | no | Display text as a button.|
displayText | `string`| no | no | When displaying text as a button you can use this to display a different text string.|
stop | `bool` | false | no | Display a stop button.|
pause | `bool` | false | no | Display a pause button.|
resume | `bool` | false | no | Display a resume button.|
disabled | `bool` | false | no | Disables speech.|

### Styles

If you would like to override the default styles, simply pass in a style object.  `react-speech` like React uses inline styles whose key is the camelCased version of the style name, and whose value is the style's value, usually a string.

```

const style = {
  container: { },
  text: { },
  buttons: { },
  play: {
    hover: {
      backgroundColor: 'GhostWhite'
    },
    button: {
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'Gainsboro',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    }
  },
  pause: {
    play: { }
    hover: { }
  },
  stop: {
    play: {
    hover: { },
    button: { }
  },
  resume: {
    play: {
    hover: { },
    button: { }
  }
};


```


### Issues with long text

[http://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts](http://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts)


### Supported broswers

If a browser does not support `Web Speech API` we simply display the text specified.  If you are unsure about your browser:

[http://caniuse.com/#feat=web-speech](http://caniuse.com/#feat=web-speech)

### Development

```
$ npm install
$ npm start
```

navigate to [http://localhost:3000](http://localhost:3000)


### Run tests

```
$ npm test
```

### Run build

```
$ npm run build
```

or 

```
$ npm run dist
```

```
$ npm run dist.min
```

### Examples

Here are some examples of using `react-speech`


#### Default settings


```
<Speech 
  text="I have the default settings" />

```

#### Altered my voice


```
<Speech 
  text="I have altered my voice" 
  voice="Google UK English Female" />
```

#### Set button colour


```
const style = {
  play: {
    button: {
      width: '28',
      height: '28',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'yellow',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    },
  }
};

<Speech 
  styles={style} 
  text="I have changed the colour of the play button and made it smaller" />
```

#### Set pitch, rate and volume


```
<Speech
  text="I have altered the pitch, rate and volume of my voice"
  pitch="0.5"
  rate="0.5"
  volume="0.1"
  lang="en-GB"
  voice="Daniel" />
```

#### Set default properties


```
<Speech
  text="I have all properties set to their default"
  pitch="1"
  rate="1"
  volume="1"
  lang="en-GB"
  voice="Google UK English Male" />
```

#### Display pause, stop and resume buttons


```
<Speech
  stop={true} 
  pause={true} 
  resume={true} 
  text="I am displaying all buttons" />

```

#### Display text as a button, and override display text


```
const textstyle = {
  play: {
    hover: {
      backgroundColor: 'black',
      color:'white'
    },
    button: {
      padding:'4',
      fontFamily: 'Helvetica',
      fontSize: '1.0em',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'inherit',
      border: 'none'
    },
}
  
<Speech 
  styles={textstyle} 
  textAsButton={true}    
  displayText="Hello" 
  text="I have text displayed as a button" />

```

## License

See the [License](LICENSE) file.
