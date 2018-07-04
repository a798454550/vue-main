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

  },
  computed: {
  },
  created() {
  },
  methods: {
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

