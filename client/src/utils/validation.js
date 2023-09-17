import * as Yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

const messages = {
  firstName: 'The First name is required!',
  lastName: 'The Last name is required!',
  email: 'The Email must be a be valid!',
  password: 'Password must contain 8 characters, one Uppercase, one Lowercase, one Number and one Special case character!!',
  repassword: 'Passwords must match!!'
};

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(messages.firstName),
  lastName: Yup.string().required(messages.lastName),
  email: Yup.string().required(messages.email).email(messages.email),
  // password: Yup.string().required(messages.password).matches(passwordPattern, messages.password),
  repassword: Yup.string()
    .required(messages.repassword)
    .oneOf([Yup.ref('password'), null], messages.repassword)
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(messages.email).email(messages.email),
  // password: Yup.string().required(messages.password).matches(passwordPattern, messages.password),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().required(messages.email).email(messages.email)
});

export const newPasswordSchema = Yup.object().shape({
  // password: Yup.string().required(messages.password).matches(passwordPattern, messages.password),
  repassword: Yup.string()
  .required(messages.repassword)
  .oneOf([Yup.ref('password'), null], messages.repassword)
});
