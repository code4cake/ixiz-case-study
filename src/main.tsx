import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster, type ToastOptions } from 'react-hot-toast';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const toastOptions: ToastOptions = {
  style: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '5px',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster toastOptions={toastOptions} />
    </QueryClientProvider>
  </React.StrictMode>,
);
