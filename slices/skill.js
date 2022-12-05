import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';


export const initialState = {
  mySkills: [],
  relatedSkills: [],
  addSkillsDone: false,
  updateSkillsDone: false,
  deleteSkillsDone: false,
  loadSkillsDone: false,
  loadRelatedSkillsDone: false,
};

export const skill = createSlice({
  name: "skill",
  initialState,
  reducers: {
    addSkills: (state, action) => {
      state.mySkills.unshift(action.payload);
      state.addSkillsDone = true;
    },
    setAddSkillsDoneFalse: (state) => {
      state.addSkillsDone = false;
    },
    updateSkills: (state, action) => {
      state.mySkills = action.payload;
      state.updateSkillsDone = true;
    },
    setUpdateSkillsDoneFalse: (state) => {
      state.updateSkillsDone = false;
    },
    removeSkill(state, action) {
      const newSkillArr = state.mySkills.filter(v => v.id !== action.payload);
      state.mySkills = newSkillArr;
      state.deleteDone = true;
    },
    loadSkills(state, action) {
      state.mySkills = action.payload;
      state.loadSkillsDone = true;
    },
    loadRelatedSkills(state, action) {
      state.relatedSkills = action.payload;
      state.loadRelatedSkillsDone = true;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.skill,
      };
    },
  }
});

export const {
  addSkills,
  updateSkills,
  removeSkill,
  loadSkills,
  setAddSkillsDoneFalse,
  setUpdateSkillsDoneFalse,
  loadRelatedSkills,
} = skill.actions;

export const useSkillState = () => useAppSelector((state) => state.skill);
export default skill.reducer;

