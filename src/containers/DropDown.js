import React from 'react'
import styled from 'styled-components'

const DropDown = props => {
  return props.isActive ? (
    <StyledDropDown className='DropDown'>DROPDOWN</StyledDropDown>
  ) : null
}

export default DropDown

const StyledDropDown = styled.div`
  border: 2px solid red;
`
