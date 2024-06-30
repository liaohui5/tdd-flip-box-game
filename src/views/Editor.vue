<template>
  <div class="w-full h-full flex p-5">
    <MapDataForm />
    <Map />
    <MapDataViewer />
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/editor/Map.vue";
import MapDataViewer from "@/components/editor/MapDataViewer.vue";
import MapDataForm from "@/components/editor/MapDataForm.vue";
</script>
