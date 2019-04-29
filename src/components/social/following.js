import React from 'react';

const Following = props => {
  const { following } = props;
  return (
    <ul>
      {following.map((followi, index) => (
        <div key={index}>
          <li>{followi.username}</li>
          <img src={followi.profile_picture} />
          <button>unfollow</button>
        </div>
      ))}
    </ul>
  );
};

export default Following;
