import Vue from 'vue';
import App from '@frontend/App.vue';

import { appRouter } from '@frontend/router/appRouter';
import { appState } from '@frontend/state/AppState';

Vue.config.productionTip = false;

(async () => {
    await appState.init();

    new Vue({
        router: appRouter,
        render: h => h(App),
    })
    .$mount('#app');
})();
