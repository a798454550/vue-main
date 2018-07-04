import Vue from 'vue';
import Router from 'vue-router';

import mainComponent from '../App';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        name: 'root',
        redirect: '/main'
    },{
        path: '/main',
        name: 'main',
        component: mainComponent
    }]
});

export default router;