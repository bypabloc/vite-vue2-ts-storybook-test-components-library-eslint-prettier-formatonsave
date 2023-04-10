import Vue from "vue";
import "./style.css";
import store from "./store";
import App from "./App.vue";

new Vue({
  pinia: store,
  render: (h) => h(App),
}).$mount("#app");
