<template>
  <component :is="component"  :class="`text--${props.type}`">
    <slot> </slot>
    $attrs {{ $attrs }}
    computedClass {{ computedClass }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Title',
  inheritAttrs: false,
})
</script>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

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

const attrs = useAttrs()
const computedClass = computed(() => {
  window.console.log('attrs', attrs)
})

</script>
