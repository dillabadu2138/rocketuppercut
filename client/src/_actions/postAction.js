import axios from 'axios';

// Get all posts
export const getPosts = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_POSTS' });

  try {
    const res = await axios.get('/api/post');

    dispatch({
      type: 'GET_POSTS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all posts by a specific user ID
export const getPostsById = (id) => async (dispatch) => {
  dispatch({ type: 'CLEAR_POSTS' });

  try {
    const res = await axios.get(`/api/post/user/${id}`);

    dispatch({
      type: 'GET_POSTS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get a single post by post ID
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: 'CLEAR_POST' });

  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: 'GET_POST',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES',
      payload: { postId: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES',
      payload: { postId: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add like on a single post page
export const addLikeOnSinglePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES_ON_SINGLE_POST',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove like on a single post page
export const removeLikeOnSinglePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postId}`);

    dispatch({
      type: 'UPDATE_LIKES_ON_SINGLE_POST',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${postId}`);

    dispatch({
      type: 'DELETE_POST',
      payload: postId,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/post', formData);

    dispatch({
      type: 'ADD_POST',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/post/comment/${postId}`, formData);

    dispatch({
      type: 'ADD_COMMENT',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch({
      type: 'DELETE_COMMENT',
      payload: commentId,
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
