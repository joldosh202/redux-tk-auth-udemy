import { createSlice } from "@reduxjs/toolkit";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";

const mentorAuthSlice = createSlice({
  name: "mentorAuth",
  initialState: { mentor: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { mentor, accessToken } = action.payload;
      state.mentor = mentor;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.mentor = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = mentorAuthSlice.actions;

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

export default mentorAuthSlice.reducer;

export const selectCurrentMentor = (state) => state.auth.mentor;
export const selectCurrentToken = (state) => state.auth.token;
