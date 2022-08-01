import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  myBoards: [],
  AllBoards: [],
  singleBoard: null,
  logoPreview: null,
  selectedCategory: null,
  singleSection: null,

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
  categorySetDone: false,
  updateSectionInfoDone: false,
  loadSectionDone: false,
  updateTeamSurveyDone: false,
  addSectionsDone: false,
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
    categorySelect: (state, action) => {
      state.selectedCategory = action.payload;
    },
    categorySet: (state, action) => {
      state.categorySetDone = true;
    },
    updateSectionInfo: (state, action) => {
      if (state.singleSection) {
        state.singleSection.advantage = action.payload.advantage;
        state.singleSection.boardCategory = action.payload.boardCategory;
        state.singleSection.boardId = action.payload.boardId;
        state.singleSection.createdAt = action.payload.createdAt;
        state.singleSection.creatorId = action.payload.creatorId;
        state.singleSection.creatorName = action.payload.creatorName;
        state.singleSection.description = action.payload.description;
        state.singleSection.sectionId = action.payload.sectionId;
        state.singleSection.intro = action.payload.intro;
        state.singleSection.peopleCount = action.payload.peopleCount;
      }
      if (!state.singleSection) {
        state.singleSection = action.payload;
      }
      state.updateSectionInfoDone = true;
    },
    setSectionUpdateDoneFalse: (state) => {
      state.updateSectionInfoDone = false;
    },
    loadSection(state, action) {
      state.singleSection = action.payload;
      state.loadSectionDone = true;
    },
    updateTeamSurvey(state, action) {
      state.singleSection.survey = action.payload;
      state.updateTeamSurveyDone = true;
    },
    updateTeamSurveyFalse(state, action) {
      state.updateTeamSurveyDone = false;
    },
    addSmallIntern(state, action) {
      state.singleSection.smallintern = action.payload;
      state.addSmallInternDone = true;
    },
    addSmallInternFalse(state, action) {
      state.addSmallInternDone = false;
    },
    addSections(state, action) {
      state.singleBoard.category = state.singleBoard.category.concat(action.payload);
      state.addSectionsDone = true;
    },
    addSectionDoneFalse(state, action) {
      state.addSectionsDone = false;
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
},
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
  categorySelect, categorySet,
  updateSectionInfo,
  setSectionUpdateDoneFalse,
  loadSection,
  updateTeamSurvey,
  updateTeamSurveyFalse,
  addSmallIntern,
  addSmallInternFalse,
  addSections,
  addSectionDoneFalse,
} = board.actions;

export const useBoardState = () => useAppSelector((state) => state.board);
export default board.reducer;

