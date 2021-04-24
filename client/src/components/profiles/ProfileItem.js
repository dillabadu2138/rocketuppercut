import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    experiences,
  },
}) => {
  return (
    <div className='profile__card my-1'>
      <Link to={`/profile/${_id}`}>
        <img src={avatar} alt='' className='ui__image' />
      </Link>
      <div className='profile__card__content'>
        <span className='profile__card__content__name'>{name}</span>
        {experiences.length > 0 && experiences[0].current && (
          <span>
            {experiences[0].title} @{experiences[0].company}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileItem;
