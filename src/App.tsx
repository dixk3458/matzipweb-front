import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header/Header';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="wrapper-header">
          <Header />
        </div>
        <div className="wrapper-outlet">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
