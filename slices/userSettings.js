import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "./user";

const initialState = {
  userSettingsOpen: false,
  userSettingsScreen: "My Account",
  logoutConfirmOpen: false,
  changeUsernameOpen: false,
  changeEmailOpen: false,
  changeAvatarOpen: false,
  memberListOpen: true,
  userChangesMade: false,
  userCopy: UserData || null,
  unsavedChangesError: false,
  loading: "idle",
};

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setUserSettingsOpen(state, action) {
      state.userSettingsOpen = action.payload;
      state.logoutConfirmOpen = false;
    },

    setUserSettingsScreen(state, action) {
      state.userSettingsScreen = action.payload;
    },

    setLogoutConfirmOpen(state, action) {
      state.logoutConfirmOpen = action.payload;
    },

    setChangeUsernameOpen(state, action) {
      state.changeUsernameOpen = action.payload;
    },

    setChangeEmailOpen(state, action) {
      state.changeEmailOpen = action.payload;
    },

    setChangeAvatarOpen(state, action) {
      state.changeAvatarOpen = action.payload;
    },

    setMemberListOpen(state, action) {
      state.memberListOpen = action.payload;
    },

    setUserChangesMade(state, action) {
      state.userChangesMade = action.payload;
    },

    setUserCopy(state, action) {
      state.userCopy = action.payload;
    },

    setUnsavedChangesError(state, action) {
      state.unsavedChangesError = action.payload;
    },
  },
});

export const {
  setUserSettingsOpen,
  setUserSettingsScreen,
  setLogoutConfirmOpen,
  setChangeUsernameOpen,
  setChangeEmailOpen,
  setChangeAvatarOpen,
  setMemberListOpen,
  setUserChangesMade,
  setUserCopy,
  setUnsavedChangesError,
} = userSettingsSlice.actions;

export const useUserSettingsState = () =>
  useAppSelector((state) => state.userSettings);

export default userSettingsSlice.reducer;