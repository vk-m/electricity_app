import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createVuestic } from "vuestic-ui";
import 'vuestic-ui/styles/essential.css';
import 'vuestic-ui/styles/typography.css';
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import './assets/main.css';

createApp(App)
    .use(router)
    .use(store)
    .use(createVuestic())
    .mount('#app');