import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header/Header';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
