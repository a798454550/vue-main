/**
 * 用于app.vue的mixins，简化代码结构
 */
import { findIndex, cloneDeep } from 'lodash';

export default {
  data() {
    return {
      modules: [], //在使用的模块，作为tab的内容
      currentModuleIndex: 1 //当前tab的索引
    };
  },
  watch: {
    storeModule(val) {
      this.modules = cloneDeep(val);
    },
    allowGenerateRoutes(val) {
      if (val) {
        this.generateRoutes().then(routerConfig => {
          this.$store.dispatch('routers/generateRoutes', {
            router: this.$router,
            pages: routerConfig
          });
        });
      }
    }
  },
  computed: {
    /** 有效的模块列表 */
    storeModule() {
      return this.$store.state.routers.modules;
    },
    /** 模块分类控件样式 */
    scrollnavOpts() {
      let { layout } = this.$store.state.config.app || {};
      return layout && layout.scrollnav;
    },
    /**允许注册路由信息 */
    allowGenerateRoutes() {
      let requiredAuthen = this.requiredAuthen;
      if (requiredAuthen === null) {
        return false;
      }
      if (!requiredAuthen) {
        return true;
      }
      return this.$store.getters['global/loginStatus'];
    },
    /** 是否需要登录验证 */
    requiredAuthen() {
      if (!this.$store.state.config.app) {
        return null;
      }
      let { enable } =
        this.$store.getters['config/app']('authentication') || {};

      return enable && this.$store.state.components.asyncComponents.login;
    },
    isModulePage() {
      let { moduleName } = this.$route.meta || {};
      return moduleName && moduleName !== '' && this.modules.length > 1;
    }
  },
  created() {
    this.modules = this.$store.state.routers.modules;
    if (this.allowGenerateRoutes) {
      this.generateRoutes().then(routerConfig => {
        this.$store.dispatch('routers/generateRoutes', {
          router: this.$router,
          pages: routerConfig
        });
      });
    }
  },
  methods: {
    onChooseModule(index) {
      let _module = this.modules[index];
      if (_module && _module.route) {
        this.$router.push({
          path: _module.route.path,
          query: _module.route.query
        });
        return;
      }

      if (_module.pages.length === 0) {
        return;
      }

      let pagePath = _module.pages.find(page => page.meta.moduleRouter) || {};
      this.$router.push({ path: pagePath.path || _module.pages[0].path });
    },
    onAfterEnter() {
      this.$store.commit('routers/setRouterByAfterEnter', this.$route);
    }
  }
}