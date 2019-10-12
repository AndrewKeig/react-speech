import React from 'react';
import ReactDom from 'react-dom';
import Speech from './dist/react-speech.min';

const style = {
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
            width: '30',
            height: '30',
            cursor: 'pointer',
            pointerEvents: 'none',
            outline: 'none',
            backgroundColor: 'yellow',
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

const mainstyle = {
    fontFamily: 'Helvetica',
    fontSize: '0.9em'
};

const textstyle = {
    container: {
        width: '100%'
    },
    text: {
        width: '100%',
        display: ''
    },
    play: {
        hover: {
            backgroundColor: 'black',
            color: 'white'
        },
        button: {
            padding: '4',
            fontFamily: 'Helvetica',
            fontSize: '1.0em',
            cursor: 'pointer',
            pointerEvents: 'none',
            outline: 'none',
            backgroundColor: 'inherit',
            border: 'none'
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

ReactDom.render(
    <div style={mainstyle}>
        <p>I have the default settings</p>
        <Speech text="I have the default settings" />

        <p>I have altered my voice</p>
        <Speech
            text="I have altered my voice"
            voice="Google UK English Female"
        />

        <p>I have changed the colour of the play button and made it smaller</p>
        <Speech
            styles={style}
            text="I have changed the colour of the play buttons and made them smaller"
        />

        <p>I have altered the pitch, rate and volume of my voice</p>
        <Speech
            text="I have altered the pitch, rate and volume of my voice"
            pitch="0.5"
            rate="0.5"
            volume="0.3"
            lang="en-GB"
            voice="Daniel"
        />

        <p>I have set all properties to their default</p>
        <Speech
            text="I have set all properties to their default"
            pitch="1"
            rate="1"
            volume="1"
            lang="en-GB"
            voice="Google UK English Male"
        />

        <p>I have text displayed as a button</p>
        <Speech
            styles={textstyle}
            textAsButton={true}
            displayText="Hello"
            text="I have text displayed as a button"
        />

        <p>I am displaying all buttons</p>
        <Speech
            stop={true}
            pause={true}
            resume={true}
            text="I am displaying all buttons"
        />
    </div>,
    document.getElementById('app')
);
