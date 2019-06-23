import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { ReactComponent as Location } from 'assets/svg/location.svg'
import { apiURL } from 'services'

const SearchUsersDropDown = ({ searchTerm }) => {
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    const res = await axios.get(`${apiURL}/users/all`, {
      withCredentials: true,
    })
    setUsers(res.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <Container className='dd-search'>
      {users.map(user => {
        return (
          user.username &&
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) && (
            <Link
              to={`/profile/${user.id}`}
              key={user.id}
              className='dd-search'
            >
              <Card className='dd-search'>
                <img
                  src={user.profile_picture}
                  alt='avatar'
                  className=' dd-search'
                />
                <User className='dd-user dd-search'>
                  <div className='username dd-search'>{user.username}</div>
                  <div className='bottom dd-search'>
                    <Location className='dd-search' />
                    <span className='dd-search'>{user.location}</span>
                  </div>
                </User>
              </Card>
            </Link>
          )
        )
      })}
    </Container>
  )
}

export default SearchUsersDropDown

const Container = styled.div``
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
    background-color: #e8f4fb;
  }
`

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
`
