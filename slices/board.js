import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  myBoards: [],
  AllBoards: [],
  singleBoard: null,
  logoPreview: null,
  boardLoading: false,
  loadAllBoardsDone: false,
  addDone: false,
  updateDone: false,
  deleteDone: false,
  loadDone: false,
  loadBoardDone: false,
  loadBoardsDone: false,
  loadCompaniesDone: false,
  changeLogoOpen: false,
  sidebarIn: true,
};

export const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.myBoards.unshift(action.payload);
      state.addDone = true;
    },
    setAddDoneFalse: (state) => {
      state.addDone = false;
    },
    updateBoard: (state, action) => {
      state.myBoards.find((v) => v.id === action.payload.id).name = action.payload.name;
      state.myBoards.find((v) => v.id === action.payload.id).email = action.payload.email;
      state.myBoards.find((v) => v.id === action.payload.id).category = action.payload.category;
      state.myBoards.find((v) => v.id === action.payload.id).description = action.payload.description;
      state.myBoards.find((v) => v.id === action.payload.id).logo = action.payload.logo;
      state.updateDone = true;
    },
    setUpdateDoneFalse: (state) => {
      state.updateDone = false;
    },
    removeBoard(state, action) {
      const newBoard = state.myBoards.filter(v => v.id !== action.payload);
      state.myBoards = newBoard;
      state.deleteDone = true;
    },
    resetBoardState(state) {
      state.board = null;
    },
    loadBoards(state, action) {
      state.myBoards = action.payload;
      state.loadBoardsDone = true;
    },
    loadBoard(state, action) {
      state.singleBoard = action.payload;
      state.loadBoardDone = true;
    },
    loadAllBoards(state, action) {
      state.AllBoards = action.payload;
      state.loadAllBoardsDone = true;
    },

    setBoardLogo(state, action) {
      state.myBoards.logo = action.payload;
    },
    setBoardLogoPreview(state, action) {
      state.logoPreview = action.payload;
    },
    setChangeLogoOpen(state, action) {
      state.changeLogoOpen = action.payload;
    },
    sideOpen: (state) => {
      state.sidebarIn = true;
    },
    sideClose: (state) => {
      state.sidebarIn = false;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.board,
      };
    },
  }
});

export const {
  addBoard,
  updateBoard,
  removeBoard,
  resetBoardState,
  loadBoard,
  loadBoards,
  loadAllBoards,
  loadCompanies,
  setAddDoneFalse,
  setUpdateDoneFalse,
  setBoardLogo,
  setBoardLogoPreview,
  setChangeLogoOpen,
  sideOpen,
  sideClose,
} = board.actions;

export const useBoardState = () => useAppSelector((state) => state.board);
export default board.reducer;

