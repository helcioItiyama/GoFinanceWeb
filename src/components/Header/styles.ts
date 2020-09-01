import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #10c0c6;
  padding: 10px 20px;

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      img {
        height: 40px;
        margin-bottom: 2px;
      }

      h2 {
        font-size: 10px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #000000;

        strong {
          margin-left: 10px;
          font-weight: bold;
        }
      }

    }
      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        color: #000000;
        font-weight: bold;
        padding: 6px;
        border: 1px solid black;
        border-radius: 4px;
        background: ${darken(0.08, '#10c0c6')};

        &:hover {
          color: #ffffff;
          border: 1px solid #ffffff;
        }
      }
    }

    @media(min-width: 768px) {
      section {
        div {
          h2 {
            font-size: 14px;
            letter-spacing: 1px;
          }
        }
      }
    }

    @media(min-width: 1024px) {
        padding: 10px 50px;
    }

    @media(min-width: 1055px) {
      padding: 10px 0;
      section {
        width: 995px;
        margin: 0 auto;
      }
    }
`;
