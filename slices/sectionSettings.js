import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  changePictureOpen: false,
  uploading: false,
  filterNumber: null,
};

export const sectionSettings = createSlice({
  name: "sectionSettings",
  initialState,
  reducers: {
    setChangePictureOpen(state, action) {
      state.changePictureOpen = action.payload;
    },
    loadingUpload(state, action) {
      state.uploading = true;
    },
    loadingUploadDone(state, action) {
      state.uploading = false;
    },
    categorySelect(state, action) {
      state.filterNumber = action.payload;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.sectionSettings,
      };
    },
  }
});

export const {
  setChangePictureOpen,
  loadingUpload,
  loadingUploadDone,
  categorySelect,
} = sectionSettings.actions;

export const useSectionSettingsState = () =>
  useAppSelector((state) => state.sectionSettings);

export default sectionSettings.reducer;