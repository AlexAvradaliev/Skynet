import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { newState } from '../../../features/slices/auth';
import { updateLoading } from '../../../features/slices/app';
import * as request from '../../../utils/requester';
import StyledInput from '../../Common/StyledInput/StyledInput';
import { ChevronLeft, Eye, EyeClose } from '../../Common/SVG';
import { newPasswordSchema } from '../../../utils/validation';
import { routes } from '../../../constants/routes';
import Ripple from '../../Common/Ripple/Ripple';

import styles from '../Auth.module.css';

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const [toggleEye, setToggleEye] = useState(false);

  const onToggle = () => {
    setToggleEye((state) => !state);
  };

  const onSubmit = (values) => {
    dispatch(updateLoading(true));
    request
      .post(routes.RESET_PASSWORD, { ...values, token })
      .then((res) => {
        formik.setErrors({});

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
        return navigate('/');
      })
      .catch((err) => {
        formik.setErrors(err.errors);
      })
      .finally(() => {
        dispatch(updateLoading(false));
      });
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      repassword: ''
    },
    validationSchema: newPasswordSchema,
    onSubmit
  });
  return (
    <>
      <h1 className={`${styles.title} ${styles.titleFP}`}>Reset Password</h1>
      <p className={`${styles.text} ${styles.textFP}`}>Please set your new password.</p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={`${styles.wrapper__inputs} ${styles.wrapper__inputs__FP}`}>
          <StyledInput
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            title="Password"
            name="password"
            idInput="StyledInputNewPasswordPassword"
            type={toggleEye ? 'text' : 'password'}>
            <button type="button" className={styles.icon__button} onClick={onToggle}>
              {toggleEye ? <EyeClose /> : <Eye />}
            </button>
          </StyledInput>
          <StyledInput
            onChange={formik.handleChange}
            value={formik.values.repassword}
            onBlur={formik.handleBlur}
            error={formik.errors.repassword}
            touched={formik.touched.repassword}
            title="Confirm New Password"
            name="repassword"
            idInput="StyledInputNewPasswordRePassword"
            type={toggleEye ? 'text' : 'password'}></StyledInput>
        </div>
        <Ripple content="Update Password" className={styles.button} type={'submit'} duration={1000} disabled={!(formik.isValid && formik.dirty)} />
      </form>
      <Link to="/login" className={`${styles.link} ${styles.linkFP}`}>
        <ChevronLeft />
        Return to &nbsp; <span>Sign in </span>
      </Link>
    </>
  );
};

export default NewPasswordForm;
