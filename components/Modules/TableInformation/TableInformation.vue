<script lang="ts" setup>
import SharedNoSelectedTable from '@components/Shared/EmptyStates/SharedNoSelectedTable.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import UpdateForm from '@components/Modules/TableInformation/Partials/UpdateForm.vue';
import AddForm from '@components/Modules/TableInformation/Partials/AddForm.vue';
import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

const canvasStore = useCanvasStore();
const showCreateForm = ref(false);
const vueFlow = inject(vueFlowKey);

vueFlow?.onPaneClick(() => {
  canvasStore.selectedColumnInd = -1;
  showCreateForm.value = false;
});
</script>
<template>
  <div class="mb-4 px-2">
    <template v-if="canvasStore.hasActiveNode">
      <DefaultContent
        v-if="canvasStore.selectedColumnInd === -1 && !showCreateForm"
        @add-column="showCreateForm = true"
      />
      <UpdateForm
        v-if="canvasStore.selectedColumnInd !== -1 && !showCreateForm"
      />
      <AddForm
        v-if="canvasStore.selectedColumnInd === -1 && showCreateForm"
        @go-back="showCreateForm = false"
      />
    </template>
    <SharedNoSelectedTable v-else class="mt-2" />
  </div>
</template>
