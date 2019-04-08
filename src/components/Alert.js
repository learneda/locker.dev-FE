import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../assets/svg/x.svg';

export default function Alert({ message, close }) {
  return (
    <Container>
      <div />
      <Message>{message}</Message>
      <X onClick={close} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(3, 177, 45, 0.85);
  color: white;
  font-weight: 500;
  padding: 18px 23px;
  width: 100vw;
`;

const Message = styled.span`
  text-align: center;
`;
