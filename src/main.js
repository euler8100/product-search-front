import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import router from './router';
import './registerServiceWorker';

const { Commons } = require('./assets/js/utils/commons');
// const { AnalyticsUtils } = require('./assets/js/utils/analyticsUtils');
const { Controller } = require('./assets/js/controller');

const app = createApp(App);

app.config.globalProperties.$Commons = Commons;
// app.config.globalProperties.$AnalyticsUtils = AnalyticsUtils;
app.config.globalProperties.$Controller = Controller;

app.use(router);
app.mount('#app');
