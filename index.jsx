import React from 'react/addons';
import Speech from './src/speech';

let style = {
  play: {
    button: {
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'yellow',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    },
  },
  stop: {
    button: {
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'aqua',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    }
  },
  pause: {
    button: {
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'red',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    }
  },
  resume: {
    button: {
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'orange',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    }
  }
};

let hide = {
  pause: { button: { display: 'none' } },
  resume: { button: { display: 'none' } },
  stop: { button: { display: 'none' } }
};

let hideText = {
  text: { display: 'none' }
};


React.render(<div>
  <Speech styles={style} autostart={true} text="I have the default settings with autostart set to true" />

  <Speech text="I have the default settings" />

  <Speech text="I have altered my voice" voice="Google UK English Female" />

  <Speech styles={style} text="I have altered the colour of my buttons" />

  <Speech
  autostart={false}
  text="I have altered the pitch, rate and volume of my voice"
  pitch="0.5"
  rate="0.5"
  volume="0.3"
  lang="en-GB"
  voice="Daniel" />

  <Speech
  autostart={false}
  text="I have all properties set to their default"
  pitch="1"
  rate="1"
  volume="1"
  lang="en-GB"
  voice="Google UK English Male" />

  <Speech styles={hide} text="I have hidden my, stop, pause and resume buttons" />


  <Speech styles={hideText} text="I have hidden the text string" />

  Text string removed..


  </div>
  , document.getElementById('app'));
