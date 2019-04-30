import React from 'react';

const Suggested = props => {
  const { suggested } = props;
  return (
    <ul>
      {suggested.map((ele, index) => (
        <div style={{ outline: '1px solid salmon' }} key={index}>
          <li>{ele.username}</li>
          <img src={ele.image} />
          <p>{ele.user}</p>
          <p>Followed by {ele.followed_by_username}</p>
          <p>From {ele.location}</p>
          <button>Follow</button>
        </div>
      ))}
    </ul>
  );
};

export default Suggested;
