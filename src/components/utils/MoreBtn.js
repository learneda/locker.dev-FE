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
    axios.delete(`${URL}/api/comments/${props.comment_id}`).then(res => {
      props.getNewsFeed();
    });
  };

  return (
    <TrashContainer>
      <Trash onClick={handleSubmit} />
    </TrashContainer>
  );
}
