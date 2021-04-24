import React from 'react';

const ProfileCommon = ({
  profile: {
    user: { name, avatar },
    introduction,
    experiences,
  },
}) => {
  return (
    <div className='profile__common'>
      <div className='profile__common__mid'>
        <img src={avatar} alt='' className='profile__common__mid__img' />
        <span className='profile__common__mid__name'>{name}</span>
        <span className='profile__common__mid__work'>
          {experiences.length > 0 &&
            `${experiences[0].title} @${experiences[0].company}`}
        </span>
      </div>
      <div className='profile__common__end'>
        <div className='ui__divider'></div>
        <p className='profile__common__end__intro'>
          {introduction
            ? introduction
            : '기본 정보에서 자기소개를 추가하거나 수정할 수 있습니다'}
        </p>
      </div>
    </div>
  );
};

export default ProfileCommon;
