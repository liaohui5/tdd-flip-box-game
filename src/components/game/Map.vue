<template>
  <div class="w-max flex" v-for="(row, i) of map">
    <div v-for="(col, j) of row">
      <MapBlock :row-index="i" :col-index="j" :state="col" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapBlock from "@/components/game/MapBlock.vue";
import { useMapStore } from "@/store/map";

const { map } = useMapStore();
</script>
