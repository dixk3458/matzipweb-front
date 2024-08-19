import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SigninPage from './pages/auth/Signin/SigninPage';
import SignupPage from './pages/auth/Signup/SignupPage';
import MapHomePage from './pages/map/MapHome/MapHomePage';
import HomePage from './pages/home/Home/HomePage';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import FeedHomePage from './pages/feed/FeedHome/FeedHomePage';
import FeedDetailPage from './pages/feed/FeedDetail/FeedDetailPage';
import SearchHomePage from './pages/search/SearchHome/SearchHomePage';
import UserDetailPage from './pages/user/UserDetail/UserDetailPage';
import EditHomePage from './pages/edit/EditHome/EditHomePage';
import SuspenseLoading from './components/common/SuspenseLoading/SuspenseLoading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/map',
        element: (
          <PrivateRoute>
            <MapHomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/feed',
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseLoading />}>
              <FeedHomePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: '/feed/:id',
        element: (
          <PrivateRoute>
            <FeedDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/search',
        element: (
          <PrivateRoute>
            <SearchHomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/user/:email',
        element: (
          <PrivateRoute>
            <UserDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit',
        element: (
          <PrivateRoute>
            <EditHomePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
