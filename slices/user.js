import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  // user: null,
  user: null,
  users: [],
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
  updateStyleDone: false,
  updateSurveyDone: false,

  // 권한
  isExpert: false,
  isAdmin: false,
  setExpertState: false,
  setAdminState: false,
  addPointDone: false,
  updateInfoSeen: false,
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
    setUsers(state, action) {
      state.users = action.payload;
    },
    closeSignupConfirmModal(state, action) {
      state.signUpSuccess = false;
    },
    updateBasicProfile(state, action) {
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.birthday = action.payload.form;
      state.user.gender = action.payload.gender;
      state.user.phonenumber = action.payload.tel;
      state.user.category = action.payload.checkedCategory;
      state.user.url_one = action.payload.url_one;
      state.user.url_two = action.payload.url_two;
      state.user.url_three = action.payload.url_three;
      state.user.address = action.payload.address;
    },
    updateUserStyle(state, action) {
      state.user.style = action.payload;
      state.updateStyleDone = true;
    },
    patchServiceInfoSeen(state, action) {
      state.user.infoseen = action.payload;
      state.updateInfoSeen = true;
    },
    updateUserSurvey(state, action) {
      state.user.survey = action.payload;
      state.updateSurveyDone = true;
    },
    updateStyleFalse(state, action) {
      state.updateStyleDone = false;
    },
    updateSurveyFalse(state, action) {
      state.updateSurveyDone = false;
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
    },
    // 권한
    expertSet: (state, action) => {
      state.isExpert = action.payload;
      state.setExpertState = true;
    },
    adminSet: (state, action) => {
      state.isAdmin = action.payload;
      state.setAdminState = true;
    },
    updateUserFavorites(state, action) {
      state.user.favorites?.unshift({
        boardId: action.payload?.id,
        boardname: action.payload?.name,
        boardlogo: action.payload?.logo || "",
      });
      state.user.favLikes = state.user.favLikes + 1;
    },
    updateUserUnfavorites(state, action) {
      state.user.favorites?.filter(v => v.name !== action.payload?.name);
      state.user.favLikes = state.user.favLikes - 1;
    },
    updateUserExperts(state, action) {
      state.user.experts?.unshift({
        boardId: action.payload?.id,
        boardname: action.payload?.name,
        boardlogo: action.payload?.logo || "",
      });
      state.user.expertNum = state.user.expertNum + 1;
    },
    updateUserUnexperts(state, action) {
      state.user.experts?.filter(v => v.name !== action.payload?.name);
      state.user.expertNum = state.user.expertNum - 1;
    },
    pointGive(state, action) {
      state.user.givePoint?.unshift({
        targetId: action.payload?.targetId,
        targetName: action.payload?.targetName,
        targetAvatar: action.payload?.targetAvatar,
        sectionId: action.payload?.sectionId,
        point: parseInt(action.payload?.point),
        description: action.payload?.description,
        boardName: action.payload?.boardName,
        createdAt: action.payload?.createdAt,
      });
      const target = state.users.find((v) => v.userID === action.payload?.targetId)
      target?.points?.push({
        giverId: action.payload?.userId,
        giverName: action.payload?.username,
        giverAvatar: action.payload?.avatar,
        sectionId: action.payload?.sectionId,
        point: parseInt(action.payload?.point),
        description: action.payload?.description,
        boardName: action.payload?.boardName,
        createdAt: action.payload?.createdAt,
      })
      const myScore = state.users.find((v) => v.userID === action.payload?.targetId)
      myScore.point = state.users.find((v) => v.userID === action.payload?.targetId)?.point + parseInt(action.payload?.point);
      state.addPointDone = true;
    },
    addPointFalse(state) {
      state.addPointDone = false;
    },
    cancelPointGive(state, action) {
      const myScore = state.users.find((v) => v.userID === action.payload?.targetId)
      myScore.point = state.users.find((v) => v.userID === action.payload?.targetId)?.point - parseInt(action.payload?.point);
      myScore.points = myScore.points.filter((v) => v.createdAt !== action.payload?.createdAt)
      state.user.givePoint = state.user.givePoint?.filter(v => v.createdAt !== action.payload?.createdAt)
      state.addPointDone = true;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  }
});

export const {
  login,
  signUp,
  refresh,
  signOut,
  setUser,
  setUsers,
  setUserAbout,
  setUserBanner,
  setUserAvatar,
  setUserAvatarPreview,
  resetUserState,
  closeSignupConfirmModal,
  userLoadingStart,
  userLoadingEnd,
  userLoadingEndwithNoone,
  updateBasicProfile,
  updateUserStyle,
  updateUserSurvey,
  updateStyleFalse,
  updateSurveyFalse,
  expertSet,
  adminSet,
  setDone,
  updateUserFavorites,
  updateUserExperts,
  pointGive,
  addPointFalse,
  cancelPointGive,
  updateUserUnfavorites,
  updateUserUnexperts,
  patchServiceInfoSeen,
} = user.actions;

export const useUserState = () => useAppSelector((state) => state.user);
export default user.reducer;

