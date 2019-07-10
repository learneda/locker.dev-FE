import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Dropdown = ({ items }) => {
  const renderItems = items => {
    return items.map((item, index) => <li key={index}>{item.text}</li>)
  }
  return <List>{renderItems(items)}</List>
}

Dropdown.propTypes = {
  items: PropTypes.array,
}

export default Dropdown

const List = styled.ul`
  li {
    font-size: 1.4rem;
    font-weight: thin;
    letter-spacing: 1.5px;
    line-height: 2rem;
    padding: 15px;
    border-bottom: 1px solid powerblue;
    background-color: white;
    color: dodgerblue;
    cursor: pointer;
    transition: all 300ms ease;
    &:hover {
      color: orangered;
      background-color: #e8f4fb;
    }
  }
`
