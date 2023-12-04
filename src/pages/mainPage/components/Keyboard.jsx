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
    const display = {
      '{enter}': '↵',
      '{backspace}': '←',
    };
    const buttonTheme =[
        {
            class: "displaced",
            buttons: props.displacedChars.join(' ')
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
    const handleKeyPress = (button) => {

      if (button === "{enter}") {
        // Execute your specified function when "Enter" is pressed
        if (props.onEnterPress) {
          props.onEnterPress();
        }
      }else if (button === "{backspace}") {
        // Execute sua função específica quando a tecla "Backspace" for pressionada
        if (props.onBackspacePress) {
          props.onBackspacePress();
        }
      } else if (props.onKeyPress) {
        props.onKeyPress(button);
      }
    };

    return (
        <div className="custom-keyboard">
          <Keyboard
            layout={layout}
            layoutName='shift'  
            buttonTheme={buttonTheme}
            onKeyPress={handleKeyPress}
            display={display}
          />
      </div>
      );
};
