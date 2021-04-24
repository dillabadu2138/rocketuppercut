const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case 'GET_POST':
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case 'CLEAR_POSTS':
      return {
        ...state,
        posts: [],
      };
    case 'CLEAR_POST':
      return {
        ...state,
        post: null,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case 'POST_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'UPDATE_LIKES':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case 'UPDATE_LIKES_ON_SINGLE_POST':
      return {
        ...state,
        post: { ...state.post, likes: action.payload },
        loading: false,
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
