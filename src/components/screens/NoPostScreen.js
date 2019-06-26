import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './HelpScreen'
import EmptyBoxSVG from 'assets/svg/empty-box-drawing.svg'

const NoPostScreen = props => {
  const { textDescription } = props
  return (
    <Container>
      <img src={EmptyBoxSVG} alt='Drawing' />
      <div className='prompt-text'>
        <p>{textDescription}</p>
      </div>
    </Container>
  )
}

export default NoPostScreen

NoPostScreen.propTypes = {
  textDescription: PropTypes.string.isRequired,
}
