import React from 'react'
import styled from 'styled-components'

export const withLayout = Component => {
  console.log(Component)
  return props => {
    console.log(props)
    return (
      <>
        <StyledContainer>
          <Component {...props} />
        </StyledContainer>
      </>
    )
  }
}
const StyledContainer = styled.div`
  width: 80%;
  margin: 50px auto 0;
  @media (max-width: 900px) {
    width: 90%;
    margin: 30px auto 0;
  }
`
