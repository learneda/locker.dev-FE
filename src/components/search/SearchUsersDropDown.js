import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { post as URL } from '../../services/baseURL';

export default function SearchUsersDropDown({ search }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${URL}/api/users/all`, {
      withCredentials: true
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) && (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <Card>
                <img src={user.profile_picture} alt="avatar" />
                <div>{user.username}</div>
              </Card>
            </Link>
          )
        );
      })}
    </div>
  );
}

const Card = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 5px;

  img {
    border-radius: 50%;
    margin-right: 10px;
    height: 35px;
    width: 35px;
  }
`;
