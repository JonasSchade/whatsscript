import Vue from 'vue';
import Vuex from 'vuex';
import { Chat } from './models/chat';
import { User } from './models/user';

Vue.use(Vuex);

interface StateType {
  loggedInUser: User|null;
}

export default new Vuex.Store<StateType>({
  state: {
    loggedInUser: null
  },
  mutations: {
    changeUser(state, user: User) {
      state.loggedInUser = user;
    }
  },
  actions: {

  }
});
