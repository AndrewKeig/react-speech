import React from 'react/addons';
import Speech from './src/speech';

let style = {
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
  },
  stop: {
    button: {
      width: '28',
      height: '28',
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
      width: '28',
      height: '28',
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
      width: '28',
      height: '28',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'orange',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    }
  }
};

let hideText = {
  text: { display: 'none' }
};

let textstyle = {
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
};

React.render(<div>
  <Speech autostart={true} text="I have the default settings with autostart set to true" />

  <Speech text="I have the default settings" />

  <Speech text="I have altered my voice" voice="Google UK English Female" />

  <Speech styles={style} text="I have enabled the stop start and pause buttons, changed their colour and made them smaller" />

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
  text="I have set all properties to their default"
  pitch="1"
  rate="1"
  volume="1"
  lang="en-GB"
  voice="Google UK English Male" />

  <Speech styles={textstyle} textAsButton={'help'} text="I have text displayed as a button" />

  <Speech styles={hideText} text="I have hidden the text string" />

  Text string removed..


  </div>
  , document.getElementById('app'));
