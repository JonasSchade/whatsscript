import Vue from 'vue';
import Router from 'vue-router';

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
      redirect: '/login',
      name: 'Login',
      component: () => import('./components/TheLogin.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/TheLogin.vue')
    },

    {
      path: '/chat',
      name: 'Chat',
      component: () => import('./components/TheChat.vue')
    },

    {
      path: '/settings',
      name: 'Settings',
      component: () => import ('./components/TheSettings.vue')

    }
  ]
});
