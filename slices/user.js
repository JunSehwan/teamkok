import { createSlice } from "@reduxjs/toolkit";
import { MemberRole } from "./servers";


export const initialState = {
  user: {
    username: "",
    tag: "",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/Account.png?alt=media&token=32d8543b-cc91-4006-b014-ab93d128441a",
    about: "",
    banner: "",
    userID: "",
    email: "",
    birthday: "",
    serverOwner: false,
    roles: {
      userID: "",
      serverOwner: false,
      roles: [],
    },
    // permissions: {},
  },
  loading: "idle",
  isLoggedIn: false,
  signUpSuccess: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.signUpSuccess = true;
    },
    setUserAbout(state, action) {
      state.user.about = action.payload;
    },
    setUserBanner(state, action) {
      state.user.banner = action.payload;
    },

    setUserAvatar(state, action) {
      state.user.avatar = action.payload;
    },

    setUserAvatarPreview(state, action) {
      state.avatarPreview = action.payload;
    },

    resetUserState(state) {
      state.user.username = initialState.user.username;
      state.user.tag = initialState.user.tag;
      state.user.avatar = initialState.user.avatar;
      state.user.about = initialState.user.about;
      state.user.userID = initialState.user.userID;
      state.user.email = initialState.user.email;
    },
  },
});

export const {
  login,
  logout,
  setUser,
  setUserAbout,
  setUserBanner,
  setUserAvatar,
  setUserAvatarPreview,
  resetUserState,
} = user.actions;

export const useUserState = () => useAppSelector((state) => state.user);
export default user.reducer;

