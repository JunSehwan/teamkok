import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  // user: null,
  user: null,
  friend: null,
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
  updatePurposeDone: false,
  updateCliptypeDone: false,
  patchMycompanyInfoDone: false,
  patchMycompanyAdditionalInfoDone: false,
  patchCategoryDone: false,
  patchCompanylogoDone: false,
  companylogoPreview: "",
  avatarPreview: "",
  updateAvatarDone: false,
  updateAdditionalInfoDone: false,
  patchThumbvideoDone: false,
  patchThumbimageDone: false,
  addLikeDone: false,
  addUnlikeDone: false,
  addAdviceDone: false,
  deleteAdviceDone: false,
  addCoccocDone: false,
  deleteCoccocDone: false,
  addJobofferDone: false,
  deleteJobofferDone: false,
  scrollPosition: 0,
  scrolling: false,
  categoryFilter: null,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.signUpSuccess = true;
    },
    signOut: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.signUpSuccess = false;
    },
    signUp(state, action) {
      state.user = action.payload;
      state.signUpSuccess = true;
      state.isLoggedIn = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setOtherUser(state, action) {
      state.friend = action.payload;
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
      state.user.birthday = action.payload.newForm;
      state.user.gender = action.payload.gender;
      state.user.phonenumber = action.payload.tel;
      state.user.address = action.payload.address;
      state.user.address_sido = action.payload.address_sido;
      state.updateBasicProfileSuccess = true;
    },
    updateBasicProfileFalse(state, action) {
      state.updateBasicProfileSuccess = false;
    },
    patchMycompanyInfo(state, action) {
      state.user.mycompany = action.payload.mycompany;
      state.user.myposition = action.payload.myposition;
      state.user.mysection = action.payload.mysection;
      state.user.mytype = action.payload.mytype;
      state.user.mycategory = action.payload.mycategory;
      state.user.companyemail = action.payload.companyemail;
      state.user.companycomplete = action.payload.companycomplete;
      state.patchMycompanyInfoDone = true;
    },
    patchMycompanyInfofalse(state, action) {
      state.patchMycompanyInfoDone = false;
    },
    patchMycompanyAdditionalInfo(state, action) {
      state.user.companyfield = action.payload.companyfield;
      state.user.companyurl = action.payload.companyurl;
      state.user.companyaddress = action.payload.companyaddress;
      state.user.staffnumber = action.payload.staffnumber;
      state.user.companyadditional = action.payload.companyadditional;
      state.patchMycompanyAdditionalInfoDone = true;
    },
    updateAdditionalInfo(state, action) {
      state.user.links = [];
      state.user.address = action.payload.address;
      state.user.address_sido = action.payload.address_sido;
      state.user.links = action.payload.links;
      // state.user.links = state.user.links.concat(action.payload.links);
      state.user.additionalMent = action.payload.additionalMent;
      state.updateAdditionalInfoDone = true;
    },
    updateAdditionalInfoDoneFalse(state, action) {
      state.updateAdditionalInfoDone = false;
    },
    updateAdditionalInfoInProfile(state, action) {
      state.user.links = [];
      state.user.links = action.payload.links;
      // state.user.links = state.user.links.concat(action.payload.links);
      state.user.additionalMent = action.payload.additionalMent;
      state.updateAdditionalInfoDone = true;
    },
    updateAdditionalInfoDoneFalseInProfile(state, action) {
      state.updateAdditionalInfoDone = false;
    },
    patchMycompanyAdditionalInfofalse(state, action) {
      state.patchMycompanyAdditionalInfoDone = false;
    },
    updateUserStyle(state, action) {
      state.user.style = action.payload;
      state.updateStyleDone = true;
    },
    updateUserCliptype(state, action) {
      state.user.cliptype = action.payload;
      state.updateCliptypeDone = true;
    },
    updateCliptypeFalse(state, action) {
      state.updateCliptypeDone = false;
    },
    updateUserPurpose(state, action) {
      state.user.purpose = action.payload;
      state.updatePurposeDone = true;
    },
    updatePurposeFalse(state, action) {
      state.updatePurposeDone = false;
    },
    patchCategory(state, action) {
      state.user.category = action.payload;
      state.patchCategoryDone = true;
    },
    patchCategoryFalse(state, action) {
      state.patchCategoryDone = false;
    },
    patchCompanylogoPreview(state, action) {
      state.companylogoPreview = action.payload;
    },
    patchCompanylogo(state, action) {
      state.user.companylogo = action.payload;
      state.patchCompanylogoDone = true;
    },
    patchCompanylogoFalse(state, action) {
      state.patchCompanylogoDone = false;
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
      state.updateAvatarDone = true;
    },
    updateAvatarDoneFalse(state, action) {
      state.updateAvatarDone = false;
    },

    patchThumbvideo(state, action) {
      state.user.thumbvideo = action.payload;
      state.patchThumbvideoDone = true;
    },
    patchThumbvideoDoneFalse(state, action) {
      state.patchThumbvideoDone = false;
    },
    patchThumbimage(state, action) {
      state.user.thumbimage = action.payload;
      state.patchThumbimageDone = true;
    },
    patchThumbimageDoneFalse(state, action) {
      state.patchThumbimageDone = false;
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
    likeToUser(state, action) {
      const target = state.users?.find((v) => v?.userID === action.payload.targetId);
      target?.liked?.unshift({ userId: action.payload.userId, username: action.payload.username, userAvatar: action.payload.userAvatar });
      // const me = state.users?.find((v) => v?.userID === action.payload.userId);
      // me?.likes?.unshift({ userId: action.payload.targetId, username: action.payload.targetName, userAvatar: action.payload.targetAvatar });
      state.addLikeDone = true;
    },
    unlikeToUser(state, action) {
      const target = state.users.find((v) => v?.userID === action.payload.targetId);
      target.liked = target?.liked?.filter((v) => v?.userId !== action.payload.userId);
      // const me = state.users.find((v) => v?.userID === action.payload.userId);
      // me.likes = me?.likes?.filter((v) => v?.userId !== action.payload.targetId);
      state.addUnlikeDone = true;
    },
    addLikeDoneFalse(state) {
      state.addLikeDone = false;
    },
    addUnlikeDoneFalse(state) {
      state.addUnlikeDone = false;
    },
    likeToDetailUser(state, action) {
      state.friend?.liked?.unshift({ userId: action.payload.userId, username: action.payload.username, userAvatar: action.payload.userAvatar });
      state.user?.likes?.unshift({ userId: action.payload.targetId, username: action.payload.targetName, userAvatar: action.payload.targetAvatar });
    },
    unlikeToDetailUser(state, action) {
      state.friend.liked = state.friend.liked.filter((v) => v.userId !== action.payload.userId);
      state.user.likes = state.user.likes.filter((v) => v.userId !== action.payload.targetId);
    },
    addAdvice(state, action) {
      const target = state.users?.find((v) => v.userID === action.payload.targetId);
      target?.adviced?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        annoymous: action.payload.annoymous,
        rating: action.payload.rating,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      const me = state.users?.find((v) => v.userID === action.payload.userId);
      me?.advices?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        annoymous: action.payload.annoymous,
        rating: action.payload.rating,
      });
      state.addAdviceDone = true;
    },
    addDetailAdvice(state, action) {
      state.friend?.adviced?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        rating: action.payload.rating,
        annoymous: action.payload.annoymous,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      state.user?.advices?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        rating: action.payload.rating,
        annoymous: action.payload.annoymous,
      });
      state.addAdviceDone = true;
    },
    deleteAdvice(state, action) {
      const target = state.users.find((v) => v.userID === action.payload.targetId);
      target.adviced = target.adviced.filter((v) => v.userId !== action.payload.userId);
      const me = state.users.find((v) => v.userID === action.payload.userId);
      me.advices = me.advices.filter((v) => v.userId !== action.payload.targetId);
      state.deleteAdviceDone = true;
    },
    addAdviceDoneFalse(state) {
      state.addAdviceDone = false;
    },
    deleteAdviceDoneFalse(state) {
      state.deleteAdviceDone = false;
    },

    addCoccoc(state, action) {
      const target = state.users?.find((v) => v.userID === action.payload.targetId);
      target?.coccoced?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        company: action.payload.company,
        section: action.payload.section,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      const me = state.users?.find((v) => v.userID === action.payload.userId);
      me?.coccocs?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        company: action.payload.company,
        section: action.payload.section,
      });
      state.addCoccocDone = true;
    },
    addDetailCoccoc(state, action) {
      state.friend?.coccoced?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        company: action.payload.company,
        section: action.payload.section,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      state.user?.coccocs?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        company: action.payload.company,
        section: action.payload.section,
      });
      state.addCoccocDone = true;
    },
    deleteCoccoc(state, action) {
      const target = state.users.find((v) => v.userID === action.payload.targetId);
      target.coccoced = target.coccoced.filter((v) => v.userId !== action.payload.userId);
      const me = state.users.find((v) => v.userID === action.payload.userId);
      me.coccocs = me.coccocs.filter((v) => v.userId !== action.payload.targetId);
      state.deleteCoccocDone = true;
    },
    addCoccocDoneFalse(state) {
      state.addCoccocDone = false;
    },
    deleteCoccocDoneFalse(state) {
      state.deleteCoccocDone = false;
    },

    addJoboffer(state, action) {
      const target = state.users?.find((v) => v.userID === action.payload.targetId);
      target?.joboffered?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        enddate: action.payload.enddate,
        company: action.payload.company,
        section: action.payload.section,
        space: action.payload.space,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      const me = state.users?.find((v) => v.userID === action.payload.userId);
      me?.joboffers?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        enddate: action.payload.enddate,
        company: action.payload.company,
        section: action.payload.section,
        space: action.payload.space,
      });
      state.addJobofferDone = true;
    },
    addDetailJoboffer(state, action) {
      state.friend?.joboffered?.unshift({
        userId: action.payload.userId,
        username: action.payload.username,
        userAvatar: action.payload.userAvatar,
        description: action.payload.description,
        job: action.payload.job,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        enddate: action.payload.enddate,
        company: action.payload.company,
        section: action.payload.section,
        space: action.payload.space,
        mycompany: action.payload.mycompany,
        mysection: action.payload.mysection,
        companylogo: action.payload.companylogo,
      });
      state.user?.joboffers?.unshift({
        userId: action.payload.targetId,
        username: action.payload.targetName,
        userAvatar: action.payload.targetAvatar,
        description: action.payload.description,
        job: action.payload.job,
        enddate: action.payload.enddate,
        salary: action.payload.salary,
        type: action.payload.type,
        duedate: action.payload.duedate,
        company: action.payload.company,
        section: action.payload.section,
        space: action.payload.space,
      });
      state.addJobofferDone = true;
    },
    deleteJoboffer(state, action) {
      const target = state.users.find((v) => v.userID === action.payload.targetId);
      target.joboffered = target.joboffered.filter((v) => v.userId !== action.payload.userId);
      const me = state.users.find((v) => v.userID === action.payload.userId);
      me.joboffers = me.joboffers.filter((v) => v.userId !== action.payload.targetId);
      state.deleteJobofferDone = true;
    },
    addJobofferDoneFalse(state) {
      state.addJobofferDone = false;
    },
    deleteJobofferDoneFalse(state) {
      state.deleteJobofferDone = false;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
      state.scrolling = true;
    },
    setScrollPositionDone(state) {
      state.scrolling = false;
    },
    changeCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
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
  updateAvatarDoneFalse,
  resetUserState,
  closeSignupConfirmModal,
  userLoadingStart,
  userLoadingEnd,
  userLoadingEndwithNoone,
  updateBasicProfile,
  updateBasicProfileFalse,
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
  updateUserPurpose,
  patchServiceInfoSeen,
  patchMycompanyInfo,
  patchMycompanyInfofalse,
  patchMycompanyAdditionalInfo,
  patchMycompanyAdditionalInfofalse,
  updatePurposeFalse,
  patchCategory,
  patchCategoryFalse,
  patchCompanylogoPreview,
  patchCompanylogo,
  patchCompanylogoFalse,
  updateAdditionalInfo,
  updateAdditionalInfoDoneFalse,
  updateAdditionalInfoInProfile,
  updateAdditionalInfoDoneFalseInProfile,
  patchThumbvideo,
  patchThumbvideoDoneFalse,
  patchThumbimage,
  patchThumbimageDoneFalse,
  likeToUser,
  unlikeToUser,
  likeToDetailUser,
  unlikeToDetailUser,
  addAdvice,
  addDetailAdvice,
  addAdviceDoneFalse,
  deleteAdvice,
  deleteAdviceDoneFalse,
  addCoccoc,
  addDetailCoccoc,
  addCoccocDoneFalse,
  deleteCoccoc,
  deleteCoccocDoneFalse,
  addJoboffer,
  addDetailJoboffer,
  addJobofferDoneFalse,
  deleteJoboffer,
  deleteJobofferDoneFalse,
  setOtherUser,
  setScrollPosition,
  addLikeDoneFalse,
  addUnlikeDoneFalse,
  setScrollPositionDone,
  changeCategoryFilter,
  updateUserCliptype,
  updateCliptypeFalse,
} = user.actions;

export const useUserState = () => useAppSelector((state) => state.user);
export default user.reducer;

