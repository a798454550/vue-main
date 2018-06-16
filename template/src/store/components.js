/**
 * 异步组件或异步页面的注册store
 */
export default {
  namespaced: true,
  state: {
    // 异步组件库
    asyncComponents: {
      {{#authentication}}
      'login': () => import('@/pages/Login')//主要用于卡片加载及router动态加载使用（@strongsoft/ca-framework-vuex的routers模块）
      {{/authentication}}
    }
  }
}
