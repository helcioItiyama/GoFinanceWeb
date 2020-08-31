import styled from 'styled-components';
import { darken } from 'polished';
import loginImg from '../../assets/login.jpg';

interface ContainerProps {
  emailError: boolean;
  passwordError: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  align-items: stretch;

  section {
    width: 100%;
    max-width: 700px;

    h1 {
      margin-top: 40px;
      margin-bottom: 20px;
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
      font-size: 32px;
    }

    h2 {
      text-transform: uppercase;
      text-align: center;
      font-size: 25px;
    }

    img {
      display: block;
      width: 300px;
      margin: 20px auto;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      h3 {
        font-size: 25px;
        margin-bottom: 20px;
      }

      label {
        margin-bottom: 10px;
        input {
          width: 200px;
          height: 30px;
          padding: 0 10px;
          border-radius: 4px;
          border: ${props => (props.emailError ? '3px solid #c83349' : 'none')};
        }
        input[type='password'] {
          border: ${props =>
            props.passwordError ? '3px solid #c83349' : 'none'};
        }
      }

      span {
        justify-self: left;
        font-size: 16px;
        font-weight: bold;
        color: #c83349;
        margin-bottom: 10px;
      }

      button {
        padding: 8px 83px;
        margin-bottom: 10px;
        background: #10c0c6;
        border-radius: 4px;
        border: none;

        &:hover {
          background: ${darken(0.2, '#10c0c6')};
        }
      }

      a {
        text-decoration: none;
        color: #fff;
        cursor: pointer;

        &:hover {
          color: #10c0c6;
        }
      }
    }

    @media (min-width: 768px) {
      max-width: 770px;

      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
      }

      h2 {
        font-size: 30px;
      }

      img {
        margin: 40px auto;
      }

      form {
        h3 {
          font-size: 30px;
          margin-bottom: 30px;
        }

        label {
          margin-bottom: 20px;
          input {
            width: 300px;
            height: 40px;
            padding: 0 20px;
            font-size: 20px;

            &::placeholder {
              font-size: 20px;
            }
          }
        }
        button {
          padding: 10px 129px;
          margin-bottom: 20px;
          font-size: 18px;
        }

        a {
          font-size: 16px;
          letter-spacing: 1px;
        }
      }
    }

    @media (min-width: 1024px) {
      width: 600px;
    }

    @media (min-width: 1440px) {
      width: 800px;

      h1 {
        margin-top: 100px;
        margin-bottom: 40px;
        font-size: 50px;
      }

      h2 {
        font-size: 40px;
      }

      img {
        margin: 60px auto;
      }

      form {
        h3 {
          font-size: 45px;
          margin-bottom: 40px;
        }

        label {
          margin-bottom: 25px;
          input {
            width: 400px;
            height: 55px;
            padding: 0 20px;
            font-size: 26px;

            &::placeholder {
              font-size: 26px;
            }
          }
        }

        button {
          padding: 14px 169px;
          margin-bottom: 20px;
          font-size: 26px;
        }

        a {
          font-size: 22px;
          letter-spacing: 1px;
        }
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  height: 100vh;
  background: url(${loginImg}) no-repeat center;
  background-size: cover;
`;
