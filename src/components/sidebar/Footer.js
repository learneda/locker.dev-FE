import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const Footer = props => {
  return <Container>Footer</Container>
}

Footer.propTypes = {}

export default Footer

const Container = styled.section`
  position: sticky;
  top: 440px;
  left: 0px;
  height: 150px;
  width: 100%;
  border: 1px solid dodgerblue;
  z-index: 1;
  @media (max-width: 1200px) {
    opacity: 0;
    display: none;
  }
`
