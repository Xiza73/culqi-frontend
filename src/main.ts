import { createApp } from "vue";
import "./style.scss";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
