import { createSlice } from "@reduxjs/toolkit";

import API from "../utils/api";

export const category = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    categories: {},
    selectedCategory: [],
    mainCategory: null,
  },
  reducers: {
    categoryRequest: (state) => {
      state.loading = true;
    },
    selectedCategoryReceived: (state, action) => {
      state.loading = false;
      if (!state.selectedCategory.includes(action.payload, 0)) {
        state.selectedCategory.push(action.payload);
      } else {
        return;
      }
    },
    deleteSelectedCategory: (state, action) => {
      state.loading = false;
      const index = state.selectedCategory.findIndex(
        (select) => select == action.payload
      );
      state.selectedCategory.splice(index, 1);
    },
    mainCategory: (state, action) => {
      state.mainCategory = action.payload;
    },
    categoryReceived: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    categoryError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  categoryRequest,
  categoryReceived,
  categoryError,
  selectedCategoryReceived,
  deleteSelectedCategory,
  mainCategory,
} = category.actions;

export default category.reducer;

//actions

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: categoryRequest.type });
    const { data } = await API.get("/category/allCategories");
    dispatch({ type: categoryReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: categoryError.type, payload: error });
    console.log(error);
  }
};
export const getCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: categoryRequest.type });
    dispatch({ type: selectedCategoryReceived.type, payload: category });
  } catch (error) {
    dispatch({ type: categoryError.type, payload: error });
    console.log(error);
  }
};
export const deleteCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: categoryRequest.type });
    dispatch({ type: deleteSelectedCategory.type, payload: category });
  } catch (error) {
    dispatch({ type: categoryError.type, payload: error });
    console.log(error);
  }
};
export const selectMainCategory =
  (selectedMainCategory) => async (dispatch) => {
    dispatch({ type: mainCategory.type, payload: selectedMainCategory });
  };
