import React from 'react'
import PropTypes from 'prop-types'
import brand from 'assets/svg/learnlockerbrand2.svg'
import styled from 'styled-components'
function Brand(props) {
  return (
    <Container>
      <img src={brand} alt='brand' />
    </Container>
  )
}

Brand.propTypes = {}

export default Brand

const Container = styled.div`
  height: 35px;
  width: 35px;
  img {
    width: 100%;
  }
`
