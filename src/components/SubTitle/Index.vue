<template>
  <component
    :is="component"
    :class="[
      `${props.color}--text`,
      `text--${props.fontStyle}`,
      `text--${props.type}`,
    ]"
  >
    <slot> </slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubTitle',
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import Colors from '@/types/colors'
import FontStyle from '@/types/fontStyle'

interface Options {
  [key: string]: string
}

const props = withDefaults(defineProps<{
  color?: Colors,
  fontStyle?: FontStyle,
  type?: 'subtitle-1' | 'subtitle-2' | 'subtitle-3'
}>(), {
  color: 'destacame',
  fontStyle: 'regular',
  type: 'subtitle-1',
})


const component = computed(() => {
  const options: Options = {
    'subtitle-1': 'h5',
    'subtitle-2': 'h6',
    'subtitle-3': 'h7',
  }
  return options[props.type]
})
</script>
