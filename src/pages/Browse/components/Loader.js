import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import styled from 'styled-components'

const Loader = props => {
  return (
    <StyledLoader>
      <Loading />
    </StyledLoader>
  )
}

Loader.propTypes = {}

export default Loader

const StyledLoader = styled.div`
  margin: 75px auto;
  text-align: center;
`
