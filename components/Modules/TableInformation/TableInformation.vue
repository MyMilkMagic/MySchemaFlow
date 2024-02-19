<script lang="ts" setup>
import SharedNoSelectedTable from '@components/Shared/EmptyStates/SharedNoSelectedTable.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
</script>
<template>
  <div>
    <DefaultContent v-if="canvasStore.hasActiveNode" />
    <SharedNoSelectedTable v-else class="mt-2" />
  </div>
</template>
