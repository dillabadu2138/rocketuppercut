import React from 'react';

const ProfileInfoAccount = ({ profile }) => {
  return (
    <div className='block__info'>
      <div className='block__info__key'>이메일</div>
      <p className='block__info__value'>{profile && profile.user.email}</p>
    </div>
  );
};

export default ProfileInfoAccount;
