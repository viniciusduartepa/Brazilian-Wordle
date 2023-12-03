import React, { useState } from 'react';
import { FiveCharacterInput } from './FiveCarachterInput';
import { validWord } from '../../../services/WordsService';

export const InputsContainer = () => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [inputValues, setInputValues] = useState('');
    const [validedWord, setValidedWord] = useState([]);

    const handleButtonClick = async() => {

        setFocusedIndex((prevIndex) => (prevIndex + 1) % 6);

        try {
          const apiResponse = await validWord(inputValues);
          const resultsArray = Object.values(apiResponse.results);

          setValidedWord(resultsArray ) 
         
        } catch (error) {
          console.error('Erro ao obter dados válidos:', error);
        }
        console.log(validedWord)
       
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
       {validedWord.map((result, index) => (
          <p>{result}</p>
        ))} 
  

    </div>
  );
};

