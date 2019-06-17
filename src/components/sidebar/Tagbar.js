import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const Tagbar = props => {
  return <Container>Top Tags</Container>
}

Tagbar.propTypes = {}

export default Tagbar

const Container = styled.section`
  height: 450px;
  width: 290px;
  border: 1px solid dodgerblue;
  position: fixed;
  top: 290px;
`
