// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Registration
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // OTP Verification
    otpVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    otpVerificationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload || "Logout successful";
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Load user
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    // Forgot password
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset password
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update password
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset toast messages
    resetAuthSlice: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  otpVerificationRequest,
  otpVerificationSuccess,
  otpVerificationFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  resetAuthSlice: resetAuthAction,
} = authSlice.actions;

// Exported thunk to manually reset error and message
export const resetAuthSlice = () => (dispatch) => {
  dispatch(resetAuthAction());
};

// 🔐 Register
export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailed(error.response?.data?.message || "Registration failed"));
  }
};

// 🔐 OTP Verification
export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(otpVerificationRequest());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/verify-otp",
      { email, otp },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(otpVerificationSuccess(res.data));
  } catch (error) {
    dispatch(otpVerificationFailed(error.response?.data?.message || "OTP verification failed"));
  }
};

// 🔐 Login
export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailed(error.response?.data?.message || "Login failed"));
  }
};

// 🔓 Logout
export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    await axios.get("http://localhost:4000/api/v1/auth/logout", {
      withCredentials: true,
    });
    dispatch(logoutSuccess("Logout successful"));
  } catch (error) {
    dispatch(logoutFailed(error.response?.data?.message || "Logout failed"));
  }
};

// 👤 Get Current User
export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const res = await axios.get("http://localhost:4000/api/v1/auth/me", {
      withCredentials: true,
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};

// 📧 Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotPasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response?.data?.message || "Failed to send email"));
  }
};

// 🔑 Reset Password (from email link)
export const resetPassword = (data, token) => async(dispatch)=>{
    dispatch(authSlice.actions.resetPasswordRequest());
    await axios
    .put(
        `http://localhost:4000/api/v1/auth/password/reset/${token}`, 
        data, 
        {
        withCredentials: true,
        headers:{
            "Content-Type": "application/json",
        },
    }).then((res)=>{
        dispatch(authSlice.actions.resetPasswordSuccess(res.data));
    }).catch((error)=>{
        dispatch(authSlice.actions.resetPasswordFailed(error.response.data.message));
    });
};

// 🔐 Update Password (logged-in user)
export const updatePassword = (data) => async (dispatch) => {
  dispatch(updatePasswordRequest());
  try {
    const res = await axios.put(
      "http://localhost:4000/api/v1/auth/password/update",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updatePasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(updatePasswordFailed(error.response?.data?.message || "Update failed"));
  }
};

export default authSlice.reducer;
