import { useMemo } from 'react';

import styles from './OPTInputs.module.css';

const DIGIT_REGEX = new RegExp(/^\d+$/);

const OPTInputs = ({ value, valueLength, onChange }) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items = [];
    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (DIGIT_REGEX.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }
    return items;
  }, [value, valueLength]);

  const moveFocusToNextInput = (target) => {
    const nextElementSibling = target.nextElementSibling;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const moveFocusToPrevInput = (target) => {
    const previousElementSibling = target.previousElementSibling;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = DIGIT_REGEX.test(targetValue);
    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }
    const nextInputEl = target.nextElementSibling;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }
    targetValue = isTargetValueDigit ? targetValue : ' ';
    const targetValueLength = targetValue.length;
    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);
      onChange(newValue);
      if (!isTargetValueDigit) {
        return;
      }
      moveFocusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur();
    }
  };
  const inputOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return moveFocusToNextInput(target);
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return moveFocusToPrevInput(target);
    }
    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length);
    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }
    moveFocusToPrevInput(target);
  };
  const inputOnFocus = (e) => {
    const { target } = e;
    const prevInputEl = target.previousElementSibling;
    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className={styles.input__fields}>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className={styles.input}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          placeholder="-"
        />
      ))}
    </div>
  );
};

export default OPTInputs;
