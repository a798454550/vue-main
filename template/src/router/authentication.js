import { isFunction, isBoolean } from 'lodash';
/**
 * 对路由进行鉴权处理
 */
let registerAuthenticationRouter = ({ $router: router, $route, $store, identityCheck }) => {
  let loginComponent = $store.state.components.asyncComponents.login;
  if (!loginComponent) {
    $store.commit('global/setLoginStatus', true);
    return;
  }

  router.addRoutes([{
    path: '/login',
    name: 'login',
    component: loginComponent
  }]);
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !$store.getters['global/loginStatus']) {
      next({ name: 'login', params: { router: from } });
      return;
    }
    next()
  });
}
export default registerAuthenticationRouter;