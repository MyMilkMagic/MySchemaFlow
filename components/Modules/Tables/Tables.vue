<script lang="ts" setup>
import ButtonOption from '@components/Modules/Tables/Partials/ButtonOption.vue';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

const vueFlow = inject(vueFlowKey);
const tables = computed(() => {
  if (!vueFlow) return;
  return vueFlow.getNodes.value.map((node) => ({
    id: node.id,
    name: node.data.table.name,
  }));
});
</script>
<template>
  <div
    v-for="table in tables"
    :key="table.name"
    class="mb-2 flex w-full items-center justify-between last-of-type:mb-0"
    type="button"
  >
    <span
      class="truncate text-xs font-semibold text-slate-700 group-hover:text-blue-600 group-focus:text-blue-600"
    >
      {{ table.name }}</span
    >
    <ButtonOption :node-id="table.id" />
  </div>
</template>
