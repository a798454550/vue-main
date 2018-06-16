import Vue from 'vue';
import Vuex from 'vuex';

import components from './components';

import frameworkStore from '@strongsoft/ca-framework-vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...frameworkStore,
    components
  }
});
