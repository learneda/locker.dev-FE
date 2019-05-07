import React from 'react';
import { connect } from 'react-redux';
import {
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';

const Following = props => {
  const {
    userId,
    following,
    unfollowAUser,
    getUserFollowing,
    getUserProfileDetails,
  } = props;
  const handleUnfollow = async friend_id => {
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    getUserFollowing(userId);
    getUserProfileDetails(userId);
  };

  return (
    <ul>
      {following.map((ele, index) => (
        <div key={index}>
          <li>{ele.username}</li>
          <img src={ele.profile_picture} alt='friend' />
          <button onClick={() => handleUnfollow(ele.id)}>Unfollow</button>
        </div>
      ))}
    </ul>
  );
};

export default connect(
  null,
  { unfollowAUser, getUserFollowing, getUserProfileDetails }
)(Following);
