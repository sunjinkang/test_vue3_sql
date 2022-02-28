import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
const router: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        // redirect: '/login',
        component: () => import('../page/Login/index.vue'),
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('../page/ErrorPage/index.vue'),
    },
    {
        path: '/platform',
        name: 'PlatformManagement',
        redirect: '/platform/user',
        children: [
            {
                path: 'user',
                name: 'UserManagement',
                component: () => import('../page/UserManagement/index.vue'),
            },
        ]
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes: router,
});