import { useState } from 'react';
import styles from './StyledInput.module.css';

const StyledInput = ({ name, title, idInput, onChange, value, onBlur, error, touched, type, children }) => {
  const [focus, setFocus] = useState(false);
  const changeFocus = (boolean) => {
    setFocus(boolean);
  };

  const classNames = `${focus && styles.active} ${!!value && styles.items} ${error && touched && styles.error}`;
  return (
    <div className={styles.root__container}>
      <div className={`${styles.wrapper} ${classNames}`}>
        <label htmlFor={idInput} className={styles.label}>
          {title}
        </label>
        <div className={styles.styled}>
          <input
            onChange={onChange}
            value={value}
            onBlur={(e) => (onBlur(e), changeFocus(false))}
            onFocus={() => changeFocus(true)}
            className={styles.styled__input}
            autoComplete="off"
            name={name}
            id={idInput}
            type={type ? type : 'text'}
          />
        </div>
        {children ? children : null}
      </div>
    </div>
  );
};

export default StyledInput;
