import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useDebouncedRippleCleanUp } from '../../../hooks/useDebouncedRippleCleanUp';
import { Spinner } from '../SVG';

import styles from './Ripple.module.css';

const Ripple = ({ duration, color, content, className, onClick, type, disabled }) => {
  const [rippleArray, setRippleArray] = useState([]);
  const { loading } = useSelector((store) => store.app);

  const clearDuration = 850;

  useDebouncedRippleCleanUp(rippleArray.length, clearDuration, () => {
    setRippleArray([]);
  });

  const addRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <button
      className={className}
      onMouseDown={addRipple}
      onClick={(e) => {
        onClick && onClick(e);
      }}
      type={type}
      disabled={disabled ? disabled : loading}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, i) => {
          return (
            <span
              className={styles.circle}
              key={i}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
                animationDuration: `${duration}ms`
              }}
            />
          );
        })}
      {loading && <Spinner className={styles.spinner} />}

      {content}
    </button>
  );
};

export default Ripple;

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Ripple.defaultProps = {
  duration: 850,
  color: '#ffffff80',
  type: 'button'
};
