import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import PinSVG from 'assets/react-svg/PinSVG.js'
import Dropdown from 'components/Dropdown'
import { useSelector } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'

const Pin = props => {
  const dropdownRef = useRef()
  const searchTerm = useSelector(({ search }) => search.searchTerm)
  const [isDropdown, setDropdown] = useState(false)
  const [isPinned, setPinned] = useState(false)
  useOnClickOutside(dropdownRef, () => setDropdown(false))

  useEffect(() => {
    return () => {
      setDropdown(false)
      setPinned(false)
    }
  }, [props.location.pathname, searchTerm])

  const handleClick = e => {
    const text = e.target.innerText
    const num = text === 'tommorrow' ? 1 : text === 'one week' ? 2 : 3
    // this.function(num)
  }
  return (
    <>
      {isDropdown ? (
        <Container
          className='dropdown-wrapper'
          ref={dropdownRef}
          onMouseLeave={() => setDropdown(false)}
          onClick={() => {
            setPinned(true)
            setDropdown(false)
          }}
        >
          <Dropdown
            items={[
              { text: 'tomorrow' },
              { text: 'one week' },
              { text: 'this.month' },
            ]}
            handleClick={handleClick}
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

export default withRouter(Pin)
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
  top: ${props => (props.isDropdown ? '0px' : '10px')};
  right: ${props => (props.isDropdown ? '0px' : '10px')};
  z-index: 1;
  padding: 10px;
  border-radius: 50%;
  overflow: hidden;
  opacity: ${props => (props.isPinned ? '1' : '0.65')};
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
