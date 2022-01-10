import { createSlice } from "@reduxjs/toolkit";

import API from "../utils/api";

export const book = createSlice({
  name: "book",
  initialState: { loading: false, error: null, books: {}, book: null },
  reducers: {
    bookRequest: (state) => {
      state.loading = true;
    },
    booksReceived: (state, action) => {
      state.loading = false;
      state.books = action.payload;
      //localStorage.setItem("books", JSON.stringify(state.book));
    },
    bookReceived: (state, action) => {
      state.loading = false;
      state.book = action.payload;
      //localStorage.setItem("books", JSON.stringify(state.book));
    },
    bookError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { bookRequest, booksReceived, bookReceived, bookError } =
  book.actions;

export default book.reducer;

//actions
export const getAllBook = () => async (dispatch) => {
  try {
    dispatch({ type: bookRequest.type });
    const { data } = await API.get("/books/allBooks");
    dispatch({ type: booksReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: bookError.type, payload: error });
    console.log(error);
  }
};
export const getBookId = (formData) => async (dispatch) => {
  try {
    dispatch({ type: bookRequest.type });
    const { data } = await API.get("/books/" + formData);
    dispatch({ type: bookReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: bookError.type, payload: error });
    console.log(error);
  }
};
export const getBookSearch = (searchValue) => async (dispatch) => {
  try {
    dispatch({ type: bookRequest.type });
    const { data } = await API.post("/books/search", { searchValue });
    dispatch({ type: booksReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: bookError.type, payload: error });
    console.log(error);
  }
};
export const getBookMainCategory = (category, main) => async (dispatch) => {
  try {
    dispatch({ type: bookRequest.type });
    const { data } = await API.post("/books/category", { category, main });
    dispatch({ type: booksReceived.type, payload: data });
  } catch (error) {
    dispatch({ type: bookError.type, payload: error });
    console.log(error);
  }
};
