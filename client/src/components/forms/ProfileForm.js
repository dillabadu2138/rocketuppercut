import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Redux
import {
  createOrEditProfile,
  getCurrentProfile,
} from '../../_actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  status: '',
  fields: [
    { name: 'SW 개발', isChecked: false },
    { name: 'HW 개발', isChecked: false },
    { name: '게임 개발', isChecked: false },
    { name: '디자인', isChecked: false },
    { name: '기획/PM', isChecked: false },
    { name: '마케팅', isChecked: false },
    { name: '운영', isChecked: false },
    { name: '경영지원', isChecked: false },
    { name: '비즈니스', isChecked: false },
    { name: '투자', isChecked: false },
  ],
  introduction: '',
};

const ProfileForm = () => {
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());
    if (!loading && profile) {
      const profileData = { ...initialState };

      // Load status and introduction
      for (const key in profile) {
        if (key !== 'fields' && key in profileData) {
          profileData[key] = profile[key];
        }
      }

      // Load fields
      let loadedFields = [...profileData.fields];
      profileData.fields.forEach((element, index) => {
        if (profile.fields.includes(element.name)) {
          loadedFields[index] = { ...loadedFields[index], isChecked: true };
        }
      });

      // Update fields
      setFormData({ ...profileData, fields: loadedFields });
    }
  }, [loading, profile, dispatch]);

  const handleChange = (event) => {
    if (event.target.type === 'checkbox') {
      // Find the index of the checkbox
      const currentIndex = formData.fields.findIndex(
        (element) => element.name === event.target.name
      );

      // Clone fields array and change the checked attributes
      let newFields = [...formData.fields];
      newFields[currentIndex] = {
        ...newFields[currentIndex],
        isChecked: !newFields[currentIndex].isChecked,
      };

      // Update the fields array
      setFormData({
        ...formData,
        fields: newFields,
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert checked fields into string array
    let checkedFieldsArray = [];
    formData.fields.forEach((field) => {
      if (field.isChecked === true) {
        checkedFieldsArray.push(field.name);
      }
    });

    // Create a new object
    const dataToSubmit = { ...formData, fields: checkedFieldsArray };

    // Create or Update profile
    dispatch(createOrEditProfile(dataToSubmit));

    // Redirect to profile
    history.push(`/profile/${profile.user._id}`);
  };

  return (
    <div className='profile__form'>
      <h1>프로필 편집</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='my-1'>
          <label>상태</label>
          <select name='status' onChange={handleChange} value={formData.status}>
            <option value='' disabled>
              * 현재 상태
            </option>
            <option value='구직중'>구직중</option>
            <option value='재직중'>재직중</option>
            <option value='투자유치중'>투자유치중</option>
            <option value='프리랜서'>프리랜서</option>
          </select>
        </div>

        <div className='my-1'>
          <label>업무분야</label>
          <div>
            {formData.fields.map((field, ind) => {
              return (
                <div key={ind} className='profile__form__option'>
                  <input
                    type='checkbox'
                    name={field.name}
                    checked={field.isChecked}
                    onChange={handleChange}
                  />
                  <label>{field.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className='my-1'>
          <label>자기소개</label>
          <textarea
            name='introduction'
            style={{ height: '100px' }}
            onChange={handleChange}
            value={formData.introduction}
          />
        </div>

        {profile && (
          <Link
            className='btn btn-lightgrey my-1'
            to={`/profile/${profile.user._id}`}
          >
            취소
          </Link>
        )}
        <input type='submit' className='btn btn-primary my-1' value='올리기' />
      </form>
    </div>
  );
};

export default ProfileForm;
