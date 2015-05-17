# react-speech <img src="https://github.com/AndrewKeig/react-speech/blob/master/logo.png" style="padding:6px"" align="right">

React component for the [Web Speech](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html) api. 

The Web Speech API aims to enable web developers to provide, in a web browser, `speech-input` and `text-to-speech` output.  

The Web Speech API comes in two parts,  [speech synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section) and [speech recognition](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section). This react component supports `speech synthesis`, `text-to-speech`.


![Git release](http://img.shields.io/github/release/andrewkeig/react-speech.svg?style=flat) ![Travis](http://img.shields.io/travis/andrewkeig/react-speech.svg?style=flat) ![license](http://img.shields.io/npm/l/react-speech.svg?style=flat)


`react-speech` depends on React.js 0.13.x (or higher).

## Install

In order to install `react-speech`, simply run

```
$ npm install react-speech --save 
```

## Simple Usage

Using `react-speech`, is pretty simple, simply `React.render` the speech component, setting the `text` property, which is rendered to speech.

```
  import Speech from './speech';

  React.render(
    <Speech text="Welcome to react speech" />,
    document.getElementById('node')
  );

```

Here is a standalone version.

```
<html>
  <head>
    <title>React Speech</title>
  </head>
  <body>
    <div>
      <div id="app"></div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
    <script src="../dist/react-speech.min.js"></script>

    <script type="text/jsx">
      var Speech = ReactSpeech;

      React.render(
        <Speech text="I have the default settings" />,
        document.getElementById('app')
      );
    </script>
  </body>
</html>

```

## Speech Component API

Here is the full API for the `<Speech>` component, these properties can be set on an instance of Speech:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
styles | `Object` | [Styles](#Styles) | no | see [Styles](#styles)
autostart | `Bool` | false | no | Start speech on page load.
text | `String` | none | yes | This attribute specifies the text to be synthesized and spoken for this utterance. Max `250` characters. See [Issues with long text](#issueswithlongtext)
pitch | `Number` | 1 | no | This attribute specifies the speaking pitch for the utterance. `min=0 max=2 step=1`
rate | `Number` | 1 | no | This attribute specifies the speaking rate for the utterance. `max=3.5 min=0.5 step=0.5`
volume | `Number` | 1 | no | This attribute specifies the speaking volume for the utterance. `max=1 min=0 step=0.1`
lang | `String` | `en-GB` | no | This attribute specifies the language of the speech synthesis for the utterance. `EN-GB`, `EN-US`|
voice | `String` | `Daniel` | no | Check supported voices for your browser.|


### Styles

If you would like to override the default styles, simply pass in a style object.  `react-speech` like React uses inline styles whose key is the camelCased version of the style name, and whose value is the style's value, usually a string.

```

let style = {
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


#### Autostart speech

```
<Speech 
  autostart={false} 
  text="I have the default settings with autostart set to true" />

```


#### Hidden text string

```
let hideText = {
  text: { display: 'none' }
};

<Speech styles={hideText} 
  text="I have hidden the text string" />
  
```



```
<Speech 
  text="I have altered my voice" 
  voice="Google UK English Female" />
```

#### Set button colour

```
let style = {
  play: { button: { color: 'black', backgroundColor: 'yellow' } }
};

<Speech 
  styles={style} 
  text="I have altered the colour of my play button" />
```

#### Set pitch, rate and volume

```
<Speech
  autostart={false}
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
  autostart={false}
  text="I have all properties set to their default"
  pitch="1"
  rate="1"
  volume="1"
  lang="en-GB"
  voice="Google UK English Male" />
```

#### Hide pause, stop and resume

```
let hide = {
  pause: { button: { display: 'none' } },
  resume: { button: { display: 'none' } },
  stop: { button: { display: 'none' } }
};

<Speech 
  styles={hide} 
  text="I have hidden my buttons" />

```

## License

See the [License](LICENSE) file.
