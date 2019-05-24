import Vue from 'vue';
import Vuex from 'vuex';
import { Chat } from './models/chat';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: {
      username: String,
      email: String,
      password: String,
      picture: String,
      status: String,
      chats: [Number]
    }
  },
  mutations: {

  },
  actions: {

  }
});
