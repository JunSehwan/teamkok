import { configureStore } from "@reduxjs/toolkit";

// import serversReducer from "slices/servers";
import userSettingsReducer from "slices/userSettings";
import userReducer from "slices/user";
// import addServerReducer from "slices/addServer";
// import serverSettingsReducer from "slices/serverSettings";
// import sendGifReducer from "slices/sendGif";

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',

  reducer: {
    user: userReducer,
    userSettings: userSettingsReducer,
    // servers: serversReducer,
    // serverSettings: serverSettingsReducer,
    // addServer: addServerReducer,
    // sendGif: sendGifReducer,
  },
});

export default store;