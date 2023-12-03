import React, { useState } from "react";
import { CustomKeyboard } from "./Keyboard";
import { FiveCharacterInput } from "./FiveCarachterInput";
import { validWord } from "../../../services/WordsService";

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

  const updateInputValue = (rowIndex, columnIndex, newValue) => {
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

  const changeRow = async (newRowIndex) => {
    try {
      const apiResponse = await validWord(
        inputValues[currentRowIndex].join("")
      );
      if (apiResponse.results) {
        const resultsArray = Object.values(apiResponse.results);

        await Promise.all(
          resultsArray.map((value, index) => {
            updateInputStatus(currentRowIndex, index, value);

            if (value === "correct") {
              // Add to correctChars if not already present
              if (!correctChars.includes(inputValues[currentRowIndex][index])) {
                setCorrectChars((prevCorrectChars) => [...prevCorrectChars, inputValues[currentRowIndex][index]]);
              }
    
              // Remove from displacedChars if present
              setDisplacedChars((prevDisplacedChars) =>
                prevDisplacedChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
    
              // Remove from wrongChars if present
              setWrongChars((prevWrongChars) =>
                prevWrongChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
            }else if (value === "displaced") {
              // Add to displacedChars if not already present and not in correctChars
              if (!displacedChars.includes(inputValues[currentRowIndex][index]) && !correctChars.includes(inputValues[currentRowIndex][index])) {
                setDisplacedChars((prevDisplacedChars) => [...prevDisplacedChars, inputValues[currentRowIndex][index]]);
              }
    
              // Remove from wrongChars if present
              setWrongChars((prevWrongChars) =>
                prevWrongChars.filter((char) => char !== inputValues[currentRowIndex][index])
              );
            }else if (value === "wrong") {
              // Add to wrongChars if not in correctChars or displacedChars
              if (!wrongChars.includes(inputValues[currentRowIndex][index]) && !correctChars.includes(inputValues[currentRowIndex][index]) && !displacedChars.includes(inputValues[currentRowIndex][index])) {
                setWrongChars((prevWrongChars) => [...prevWrongChars, inputValues[currentRowIndex][index]]);
              }
            }

          })
        );
      }
    } catch (error) {
      console.error("Erro ao obter dados válidos:", error);
    }
    setCurrentRowIndex(newRowIndex);
  };

  const handleKeyboardKeyPress = (button) => {
    // Assuming your custom keyboard has buttons for A-Z and backspace
    if (/^[A-Z]$/.test(button)) {
      // Update the input value at the current row and column
      updateInputValue(currentRowIndex, currentColumnIndex, button);
      // Move to the next column
      setCurrentColumnIndex((prevIndex) => (prevIndex + 1) % 5);
    }
  };

  return (
    <div>
      {inputValues.map((values, index) => (
        <FiveCharacterInput
          key={index}
          isFocused={index === currentRowIndex}
          values={values}
          updateInputValue={(columnIndex, value) =>
            updateInputValue(currentRowIndex, columnIndex, value)
          }
          currentColumnIndex={currentColumnIndex}
          setCurrentColumnIndex={setCurrentColumnIndex}
          status={inputStatus[index]}
        />
      ))}
      <button onClick={() => changeRow((currentRowIndex + 1) % 6)}>
        Change Row
      </button>
      <CustomKeyboard
        displacedChars={displacedChars}
        correctChars={correctChars}
        wrongChars={wrongChars}
        onKeyPress={handleKeyboardKeyPress}
      />
      {inputStatus.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((value, columnIndex) => (
            <p key={columnIndex}>
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
