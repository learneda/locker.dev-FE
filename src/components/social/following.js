import React from 'react';

const Following = props => {
  const { following } = props;
  return (
    <>
      <h2>Following</h2>
      <ul>
        {following.map((followi, index) => (
          <li key={index}>{followi.username}</li>
        ))}
      </ul>
    </>
  );
};

export default Following;
