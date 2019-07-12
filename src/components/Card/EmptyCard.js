import React from 'react'
import styled from 'styled-components'

const EmptyCard = () => {
  return <StyledEmptyCard />
}

export default EmptyCard

const StyledEmptyCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 358px;
  height: 365px;
  margin: 15px 20px;
  border-radius: 6px;
  @media (max-width: 820px) {
    display: none;
  }
`
