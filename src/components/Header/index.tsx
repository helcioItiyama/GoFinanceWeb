import React from 'react';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import logoImg from '../../assets/logo.png';
import { Container } from './styles';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <Container>
      <div>
      <img src={logoImg} alt="GoFinance" />

        <h2>
          Bem-vindo(a),
          <strong>{user?.name}</strong>
        </h2>
      </div>

        <button type="button" onClick={logout}>
          <RiLogoutCircleRFill size={20} />
          logout
        </button>
    </Container>
  );
};

export default Header;
