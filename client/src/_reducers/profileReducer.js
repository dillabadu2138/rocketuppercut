const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "GET_PROFILES":
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
      };
    case "RESET_SEARCH":
      return {
        ...state,
        profiles: [],
        loading: true,
        error: null,
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        profile: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
