import { createSlice } from "@reduxjs/toolkit";

import API from "../utils/api";

export const auth = createSlice({
  name: "auth",
  initialState: { loading: false, error: null, user: {} },
  reducers: {
    authRequest: (state) => {
      state.loading = true;
    },
    authReceived: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { authRequest, authReceived, authError } = auth.actions;

export default auth.reducer;

//actions
export const signIn = (formData) => async (dispatch) => {
  try {
    dispatch({ type: authRequest.type });
    const { data } = await API.post("/users/signIn", formData);
    dispatch({ type: authReceived.type, payload: data });
    dispatch({ type: authError.type, payload: null });
  } catch (error) {
    dispatch({ type: authError.type, payload: error });
    console.log(error);
  }
};
export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch({ type: authRequest.type });
    const { data } = await API.post("/users/signUp", formData);
    dispatch({ type: authReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: authError.type, payload: error });
    console.log(error);
  }
};
