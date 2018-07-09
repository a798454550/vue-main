import Vue from 'vue';
import Router from 'vue-router';

import mainComponent from '../App';
import pageComponent from '../pages/index';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        name: 'root',
        redirect: '/index'
    },{
        path: '/index',
        name: 'main',
        component: pageComponent
    }]
});

export default router;