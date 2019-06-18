import Vue from 'vue';
import Vuex from 'vuex';
import { Chat } from './models/chat';
import { User } from './models/user';

Vue.use(Vuex);

interface StateType {
  loggedInUser: User|null;
  rightDrawerActive: boolean;
  leftDrawerActive: boolean;
  selectedChat: number|null;
  chats: Chat[];
  token: string;
}

export default new Vuex.Store<StateType>({
  state: {
    loggedInUser: null,
    rightDrawerActive: false,
    leftDrawerActive: false,
    selectedChat: null,
    chats: [],
    token: ''
  },
  mutations: {
    changeUser(state, user: User) {
      state.loggedInUser = user;
    },
    changeDrawer(state) {
      state.rightDrawerActive = !state.rightDrawerActive;
    },
    changeDrawerLeft(state) {
      state.leftDrawerActive = !state.leftDrawerActive;
    },
    setSelectedChat(state, chatId) {
      state.selectedChat = chatId;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {

  }
});
