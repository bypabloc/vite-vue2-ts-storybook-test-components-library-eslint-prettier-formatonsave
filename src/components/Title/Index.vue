<template>
  <component :is="component"  :class="`text--${props.type}`">
    <slot> </slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Title',
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type: 'hero' | 'title-1' | 'title-2'
}

interface Options {
  [key: string]: string
}

const props = withDefaults(defineProps<{
  type?: 'hero' | 'title-1' | 'title-2'
}>(), {
  type: 'hero',
})


const component = computed(() => {
  const options: Options = {
    hero: 'h2',
    'title-1': 'h3',
    'title-2': 'h4',
  }
  return options[props.type]
})
</script>
