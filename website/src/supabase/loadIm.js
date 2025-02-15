/*
import React, { useState, useEffect } from 'react';
import { fetchUserAvatar } from './storage';
import { useTask } from 'context/TaskContext';


const UserProfile = ({ userId }) => {
    const {profile} = useTask();
    const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const loadAvatar = async () => {
      const url = await fetchUserAvatar(profile?.data[0]?.id);
      setAvatarUrl(url);
    };

    loadAvatar();
  }, [profile]);

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar del usuario" className="avatar-img" />
      ) : (
        <p>No hay avatar disponible</p>
      )}
    </div>
  );
};

export default UserProfile;
*/