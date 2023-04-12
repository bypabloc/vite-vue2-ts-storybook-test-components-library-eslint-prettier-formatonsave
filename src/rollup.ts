import UserComponent from './components/User/Index.vue'

import { useUser } from './hook/user'

import { useUserStore } from './store/modules/user'

export default {
  addComponent: (app: any) => {
    // app = Vue
    app.component('UserComponent', UserComponent)
  },
}

export const estructure = {
  components: {
    User: UserComponent,
  },
  hooks: {
    useUser,
  },
  stores: {
    useUserStore,
  },
}
