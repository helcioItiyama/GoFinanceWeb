import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from './routes';
import GlobalStyles from './styles/global';
import { AuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Route />
      </AuthProvider>
      <GlobalStyles />
      <ToastContainer autoClose={2000} />
    </Router>
  );
};

export default App;
