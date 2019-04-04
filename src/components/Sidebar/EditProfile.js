import React from 'react';

const EditProfile = props => {
  const { handleChange, id, state, editProfile } = props;
  return (
    <form onSubmit={e => editProfile(e, id)}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Edit bio"
        value={state.bio}
        name="bio"
        required
      />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Edit location"
        value={state.location}
        name="location"
        required
      />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Edit website url"
        value={state.website_url}
        name="website_url"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfile;
