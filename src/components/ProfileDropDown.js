import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Settings } from '../assets/svg/settings.svg';
import { ReactComponent as Logout } from '../assets/svg/logout.svg';
import { authURL } from '../services/authURL';

const DropDown = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 10px 0 10px;
  position: absolute;
  right: 10%;
  top: 68px;
  width: 110px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export default function ProfileDropDown({ auth }) {
  const [toggle, set] = useState(false);
  const handleClick = () => set(!toggle);

  const renderDropdown = () => {
    return (
      toggle && (
        <DropDown>
          <li>
            <Settings
              style={{ width: '24px', height: '24px', paddingRight: '5px' }}
            />
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Logout
              style={{ width: '24px', height: '24px', paddingRight: '5px' }}
            />
            <a href={`${authURL}logout`}>Logout</a>
          </li>
        </DropDown>
      )
    );
  };

  return (
    <div>
      <img
        src={auth.profile_picture}
        className="auth-icon"
        alt="avatar"
        onClick={handleClick}
      />
      {renderDropdown()}
    </div>
  );
}
