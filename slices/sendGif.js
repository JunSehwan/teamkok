import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  sendGifOpen: false,
  loading: "idle",
};

export const sendGifSlice = createSlice({
  name: "sendGif",
  initialState,
  reducers: {
    setSendGifOpen(state, action) {
      state.sendGifOpen = action.payload;
    },
  }, extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.sendGif,
      };
    },
  }
});

export const { setSendGifOpen } = sendGifSlice.actions;

export const useSendGifState = () => useAppSelector((state) => state.sendGif);

export default sendGifSlice.reducer;