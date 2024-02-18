<script lang="ts" setup>
import ButtonOption from '@components/Modules/Tables/Partials/ButtonOption.vue';
import { useSettingsStore } from '@stores/Settings';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

const settingsStore = useSettingsStore();
const vueFlow = inject(vueFlowKey);
const tables = computed(() => {
  if (!vueFlow) return;
  return vueFlow.getNodes.value.map((node) => ({
    id: node.id,
    name: node.data.table.name,
  }));
});
const onClickHighlightTable = (nodeId: string) => {
  const Node = vueFlow?.findNode(nodeId);
  if (!Node) return;

  if (!settingsStore.enableTableJumpAnimation) {
    vueFlow?.fitView({
      maxZoom: settingsStore.zoomLevel,
      nodes: [nodeId],
    });
    return;
  }

  vueFlow?.fitView({
    maxZoom: settingsStore.zoomLevel,
    nodes: [nodeId],
    duration: 1500,
  });
};
</script>
<template>
  <button
    v-for="table in tables"
    :key="table"
    class="group mb-1 flex w-full items-center justify-between rounded-md px-1.5 py-2 outline-none last-of-type:mb-0 hover:bg-blue-100 focus:bg-blue-100"
    type="button"
    @click="onClickHighlightTable(table.id)"
  >
    <span
      class="truncate text-xs font-semibold text-slate-700 group-hover:text-blue-600 group-focus:text-blue-600"
    >
      {{ table.name }}</span
    >
    <ButtonOption />
  </button>
</template>
