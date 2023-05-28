import type { Preview } from '@storybook/vue'
import Vue from 'vue'
import { createPinia, PiniaVuePlugin, setActivePinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const store = createPinia()
setActivePinia(store)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
