<template>
  <div class="flex flex-col w-1/8">
    <div class="mb-5">
      <span class="mr-2">行</span>
      <input
        type="number"
        v-model.number="row"
        class="border border-blue-300"
      />
    </div>

    <div>
      <span class="mr-2">列</span>
      <input
        type="number"
        v-model.number="col"
        class="border border-blue-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useMapStore } from "@/store/map";
import { useEditorStore } from "@/store/editor";
import { toRefs } from "vue";

const { col, row } = toRefs(useEditorStore());
const { updateMapRow, updateMapCol } = useMapStore();

watchEffect(() => {
  if (row.value && row.value > 0) {
    updateMapRow();
  }
});

watchEffect(() => {
  if (col.value && col.value > 0) {
    updateMapCol();
  }
});
</script>
