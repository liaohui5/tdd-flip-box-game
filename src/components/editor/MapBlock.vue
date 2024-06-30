<template>
  <div
    class="w-12 h-12 m-2 inline-flex items-center justify-center cursor-pointer rounded-md transition"
    :class="computedClassName"
    @click="handleClick"
  >
  </div>
</template>

<script setup lang="ts">
import { type MapBlockPosition, useMapStore } from "@/store/map";
import { computed } from "vue";

interface Props extends MapBlockPosition {
  state: number;
}

const props = defineProps<Props>();
const computedClassName = computed(() => {
  return props.state ? "bg-red-300 rotate-y-180" : "bg-blue-300 rotate-y-0";
});

const { toggleBlockState } = useMapStore();

function handleClick() {
  toggleBlockState(props);
}
</script>

<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}

.rotate-y-0 {
  transform: rotateY(0deg);
}

.transition {
  transition: all 0.5s;
}
</style>
