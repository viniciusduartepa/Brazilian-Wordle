import React, { useState } from 'react';
import { FiveCharacterInput } from './FiveCarachterInput';

export const InputsContainer = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    const handleButtonClick = () => {

        setFocusedIndex((prevIndex) => (prevIndex + 1) % 6);
    
    };
  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <FiveCharacterInput 
        key={index} 
        isFocused={focusedIndex === index}

        />
      ))}
       <button onClick={handleButtonClick}>Trocar foco</button>
    </div>
  );
};

