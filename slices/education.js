import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  myEducations: [],
  mainSchools: [],

  eduLoading: false,
  addDone: false,
  updateDone: false,
  deleteDone: false,
  loadDone: false,
  loadEducationsDone: false,
  loadSchoolsDone: false,

};

export const education = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action) => {
      state.myEducations.unshift(action.payload);
      state.addDone = true;
    },
    setAddDoneFalse: (state) => {
      state.addDone = false;
    },
    updateEducation: (state, action) => {
      state.myEducations.find((v) => v.id === action.payload.id).name = action.payload.name;
      state.myEducations.find((v) => v.id === action.payload.id).major = action.payload.major;
      state.myEducations.find((v) => v.id === action.payload.id).secondmajor = action.payload.secondmajor;
      state.myEducations.find((v) => v.id === action.payload.id).start = action.payload.start;
      state.myEducations.find((v) => v.id === action.payload.id).end = action.payload.end;
      state.myEducations.find((v) => v.id === action.payload.id).finish = action.payload.finish;
      state.myEducations.find((v) => v.id === action.payload.id).category = action.payload.category;
      state.myEducations.find((v) => v.id === action.payload.id).ismain = action.payload.ismain;
      state.myEducations.find((v) => v.id === action.payload.id).description = action.payload.description;

      state.updateDone = true;
    },
    setUpdateDoneFalse: (state) => {
      state.updateDone = false;
    },
    removeEducation(state, action) {
      console.log(action.payload, "fuckyou");
      const newEdu = state.myEducations.filter(v => v.id !== action.payload);
      state.myEducations = newEdu;
      state.deleteDone = true;
    },
    resetEducationState(state) {
      state.education = null;
    },
    loadEducations(state, action) {
      state.myEducations = action.payload;
      state.loadEducationsDone = true;
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
        ...action.payload.education,
      };
    },
  }
});

export const {
  addEducation,
  updateEducation,
  removeEducation,
  resetEducationState,
  loadEducations,
  loadSchools,
  setAddDoneFalse,
  setUpdateDoneFalse
} = education.actions;

export const useEducationState = () => useAppSelector((state) => state.education);
export default education.reducer;

