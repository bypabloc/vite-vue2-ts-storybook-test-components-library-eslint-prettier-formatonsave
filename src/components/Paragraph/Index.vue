<template>
  <p
    :class="[
      `${props.color}--text`,
      `text--${props.fontStyle}`,
      `text--${props.type}`,
    ]"
  >
    <slot> </slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Paragraph',
})
</script>

<script lang="ts" setup>
import Colors from '@/types/colors'
import FontStyle from '@/types/fontStyle'

const props = withDefaults(defineProps<{
  color?: Colors,
  fontStyle?: FontStyle,
  type?: 'body' | 'caption' | 'button',
}>(), {
  color: 'destacame',
  fontStyle: 'regular',
  type: 'body',
})
</script>
