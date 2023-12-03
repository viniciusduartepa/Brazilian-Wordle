import React, {useRef, useEffect } from 'react';
import './FiveCarachterInput.css'

export const FiveCharacterInput = (props) => {

  const inputRefs = useRef(props.values.map(() => React.createRef()));

  const handleInputFocus = (index) => {
    // Update the current column index when focusing on an input
    props.setCurrentColumnIndex(index);
  };

  const handleInputBlur = () => {
    // Keep the focus on the current input field
    inputRefs.current[props.currentColumnIndex].current.focus();
  };

  useEffect(() => {
    // Focus on the input field corresponding to the current column index
    inputRefs.current[props.currentColumnIndex].current.focus();
  }, [props.currentColumnIndex]);

  const handleInputKeyDown = (event, index) => {
    // Check if the pressed key is a letter
    if (/^[A-Za-z]$/.test(event.key)) {
      const sanitizedValue = event.key.toUpperCase();
      props.updateInputValue(index, sanitizedValue);

      // Move focus to the next input field
      const nextIndex = (index + 1) % inputRefs.current.length;
      inputRefs.current[nextIndex].current.focus();

      // Update the current column index
      props.setCurrentColumnIndex(nextIndex);
    }
  };


  return (
    <div>
      {props.values.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onKeyDown={(e) => handleInputKeyDown(e, index)}
          onFocus={() => handleInputFocus(index)}
          onInput={(e) => {
            // Permitir apenas letras
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
          }}
          disabled={!props.isFocused}
          ref={inputRefs.current[index]}
          className={props.status[index]}
          onBlur={handleInputBlur} 

        />
      ))}
    </div>
  );
};