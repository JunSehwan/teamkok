import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  mainJoboffers: [],
  mainJoboffered: [],
  offerLoading: false,
  addJobofferDone: false,
  updateJobofferDone: false,
  deleteJobofferDone: false,
  loadJobofferDone: false,
  loadJoboffersDone: false,
};

export const joboffer = createSlice({
  name: "joboffer",
  initialState,
  reducers: {
    addJoboffer: (state, action) => {
      state.mainJoboffers.unshift(action.payload);
      state.addJobofferDone = true;
    },
    addJobofferDoneFalse: (state) => {
      state.addJobofferDone = false;
    },
    updateJoboffer: (state, action) => {
      state.mainJoboffered.find((v) => v.id === action.payload.id).read = action.payload.read;
      state.mainJoboffered.find((v) => v.id === action.payload.id).readtime = action.payload.readtime;
      state.mainJoboffered.find((v) => v.id === action.payload.id).answer = action.payload.answer;
      state.updateJobofferDone = true;
    },
    updateCoccocDoneFalse: (state) => {
      state.updateJobofferDone = false;
    },
    removeJoboffer(state, action) {
      const newEdu = state.mainJoboffers.filter(v => v.id !== action.payload);
      state.mainJoboffers = newEdu;
      state.deleteJobofferDone = true;
    },
    resetJobofferState(state) {
      state.joboffer = null;
    },
    loadJoboffers(state, action) {
      state.mainJoboffers = action.payload;
      state.loadJoboffersDone = true;
    },
    loadJoboffered(state, action) {
      state.mainJoboffered = action.payload;
      state.loadJoboffersDone = true;
    },
    loadSchools(state, action) {
      state.mainSchools = action.payload;
      state.loadSchoolsDone = true;
    }

  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.joboffer,
      };
    },
  }
});

export const {
  addJoboffer,
  updateJoboffer,
  removeJoboffer,
  resetJobofferState,
  loadJoboffers,
  loadJoboffered,
  loadSchools,
  addJobofferDoneFalse,
  updateCoccocDoneFalse,
} = joboffer.actions;

export const useJobofferState = () => useAppSelector((state) => state.joboffer);
export default joboffer.reducer;

