import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserFollowers,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { ReactComponent as Loading } from '../../assets/svg/circles.svg';
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setToggles(Array(following.length).fill(true));
  }, [following]);

  console.log(toggles, 'toggles', following);

  const handleFollow = async (friend_id, index) => {
    setIsLoading(true);
    await followAUser({ user_id: userId, friend_id: friend_id });
    setIsLoading(false);

    setToggles(
      toggles.map((toggle, idx) => (idx === index ? !toggle : toggle))
    );
    getUserProfileDetails(userId);
  };

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true);
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    setIsLoading(false);
    setToggles(
      toggles.map((toggle, idx) => (idx === index ? !toggle : toggle))
    );
    getUserProfileDetails(userId);
  };

  const handleClick = (id, index) => {
    return toggles[index] ? handleUnfollow(id, index) : handleFollow(id, index);
  };

  const renderSuggestion = (id, index) => {
    if (isLoading) {
      return <button style={{ width: '8.5rem' }}>...</button>;
    }
    const text = toggles[index] ? 'Unfollow' : 'Follow';
    return (
      <button
        style={{ width: '8.5rem' }}
        onClick={() => handleClick(id, index)}
      >
        {text}
      </button>
    );
  };

  return (
    <StyledFollow>
      {following.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          {renderSuggestion(ele.id, index)}
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
