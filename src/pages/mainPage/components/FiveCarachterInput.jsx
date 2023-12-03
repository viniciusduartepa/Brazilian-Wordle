import React, {useRef, useEffect } from 'react';

export const FiveCharacterInput = (props) => {

  const inputRefs = useRef(props.values.map(() => React.createRef()));

  const handleInputChange = (index, value) => {
    const sanitizedValue = value.replace(/[^A-Za-z]/g, '').toUpperCase();
    props.updateInputValue(index,sanitizedValue);

    // Move focus to the next input field
    const nextIndex = (index + 1) % inputRefs.current.length;
    inputRefs.current[nextIndex].current.focus();

    // Update the current column index
    props.setCurrentColumnIndex(nextIndex);
  };

  const handleInputFocus = (index) => {
    // Update the current column index when focusing on an input
    props.setCurrentColumnIndex(index);
  };

  useEffect(() => {
    // Focus on the initial input field
    inputRefs.current[0].current.focus();
  }, []);

  return (
    <div>
      {props.values.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onFocus={() => handleInputFocus(index)}
          onInput={(e) => {
            // Permitir apenas letras
          e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
          }}
          disabled={!props.isFocused}
          ref={inputRefs.current[index]}

        />
      ))}
    </div>
  );
};