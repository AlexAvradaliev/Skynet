import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import * as request from '../../../utils/requester';
import { setEmail, newState } from '../../../features/slices/auth';
import { updateLoading } from '../../../features/slices/app';
import { Eye, EyeClose } from '../../Common/SVG';
import StyledInput from '../../Common/StyledInput/StyledInput';
import Error from '../../Common/Notification/Error';
import { loginSchema } from '../../../utils/validation';
import { routes } from '../../../constants/routes';
import Ripple from '../../Common/Ripple/Ripple';

import styles from '../Auth.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleEye, setToggleEye] = useState(false);
  const onToggle = () => {
    setToggleEye((state) => !state);
  };

  const onSubmit = (values) => {
    dispatch(updateLoading(true));
    request
      .post(routes.LOGIN, values)
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
        if (err.status === 403) {
          dispatch(setEmail(values.email));
          return navigate('/verify');
        } else {
          formik.setErrors(err.errors);
        }
      })
      .finally(() => {
        dispatch(updateLoading(false));
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit
  });

  return (
    <>
      <h1 className={styles.title}>Login to Skynet.</h1>
      <p className={styles.text}>
        New user?
        <Link to="/register">Create an account</Link>
      </p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={styles.wrapper__inputs}>
          <div className={formik.errors.email ? styles.wrapper__errors : ''}>
            <StyledInput
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              error={formik.errors.email}
              title="Email address"
              name="email"
              type="text"
              idInput="StyledInputRegisterEmail"
            />
            {<Error error={formik.errors?.email} touched={formik.touched.email} />}
          </div>
          <div className={formik.errors?.password ? styles.wrapper__errors : ''}>
            <StyledInput
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              error={formik.errors?.password}
              title="Password"
              name="password"
              idInput="StyledInputRegisterPassword"
              type={toggleEye ? 'text' : 'password'}>
              <button type="button" className={styles.icon__button} onClick={onToggle}>
                {toggleEye ? <EyeClose /> : <Eye />}
              </button>
            </StyledInput>
            <Error error={formik.errors?.password} touched={formik.touched.password} />
          </div>
          <Link to="/reset-password" className={styles.link}>
            Forgot password?
          </Link>
        </div>
        <Ripple content="Login" className={styles.button} type={'submit'} duration={1000} disabled={!(formik.isValid && formik.dirty)} />
      </form>
    </>
  );
};

export default Login;
