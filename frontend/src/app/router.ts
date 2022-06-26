import { createRouter, createWebHistory } from 'vue-router';

import AlbumsView from '@/view/albums/AlbumsView.vue';
import LoginView from '@/view/login/LoginView.vue';

const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path: '/',
            component: AlbumsView,
        },
        {
            path: '/auth',
            component: LoginView,
        },
    ],
});

export { router };