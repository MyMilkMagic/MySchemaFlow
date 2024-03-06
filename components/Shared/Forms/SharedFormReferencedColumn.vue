<script setup lang="ts">
import BaseSectionDropdown from '@components/Base/Forms/BaseSectionDropdown.vue';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

export type TProps = {
  referencedTable: string;
  disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
  disabled: false,
});
const { modelValue } = defineModels<{
  modelValue: string;
}>();
const VueFlow = inject(vueFlowKey);
const getColumns = computed(() => {
  if (props.referencedTable.trim() === '' || !VueFlow) return [];
  const Node = findNodeByTableName(
    props.referencedTable,
    VueFlow.getNodes.value,
  );
  if (!Node) return [];
  const Columns = Node.data.table.columns;
  return Columns.map((column) => ({
    value: column.name,
    name: column.name,
  }));
});
</script>

<template>
  <BaseSectionDropdown
    id="addRelationFormReferencedColumn"
    v-model="modelValue"
    :items="getColumns"
    :disabled="disabled"
  >
    <template #label>Referenced Column:</template>
  </BaseSectionDropdown>
</template>
