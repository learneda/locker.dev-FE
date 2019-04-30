import React from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';

const Followers = props => {
  const {
    userId,
    followers,
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserProfileDetails,
  } = props;

  const handleFollow = async friend_id => {
    await followAUser({ user_id: userId, friend_id: friend_id });
    getUserFollowing(userId);
    getUserProfileDetails(userId);
  };

  return (
    <ul>
      {followers.map((ele, index) => (
        <div key={index}>
          <li>{ele.username}</li>
          <img src={ele.profile_picture} />
          <button onClick={() => handleFollow(ele.id)}>Follow</button>
        </div>
      ))}
    </ul>
  );
};

export default connect(
  null,
  { followAUser, getUserFollowing, getUserProfileDetails }
)(Followers);
