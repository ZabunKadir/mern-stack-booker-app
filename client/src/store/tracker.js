import { createSlice } from "@reduxjs/toolkit";

import API from "../utils/api";

export const tracker = createSlice({
  name: "tracker",
  initialState: {
    loading: false,
    error: null,
    recommendationList: {},
  },
  reducers: {
    trackerRequest: (state) => {
      state.loading = true;
    },
    trackerReceived: (state, action) => {
      state.loading = false;
      state.recommendationList = action.payload;
    },
    trackerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { trackerRequest, trackerReceived, trackerError } =
  tracker.actions;

export default tracker.reducer;

//actions
export const lastClicked = (userId, book) => async (dispatch) => {
  try {
    dispatch({ type: trackerRequest.type });
    const { data } = await API.post("/users/tracker/" + userId._id, { book });
    dispatch({ type: trackerReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: trackerError.type, payload: error });
    console.log(error);
  }
};
export const recentSearches = (userId, searchValue) => async (dispatch) => {
  try {
    dispatch({ type: trackerRequest.type });
    const { data } = await API.post("/users/tracker/" + userId._id, {
      searchValue,
    });
    dispatch({ type: trackerReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: trackerError.type, payload: error });
    console.log(error);
  }
};

export const getRecommendationList = (user) => async (dispatch) => {
  try {
    dispatch({ type: trackerRequest.type });
    const { data } = await API.post("/users/recommendationList", { user });
    dispatch({ type: trackerReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: trackerError.type, payload: error });
    console.log(error);
  }
};
