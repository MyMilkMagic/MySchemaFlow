<script setup lang="ts">
import SharedNoSelectedTable from '@components/Shared/EmptyStates/SharedNoSelectedTable.vue';
import DefaultContent from '@components/Modules/TableRelationships/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableRelationships/Partials/AddForm.vue';
import UpdateForm from '@components/Modules/TableRelationships/Partials/UpdateForm.vue';
import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { ref, inject } from 'vue';

const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
const displayEditForm = ref(false);
const VueFlow = inject(vueFlowKey);

VueFlow?.onPaneClick(() => {
  displayAddForm.value = false;
  displayEditForm.value = false;
  canvasStore.currentActiveEdge = Object.assign({}, {});
});
VueFlow?.onNodeClick(({ node }) => {
  if (node.id === canvasStore.currentActiveNode.id) return;
  displayAddForm.value = false;
  displayEditForm.value = false;
  canvasStore.currentActiveEdge = Object.assign({}, {});
});

watch(
  () => canvasStore.currentActiveNode,
  () => {
    displayAddForm.value = false;
    displayEditForm.value = false;
    canvasStore.currentActiveEdge = Object.assign({}, {});
  },
);
</script>

<template>
  <div class="my-2 px-2">
    <template v-if="canvasStore.hasActiveNode">
      <DefaultContent
        v-if="!displayAddForm && !displayEditForm"
        @add-form="displayAddForm = true"
        @edit-form="displayEditForm = true"
      />
      <AddForm
        v-if="displayAddForm && !displayEditForm"
        @go-back="displayAddForm = false"
      />
      <UpdateForm
        v-if="!displayAddForm && displayEditForm"
        @go-back="displayEditForm = false"
      />
    </template>
    <SharedNoSelectedTable v-else />
  </div>
</template>
