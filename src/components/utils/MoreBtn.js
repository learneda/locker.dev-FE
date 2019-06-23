import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Trash } from 'assets/svg/trash-2.svg'

const DeleteComment = props => {
  return (
    <TrashContainer>
      <Trash
        onClick={() =>
          props.handleDeleteComment(props.comment_id, props.post_id)
        }
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
