import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Trash } from '../../assets/svg/trash-2.svg'

const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`

export default function MoreBtn(props) {
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
