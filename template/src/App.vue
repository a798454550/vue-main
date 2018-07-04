<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    };
  },
  watch: {
    {{#authentication}}
    loginSuccess(val) {
      if (val) {

        {{#registerRouters}}
        this.generateRoutes().then(routerConfig => {
          this.$store.dispatch('routers/generateRoutes', {
            router: this.$router,
            pages: routerConfig
          });
        });
        {{/registerRouters}}

      }
    }
    {{/authentication}}
  },
  computed: {
    {{#authentication}}
    /**允许注册路由信息 */
    loginSuccess() {
      return this.$store.getters['global/loginStatus'];
    }
    {{/authentication}}
  },
  created() {
    {{#authentication}}
    if (this.loginSuccess) {
    {{/authentication}}
      {{#registerRouters}}
      this.generateRoutes().then(routerConfig => {
        this.$store.dispatch('routers/generateRoutes', {
          router: this.$router,
          pages: routerConfig
        });
      });
      {{/registerRouters}}
    {{#authentication}}
    }
    {{/authentication}}
  },
  methods: {

    {{#registerRouters}}
    /**@augments 需要实现的路由信息获取并注册功能 */
    generateRoutes() {
      //以下是示例代码，具体实现自行处理
      return new Promise((resolve,reject)=>{
        const getPages = ()=>setTimeout(() => {
          //下面代码是动态路由信息获取的代码，结合store/components.js使用
          const pages = this.$store.getters['config/app']('pages');
          if(pages){
            return resolve(pages)
          }
          getPages();
        }, 100);
         getPages();
      });
    }
    {{/registerRouters}}
  }
};
</script>

{{#if_eq uiLibrary 'vux'}}
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
{{/if_eq}}
<style scoped>
#app > div {
  width: 100%;
  height: 100%;
}
</style>

