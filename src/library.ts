import Vue from 'vue'
import { createPinia, PiniaVuePlugin, setActivePinia } from 'pinia'
import namingConventions from '@/util/namingConventions'

import './assets/colors.scss'
import './assets/heading/typographies.scss'

Vue.use(PiniaVuePlugin)
const store = createPinia()
setActivePinia(store)

import UserComponent from './components/User/Index.vue'
import { useUser } from './hook/user'
import { useUserStore } from './store/modules/user'

export const components = {
  User: UserComponent,
}

Object.entries(components).forEach(([name, component]) => {
  const kebabCaseName = 'desta' + namingConventions(name, 'kebab-case')
  console.log('kebabCaseName', kebabCaseName)

  const pascalCaseName = 'Desta' + namingConventions(name, 'PascalCase')
  console.log('pascalCaseName', pascalCaseName)

  Vue.component(kebabCaseName, component)
  Vue.component(pascalCaseName, component)
})


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
