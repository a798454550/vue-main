import Vue from 'vue';
import Router from 'vue-router';

{{#authentication}}
//路由鉴权
import routeAuthentication from './authentication'
{{/authentication}}

Vue.use(Router)

const router = new Router({
});


{{#authentication}}
export {
  routeAuthentication
}
{{/authentication}}

export default router;