import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import * as request from '../../../utils/requester';
import StyledInput from '../../Common/StyledInput/StyledInput';
import { resetPasswordSchema } from '../../../utils/validation';
import { updateLoading } from '../../../features/slices/app';
import { ChevronLeft } from '../../Common/SVG';
import { routes } from '../../../constants/routes';
import Error from '../../Common/Notification/Error';
import Ripple from '../../Common/Ripple/Ripple';

import styles from '../Auth.module.css';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(updateLoading(true));
    request
      .post(routes.FORGOT_PASSWORD, values)
      .then(() => {
        return navigate('/login');
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
      email: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit
  });

  return (
    <>
      <h1 className={`${styles.title} ${styles.titleFP}`}>Forgot your password?</h1>
      <p className={`${styles.text} ${styles.textFP}`}>
        Please enter the email address associated with your account and We will email you a link to reset your password.
      </p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={`${styles.wrapper__inputs} ${styles.wrapper__inputs__FP}`}>
          <StyledInput
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            title="Email address"
            name="email"
            idInput="StyledInputResetPasswordEmail"
          />
          <Error error={formik.errors?.email} touched={formik.touched.email} />
        </div>
        <Ripple content="Send Request" className={styles.button} type={'submit'} duration={1000} disabled={!(formik.isValid && formik.dirty)} />
      </form>
      <Link to="/login" className={`${styles.link} ${styles.linkFP}`}>
        <ChevronLeft />
        Return to &nbsp; <span>Sign in </span>
      </Link>
    </>
  );
};

export default ResetPasswordForm;
