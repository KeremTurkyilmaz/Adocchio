import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About.vue')
    },
    {
      path: '/works',
      name: 'Works',
      component: () => import('../pages/Works.vue')
    }
  ]
});

export default router;
