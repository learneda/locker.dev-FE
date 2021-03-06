import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const ProfileHeader = props => {
  const { user } = props
  return (
    <Container className='profile-header'>
      {user.header_picture && (
        <img
          src={user.header_picture}
          className='profile-cover'
          alt='header-cover'
        />
      )}
    </Container>
  )
}

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    header_picture: PropTypes.string,
  }).isRequired,
}

export default ProfileHeader

const Container = styled.div`
  height: 360px;
  background: cornflowerblue;
  .profile-cover {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`
