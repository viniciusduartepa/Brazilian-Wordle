import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.css'


export const CustomKeyboard = (props) => {

    const layout = {
        shift: [
            'Q W E R T Y U I O P',
            'A S D F G H J K L {backspace}',
            'Z X C V B N M {enter}'
          ]
    }
    const buttonTheme =[
        {
            class: "missplaced",
            buttons: props.missplacedChars.join(' ')
        },
        {
            class: "correct",
            buttons: props.correctChars.join(' ')
        },
        {
            class: "wrong",
            buttons: props.wrongChars.join(' ')
        }
    ]

    return (
        <div>
          <Keyboard
            layout={layout}
            layoutName='shift'  
            buttonTheme={buttonTheme}
          />
        </div>
      );
};
