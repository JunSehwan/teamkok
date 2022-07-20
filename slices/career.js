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
    updateCareer: (state, action) => {
      state.myCareers.find((v) => v.id === action.payload.CareerId).name = action.payload.name;
      state.myCareers.find((v) => v.id === action.payload.CareerId).division = action.payload.division;
      state.myCareers.find((v) => v.id === action.payload.CareerId).position = action.payload.position;
      state.myCareers.find((v) => v.id === action.payload.CareerId).start = action.payload.start;
      state.myCareers.find((v) => v.id === action.payload.CareerId).end = action.payload.end;
      state.myCareers.find((v) => v.id === action.payload.CareerId).finish = action.payload.finish;
      state.myCareers.find((v) => v.id === action.payload.CareerId).type = action.payload.type;
      state.myCareers.find((v) => v.id === action.payload.CareerId).job = action.payload.job;
      state.myCareers.find((v) => v.id === action.payload.CareerId).ismain = action.payload.ismain;
      state.myCareers.find((v) => v.id === action.payload.CareerId).description = action.payload.description;
      state.updateDone = true;
    },
    removeCareer(state, action) {
      state.myCareers.filter(v => v.id !== action.payload);
      state.deleteDone = true;
    },
    resetCareerState(state) {
      state.career = null;
    },
    loadCareers(state, action) {
      state.myCareers = action.payload;
      loadCareersDone = true;
    },
    loadCompanies(state, action) {
      state.mainCompanies = action.payload;
      loadCompaniesDone = true;
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
  loadCompanies
} = career.actions;

export const useCareerState = () => useAppSelector((state) => state.career);
export default career.reducer;

