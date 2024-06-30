<template>
  <div class="flex justify-between mb-2 mx-2">
    <button class="w-1/4 py-2 text-sm text-gray-700">
      {{ stepText }}
    </button>
    <button
      class="w-1/4 py-2 text-sm bg-blue-300 text-white rounded-full"
      @click="handleRestart"
    >
      重新开始
    </button>
    <button
      class="w-1/4 py-2 text-sm text-white rounded-full"
      :class="nextLevelClassNames"
      @click="handleToNextLevel"
    >
      下一关
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/store/game";

const store = useGameStore();
const stepText = computed<string>(() => {
  const steps = store.data.steps;
  if (steps === 0) {
    return "您还没开始移动";
  }
  return `您已经移动${steps}次`;
});

const nextLevelClassNames = computed<string>(() => {
  return store.data.levelPassed ? "bg-blue-300 " : "bg-gray-300";
});

function handleRestart() {
  store.restartGame();
}

function handleToNextLevel() {
  if (store.data.levelPassed) {
    store.toNextLevel();
  } else {
    alert("请先通过当前关卡");
  }
}
</script>
