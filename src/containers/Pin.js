import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import PinSVG from 'assets/react-svg/PinSVG.js'
import Dropdown from 'components/Dropdown'

const Pin = props => {
  const [isDropdown, setDropdown] = useState(false)
  const [isPinned, setPinned] = useState(false)

  return (
    <>
      {isDropdown ? (
        <Container
          className='dropdown-wrapper'
          onMouseLeave={() => setDropdown(false)}
          onClick={() => {
            setDropdown(false)
            setPinned(true)
          }}
        >
          <Dropdown
            items={[
              { text: 'tomorrow' },
              { text: 'one week' },
              { text: 'this.month' },
            ]}
          />
        </Container>
      ) : (
        <Wrapper isDropdown={isDropdown} onClick={() => setDropdown(true)}>
          <PinSVG active={isPinned} />
        </Wrapper>
      )}
    </>
  )
}

Pin.propTypes = {}

export default Pin
const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  background-color: white;
  opacity: 0;
  transition: all 400ms ease;
  border: 1px solid powderblue;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: ${({ isDropdown }) => (isDropdown ? '0px' : '10px')};
  right: ${({ isDropdown }) => (isDropdown ? '0px' : '10px')};
  z-index: 1;
  padding: 10px;
  border-radius: 50%;
  overflow: hidden;
  /* border: 2px solid powderblue; */
  background-color: #fdfdfd;
  ${elevations[1]};
  transition: all 300ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    ${elevations[2]};
  }
`
