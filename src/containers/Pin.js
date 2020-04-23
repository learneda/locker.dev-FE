import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import PinSVG from 'assets/react-svg/PinSVG.js'
import Dropdown from 'components/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import { createGoal, fetchGoals, deleteGoal } from 'actions/goalActions'

// Styles
import { primary } from '../styles/utils/colors'

const Pin = ({ location, item }) => {
  const dropdownRef = useRef()
  const { userId, searchTerm } = useSelector(({ auth, search }) => ({
    userId: auth.id,
    searchTerm: search.searchTerm,
  }))
  const dispatch = useDispatch()
  const [isDropdown, setDropdown] = useState(false)
  const [isPinned, setPinned] = useState(false)
  useOnClickOutside(dropdownRef, () => setDropdown(false))

  useEffect(() => {
    return () => {
      setDropdown(false)
      setPinned(false)
    }
  }, [location.pathname, searchTerm])

  const handleClick = async e => {
    const text = e.target.innerText
    const goal = text === ' by tomorrow' ? 1 : text === 'in one week' ? 2 : 3
    const postId = item.id
    await dispatch(createGoal({ postId, goal }))
    await dispatch(fetchGoals(userId))
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
              { text: 'Lockers' },
              { text: 'Placeholder1' },
              { text: 'Placeholder2' },
            ]}
            handleClick={handleClick}
          />
        </Container>
      ) : (
        <Wrapper
          isDropdown={isDropdown}
          isPinned={isPinned}
          onClick={() => {
            setDropdown(true)
          }}
        >
          <PinSVG active={isPinned} />
        </Wrapper>
      )}
    </>
  )
}

Pin.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(Pin)
const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  background-color: white;
  border: 1px solid lightgrey;
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
  padding: 3px;
  border-radius: 10%;
  overflow: hidden;
  opacity: ${props => (props.isPinned ? '1' : '0.7')};
  background-color: ${primary};
  ${elevations[1]};
  transition: all 250ms ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    ${elevations[4]};
    text-color: ${primary};
  }
`
