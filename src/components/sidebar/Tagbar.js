import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axiosAPI from '../../apis/axiosAPI'
const Tagbar = props => {
  useEffect(() => {
    axiosAPI.get('/tags/top').then(result => {
      console.log(result)
    })
  }, [])
  return <Container>Top Tags</Container>
}

Tagbar.propTypes = {}

export default Tagbar

const Container = styled.section`
  height: 420px;
  width: 290px;
  border: 1px solid dodgerblue;
  position: sticky;
  top: 310px;
  z-index: 1;
  @media (max-width: 910px) {
    display: none;
  }
`
