import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  addServerOpen: false,
  addServerWindow: "Create Server",
  loading: "idle",
};

export const addServerSlice = createSlice({
  name: "addServer",
  initialState,
  reducers: {
    setAddServerOpen(state, action) {
      state.addServerOpen = action.payload;
    },

    setAddServerWindow(state, action) {
      state.addServerWindow = action.payload;
    },
  },extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.addServer,
      };
    },
  }
});

export const { setAddServerOpen, setAddServerWindow } = addServerSlice.actions;

export const useAddServerState = () =>
  useAppSelector((state) => state.addServer);

export default addServerSlice.reducer;