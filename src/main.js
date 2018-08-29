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
//创建和挂载根实例 通过router配置参数注入路由 从而让整个应用都有路由功能
new Vue({
  el: '#app',
  router,//缩写 相当于 routers:routers
  store,
  //components: { App },
  //template: '<App/>'
  render:h=>h(App)
});
//注入路由之后，现在
// 可以在任何组件内通过this.$router访问路由器，
//也可以通过this.$route 访问当前路由
//复用组件时，想对路由参数的变化作出响应的话，可以用watch监测$router对象
//或者用beforeRouterUpdate

