import Vue from 'vue';
import VueRouter from 'vue-router';
import Postings from '../views/Postings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Postings',
    component: Postings,
  },
  {
    path: '/post/:id',
    name: 'PostingDetails',
    // route level code-splitting
    // this generates a separate chunk (post.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post" */ '../views/PostingDetails.vue'),
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
