<template>
  <div>
    <h1>{{ msg }}</h1>

    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'

// define props, msg is required, and count is optional and declare const
defineProps<{ msg: string; count?: number }>()

const count = ref(0)

</script>

<style scoped>
</style>
