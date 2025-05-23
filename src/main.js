import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import axios from 'axios';
import './style.css';

const api = axios.create({
  baseURL:
    'https://script.google.com/macros/s/AKfycbyfAbXJN3UiQUWgdKCQxWB_BRhcwjuO0B7mzO2cfT_yNeX4WvzCo6GwUU_DbsVk-hiH/exec',
});

const app = createApp(App);
app.config.globalProperties.$api = api;
app.use(router);
app.mount('#app');

export default api;
