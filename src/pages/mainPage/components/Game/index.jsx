import React, { useState} from "react";
import { CustomKeyboard } from "../Keyboard";
import { FiveCharacterInput } from "../FiveCarachterInput";
import { validWord } from "../../../../services/WordsService";
import { EndGameModal } from "../EndGameModal";

import "./styles.css"

export const Game = () => {
  const initialInputValues = Array(6)
    .fill(["", "", "", "", ""])
    .map(() => [...Array(5).fill("")]);
  const [inputValues, setInputValues] = useState(initialInputValues);

  const initialInputStatus = Array(6)
    .fill(["", "", "", "", ""])
    .map(() => [...Array(5).fill("")]);
  const [inputStatus, setInputStatus] = useState(initialInputStatus);

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [displacedChars, setDisplacedChars] = useState([]);
  const [correctChars, setCorrectChars] = useState([]);
  const [wrongChars, setWrongChars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameResult, setgameResult] = useState('');
  const [disableInput, setDisableInput] = useState(false);

  const openModal =()=>{
    setModalIsOpen(true);
  }

  const updateInputValue = (rowIndex, columnIndex, newValue) => {
    if(disableInput)return;
    const newArray = inputValues.map((row, index) =>
      index === rowIndex
        ? [
            ...row.slice(0, columnIndex),
            newValue,
            ...row.slice(columnIndex + 1),
          ]
        : row
    );
    setInputValues(newArray);
  };

  const updateInputStatus = (rowIndex, columnIndex, newValue) => {
    setInputStatus((prevInputStatus) => {
      const newArray = [...prevInputStatus];
      newArray[rowIndex] = [
        ...newArray[rowIndex].slice(0, columnIndex),
        newValue,
        ...newArray[rowIndex].slice(columnIndex + 1),
      ];
      return newArray;
    });
  };

  

  const validInputWord = async () => {
    if(disableInput)return;
    try {
      // Check if the word has exactly 5 characters
      if (inputValues[currentRowIndex].join("").length !== 5) {
        // Show an alert to the user
        alert("Entre com uma palavra de 5 caracteres");
        return; // Exit the function if the condition is not met
      }
      const apiResponse = await validWord(
        inputValues[currentRowIndex].join("")
      );
      if (apiResponse.results) {
        const resultsArray = Object.values(apiResponse.results);
        const allCorrect = resultsArray.every((value) => value === "correct");

        await Promise.all(
            resultsArray.map(  async (value, index) => {
            updateInputStatus(currentRowIndex, index, value);

            if (value === "correct") {
              // Add to correctChars if not already present
              if (!correctChars.includes(inputValues[currentRowIndex][index])) {
                await setCorrectChars((prevCorrectChars) => [...prevCorrectChars, inputValues[currentRowIndex][index]]);
              }
    
              // Remove from displacedChars if present
              await setDisplacedChars((prevDisplacedChars) =>
                prevDisplacedChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
    
              // Remove from wrongChars if present
              await setWrongChars((prevWrongChars) =>
                prevWrongChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
            }else if (value === "displaced") {
              // Add to displacedChars if not already present and not in correctChars
              if (!displacedChars.includes(inputValues[currentRowIndex][index]) && !correctChars.includes(inputValues[currentRowIndex][index])) {
                await setDisplacedChars((prevDisplacedChars) => [...prevDisplacedChars, inputValues[currentRowIndex][index]]);
              }
    
              // Remove from wrongChars if present
              await setWrongChars((prevWrongChars) =>
                prevWrongChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
            }else if (value === "wrong") {
              // Add to wrongChars if not in correctChars or displacedChars
              if (!wrongChars.includes(inputValues[currentRowIndex][index]) && !correctChars.includes(inputValues[currentRowIndex][index]) && !displacedChars.includes(inputValues[currentRowIndex][index])) {
                await setWrongChars((prevWrongChars) => [...prevWrongChars, inputValues[currentRowIndex][index]]);
              }
            }
  
            return null;
          })

        );         
        if (allCorrect) {
          setgameResult('win'); 
          setDisableInput(true);
          openModal();
          return;
        }
  
        // Check if at the 6th currentRowIndex and not all results are correct
        if (currentRowIndex === 5 && !allCorrect) {
          setgameResult('lose');
          setDisableInput(true);
          openModal();
          return
        }
      }
      setCurrentRowIndex((currentRowIndex + 1));
    } catch (error) {
      console.error("Erro ao obter dados válidos:", error);
      if (error && error.response && error.response.status) {
        // Check if the error has a response and status code
        if (error.response.data && error.response.data.error) {
          // Display the specific API error message
          alert("Palavra não encontrada no dicionário");
        } else {
          // Display a generic error message for other API errors
          alert("An error occurred while fetching data.");
        }
      } else {
        // Display a generic error message for non-API errors
        alert("An error occurred while fetching data.");
      }
    }
  };

  const handleKeyboardKeyPress = (button) => {
    if(disableInput)return;
    // Assuming your custom keyboard has buttons for A-Z and backspace
    if (/^[A-Z]$/.test(button)) {
      // Update the input value at the current row and column
      updateInputValue(currentRowIndex, currentColumnIndex, button);
      // Move to the next column
      setCurrentColumnIndex((prevIndex) => (prevIndex + 1) % 5);
    }
  };
  const handleBackspacePress = () => {
    if(disableInput)return;
    if (inputValues[currentRowIndex][currentColumnIndex]) {
      // If the current input has a value, delete it
      updateInputValue(currentRowIndex,currentColumnIndex, '');
    } else {
      // If the current input is empty, move focus to the previous input

      const prevIndex = currentColumnIndex === 0 ? 4 : currentColumnIndex -1

      // Update the current column index
      setCurrentColumnIndex(prevIndex);
    }
  };

  return (
    <div className="game-container">
      {inputValues.map((values, index) => (
        <FiveCharacterInput
          key={index}
          isFocused={index === currentRowIndex}
          disabled={disableInput}
          values={values}
          updateInputValue={(columnIndex, value) =>
            updateInputValue(currentRowIndex, columnIndex, value)
          }
          currentColumnIndex={currentColumnIndex}
          setCurrentColumnIndex={setCurrentColumnIndex}
          status={inputStatus[index]}
          validWord={validInputWord}
        />
      ))}
         <CustomKeyboard
        displacedChars={displacedChars}
        correctChars={correctChars}
        wrongChars={wrongChars}
        onKeyPress={handleKeyboardKeyPress}
        onEnterPress={validInputWord}
        onBackspacePress={handleBackspacePress}
      />
      <EndGameModal 
        isOpen={modalIsOpen}
        gameResult={gameResult}
        trys={currentRowIndex+1}
        dailyWord={inputValues[currentRowIndex].join('')}
      />
    </div>
  );
};
