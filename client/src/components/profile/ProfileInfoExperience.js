import React from 'react';
import formatDate from '../../utils/formatDate';

// Redux
import { deleteExperience } from '../../_actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfoExperience = ({
  exp: { _id, title, company, from, to, description },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);

  const click = () => {
    if (window.confirm('선택한 경력을 정말로 삭제하시겠습니까?')) {
      dispatch(deleteExperience(_id));
    } else {
      // Do nothing!
    }
  };

  return (
    <div className='block__content'>
      <div className='block__content__detail'>
        <p className='block__content__detail__title'>{title}</p>
        <p className='block__content__detail__subtitle'>{company}</p>
        <p className='block__content__detail__period'>
          {formatDate(from)} - {to ? formatDate(to) : '현재'}
        </p>
        {description && (
          <p className='block__content__detail__description'>{description}</p>
        )}
      </div>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <button className='block__content__delete' onClick={click}>
            <i className='fas fa-times' />
          </button>
        )}
    </div>
  );
};

export default ProfileInfoExperience;
