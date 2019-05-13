import React from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { Link } from 'react-router-dom';

const Followers = props => {
  const {
    userId,
    following,
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

  const handleUnfollow = async friend_id => {
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    getUserFollowing(userId);
    getUserProfileDetails(userId);
  };

  const handleClick = id => {
    const followingIds = following.map(ele => ele.id);
    return followingIds.includes(id) ? handleUnfollow(id) : handleFollow(id);
  };

  const renderSuggestion = id => {
    const followingIds = following.map(ele => ele.id);
    return followingIds.includes(id) ? 'Following ...' : 'Follow';
  };

  return (
    <StyledFollow>
      {followers.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='fan' />
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
  { followAUser, unfollowAUser, getUserFollowing, getUserProfileDetails }
)(Followers);
