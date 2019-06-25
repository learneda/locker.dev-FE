import React from 'react'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import styled from 'styled-components'

const Loader = () => {
  return (
    <StyledLoader>
      <Loading />
    </StyledLoader>
  )
}

export default Loader

const StyledLoader = styled.div`
  margin: 75px auto;
  text-align: center;
`
