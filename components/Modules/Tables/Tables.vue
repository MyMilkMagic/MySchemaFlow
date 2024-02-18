<script lang="ts" setup>
import SharedEllipsisIcon from '@components/Shared/Icons/SharedEllipsisIcon.vue';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

const vueFlow = inject(vueFlowKey);
const tables = computed(() => {
  if (!vueFlow) return;
  return vueFlow.getNodes.value.map((node) => node.data.table.name);
});
</script>
<template>
  <button
    v-for="table in tables"
    :key="table"
    class="group mb-1 flex w-full items-center justify-between rounded-md px-1.5 py-2 outline-none last-of-type:mb-0 hover:bg-blue-100 focus:bg-blue-100"
    type="button"
  >
    <span
      class="text-xs font-semibold text-slate-700 group-hover:text-blue-600 group-focus:text-blue-600"
    >
      {{ table }}</span
    >
    <span
      class="block w-[3px] stroke-slate-700 group-hover:stroke-blue-600 group-focus:stroke-blue-600"
    >
      <SharedEllipsisIcon />
    </span>
  </button>
</template>
