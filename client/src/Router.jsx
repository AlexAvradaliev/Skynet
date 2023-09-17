import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<>...</>}>
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import('./pages/Auth/Login')));
const Register = Loadable(lazy(() => import('./pages/Auth/Register')));
const NewPassword = Loadable(lazy(() => import('./pages/Auth/NewPassword')));
const ForgotPassword = Loadable(lazy(() => import('./pages/Auth/ForgotPassword')));
const Verify = Loadable(lazy(() => import('./pages/Auth/Verify')));

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new-password/:token" element={<NewPassword />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/logout" element={<p>logout</p>} />
    </Routes>
  );
};

export default Router;
