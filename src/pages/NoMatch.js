import React from 'react';
import styled from 'styled-components';
import img from '../assets/img/bumble-bee-man-ay-yi-no-me-gusta.jpg'

export default function NoMatch() {
  return (
    <NOMATCH>
      <div className="no_match_content">
        <h1>error 404 page you are looking for not found </h1>
      </div>
   </NOMATCH>
  );
}
const NOMATCH = styled.div`
background-image: url(${img});
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

.no_match_content {
  background-color: white;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
}
`