import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  mainCoccocs: [],
  mainCoccoced: [],
  offerLoading: false,
  addCoccocDone: false,
  updateCoccocDone: false,
  deleteCoccocDone: false,
  loadCoccocDone: false,
  loadCoccocsDone: false,
  loadSchoolsDone: false
};

export const coccoc = createSlice({
  name: "coccoc",
  initialState,
  reducers: {
    addCoccoc: (state, action) => {
      state.mainCoccocs.unshift(action.payload);
      state.addCoccocDone = true;
    },
    addCoccocDoneFalse: (state) => {
      state.addCoccocDone = false;
    },
    updateCoccoc: (state, action) => {
      state.mainCoccoced.find((v) => v.id === action.payload.id).read = action.payload.read;
      state.mainCoccoced.find((v) => v.id === action.payload.id).readtime = action.payload.readtime;
      state.mainCoccoced.find((v) => v.id === action.payload.id).answer = action.payload.answer;
      state.updateCoccocDone = true;
    },
    updateCoccocDoneFalse: (state) => {
      state.updateCoccocDone = false;
    },
    removeCoccoc(state, action) {
      const newEdu = state.mainCoccocs.filter(v => v.id !== action.payload);
      state.mainCoccocs = newEdu;
      state.deleteCoccocDone = true;
    },
    resetCoccocState(state) {
      state.coccoc = null;
    },
    loadCoccocs(state, action) {
      state.mainCoccocs = action.payload;
      state.loadCoccocsDone = true;
    },
    loadCoccoced(state, action) {
      state.mainCoccoced = action.payload;
      state.loadCoccocsDone = true;
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
        ...action.payload.coccoc,
      };
    },
  }
});

export const {
  addCoccoc,
  updateCoccoc,
  removeCoccoc,
  resetCoccocState,
  loadCoccocs,
  loadCoccoced,
  loadSchools,
  addCoccocDoneFalse,
  updateCoccocDoneFalse,
} = coccoc.actions;

export const useCoccocState = () => useAppSelector((state) => state.coccoc);
export default coccoc.reducer;

