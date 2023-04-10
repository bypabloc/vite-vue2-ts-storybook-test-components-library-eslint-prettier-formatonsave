<template>
  <div>
    <div>
      <h1>User Component</h1>
    </div>
    <div>
      <h2>Mouse Position</h2>
      <p>X: {{ mouse.x.value }}</p>
      <p>Y: {{ mouse.y.value }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMouse } from "@/hook/mouse";

const mouse = useMouse()

const onClick = () => {
};
</script>
