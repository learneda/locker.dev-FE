import React, { Component } from 'react';
import MetadataParse from '../components/MetadataParse';
import styled from 'styled-components';

export default class Newsfeed extends Component {
  state = {
    users: []
  };
  render() {
    const Post = styled.div`
      max-width: 700px;
      margin: auto;
      text-align: center;

      a {
        text-decoration: none;
        color: #444;
      }

      img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 60px;
      }
      p {
        max-width: 600px;
        margin: 10px auto;
        font-size: 1.8rem;
      }
      h1 {
        margin: 10px auto;
        font-size: 3rem;
      }
    `;

    return (
      <React.Fragment>
        <Post>
          <MetadataParse>
            <a href="https://riley.gg">test</a>
          </MetadataParse>
        </Post>

        <Post>
          <MetadataParse>
            <a href="https://www.youtube.com/watch?v=HSwjGP19rTg">test</a>
          </MetadataParse>
        </Post>
        <Post>
          <MetadataParse>
            <a href="https://www.youtube.com/watch?v=-W_VsLXmjJU">test</a>
          </MetadataParse>
        </Post>
        <Post>
          <MetadataParse>
            <a href="https://www.youtube.com/watch?v=93p3LxR9xfM">test</a>
          </MetadataParse>
        </Post>
      </React.Fragment>
    );
  }
}
