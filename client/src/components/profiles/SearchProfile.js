import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

// Redux
import { getProfiles, getRecentProfiles } from '../../_actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';

const SearchProfile = () => {
  const [keyword, setKeyword] = useState('');
  const [resultTitle, setResultTitle] = useState('최근 프로필');
  const history = useHistory();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search-profile?keyword=${keyword}`);
    dispatch(getProfiles());
    setResultTitle('검색 결과');
  };

  useEffect(() => {
    dispatch(getRecentProfiles());
  }, [dispatch]);

  return (
    <div className='lightgrey__background'>
      <div className='ui__block'>
        <div className='my-1'>
          <p>사람 검색</p>
          <form className='form' onSubmit={handleSubmit}>
            <div className='my-1'>
              <input
                type='text'
                placeholder='검색어 입력'
                value={keyword}
                onChange={handleChange}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='검색' />
          </form>
        </div>
      </div>

      {loading && !error ? (
        <Spinner />
      ) : error ? (
        <div className='ui__block'>
          <div className='my-1'>{error.message}</div>
        </div>
      ) : (
        <div className='ui__block'>
          <div className='my-1'>
            <p>{resultTitle}</p>
            {profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProfile;
