import React, { useState } from 'react';
import { FiveCharacterInput } from './FiveCarachterInput';

export const InputsContainer = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [inputValues, setInputValues] = useState('');

    const handleButtonClick = () => {

        setFocusedIndex((prevIndex) => (prevIndex + 1) % 6);
       
    };

    const handleInputChange = (value) => {
      setInputValues(value);
    };
  return (
    <div>
      {[...Array(6)].map((_, index) => (
        <FiveCharacterInput 
        key={index} 
        isFocused={focusedIndex === index}
        onInputChange={(value) => handleInputChange(value)}

        />
      ))}
       <button onClick={handleButtonClick}>Trocar foco</button>
       <p>{inputValues}</p>

    </div>
  );
};

