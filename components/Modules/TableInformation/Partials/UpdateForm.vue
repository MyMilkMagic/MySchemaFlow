<script lang="ts" setup>
import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
</script>
<template>
  <div>
    <button type="button" @click="canvasStore.selectedColumnInd = -1">
      Go back
    </button>
  </div>
</template>
