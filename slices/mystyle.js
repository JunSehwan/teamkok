import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  mystyle: null,

  updateStyleDone: false,

  eduLoading: false,
  addDone: false,
  updateDone: false,
  deleteDone: false,
  loadDone: false,
  loadMystylesDone: false,
  loadSchoolsDone: false,
  updateStyleDone: false,
  updateSurveyDone: false,
};

export const mystyle = createSlice({
  name: "mystyle",
  initialState,
  reducers: {
    updateUserStyle: (state, action) => {
      state.mystyle.style = action.payload;
      state.updateStyleDone = true;
    },

    updateSurvey: (state, action) => {
      state.mystyle.one = action.payload.one;
      state.mystyle.two = action.payload.two;
      state.mystyle.three = action.payload.three;
      state.mystyle.four = action.payload.four;
      state.mystyle.five = action.payload.five;
      state.mystyle.six = action.payload.six;
      state.mystyle.seven = action.payload.seven;
      state.mystyle.eight = action.payload.eight;
      state.updateSurveyDone = true;
    },

    addMystyle: (state, action) => {
      state.mystyle.unshift(action.payload);
      state.addDone = true;
    },
    setAddDoneFalse: (state) => {
      state.addDone = false;
    },
   
    setUpdateDoneFalse: (state) => {
      state.updateDone = false;
    },
    removeMystyle(state, action) {
      const newEdu = state.mystyle.filter(v => v.id !== action.payload);
      state.mystyle = newEdu;
      state.deleteDone = true;
    },
    resetMystyleState(state) {
      state.mystyle = null;
    },
    loadMystyles(state, action) {
      state.mystyle = action.payload;
      state.loadMystylesDone = true;
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
        ...action.payload.mystyle,
      };
    },
  }
});

export const {
  addMystyle,
  updateMystyle,
  removeMystyle,
  resetMystyleState,
  loadMystyles,
  loadSchools,
  setAddDoneFalse,
  setUpdateDoneFalse
} = mystyle.actions;

export const useMystyleState = () => useAppSelector((state) => state.mystyle);
export default mystyle.reducer;

