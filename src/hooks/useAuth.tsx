import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  login(credentials: ILoginCredentials): Promise<void>;
  logout(): void;
  user: IUser;
}

interface IAuthState {
  token: string;
  user: IUser;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoFinance:token');
    const user = localStorage.getItem('@GoFinance:user');

    if (token && user) {
      api.defaults.headers.authorization = `beares ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `beares ${token}`;

      localStorage.setItem('@GoFinance:token', token);
      localStorage.setItem('@GoFinance:user', JSON.stringify(user));

      setData({ token, user });

      toast.success('Login efetuado com sucesso!');
    } catch (err) {
      toast.error('Falha ao efetuar o login');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@GoFinance:token');
    localStorage.removeItem('@GoFinance:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
