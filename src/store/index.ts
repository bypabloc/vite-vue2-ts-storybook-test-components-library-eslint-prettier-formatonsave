import Vue from "vue";

import { createPinia, PiniaVuePlugin, setActivePinia } from "pinia";

Vue.use(PiniaVuePlugin);
const store = createPinia();
setActivePinia(store);

export default store;
