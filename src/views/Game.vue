<template>
  <div class="flex w-max flex-col rounded border border-gray-300 m-16">
    <Map />
    <Controls />
  </div>
</template>

<script setup lang="ts">
import Controls from "@/components/game/Controls.vue";
import Map from "@/components/game/Map.vue";
import { gameDatas } from "@/components/game/gameData";
import { useGameStore } from "@/store/game";

const { setupGame } = useGameStore();

setupGame(gameDatas);
</script>
