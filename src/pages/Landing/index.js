import React from 'react';
import Body from './Body';
import styled from 'styled-components';
import { customWrapper } from '../../components/mixins';

export default () => {
  return (
    <Wrapper>
      <Body />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
`;
