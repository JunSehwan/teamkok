import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userSettingsReducer from "slices/userSettings";
import sectionSettingsReducer from "slices/sectionSettings";
import userReducer from "slices/user";
import categoryReducer from "slices/category";
import educationReducer from "slices/education";
import careerReducer from "slices/career";
import mystyleReducer from "slices/mystyle";
import boardReducer from "slices/board";
import sectionReducer from "slices/section";

import addServerReducer from "slices/addServer";
import chatReducer from "slices/chat";
import jobofferReducer from "slices/joboffer";
import serverSettingsReducer from "slices/serverSettings";
import sendGifReducer from "slices/sendGif";

const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',

    reducer: {
      user: userReducer,
      userSettings: userSettingsReducer,
      sectionSettings: sectionSettingsReducer,
      category: categoryReducer,
      education: educationReducer,
      career: careerReducer,
      mystyle: mystyleReducer,
      board: boardReducer,
      section: sectionReducer,
      
      chat: chatReducer,
      joboffer: jobofferReducer,
      serverSettings: serverSettingsReducer,
      addServer: addServerReducer,
      sendGif: sendGifReducer,
    },
  });

// export default store;
export const wrapper = createWrapper(makeStore);
// export const AppStore = makeStore;
// export const RootState = ReturnType<AppStore["getState"]>;
// export const AppDispatch = AppStore["dispatch"];