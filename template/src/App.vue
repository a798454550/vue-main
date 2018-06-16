<template>
  <div id="app">
    <!--页面是否缓存通过meta的keepAlive属性控制-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
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


.vux-confirm{
  .weui-dialog{
    border-radius: 10px;
  }
  .weui-dialog__bd{
    color: #333!important;
    font-size: 17px!important;    
    padding: 22px!important;
    min-height: 25px;
  }
  .weui-dialog__btn_primary,
  .weui-dialog__btn_default
  {
    font-size: 17px!important;
    color: #4EA8EC;
  }
}
.vux-tab {
  .vux-tab-item {    
    color: #666 !important;
    font-size: 17px !important;
  }
  .vux-tab-selected{
    color: #4ea8ec!important;
  }
  .vux-tab-ink-bar{
    height: 3px!important;
    background-color: #4ea8ec!important;
  }
}
.vux-alert{
  .weui-dialog{
    border-radius: 10px;
  }
  .weui-dialog__bd{
    color: #333!important;
    font-size: 17px!important;   
    min-height: 25px;
  }
  .weui-dialog__btn_primary{
    font-size: 17px!important;
    color: #4EA8EC!important;
  }
}
.vux-search-box{
  .weui-search-bar{
    background-color: #F5F5F5;
  }
  .weui-search-bar__cancel-btn {
    color: #4ea8ec !important;
    font-size: 16px;
  }
}
</style>
{{/if_eq}}
<style scoped>
#app > div {
  width: 100%;
  height: 100%;
}
</style>

