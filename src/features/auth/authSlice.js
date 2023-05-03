// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, token: null },
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, accessToken } = action.payload;
//       state.user = user;
//       state.token = accessToken;
//     },
//     logOut: (state, action) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setCredentials, logOut } = authSlice.actions;

// export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;

import { createSlice } from "@reduxjs/toolkit";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

// Define thunk actions that use the auth API endpoints
export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await useLoginMutation(credentials).unwrap();
    dispatch(setCredentials(data));
  } catch (error) {
    console.log("login error:", error);
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await useRegisterMutation(credentials).unwrap();
    dispatch(setCredentials(data));
  } catch (error) {
    console.log("register error:", error);
  }
};

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
