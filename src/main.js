import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import router from './router';
import './registerServiceWorker';
import search from "./plugins/search/config";

const { Commons } = require('./assets/js/utils/commons');
// const { AnalyticsUtils } = require('./assets/js/utils/analyticsUtils');
const { Controller } = require('./assets/js/controller');

const app = createApp(App);

app.config.globalProperties.$Commons = Commons;
// app.config.globalProperties.$AnalyticsUtils = AnalyticsUtils;
app.config.globalProperties.$Controller = Controller;


let productToShow = { picturePath: "" };
app.config.globalProperties.$GetProductToShow = () => {
  return productToShow;
};
app.config.globalProperties.$SetProductToShow = (product) => {
  productToShow = product;
};

app.use(router);
app.use(search);

app.mount('#app');
