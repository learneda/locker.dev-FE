import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserFollowers,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { Link } from 'react-router-dom';

const Following = props => {
  const {
    userId,
    following,
    followers,
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserFollowers,
    getUserProfileDetails,
  } = props;

  const handleFollow = async friend_id => {
    await followAUser({ user_id: userId, friend_id: friend_id });
    getUserProfileDetails(userId);
  };

  const handleUnfollow = async friend_id => {
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    getUserProfileDetails(userId);
  };

  const handleClick = id => {
    const followingIds = following.map(ele => ele.id);
    return followingIds.includes(id) ? handleUnfollow(id) : handleFollow(id);
  };

  const renderSuggestion = id => {
    const followingIds = following.map(ele => ele.id);
    return followingIds.includes(id) ? 'Unfollow' : 'Follow';
  };

  return (
    <StyledFollow>
      {following.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          <button onClick={() => handleClick(ele.id)}>
            {renderSuggestion(ele.id)}
          </button>
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  );
};

export default connect(
  null,
  {
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserFollowers,
    getUserProfileDetails,
  }
)(Following);
