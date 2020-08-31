import styled from 'styled-components';

export const Container = styled.section`
  h2 {
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }

  div {
    width: 100%;
    margin-bottom: 40px;
  }

  @media(min-width: 768px) {
    h2 {
      margin-bottom: 20px;
      margin-top: 10px;
    }
  }

  @media(min-width: 1024px) {
    h2 {
      margin-bottom: 30px;
      margin-top: 30px;
    }
  }

  @media(min-width: 1440px) {
    h2 {
      margin-bottom: 40px;
      margin-top: 30px;
    }
  }
`;
