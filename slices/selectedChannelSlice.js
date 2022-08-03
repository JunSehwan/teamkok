import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
const initialSelectedChannelState = {
  selectedChannel: null,
  selectedChannelId: null,
};

export const selectedChannelSlice = createSlice({
  name: "selectedChannel",
  initialState: initialSelectedChannelState,
  reducers: {
    selectChannel(channelState, action) {
      channelState.selectedChannel = action.payload.channelName;
      channelState.selectedChannelId = action.payload.id;
    },
  },
});

export const { selectChannel } = selectedChannelSlice.actions;

export default selectedChannelSlice.reducer;