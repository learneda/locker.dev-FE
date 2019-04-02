import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Bookmarks />
        <Likes />
      </div>
    );
  }
}
