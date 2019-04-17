import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Settings } from '../../assets/svg/settings.svg';
import { ReactComponent as Logout } from '../../assets/svg/logout.svg';
import { authURL } from '../../services/authURL';
import { slide as Menu } from 'react-burger-menu';
import Sidebar from '../sidebar/Sidebar';

export default function SlideInMenu(props) {
  return (
    <Menu
      right
      width={400}
      noOverlay
      isOpen={props.toggle}
      onStateChange={state => props.handleStateChange(state)}
    >
      <Sidebar />
      {/* <Link to="/settings">
        <Settings
          style={{ width: '24px', height: '24px', paddingRight: '9px' }}
        />
      </Link>
      <Link to="/settings">Settings</Link>
      <a href={`${authURL}logout`}>
        <Logout
          style={{ width: '24px', height: '24px', paddingRight: '9px' }}
        />
      </a>
      <a href={`${authURL}logout`}>Logout</a>
  */}
    </Menu>
  );
}
