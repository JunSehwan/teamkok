import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  mainPosts:[],
  addDone: false,
  updateDone: false,
  deleteDone: false,
  loadDone: false,
  loadPostsDone: false,
  mainComments: [],
  deleteCommentDone: false,
  addCommentDone: false,
  addReplyDone: false,
};

export const section = createSlice({
  name: "section",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.mainPosts.unshift(action.payload);
      state.addDone = true;

    },
    setAddDoneFalse: (state) => {
      state.addDone = false;
    },
    updatePost: (state, action) => {
      state.mainPosts.find((v) => v.id === action.payload.id).description = action.payload.description;
      state.mainPosts.find((v) => v.id === action.payload.id).modifiedId = action.payload.modifiedId;
      state.mainPosts.find((v) => v.id === action.payload.id).modifiedName = action.payload.modifiedName;
      state.updateDone = true;
    },
    updateDoneFalse: (state) => {
      state.updateDone = false;
    },
    removePost(state, action) {
      state.mainPosts = state.mainPosts.filter(v => v.id !== action.payload);
      state.deleteDone = true;
    },
    setRemoveDoneFalse: (state) => {
      state.deleteDone = false;
    },
    loadPost(state, action) {
      state.singlePost = action.payload;
      state.loadDone = true;
    },
    loadPosts(state, action) {
      state.mainPosts = action.payload;
      state.loadPostsDone = true;
    },
    likeToPost(state, action) {
      const target = state.mainPosts?.find((v) => v.id === action.payload.postId);
      target?.likes?.unshift({ userId: action.payload.userId, username: action.payload.username, userAvatar: action.payload.userAvatar });
    },
    unlikeToPost(state, action) {
      const target = state.mainPosts.find((v) => v.id === action.payload.postId);
      target.likes = target.likes?.filter((v) => v.userId !== action.payload.userId);
    },
    addComment: (state, action) => {
      const target = state.mainPosts?.find((v) => v.id === action.payload.postId);
      if (!target.numComments) {
        target.numComments = 1;
      } else {
        target.numComments = target.numComments + 1;
      }
      state.addCommentDone = true;
    },
    addCommentDoneFalse: (state) => {
      state.addCommentDone = false;
    },
    loadComments(state, action) {
      var arr = [...state.mainComments, ...action.payload];
      state.mainComments = arr.filter((v, i, a) => a.findIndex(t => (t.createdAt === v.createdAt && t.commentText === v.commentText)) === i)
    },

    addReply: (state, action) => {
      const target = state.mainComments?.find((v) => v.docId === action.payload.commentId);
      target.reply = action.payload.result;
      state.addReplyDone = true;
    },
    addReplyDoneFalse: (state) => {
      state.addReplyDone = false;
    },
    deleteReply(state, action) {
      const target = state.mainComments.find((v) => v.docId === action.payload.commentId);
      target.reply = target.reply?.filter((v) => v.createdAt !== action.payload.createdAt);
    },
    deleteComment(state, action) {
      state.mainComments = state.mainComments.filter(v => v.docId !== action.payload.commentId);

      state.deleteCommentDone = true;
      const target = state.mainPosts?.find((v) => v.id === action.payload.postId);
      target.numComments = target.numComments - 1;
    },
    setLoadPostEmpty(state, action) {
      state.mainPosts = [];
      state.loadPostsDone = true;
    },
    
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.section,
      };
    },
  }
});

export const {
  addPost,
  setAddDoneFalse,
  updatePost,
  updateDoneFalse,
  removePost,
  setRemoveDoneFalse,
  loadPosts,
  loadPost,
  loadAllPosts,
  likeToPost,
  unlikeToPost,
  addComment,
  addCommentDoneFalse,
  loadComments,
  addReply,
  addReplyDoneFalse,
  deleteReply,
  deleteComment,
  setLoadPostEmpty,
} = section.actions;

export const useSectionState = () => useAppSelector((state) => state.section);
export default section.reducer;

