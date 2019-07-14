import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import { useSelector } from 'react-redux'
import ReusablePortal from 'components/Utils/ModalPortal'
import GoalModal from './GoalModal'

const Goal = props => {
  const [isModal, setModal] = useState(false)
  const closeOnEsc = e => {
    if (e.which === 27) {
      setModal(false)
    }
  }
  return (
    <div>
      {isModal && (
        <ReusablePortal onKeyDownCapture={e => console.log(e.which)}>
          <Wrapper onKeyDownCapture={e => console.log(e.which)}>
            <GoalModal close={setModal} />
          </Wrapper>
        </ReusablePortal>
      )}
      <Container onClick={() => setModal(prev => !prev)}>
        <span className='goal-text'>soon</span>
      </Container>
    </div>
  )
}

Goal.propTypes = {}

export default Goal

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 10px;
  z-index: 1;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fdfdfd;
  border: 2px solid lime;
  font-size: 1.4rem;
  ${elevations[1]};
  transition: all 250ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    ${elevations[2]};
  }
  .goal-text {
    position: relative;
    bottom: 1px;
    left: 1px;
    letter-spacing: 1px;
  }
`
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
`
