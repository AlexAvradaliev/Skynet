import AuthFooter from '../../components/Auth/AuthFooter/AuthFooter';
import RegisterForm from '../../components/Auth/Register/Register';
import WrapperForm from '../../components/Auth/WrapperForm/WrapperForm';

const Register = () => {
  return (
    <WrapperForm>
      <RegisterForm />
      <AuthFooter style={{ marginTop: '16px' }} />
    </WrapperForm>
  );
};

export default Register;
