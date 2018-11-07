// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueResource from 'vue-resource';


Vue.use(MintUI);

Vue.config.productionTip = false;
Vue.use(VueResource);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
