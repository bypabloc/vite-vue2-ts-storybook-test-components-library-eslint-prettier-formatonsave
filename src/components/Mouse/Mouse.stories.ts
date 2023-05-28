import { Meta } from '@storybook/vue'

import Component from './Index.vue'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
export default {
  title: 'Example/Mouse',
  component: Component,
  tags: ['autodocs'],
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      MouseComponent: Component,
    },
    template: '<MouseComponent @onClick="onClick" v-bind="$props" />',
  }),
  argTypes: {},
} as Meta

// More on writing stories with args: https://storybook.js.org/docs/7.0/vue/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Secondary = {
  args: {
    label: 'Button',
  },
}

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
