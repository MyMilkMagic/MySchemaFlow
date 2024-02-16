<script lang="ts" setup>
import OpenFile from '@components/Toolbar/Partials/OpenFile.vue';
import ExportImage from '@components/Toolbar/Partials/ExportImage.vue';
</script>
<template>
  <nav
    class="flex items-center justify-between border-b-2 border-b-slate-300 bg-white px-4 py-2"
  >
    <div class="flex">
      <OpenFile />
      <ExportImage />
    </div>
  </nav>
</template>
