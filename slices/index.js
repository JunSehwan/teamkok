import { combineReducers } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';
import userReducer from './user';
import userSettingsReducer from './userSettings';
import sectionSettingsReducer from './sectionSettings';
import categoryReducer from './category';
import educationReducer from './education';
import careerReducer from './career';
import mystyleReducer from './mystyle';
import boardReducer from './board';
import sectionReducer from './section';

const rootReducer = combineReducers({
  userReducer,
  userSettingsReducer,
  categoryReducer,
  educationReducer,
  careerReducer,
  mystyleReducer,
  boardReducer,
  sectionReducer,
  sectionSettingsReducer,
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