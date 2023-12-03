import React, {useRef, useEffect } from 'react';
import './FiveCarachterInput.css'

export const FiveCharacterInput = (props) => {

  const inputRefs = useRef(props.values.map(() => React.createRef()));

  const handleInputBlur = () => {
    // Keep the focus on the current input field
    inputRefs.current[props.currentColumnIndex].current.focus();
  };
  const handleInputKeyPress = (index, event) => {
    // Get the pressed key
    const pressedKey = event.key.toUpperCase();

    if (pressedKey === 'BACKSPACE') {
      if (props.values[index]) {
        // If the current input has a value, delete it
        props.updateInputValue(index, '');
      } else {
        // If the current input is empty, move focus to the previous input
        const prevIndex = (index - 1 + inputRefs.current.length) % inputRefs.current.length;
        inputRefs.current[prevIndex].current.focus();
  
        // Update the current column index
        props.setCurrentColumnIndex(prevIndex);
      }
  
      // Prevent the default behavior of the keypress event
      event.preventDefault();
      return;
    }
  

    // Allow only letters
    if (/^[A-Za-z]$/.test(pressedKey)) {
      props.updateInputValue(index, pressedKey);

      // Move focus to the next input field
      const nextIndex = (index + 1) % inputRefs.current.length;
      inputRefs.current[nextIndex].current.focus();

      // Update the current column index
      props.setCurrentColumnIndex(nextIndex);
    }

    // Prevent the default behavior of the keypress event
    event.preventDefault();
  };
  useEffect(() => {
    // Focus on the input field corresponding to the current column index
    inputRefs.current[props.currentColumnIndex].current.focus();
  }, [props.currentColumnIndex]);

  const selectInputAtIndex = (index) => {
    // Select the input at the specified index
    inputRefs.current[index].current.focus();

    // Update the current column index
    props.setCurrentColumnIndex(index);
  };

  return (
    <div>
      {props.values.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onKeyDown={(e) => handleInputKeyPress(index, e)}
          onInput={(e) => {
            // Permitir apenas letras
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
          }}
          disabled={!props.isFocused}
          ref={inputRefs.current[index]}
          className={props.status[index]}
          onBlur={handleInputBlur}
          onClick={() => selectInputAtIndex(index)} 

        />
      ))}
    </div>
  );
};