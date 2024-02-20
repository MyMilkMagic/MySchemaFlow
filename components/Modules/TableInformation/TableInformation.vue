<script lang="ts" setup>
import SharedNoSelectedTable from '@components/Shared/EmptyStates/SharedNoSelectedTable.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import UpdateForm from '@components/Modules/TableInformation/Partials/UpdateForm.vue';
import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
</script>
<template>
  <div>
    <template v-if="canvasStore.hasActiveNode">
      <DefaultContent v-if="canvasStore.selectedColumnInd === -1" />
      <UpdateForm v-else />
    </template>
    <SharedNoSelectedTable v-else class="mt-2" />
  </div>
</template>
