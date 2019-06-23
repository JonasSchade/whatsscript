import Vue from 'vue';
import Router from 'vue-router';
import { ChatService } from './services/chat.service';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/',
      redirect: '/chat'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/TheLogin.vue')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('./components/TheRegistration.vue')
    },
    {
      path: '/start',
      name: 'Start',
      component: () => import('./components/StartPage.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('./components/TheChat.vue'),
      beforeEnter: async (to, from, next) => {

        let chats;
        try {
        chats = await ChatService.getAllChats();

        } catch (err) {
          next('/login');
          return;
        }
        
        store.commit('setChats', chats);
        if (chats[0] !== null && chats[0] !== undefined) {
          store.commit('setSelectedChat', chats[0].id);
          next(`/chat/${chats[0].id}`);
        } else {
          next('/start');
        }
      }
    },
    {
      path: '/chat/:chatId',
      props: true,
      component: () => import('./components/TheChat.vue')
    },
    {
      path: '/chatSettings',
      name: 'ChatSettings',
      component: () => import('./components/TheChatSettings.vue')
    }
  ]
});
