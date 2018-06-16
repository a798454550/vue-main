<template>
  <div @click="onLogin" class="login">点击登录</div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      toRouter: null
    };
  },
  methods: {
    onLogin() {
      this.$store.commit('global/setUserInfo', { username: '15859******' });
      if (this.toRouter) {
        this.$router.push({ path: this.toRouter.path });
        return;
      }
      this.$router.push({ path: '/' });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.toRouter = to && from && to.path === from.path ? null : from;
    });
  }
};
</script>

<style>
.login {
  font-size: 20px;
}
</style>


