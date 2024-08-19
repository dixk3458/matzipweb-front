import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/queries/useAuth';
import SuspenseLoading from '../SuspenseLoading/SuspenseLoading';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLogin, isLoginLoading } = useAuth();

  if (isLoginLoading) {
    return <SuspenseLoading />;
  }

  return isLogin ? children : <Navigate to={'/'} />;
}

export default PrivateRoute;
