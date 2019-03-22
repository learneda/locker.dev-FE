import React, { Component } from 'react';
import MetadataParse from './MetadataParse';

export default class Newsfeed extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <div>
        <MetadataParse>
          <a href="https://riley.gg">test</a>
        </MetadataParse>

        <MetadataParse>
          <a href="https://www.youtube.com/watch?v=HSwjGP19rTg">test</a>
        </MetadataParse>

        <MetadataParse>
          <a href="https://www.youtube.com/watch?v=-W_VsLXmjJU">test</a>
        </MetadataParse>

        <MetadataParse>
          <a href="https://www.youtube.com/watch?v=93p3LxR9xfM">test</a>
        </MetadataParse>
      </div>
    );
  }
}
