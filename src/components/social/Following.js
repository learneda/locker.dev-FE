import React from 'react';
import { connect } from 'react-redux';
import {
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { Link } from 'react-router-dom';

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
    <StyledFollow>
      {following.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          <button onClick={() => handleUnfollow(ele.id)}>Unfollow</button>
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  );
};

export default connect(
  null,
  { unfollowAUser, getUserFollowing, getUserProfileDetails }
)(Following);
