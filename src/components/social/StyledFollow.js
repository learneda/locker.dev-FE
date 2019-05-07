import styled from 'styled-components';

export const StyledFollow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  &::after {
    content: '';
    flex: 0 0 29%;
  }

  a:hover {
    h2 {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 0 0 29%;
    align-items: center;
    background: #fff;
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 30px;
    justify-content: center;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 5px auto;
    }
    h2 {
      opacity: 0.8;
      transition: 200ms ease-out;
    }
    button {
      padding: 0;
      background: #4064f2;
      color: #fff;
      border: none;
      padding: 5px 10px;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.4rem;
    }
  }
`;
