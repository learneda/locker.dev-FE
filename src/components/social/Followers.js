import React from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { Link } from 'react-router-dom';

const Followers = props => {
  const {
    userId,
    followers,
    followAUser,
    getUserFollowing,
    getUserProfileDetails,
  } = props;

  const handleFollow = async friend_id => {
    await followAUser({ user_id: userId, friend_id: friend_id });
    getUserFollowing(userId);
    getUserProfileDetails(userId);
  };

  return (
    <StyledFollow>
      {followers.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='fan' />
          </Link>
          <button onClick={() => handleFollow(ele.id)}>Follow</button>
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  );
};

export default connect(
  null,
  { followAUser, getUserFollowing, getUserProfileDetails }
)(Followers);
