import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<p>login</p>} />
      <Route path="/register" element={<p>register</p>} />
      <Route path="/new-password/:token" element={<p>new-password</p>} />
      <Route path="/reset-password" element={<p>reset-password</p>} />
      <Route path="/logout" element={<p>logout</p>} />
      <Route path="/verify" element={<p>verify</p>} />
    </Routes>
  );
};

export default Router;
