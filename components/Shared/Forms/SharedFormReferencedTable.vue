<script setup lang="ts">
import BaseSectionDropdown from '@components/Base/Forms/BaseSectionDropdown.vue';
import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { computed, inject, watch } from 'vue';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
const canvasStore = useCanvasStore();
const VueFlow = inject(vueFlowKey);
const getTables = computed(() => {
  if (!VueFlow) return [];
  if (canvasStore.hasRelationships) {
    const ReferencedTable =
      canvasStore.currentActiveEdge.targetNode.data.table.name;
    return VueFlow.getNodes.value
      .map((node) => ({
        name: node.data.table.name,
        value: node.data.table.name,
      }))
      .filter((name) => name !== ReferencedTable);
  }

  const CurrentTable = canvasStore.currentActiveNode.data.table.name;
  return VueFlow.getNodes.value
    .map((node) => ({
      name: node.data.table.name,
      value: node.data.table.name,
    }))
    .filter((name) => name.name !== CurrentTable);
});

// Everytime active node changes, reset model value
watch(
  () => canvasStore.currentActiveNode,
  () => {
    modelValue.value = '';
  },
);
</script>

<template>
  <BaseSectionDropdown
    id="addRelationReferencedTable"
    v-model="modelValue"
    :items="getTables"
  >
    <template #label>Referenced Table:</template>
  </BaseSectionDropdown>
</template>
