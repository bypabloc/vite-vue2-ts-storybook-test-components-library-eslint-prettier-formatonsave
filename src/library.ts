import Vue from 'vue'
import { createPinia, PiniaVuePlugin, setActivePinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const store = createPinia()
setActivePinia(store)

import UserComponent from './components/User/Index.vue'
import { useUser } from './hook/user'
import { useUserStore } from './store/modules/user'

export const components = {
  User: UserComponent,
}

export const hooks = {
  useUser,
}

export const stores = {
  useUserStore,
}

export default {
  components,
  hooks,
  stores,
}
