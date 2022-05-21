import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-dark.css";

const { Commons } = require("./assets/js/utils/commons");
const { AnalyticsUtils } = require("./assets/js/utils/analyticsUtils");
const { Controller } = require("./assets/js/controller");

import {
  create,
  NButton,
  NDropdown,
  NMessageProvider,
  NSpace,
  NCode
} from "naive-ui";
import i18n from "./i18n";

const naive = create({
  components: [NButton, NDropdown, NMessageProvider, NSpace, NCode]
});

const app = createApp(App);

app.config.globalProperties.$Commons = Commons;
app.config.globalProperties.$AnalyticsUtils = AnalyticsUtils;
app.config.globalProperties.$Controller = Controller;

app.use(router);
app.use(naive);
app.use(i18n);
app.use(VueHighlightJS);
app.mount("#app");
