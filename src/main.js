// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//main.js是我们的入口文件，主要作用是初始化vue实例并使用需要的插件
import Vue from 'vue'
import store from './store'
import router from './router'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import '@/assets/fonts/icon/iconfont.css'
import './styles/base.css'
import $ from "jquery"

Vue.use(vueResource);
Vue.use(ElementUI);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale:'zh_CN'
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  //components: { App },
  //template: '<App/>'
  render:h=>h(App)
});
