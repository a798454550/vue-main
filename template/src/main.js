// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';//polyfill一定要在最前
import Es6Promise from 'es6-promise';

import './styles/app.css';

import Vue from 'vue'
import App from './App'


import router {{#authentication}} , { routeAuthentication }  {{/authentication}} from '@/router'//注册路由配置
{{#ajax}}
import api from 'ajax-common-model';
{{/ajax}}
import store from '@/store' //全局状态管理器

//region 使用 fastclick 解决移动端 300ms 点击延迟
import FastClick from 'fastclick';
FastClick.attach(document.body);
//endregion 使用 fastclick 解决移动端 300ms 点击延迟

{{#ajax}}
Vue.use(api, {
    apiConfig: {
        // host: 'https://jsyapi.istrongcloud.com/api',//api的host
        api: './config/api.json',
        commonModel: './config/interface_common_model.json'
    }
});
{{/ajax}}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate() {
  {{#ajax}}
    this.$api.get({ url: './config/app.json', cache: true }).then(config => {
        this.$store.commit('config/pushAppConfig', config || {});//配置信息初始化到config中
    });
  {{/ajax}}
  },
  methods: {
  }
})
