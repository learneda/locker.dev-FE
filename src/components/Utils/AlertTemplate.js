import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { positions } from 'react-alert'
import { ReactComponent as X } from 'assets/svg/x.svg'

export const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '0',
}

const AlertTemplate = props => {
  const { message, options, close } = props
  return (
    <Container onClick={close} options={options}>
      <div />
      <Message>{message}</Message>
      <XX>
        <X onClick={close} />
      </XX>
    </Container>
  )
}

export default AlertTemplate

AlertTemplate.propTypes = {
  message: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
}

const errorColor = `rgba(237, 23, 23, 0.85)`
const successColor = `rgba(3, 177, 45, 0.85)`
const infoColor = `rgba(8, 142, 219, 0.85)`
const defaultColor = 'black'

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ options }) =>
    options.type === 'info'
      ? infoColor
      : options.type === 'success'
      ? successColor
      : options.type === 'error'
      ? errorColor
      : defaultColor};
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 18px 23px;
  width: 100vw;
  @media (max-width: 500px) {
    padding: 13px 13px;
  }
`

const Message = styled.span`
  text-align: center;
`

const XX = styled.div`
  cursor: pointer;
`
