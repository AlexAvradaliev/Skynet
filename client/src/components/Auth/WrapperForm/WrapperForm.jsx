import Skynet from './Skynet.jsx';

import styles from './WrapperForm.module.css';

const WrapperForm = ({ children }) => {
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <Skynet />
      </div>
      {children}
    </section>
  );
};

export default WrapperForm;
