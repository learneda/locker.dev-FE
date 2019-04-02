import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import SidebarTest from '../components/SidebarTest';
export default class Home extends Component {
  render() {
    return (
      <div>
        <SidebarTest />
        <Bookmarks />
        <Likes />
      </div>
    );
  }
}
