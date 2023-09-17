import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OPTInputs from './OPTInputs/OPTInputs';
import * as request from '../../../utils/requester';
import { newState } from '../../../features/slices/auth';
import { updateLoading } from '../../../features/slices/app';
import { routes } from '../../../constants/routes';

import styles from './OTPForm.module.css';
import Ripple from '../../Common/Ripple/Ripple';

const inputs = 6;

const OTPForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useSelector((store) => store.auth);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [send, setSend] = useState('');

  const onChange = (value) => {
    setOtp(value);
    setError('');
  };

  const isAllDigits = /^\d+$/.test(otp);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isAllDigits) {
      return;
    }

    setError('');
    setSend('');
    dispatch(updateLoading(true));
    request
      .post(routes.VERIFY, { otp, email })
      .then((res) => {
        dispatch(
          newState({
            isLoggedIn: true,
            accessToken: res.accessToken || '',
            refreshToken: res.refreshToken || '',
            firstName: res.firstName || '',
            lastName: res.lastName || '',
            user_id: res._id || '',
            email: res.email || ''
          })
        );
        setOtp('');
        return navigate('/');
      })
      .catch((err) => {
        setError(err.errors?.message);
      })
      .finally(() => {
        dispatch(updateLoading(false));
      });
  };

  const resend = () => {
    setError('');
    setSend('');
    request
      .post(routes.SEND_OTP, { email })
      .then((res) => {
        setSend(res.message);
        setError('');
      })
      .catch((err) => {
        setError(err.errors.message);
      });
  };

  return (
    <>
      <div>
        <h4 className={styles.title}>Please Verify OTP</h4>
        <p className={styles.desc}>Sent to email: {email}</p>
      </div>
      <form className={styles.form} onSubmit={submitHandler}>
        <OPTInputs value={otp} valueLength={inputs} onChange={onChange} />
        {error && <p className={styles.error}>{error}</p>}
        <Ripple content="Verify" className={styles.button} type={'submit'} duration={1000} disabled={isAllDigits && otp.length === inputs ? false : true} />
      </form>
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>
          Back to Login
        </Link>
        <button onClick={resend} className={styles.link}>
          Get new code.
        </button>
      </div>
      {send && <p className={styles.success}>{send}</p>}
    </>
  );
};

export default OTPForm;
