import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

createApp(App).use(ElementPlus).use(createPinia()).use(router).mount('#app');
