import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as Trash } from 'assets/svg/trash-2.svg'

const DeleteComment = props => {
  const { handleDeleteComment } = props
  return (
    <TrashContainer>
      <Trash
        onClick={() => handleDeleteComment(props.comment_id, props.post_id)}
      />
    </TrashContainer>
  )
}

export default DeleteComment

DeleteComment.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
}

const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`
