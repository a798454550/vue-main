import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // data: [],
    },
    getters: {
        // data: state => {
        //     return state.data;
        // }
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        config: {
            namespaced: true,
            state: {
                app: {}
            },
            getters: {
                app: (state) => (key) => {
                    return key && key !== '' ? state.app[key] : state.app;
                },
            },
            mutations:{
                pushAppConfig(state, data) {
                    state.app = data;
                }
            }
        }
    }
});
