import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  mainConversations: [],
  singleConversation: {},
  notRead: false,
  voiceChannel: {
    name: "",
    type: "voice",
    path: "",
    channelID: "",
  },
  messages: [],
  members: [],
  member: {
    username: "",
    tag: "",
    avatar: "",
    about: "",
    banner: "",
    userID: "",
    serverOwner: false,
    roles: [
      // permissions: PermissionsData;
    ],
    // permissions: [],
  },

  memberPreview: {
    userID: "",
    username: "",
    avatar: "",
    serverOwner: false,
    roles: [],
    permissions: [],
  },

  memberRoles: [],

  memberProfileCardOpen: false,
  memberProfileCardPosition: {},
  viewMediaOpen: false,
  viewMedia: {
    src: "",
    type: null,
  },
  serverIDs: [],
  loading: "idle",
  conversationBar: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    loadConversationList(state, action) {
      state.mainConversations = action.payload;
    },
    addConversation(state, action) {
      state.mainConversations.unshift(action.payload);
    },
    loadSingleConversation(state, action) {
      state.singleConversation = action.payload;
    },
    
    updateServerRole(state, action) {
      state.server.roles[action.payload.index] = action.payload.newRole;
    },

    setServerContentFilter(state, action) {
      state.server.contentFilter = action.payload;
    },

    setChannels(state, action) {
      state.channels = action.payload;
    },

    setChannel(state, action) {
      state.channel = action.payload;
    },

    setVoiceChannel(state, action) {
      state.voiceChannel = action.payload;
    },

    setMessages(state, action) {
      state.messages = action.payload;
    },

    setMembers(state, action) {
      state.members = action.payload;
    },

    setMember(state, action) {
      state.member = action.payload;
    },

    setMemberRoles(state, action) {
      state.memberRoles = action.payload;
    },

    setMemberPreview(state, action) {
      state.memberPreview = action.payload;
    },

    setMemberProfileCardOpen(state, action) {
      state.memberProfileCardOpen = action.payload;
    },

    setMemberProfileCardPosition(state, action) {
      state.memberProfileCardPosition = action.payload;
    },

    setViewMediaOpen(state, action) {
      state.viewMediaOpen = action.payload;
    },

    setViewMedia(state, action) {
      state.viewMedia = action.payload;
    },

    setServerIDs(state, action) {
      state.serverIDs = action.payload;
    },

    resetServerState(state) {
      state.server = initialState.server;
      state.channels = initialState.channels;
      state.channel = initialState.channel;
      state.voiceChannel = initialState.voiceChannel;
      state.messages = initialState.messages;
    },
    showConversationBar(state) {
      state.conversationBar = true;
    },
    hideConversationBar(state) {
      state.conversationBar = false;
    },
    messageNotRead(state) {
      state.notRead = true;
    },
    messageRead(state) {
      state.notRead = false;
    },
  },
  extraReducers: {
    // The HYDRATE function is what manages the state between client and server
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.chat,
      };
    },
  }
});

export const {
  loadConversationList,
  loadSingleConversation,
  addConversation,
  updateServerRole,
  setServerContentFilter,
  setChannels,
  setChannel,
  setVoiceChannel,
  setMessages,
  setMembers,
  setMember,
  setMemberRoles,
  setMemberPreview,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  setViewMediaOpen,
  setViewMedia,
  setServerIDs,
  resetServerState,
  showConversationBar,
  hideConversationBar,
  messageNotRead,
  messageRead
} = chatSlice.actions;

export const useChatState = () => useAppSelector((state) => state.chat);

export default chatSlice.reducer;