import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/queries/useAuth';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLogin, isLoginLoading } = useAuth();

  if (isLoginLoading) {
    return <p>로딩중...</p>;
  }

  return isLogin ? children : <Navigate to={'/'} />;
}

export default PrivateRoute;
