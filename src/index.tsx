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
import RetryErrorBoundary from './components/common/RetryErrorBoundary/RetryErrorBoundary';

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
        element: (
          <RetryErrorBoundary>
            <HomePage />
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/signin',
        element: (
          <RetryErrorBoundary>
            <SigninPage />
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/signup',
        element: (
          <RetryErrorBoundary>
            <SignupPage />,
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/map',
        element: (
          <RetryErrorBoundary>
            <PrivateRoute>
              <MapHomePage />
            </PrivateRoute>
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/feed',
        element: (
          <RetryErrorBoundary>
            <Suspense fallback={<SuspenseLoading />}>
              <PrivateRoute>
                <FeedHomePage />
              </PrivateRoute>
            </Suspense>
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/feed/:id',
        element: (
          <RetryErrorBoundary>
            <Suspense fallback={<SuspenseLoading />}>
              <PrivateRoute>
                <FeedDetailPage />
              </PrivateRoute>
            </Suspense>
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/search',
        element: (
          <RetryErrorBoundary>
            <PrivateRoute>
              <SearchHomePage />
            </PrivateRoute>
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/user/:email',
        element: (
          <RetryErrorBoundary>
            <PrivateRoute>
              <UserDetailPage />
            </PrivateRoute>
          </RetryErrorBoundary>
        ),
      },
      {
        path: '/edit',
        element: (
          <RetryErrorBoundary>
            <PrivateRoute>
              <EditHomePage />
            </PrivateRoute>
          </RetryErrorBoundary>
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
