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
      state.myEducations.find((v) => v.id === action.payload.EducationId).name = action.payload.name;
      state.myEducations.find((v) => v.id === action.payload.EducationId).major = action.payload.major;
      state.myEducations.find((v) => v.id === action.payload.EducationId).secondmajor = action.payload.secondmajor;
      state.myEducations.find((v) => v.id === action.payload.EducationId).start = action.payload.start;
      state.myEducations.find((v) => v.id === action.payload.EducationId).end = action.payload.end;
      state.myEducations.find((v) => v.id === action.payload.EducationId).finish = action.payload.finish;
      state.myEducations.find((v) => v.id === action.payload.EducationId).category = action.payload.category;
      state.myEducations.find((v) => v.id === action.payload.EducationId).ismain = action.payload.ismain;
      state.myEducations.find((v) => v.id === action.payload.EducationId).description = action.payload.description;

      state.updateDone = true;
    },
    removeEducation(state, action) {
      state.myEducations.filter(v => v.id !== action.payload);
      state.deleteDone = true;
    },
    resetEducationState(state) {
      state.education = null;
    },
    loadEducations(state, action) {
      state.myEducations = state.myEducations.concat(action.payload);
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
  setAddDoneFalse
} = education.actions;

export const useEducationState = () => useAppSelector((state) => state.education);
export default education.reducer;

