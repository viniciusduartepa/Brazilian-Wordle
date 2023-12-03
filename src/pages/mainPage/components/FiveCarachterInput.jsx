import React, { useState, useRef } from 'react';

export const FiveCharacterInput = (props) => {
  const [inputValues, setInputValues] = useState(['', '', '', '', '']);
  
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Remover qualquer caractere que não seja uma letra em caixa alta
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '').toUpperCase();

    const newInputValues = [...inputValues];
    newInputValues[index] = sanitizedValue;

    setInputValues(newInputValues);

    // Mover o foco para o próximo  onInputChange={(value) => handleInputChange(index, value)}nput
    if (index < inputRefs.current.length - 1 && sanitizedValue !== '') {
      inputRefs.current[index + 1].focus();
    }
    props.onInputChange(newInputValues.join(''));

  };

  return (
    <div>
      {inputValues.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          ref={(input) => (inputRefs.current[index] = input)}
          onInput={(e) => {
            // Permitir apenas letras
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
          }}
          disabled={!props.isFocused}
        />
      ))}
    </div>
  );
};
