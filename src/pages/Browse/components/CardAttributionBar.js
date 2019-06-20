import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { selectLogo, printRootUrl } from 'helpers'
const CardAttributionBar = ({ url, className }) => {
  return (
    <AttributionBar className={className}>
      {selectLogo(url)}
      {printRootUrl(url)}
    </AttributionBar>
  )
}

CardAttributionBar.propTypes = {}

export default CardAttributionBar

const AttributionBar = styled.div`
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
