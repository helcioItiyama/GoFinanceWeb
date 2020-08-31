import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import { Container, Background } from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';

interface IErrorMessage {
  path: string;
  message: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();

  const handleSignUpSubmit = useCallback(
    async event => {
      event.preventDefault();
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(
          { name, email, password },
          {
            abortEarly: false,
          },
        );

        setEmailError('');
        setPasswordError('');

        await api.post('/users', {name, email, password});

        toast.success('Cadastro efetuado com sucesso. Você já pode realizar o seu login!')

        history.push('/dashboard');
      } catch (err) {
        err.inner.forEach((error: IErrorMessage) => {
          switch (error.path) {
            case 'name':
              setNameError(error.message);
              break;
            case 'email':
              setEmailError(error.message);
              break;
            case 'password':
              setPasswordError(error.message);
              break;
            default:
              return;
          }
        });
      }
    },
    [name, email, password, history],
  );

  return (
    <Container
      nameError={!!nameError}
      emailError={!!emailError}
      passwordError={!!passwordError}
    >
      <Background />
      <section>
        <h1>Controle todos seus investimentos</h1>
        <h2>em um só lugar</h2>

        <img src={logoImg} alt="GoFinance" />

        <form onSubmit={handleSignUpSubmit}>
          <h3>Faça o seu cadastro</h3>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          {nameError && <span>{nameError}</span>}

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
              placeholder="Crie uma senha"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          {passwordError && <span>{passwordError}</span>}

          <button type="submit">Cadastrar</button>
          <Link to="/">Ir para o login</Link>
        </form>
      </section>
    </Container>
  );
};

export default SignUp;
