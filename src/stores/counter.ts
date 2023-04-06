import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // state
  // count is a ref integer typescript
  const count = ref<number>(0);

  function increment() {
    count.value++;
  }

  return { count, increment };
});
