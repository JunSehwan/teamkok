import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  category: [],
  addCategoryDone: false,
  getCategoryDone: false,
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
      state.addCategoryDone = true;
    },
    getCategory: (state, action) => {
      state.category = action.payload;
      state.getCategoryDone = false;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.category,
      };
    },
  }
});

export const {
  addCategory,
  getCategory,

} = category.actions;


export default category.reducer;

