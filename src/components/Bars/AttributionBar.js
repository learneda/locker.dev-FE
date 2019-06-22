import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { selectLogo, printRootUrl } from 'helpers'
const AttributionBar = ({ url, className }) => {
  return (
    <Container className={className}>
      {selectLogo(url)}
      {printRootUrl(url)}
    </Container>
  )
}

AttributionBar.propTypes = {}

export default AttributionBar

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 170px;
  height: 40px;
  margin: 0px 15px;
  .attribution-logo {
    margin-right: 10px;
  }
  .attribution-url {
    font-size: 1.2rem;
    font-weight: 600;
    color: darkslategray;
    transition: color 0.1 ease;
    &:hover {
      color: dodgerblue;
    }
  }
`
