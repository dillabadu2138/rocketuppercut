import axios from 'axios';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Get recent profiles
export const getRecentProfiles = () => async (dispatch) => {
  dispatch({ type: 'RESET_SEARCH' });

  try {
    const res = await axios.get('/api/profile/recent');

    dispatch({
      type: 'GET_PROFILES',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Get all profiles by keyword
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: 'RESET_SEARCH' });

  try {
    const res = await axios.get(`/api/profile${window.location.search}`);

    dispatch({
      type: 'GET_PROFILES',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.msg,
      },
    });
  }
};

// Get profile by user ID
export const getProfileById = (id) => async (dispatch) => {
  dispatch({ type: 'CLEAR_PROFILE' });

  try {
    const res = await axios.get(`/api/profile/user/${id}`);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Create or update profile
export const createOrEditProfile = (dataToSubmit) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profile', dataToSubmit);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Add experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/experience', formData);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Add education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/education', formData);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: {
        status: err.response.status,
        statusText: err.response.statusText,
      },
    });
  }
};

// Delete account & profile
export const deleteAccount = (history) => async (dispatch) => {
  if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: 'CLEAR_PROFILE' });
      dispatch({ type: 'DELETE_ACCOUNT' });

      history.push('/');
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: {
          status: err.response.status,
          statusText: err.response.statusText,
        },
      });
    }
  }
};
