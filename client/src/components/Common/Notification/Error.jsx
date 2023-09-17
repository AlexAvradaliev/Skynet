import PropTypes from 'prop-types';

import styles from './Error.module.css';

const Error = ({ error, touched }) => {
  return <>{error && touched && <p className={styles.text__error}>{error}</p>}</>;
};

export default Error;

Error.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool
};
