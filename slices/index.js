import { combineReducers } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';
import userReducer from './user';
import userSettingsReducer from './userSettings';
import categoryReducer from './category';
import educationReducer from './education';
import careerReducer from './career';
import mystyleReducer from './mystyle';
import boardReducer from './board';

const rootReducer = combineReducers({
  userReducer,
  userSettingsReducer,
  categoryReducer,
  educationReducer,
  careerReducer,
  mystyleReducer,
  boardReducer,
});

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

export default rootReducer;