import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from "pinia";
import "./style.css";
import App from "./App.vue";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  render: (h) => h(App),
  pinia,
}).$mount("#app");