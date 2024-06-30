<template>
  <div class="flex flex-col">
    <div class="inline-flex" v-for="(row, i) of map">
      <div v-for="(col, j) of row">
        <MapBlock :row-index="i" :col-index="j" :state="col" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapBlock from "@/components/editor/MapBlock.vue";
import { useMapStore } from "@/store/map";
import { useEditorStore } from "@/store/editor";
const { map, initMap } = useMapStore();
const { makeMapByRowsAndCols } = useEditorStore();

initMap(makeMapByRowsAndCols());
</script>
