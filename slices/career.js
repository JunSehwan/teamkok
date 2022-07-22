import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  myCareers: [],
  mainCompanies: [],

  careersLoading: false,
  updateDone: false,
  addDone: false,
  deleteDone: false,
  loadDone: false,
  loadCareersDone: false,
  loadCompaniesDone: false,
};

export const career = createSlice({
  name: "career",
  initialState,
  reducers: {
    addCareer: (state, action) => {
      state.myCareers.unshift(action.payload);
      state.addDone = true;
    },
    setAddDoneFalse: (state) => {
      state.addDone = false;
    },
    updateCareer: (state, action) => {
      state.myCareers.find((v) => v.id === action.payload.id).name = action.payload.name;
      state.myCareers.find((v) => v.id === action.payload.id).section = action.payload.section;
      state.myCareers.find((v) => v.id === action.payload.id).position = action.payload.position;
      state.myCareers.find((v) => v.id === action.payload.id).start = action.payload.start;
      state.myCareers.find((v) => v.id === action.payload.id).end = action.payload.end;
      state.myCareers.find((v) => v.id === action.payload.id).finish = action.payload.finish;
      state.myCareers.find((v) => v.id === action.payload.id).type = action.payload.type;
      state.myCareers.find((v) => v.id === action.payload.id).job = action.payload.job;
      state.myCareers.find((v) => v.id === action.payload.id).ismain = action.payload.ismain;
      state.myCareers.find((v) => v.id === action.payload.id).description = action.payload.description;
      state.updateDone = true;
    },
    setUpdateDoneFalse: (state) => {
      state.updateDone = false;
    },
    removeCareer(state, action) {
      const newCar = state.myCareers.filter(v => v.id !== action.payload);
      state.myCareers = newCar;
      state.deleteDone = true;
    },
    resetCareerState(state) {
      state.career = null;
    },
    loadCareers(state, action) {
      state.myCareers = action.payload;
      state.loadCareersDone = true;
    },
    loadCompanies(state, action) {
      state.mainCompanies = action.payload;
      state.loadCompaniesDone = true;
    }

  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.career,
      };
    },
  }
});

export const {
  addCareer,
  updateCareer,
  removeCareer,
  resetCareerState,
  loadCareers,
  loadCompanies,
  setAddDoneFalse,
  setUpdateDoneFalse
} = career.actions;

export const useCareerState = () => useAppSelector((state) => state.career);
export default career.reducer;

