import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  category: null,
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

});

export const {
  addCategory,
  getCategory,

} = category.actions;

export default category.reducer;

