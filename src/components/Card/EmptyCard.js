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
  /* background-color: #fff; */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  @media (max-width: 820px) {
    display: none;
  }
  @media (max-width: 570px) {
    display: none;
  }
`
