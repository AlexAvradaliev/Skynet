import AuthFooter from '../../components/Auth/AuthFooter/AuthFooter';
import LoginForm from '../../components/Auth/Login/Login';
import WrapperForm from '../../components/Auth/WrapperForm/WrapperForm';

const Login = () => {
  return (
    <WrapperForm>
      <LoginForm />
      <AuthFooter style={{ marginTop: '16px' }} />
    </WrapperForm>
  );
};

export default Login;
