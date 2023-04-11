import { storeToRefs } from 'pinia'
import store from '@/store'
import { mount } from '@vue/test-utils'

import Component from './Index.vue'
import { useUserStore } from '@/store/modules/user'

// https://v1.test-utils.vuejs.org/
// https://pinia.vuejs.org/cookbook/testing.html

describe('Foo', () => {
  beforeEach(() => {
    store
  })

  it('renders a div', async () => {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const wrapper = mount(Component, {
      propsData: {},
    })

    const inputsToEvaluate = [
      {
        selector: 'input[name="age"]',
        value: '30',
      },
      {
        selector: 'input[name="name"]',
        value: 'Pablo',
      },
    ]

    inputsToEvaluate.forEach((input) => {
      const inputElement = wrapper.find<HTMLInputElement>(input.selector)
      expect(inputElement.exists()).toBe(true)
      inputElement.setValue(input.value)
      expect(inputElement.element.value).toBe(input.value)
    })

    const button = wrapper.find<HTMLInputElement>('button[name="button"]')
    expect(button.exists()).toBe(true)

    await button.trigger('click')

    expect(user.value?.name).toEqual('Pablo')
  })
})
