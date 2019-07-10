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
        <Wrapper
          isDropdown={isDropdown}
          isPinned={isPinned}
          onClick={() => setDropdown(true)}
        >
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
  border: 1px solid powderblue;
  animation: grow 300ms ease;
  @keyframes grow {
    0% {
      opacity: 0.6;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
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
  opacity: ${({ isPinned }) => (isPinned ? '1' : '0.65')};
  background-color: #fdfdfd;
  ${elevations[1]};
  transition: all 250ms ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    ${elevations[2]};
  }
`
