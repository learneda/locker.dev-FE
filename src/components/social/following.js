import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { unfollowAUser, getUserFollowing } from '../../actions';

const Following = props => {
  const { userId, following, unfollowAUser, getUserFollowing } = props;

  console.log(following);

  const handleUnfollow = async friend_id => {
    console.log('in Event', userId, friend_id);
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    await getUserFollowing(userId);
    console.log('done with event');
  };

  return (
    <ul>
      {following.map((followi, index) => (
        <div key={index}>
          <li>{followi.username}</li>
          <img src={followi.profile_picture} />
          <button onClick={() => handleUnfollow(followi.id)}>Unfollow</button>
        </div>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ follow, auth }) => ({
  following: follow.userFollowing,
  userId: auth.id,
});
export default connect(
  mapStateToProps,
  { unfollowAUser, getUserFollowing }
)(Following);
