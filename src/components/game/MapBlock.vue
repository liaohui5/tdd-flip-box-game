<template>
  <div
    class="w-32 h-32 m-2 inline-flex items-center justify-center cursor-pointer rounded-md transform-colors"
    :class="computedClassName"
    @click="handleClick"
  >
    <!-- {{ props.state }} -->
  </div>
</template>

<script setup lang="ts">
import { type MapBlockPosition, useMapStore } from "@/store/map";
import { useGameStore } from "@/store/game";
import { computed } from "vue";

interface Props extends MapBlockPosition {
  state: number;
}

const props = defineProps<Props>();
const computedClassName = computed(() => {
  return props.state ? "bg-red-300 rotate-y-180" : "bg-blue-300 rotate-y-0";
});

const { flip } = useMapStore();
const { detectionGameLevelPassed } = useGameStore();

function handleClick() {
  flip(props);
  detectionGameLevelPassed();
}
</script>

<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}

.rotate-y-0 {
  transform: rotateY(0deg);
}

.transform-colors {
  transition: all 0.5s;
}
</style>
