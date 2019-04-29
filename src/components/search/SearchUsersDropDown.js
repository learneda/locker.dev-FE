import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { ReactComponent as Location } from '../../assets/svg/location.svg';
import { post as URL } from '../../services/baseURL';

export default function SearchUsersDropDown({ search }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${URL}/api/users/all`, {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Fragment>
      {users.map(user => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) && (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <Card>
                <img src={user.profile_picture} alt='avatar' />
                <User>
                  <div className='username'>{user.username}</div>
                  <div className='bottom'>
                    <Location />
                    <span>{user.location}</span>
                  </div>
                </User>
              </Card>
            </Link>
          )
        );
      })}
    </Fragment>
  );
}

const Card = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
  height: 87px;
  padding: 16px 11px;
  img {
    border-radius: 50%;
    margin-right: 10px;
    height: 50px;
    width: 50px;
  }
  &:hover {
    background-color: #f2f5f7;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  .username {
    margin-bottom: 3px;
  }
  .bottom {
    display: flex;
    align-items: center;
  }
  svg {
    height: 18px;
    margin-right: 3px;
    width: 18px;
  }
  span {
    color: #a9a9a9;
    font-weight: 400;
  }
`;
