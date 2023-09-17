import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import * as request from '../../../utils/requester';
import { newState } from '../../../features/slices/auth';
import { updateLoading } from '../../../features/slices/app';
import { Eye, EyeClose } from '../../Common/SVG';
import StyledInput from '../../Common/StyledInput/StyledInput';
import Error from '../../Common/Notification/Error';
import { registerSchema } from '../../../utils/validation';
import { routes } from '../../../constants/routes';
import Ripple from '../../Common/Ripple/Ripple';

import styles from '../Auth.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleEye, setToggleEye] = useState(false);

  const onToggle = () => {
    setToggleEye((state) => !state);
  };
  const onSubmit = (values, actions) => {
    dispatch(updateLoading(true));
    request
      .post(routes.REGISTER, values)
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
        actions.resetForm();

        return navigate('/verify');
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: ''
    },
    validationSchema: registerSchema,
    onSubmit
  });
  return (
    <>
      <h1 className={styles.title}>Get started with Skynet.</h1>
      <p className={styles.text}>
        Already have an account?
        <Link to="/login">Sign in</Link>
      </p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={styles.wrapper__inputs}>
          <div className={styles.wrapper__fields}>
            <div className={formik.errors?.firstName ? styles.wrapper__errors : ''}>
              <StyledInput
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                touched={formik.touched.firstName}
                error={formik.errors?.firstName}
                title="First name"
                name="firstName"
                idInput="StyledInputRegisterFirstname"
              />
              <Error error={formik.errors?.firstName} touched={formik.touched.firstName} />
            </div>

            <div className={formik.errors?.lastName ? styles.wrapper__errors : ''}>
              <StyledInput
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                touched={formik.touched.lastName}
                error={formik.errors?.lastName}
                title="Last name"
                name="lastName"
                idInput="StyledInputRegisterLastname"
              />
              <Error error={formik.errors?.lastName} touched={formik.touched.lastName} />
            </div>
          </div>
          <div className={formik.errors?.email ? styles.wrapper__errors : ''}>
            <StyledInput
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              error={formik.errors?.email}
              title="Email address"
              name="email"
              type="email"
              idInput="StyledInputRegisterEmail"
            />
            <Error error={formik.errors?.email} touched={formik.touched.email} />
          </div>
          <div className={styles.wrapper__fields}>
            <div className={formik.errors?.password ? styles.wrapper__errors : ''}>
              <StyledInput
                onChange={formik.handleChange}
                value={formik.values?.password}
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
            <div className={formik.errors?.repassword ? styles.wrapper__errors : ''}>
              <StyledInput
                onChange={formik.handleChange}
                value={formik.values.repassword}
                onBlur={formik.handleBlur}
                touched={formik.touched.repassword}
                error={formik.errors?.repassword}
                title="Confirm password"
                name="repassword"
                idInput="StyledInputRegisterRepassword"
                type={toggleEye ? 'text' : 'password'}
              />
              <Error error={formik.errors?.repassword} touched={formik.touched.repassword} />
            </div>
          </div>
        </div>
        <Ripple content="Register" className={styles.button} type={'submit'} duration={1000} disabled={!(formik.isValid && formik.dirty)} />
      </form>
      <p className={styles.terms}>
        By signing up, I agree to <a>Terms of Service</a> and <a>Privacy Policy</a>.
      </p>
    </>
  );
};

export default Register;
