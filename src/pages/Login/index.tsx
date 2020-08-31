import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import { Container, Background } from './styles';

interface IErrorMessage {
  path: string;
  message: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();

  const { login } = useAuth();

  const handleLoginSubmit = useCallback(
    async event => {
      event.preventDefault();
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(
          { email, password },
          {
            abortEarly: false,
          },
        );

        setEmailError('');
        setPasswordError('');

        await login({ email, password });

        history.push('/dashboard');
      } catch (err) {
        err.inner.forEach((error: IErrorMessage) =>
          error.path === 'email'
            ? setEmailError(error.message)
            : setPasswordError(error.message),
        );
      }
    },
    [email, password, history, login],
  );

  return (
    <Container emailError={!!emailError} passwordError={!!passwordError}>
      <Background />
      <section>
        <h1>Controle todos seus investimentos</h1>
        <h2>em um só lugar</h2>

        <img src={logoImg} alt="GoFinance" />

        <form onSubmit={handleLoginSubmit}>
          <h3>Faça o seu login</h3>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          {emailError && <span>{emailError}</span>}

          <label htmlFor="password">
            <input
              type="password"
              id="password"
              placeholder="Digite a sua senha"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          {passwordError && <span>{passwordError}</span>}

          <button type="submit">Entrar</button>
          <Link to="/signup">Não tenho cadastro</Link>
        </form>
      </section>
    </Container>
  );
};

export default Login;
