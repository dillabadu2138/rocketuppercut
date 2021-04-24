import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileCommon from './ProfileCommon';
import ProfileInfoBasic from './ProfileInfoBasic';
import ProfileInfoExperience from './ProfileInfoExperience';
import ProfileInfoEducation from './ProfileInfoEducation';
import ProfileInfoAccount from './ProfileInfoAccount';
import AddExperience from '../forms/AddExperience';
import AddEducation from '../forms/AddEducation';

// Redux
import { getProfileById } from '../../_actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = ({ match }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);

  const [showExpForm, setShowExpForm] = useState(false);
  const btnAddExpRef = useRef();

  const [showEduForm, setShowEduForm] = useState(false);
  const btnAddEduRef = useRef();

  const toggleExpForm = () => {
    btnAddExpRef.current.hidden = !btnAddExpRef.current.hidden;
    setShowExpForm(!showExpForm);
  };

  const toggleEduForm = () => {
    btnAddEduRef.current.hidden = !btnAddEduRef.current.hidden;
    setShowEduForm(!showEduForm);
  };

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);

  return profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProfileCommon profile={profile} />

      <div className='ui__divider'></div>

      <div className='profile__content'>
        <div className='profile__tab'>
          <Link
            to={`/profile/${profile.user._id}`}
            className='profile__tab__current'
          >
            정보
          </Link>
          <Link to={`/profile/${profile.user._id}/posts`}>게시물</Link>
        </div>

        <div className='ui__block'>
          <div className='block__header'>
            <p>기본 정보</p>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile'>
                  <i className='fas fa-pen' />
                </Link>
              )}
          </div>
          <ProfileInfoBasic profile={profile} />
        </div>

        <div className='ui__block'>
          <div className='block__header'>
            <p>경력 정보</p>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <button ref={btnAddExpRef} onClick={toggleExpForm}>
                  + 추가
                </button>
              )}
          </div>
          <AddExperience show={showExpForm} toggleForm={toggleExpForm} />
          {profile.experiences.map((experience) => (
            <ProfileInfoExperience key={experience._id} exp={experience} />
          ))}
        </div>

        <div className='ui__block'>
          <div className='block__header'>
            <p>학력 정보</p>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <button ref={btnAddEduRef} onClick={toggleEduForm}>
                  + 추가
                </button>
              )}
          </div>
          <AddEducation show={showEduForm} toggleForm={toggleEduForm} />
          {profile.educations.map((education) => (
            <ProfileInfoEducation key={education._id} edu={education} />
          ))}
        </div>

        <div className='ui__block'>
          <div className='block__header'>
            <p>계정 정보</p>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/account'>
                  <i className='fas fa-pen' />
                </Link>
              )}
          </div>
          <ProfileInfoAccount profile={profile} />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileInfo;
