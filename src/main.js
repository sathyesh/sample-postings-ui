import Vue from 'vue';

// Third Party Plugin import
import vSelect from 'vue-select';
import Notifications from 'vue-notification';

// App Global component import
import App from './App.vue';
import AppLoader from './components/AppLoader.vue';

// App router and Store import
import router from './router';
import store from './store';

// CSS import
import '@/assets/scss/main.scss';

// App Global Component Installation
Vue.component('app-loader', AppLoader);

// Third Party Plugin Component Installation
Vue.component('v-select', vSelect);
Vue.use(Notifications);

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
