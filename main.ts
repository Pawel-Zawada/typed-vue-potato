import Vue from 'vue';
import App from './App.vue';

/**
 * Import & configure `Vue Router` as router system.
 */
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

/**
 * Import and inject `ElementUI` as UI library.
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en.js';

Vue.use(ElementUI, { locale });

/**
 * Mount Vue to the root node.
 */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
