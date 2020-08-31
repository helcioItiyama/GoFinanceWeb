import React from 'react';
import Login from '../../pages/Login';
import { render, fireEvent, waitFor } from '@testing-library/react';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../auth/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn()
  }),
}));


describe('Login Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to login', async () => {
    const { getByPlaceholderText, getByText } = render(<Login/>);

    const emailField = getByPlaceholderText("Digite seu email");
    const passwordField = getByPlaceholderText("Digite a sua senha");
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: {value: 'john.doe@example.com'}});
    fireEvent.change(passwordField, {target: {value: '123456'}});

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to login with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login/>);

    const emailField = getByPlaceholderText("Digite seu email");
    const passwordField = getByPlaceholderText("Digite a sua senha");
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: {value: 'not-valid-email'}});
    fireEvent.change(passwordField, {target: {value: '123456'}});

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled;
    });
  });

  it('should not be able to login with invalid password', async () => {
    const { getByPlaceholderText, getByText } = render(<Login/>);

    const emailField = getByPlaceholderText("Digite seu email");
    const passwordField = getByPlaceholderText("Digite a sua senha");
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: {value: 'john.doe@gmail.com'}});
    fireEvent.change(passwordField, {target: {value: ''}});

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled;
    });
  });
});




