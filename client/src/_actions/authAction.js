import axios from "axios";
import { setAlert } from "./alertAction";
import { createOrEditProfile } from "./profileAction";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: "LOAD_USER",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register user
export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/register", formData);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });

    // Load user
    dispatch(loadUser());

    // Create an initial empty profile
    const dataToSubmit = {
      status: "",
      fields: [],
      introduction: "",
    };

    dispatch(createOrEditProfile(dataToSubmit));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: "REGISTER_FAILURE",
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/login", formData);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    // Load user
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: "LOGIN_FAILURE",
    });
  }
};

// Logout user
export const logoutUser = () => ({ type: "LOGOUT" });
