import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@frontend/view/AllAlbumsView.vue'),
    },
    {
        path: '/album/:albumID',
        component: () => import('@frontend/view/AlbumView.vue'),
    },
    {
        path: '/new-album',
        component: () => import('@frontend/view/NewAlbumView.vue'),
    },
    {
        path: '/auth',
        component: () => import('@frontend/view/AuthView.vue'),
    },
];

export const appRouter = new VueRouter({
    mode: 'history',
    routes,
});
