import React from 'react';
import { CustomKeyboard } from './Keyboard';


export const Game = () => {
    
  return (
    <div>
        <CustomKeyboard
        missplacedChars={["A","B","C"]}
        correctChars={["D","E","F"]}
        wrongChars={["G","H","I"]}
        />
    </div>
  );
};

