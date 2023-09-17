import { Link } from 'react-router-dom';

import Divider from '../../Common/Divider/Divider';
import { Facebook, Google, LinkedIn } from '../../Common/SVG';
import { host, routes } from '../../../constants/routes';

import styles from './AuthFooter.module.css';

const AuthFooter = ({ style }) => {
  const divider = {
    width: '50%',
    height: '1px',
    alignSelf: 'center'
  };

  return (
    <footer>
      <div className={styles.dividers} style={style}>
        <Divider style={divider} />
        <p className={styles.divider__text}>OR</p>
        <Divider style={divider} />
      </div>
      <div className={styles.socials} style={style}>
        <Link to={`${host}${routes.GOOGLE}`} className={styles.button}>
          <Google />
        </Link>
        <Link to={`${host}${routes.FACEBOOK}`} className={styles.button}>
          <Facebook />
        </Link>
        <Link to={`${host}${routes.LINKEDIN}`} className={styles.button}>
          <LinkedIn />
        </Link>
      </div>
    </footer>
  );
};

export default AuthFooter;
