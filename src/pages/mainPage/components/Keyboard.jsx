import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './Keyboard.css'


export const CustomKeyboard = () => {


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
            buttons: "Q W E R T Y U I O P" 
        },
        {
            class: "correct",
            buttons: "A S D F G H J K L {backspace}"
        },
        {
            class: "wrong",
            buttons: 'Z X C V B N M {enter}'
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
