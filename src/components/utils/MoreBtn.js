import React from 'react'
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
const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`
