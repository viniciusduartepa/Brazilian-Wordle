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
          resultsArray.map((value, index) =>
            updateInputStatus(currentRowIndex, index, value)
          )
        );
      }
    } catch (error) {
      console.error("Erro ao obter dados válidos:", error);
    }
    setCurrentRowIndex(newRowIndex);
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
        />
      ))}
      <button onClick={() => changeRow((currentRowIndex + 1) % 6)}>
        Change Row
      </button>
      <CustomKeyboard
        missplacedChars={["A", "B", "C"]}
        correctChars={["D", "E", "F"]}
        wrongChars={["G", "H", "I"]}  
      />
      {inputStatus.map((row, rowIndex) => (
  <div key={rowIndex}>
    {row.map((value, columnIndex) => (
      <p key={columnIndex}>{Array.isArray(value) ? value.join(', ') : value}</p>
    ))}
  </div>
))}

    </div>
  );
};
