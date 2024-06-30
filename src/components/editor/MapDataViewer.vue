<template>
  <textarea class="border w-1/10 border-blue-300" style="resize: none">{{
    map
  }}</textarea>
</template>

<script setup lang="ts">
import { useMapStore } from "@/store/map";
const { map } = useMapStore();
</script>
