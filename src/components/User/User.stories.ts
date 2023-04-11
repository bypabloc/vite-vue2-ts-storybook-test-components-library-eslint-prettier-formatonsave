import { Meta } from '@storybook/vue'

import UserComponent from './Index.vue'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
export default {
  title: 'Example/Component',
  component: UserComponent,
  tags: ['autodocs'],
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      UserComponent,
    },
    template: '<UserComponent @onClick="onClick" v-bind="$props" />',
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
