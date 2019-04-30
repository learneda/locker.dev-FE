import React, { useEffect } from 'react';

const Following = props => {
  const { userId, following, unfollowAUser, getUserFollowing } = props;
  useEffect(() => {
    getUserFollowing(userId);
  }, []);

  console.log(following);

  const handleUnfollow = friend_id => {
    console.log('in evfdfdent', userId, friend_id);
    unfollowAUser({ user_id: userId, friend_id: friend_id }).then(() => {
      console.log('in here');
      getUserFollowing(userId);
    });
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

export default Following;
