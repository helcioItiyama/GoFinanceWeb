import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;

    label:first-child {
      font-weight: bold;

      select {
        width: 100%;
        height: 36px;
        padding: 0 6px;
      }
    }

    label {
      margin-bottom: 10px;

      input{
        width: 100%;
        height: 36px;
      }
    }

    button {
      width: 100%;
      height: 36px;
      margin-top: 10px;
      background-color: #10c0c6;

      &:hover {
        background-color: ${darken(0.1, '#10c0c6')};
      }
    }

    label {
      input[type='date'] {
        text-align: center;
        margin-top: 10px;
      }
    }
  }

  @media(min-width: 768px) {
    form {
      padding: 30px;
      font-size: 18px;

      label {
        font-size: 18px;

        input {
          font-size: 18px;

          &::placeholder {
            font-size: 18px;
          }
        }

        select {
          font-size: 16px;
        }
      }

      button {
        font-size: 18px;
      }
    }
  }

  @media(min-width: 1024px) {
    form {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20px 60px;

      label {
        width: 200px;
        font-size: 16px;

        &:first-child {
          height: 52px;

            select {
              height: 30px;
              font-size: 14px;
              margin-top: 2px;
            }
        }

        input {
          height: 30px;
          font-size: 14px;
          margin-top: 2px;
        }

      }

      button {
        width: 180px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        height: 30px;
      }
    }
  }

  @media(min-width: 1440px) {
    form {
      padding: 20px 80px;
  }
`;