import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLogin = false;

  return isLogin ? children : <Navigate to={'/'} />;
}

export default PrivateRoute;
