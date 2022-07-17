import { createSlice } from "@reduxjs/toolkit";
import { MemberRole } from "./servers";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  // user: null,
  user: null,
  // {
  //   username: "",
  //   tag: "",
  //   avatar:
  //     "",
  //   about: "",
  //   banner: "",
  //   userID: "",
  //   email: "",
  //   birthday: "",
  //   serverOwner: false,
  //   roles: {
  //     userID: "",
  //     serverOwner: false,
  //     roles: [],
  //   },
  //   // permissions: {},
  // },
  loading: false,
  isLoggedIn: false,
  signUpSuccess: false,
  updateBasicProfileSuccess: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    signOut: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    signUp(state, action) {
      state.user = action.payload;
      state.signUpSuccess = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    closeSignupConfirmModal(state, action) {
      state.signUpSuccess = false;
    },
    updateBasicProfile(state, action) {
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.birthday = action.payload.birthday;
      state.user.gender = action.payload.gender;
      state.user.tel = action.payload.tel;
      state.user.category = action.payload.category;
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
    setUserAbout(state, action) {
      state.user.about = action.payload;
    },
    resetUserState(state) {
      state.user = null;
      // state.user.username = initialState.user.username;
      // state.user.tag = initialState.user.tag;
      // state.user.avatar = initialState.user.avatar;
      // state.user.about = initialState.user.about;
      // state.user.userID = initialState.user.userID;
      // state.user.email = initialState.user.email;
    },
    refresh(state) {
      state.user = state.user;
    },
    userLoadingStart(state) {
      state.loading = true;
    },
    userLoadingEnd(state) {
      state.loading = false;
    },
    userLoadingEndwithNoone(state) {
      state.loading = false;
      state.user = null;
    }
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     // console.log('HYDRATE', action.payload);

  //     if (!action.payload.user.name) {
  //       return state;
  //     }

  //     state.name = action.payload.user.name;
  //   }
  // }
});

export const {
  login,
  signUp,
  refresh,
  signOut,
  setUser,
  setUserAbout,
  setUserBanner,
  setUserAvatar,
  setUserAvatarPreview,
  resetUserState,
  closeSignupConfirmModal,
  userLoadingStart,
  userLoadingEnd,
  userLoadingEndwithNoone,
} = user.actions;

export const useUserState = () => useAppSelector((state) => state.user);
export default user.reducer;

