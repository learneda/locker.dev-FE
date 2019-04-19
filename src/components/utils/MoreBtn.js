import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { post as URL } from '../../services/baseURL';
import { ReactComponent as Trash } from '../../assets/svg/trash-2.svg';

const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`;

export default function MoreBtn(props) {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('in handleSubmit')
    axios.delete(`${URL}/api/comments/${props.comment_id}`).then(res => {
      console.log('inside of then after deleting comment', res)
      props.handleDeleteComment();
    });
  };

  return (
    <TrashContainer>
      <Trash onClick={() => props.handleDeleteComment(props.comment_id, props.post_id)} />
    </TrashContainer>
  );
}
