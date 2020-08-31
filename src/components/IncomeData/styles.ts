import styled from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  width: 280px;
  height: 200px;
  background-color: #777777;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto 20px;

  header {
    background-color: ${props =>
      props.color === 'Renda Fixa' ? '#29388f' : '#67178a'};
    padding: 8px;

    h2 {
      text-align: center;
    }
  }

  section {
    width: 100%;
    height: 160px;
    overflow-y: scroll;

    > div {
      padding: 8px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      nav {
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
          color: ${props =>
            props.color === 'Renda Fixa' ? '#29388f' : '#67178a'};
          font-size: 20px;
        }

        P {
          margin-right: 10px;
        }

        strong {
          color: #000000;
          font-weight: bold;
        }
      }

      div {
        display: flex;
        align-items: center;

        button {
          font-size: 20px;
          border: none;
          background: transparent;
          color: #000000;

          &:hover {
            color: #ffffff;
          }

          & + button {
            margin-left: 10px;
            color: #c83349;

            &:hover {
              color: ${darken(0.1, '#c83349')};
            }
          }
        }
      }
    }
  }

  @media(min-width: 425px) {
    width: 380px;
  }

  @media(min-width: 768px) {
    width: 320px;
    margin: 20px auto;
  }

  @media(min-width: 1024px) {
    width: 380px;
  }

  @media(min-width: 1440px) {
    width: 500px;
    margin: 40px auto;
  }
`;
