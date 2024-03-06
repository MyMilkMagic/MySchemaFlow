<script setup lang="ts">
import BaseSectionDropdown from '@components/Base/Forms/BaseSectionDropdown.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed, watch } from 'vue';
import type { TTableColumn } from '@stores/Canvas';

const { modelValue } = defineModels<{
  modelValue: string;
}>();
const canvasStore = useCanvasStore();
const filtered_columns =
  canvasStore.currentActiveNode.data.table.columns.filter(
    (column) => column.keyConstraint !== 'PK' && column.keyConstraint !== 'FK',
  );
const getColumns = computed(() => {
  if (canvasStore.hasRelationships) {
    return canvasStore.currentActiveEdge.targetNode.data.table.columns.map(
      (column: TTableColumn) => ({
        name: column.name,
        value: column.name,
      }),
    );
  }
  return filtered_columns.map((column) => ({
    name: column.name,
    value: column.name,
  }));
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
    id="addRelationReferencingColumn"
    v-model="modelValue"
    :items="getColumns"
  >
    <template #label>Referencing Column:</template>
  </BaseSectionDropdown>
</template>
