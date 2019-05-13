import React, { useState, useEffect } from 'react';
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

  const [toggles, setToggles] = useState([]);
  useEffect(() => {
    setToggles(Array(following.length).fill(true));
  }, [following]);

  console.log(toggles, 'toggles', following);

  const handleFollow = async (friend_id, index) => {
    await followAUser({ user_id: userId, friend_id: friend_id });
    setToggles(
      toggles.map((toggle, idx) => (idx === index ? !toggle : toggle))
    );
    getUserProfileDetails(userId);
  };

  const handleUnfollow = async (friend_id, index) => {
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    setToggles(
      toggles.map((toggle, idx) => (idx === index ? !toggle : toggle))
    );
    getUserProfileDetails(userId);
  };

  const handleClick = (id, index) => {
    const followingIds = following.map(ele => ele.id);
    return toggles[index] ? handleUnfollow(id, index) : handleFollow(id, index);
  };

  const renderSuggestion = (id, index) => {
    const followingIds = following.map(ele => ele.id);
    return toggles[index] ? 'Unfollow' : 'Follow';
  };

  return (
    <StyledFollow>
      {following.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          <button onClick={() => handleClick(ele.id, index)}>
            {renderSuggestion(ele.id, index)}
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
