import React from 'react'
import Body from './Body'
import styled from 'styled-components'
import { customWrapper } from '../../components/mixins'

export default () => {
  return (
    <Wrapper>
      <Body />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media (max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
  @media (max-width: 600px) {
    ${customWrapper('95%', '0 auto')}
  }
  margin-top: 100px;
  @media (max-width: 992px) {
    margin-top: 0;
  }
`
