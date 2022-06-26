import { createApp } from 'vue';

import App from '@/app/App.vue';
import { router } from '@/app/router';

import ButtonComponent from '@wjb/vue/component/ButtonComponent.vue';
import IconComponent from '@wjb/vue/component/IconComponent.vue';

const app = createApp(App);

app.use(router);

app.component('ButtonComponent', ButtonComponent);
app.component('IconComponent', IconComponent);

app.mount('#app');