import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;

  h1 {
    text-align: center;
    margin-top: 30px;
  }

  @media(min-width:  768px) {
    > div {
      display: flex;
      flex-direction: row;
    }

    h1 {
      margin-top: 40px;
    }
  }

  @media(min-width:  1024px) {
    h1 {
      margin-bottom: 10px;
    }
  }

  @media(min-width:  1440px) {
    > div {
      max-width: 1300px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 10px;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;

  > section {
    background: #10c0c6;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;

    > button {
      position: absolute;
      font-size: 20px;
      background: transparent;
      border: none;
      right: 20px;
      top: 20px;

      svg {
        color: #c83349;
      }
    }

    > h1 {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      color: #000000;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;

      label {
        width: 100%;
        font-size: 14px;
        font-weight: bold;

        & + label {
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          height: 46px;
          margin-top: 4px;
          padding: 0 20px;
        }
        select {
          width: 100%;
          height: 46px;
          margin-top: 4px;
        }
      }

      button {
        position: relative;
        width: 100%;
        height: 46px;
        font-size: 16px;
        font-weight: bold;
        background: ${darken(0.2, '#10c0c6')};
        border: none;
        box-shadow: 0px 0px 10px inset;

        &:hover {
          background: ${darken(0.3, '#10c0c6')};
        }
      }
    }
  }

  @media(min-width: 375px) {
    > section {
      width: 340px;
    }
  }

  @media(min-width: 425px) {
    > section {
      width: 350px;
    }
  }

  @media(min-width: 1024px) {
    > section {
      width: 500px;

      form {
        label {
            margin-bottom: 8px;
          & + label {
            margin-bottom: 20px;
          }
        }

        button {
          margin-top: 10px;
        }
      }
    }
  }
`;
