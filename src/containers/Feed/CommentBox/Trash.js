import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as TrashSVG } from 'assets/svg/trash-2.svg'

const Trash = props => {
  const { handleDeleteComment } = props
  return (
    <TrashContainer>
      <TrashSVG
        onClick={() => handleDeleteComment(props.comment_id, props.post_id)}
      />
    </TrashContainer>
  )
}

export default Trash

Trash.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
}

const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`
