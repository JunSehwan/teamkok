import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSettingsReducer from 'slices/userSettings';
import userReducer from 'slices/user';
import categoryReducer from 'slices/category';
import educationReducer from 'slices/education';
import careerReducer from 'slices/career';
import mystyleReducer from 'slices/mystyle';
import boardReducer from 'slices/board';

const makeStore = (context) =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      user: userReducer,
      userSettings: userSettingsReducer,
      category: categoryReducer,
      education: educationReducer,
      career: careerReducer,
      mystyle: mystyleReducer,
      board: boardReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
