import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
// import serversReducer from "slices/servers";
import userSettingsReducer from "slices/userSettings";
import userReducer from "slices/user";
import categoryReducer from "slices/category";
// import addServerReducer from "slices/addServer";
// import serverSettingsReducer from "slices/serverSettings";
// import sendGifReducer from "slices/sendGif";

const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',

    reducer: {
      user: userReducer,
      userSettings: userSettingsReducer,
      category: categoryReducer,
      // servers: serversReducer,
      // serverSettings: serverSettingsReducer,
      // addServer: addServerReducer,
      // sendGif: sendGifReducer,
    },
  });

// export default store;
export const wrapper = createWrapper(makeStore);
// export const AppStore = makeStore;
// export const RootState = ReturnType<AppStore["getState"]>;
// export const AppDispatch = AppStore["dispatch"];