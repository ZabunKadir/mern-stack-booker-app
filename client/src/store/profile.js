import { createSlice } from "@reduxjs/toolkit";
import API from "../utils/api";

export const profile = createSlice({
  name: "profile",
  initialState: { loading: false, error: null, profile: null, profiles: {} },
  reducers: {
    profileRequest: (state) => {
      state.loading = true;
    },
    profileReceived: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    profilesReceived: (state, action) => {
      state.loading = false;
      state.profiles = action.payload;
    },
    updatedProfileReceived: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(state.profile));
    },
    profileError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  profileRequest,
  profileReceived,
  profileError,
  updatedProfileReceived,
  profilesReceived,
} = profile.actions;

export default profile.reducer;

//actions
export const getProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: profileRequest.type });
    const { data } = await API.post("/users" + formData);
    dispatch({ type: profileReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: profileError.type, payload: error });
    console.log(error);
  }
};
export const getProfileSearch = (searchValue) => async (dispatch) => {
  try {
    dispatch({ type: profileRequest.type });
    const { data } = await API.post("/users/search", { searchValue });
    dispatch({ type: profilesReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: profileError.type, payload: error });
    console.log(error);
  }
};
export const updateProfile = (form, photo, token) => async (dispatch) => {
  try {
    dispatch({ type: profileRequest.type });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: { token },
      },
    };
    const { data } = await API.post(
      "/users/updateProfile",
      { form, photo },
      config
    );
    dispatch({ type: updatedProfileReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: profileError.type, payload: error });
    console.log(error);
  }
};
