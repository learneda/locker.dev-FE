import React from 'react';

const Followers = props => {
  const { followers } = props;
  return (
    <ul>
      {followers.map((followee, index) => (
        <div>
          <li key={index}>{followee.username}</li>
          <img src={followee.profile_picture} />
          <button>block</button>
        </div>
      ))}
    </ul>
  );
};

export default Followers;
