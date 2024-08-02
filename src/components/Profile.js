import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      {/* Add more profile information and edit functionality here */}
    </div>
  );
}

export default Profile;