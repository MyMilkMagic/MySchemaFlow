<script lang="ts" setup>
import { useCanvasStore } from '@stores/Canvas';
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  id: string;
  data: TNodeData;
  isActive: boolean;
  isFaded: boolean;
  isDefault: boolean;
}>();

const canvasStore = useCanvasStore();
const getColumns = computed(() => {
  return props.data.table.columns.map((column, ind) => ({
    name: column.name,
    keyConstraint: column.keyConstraint,
    type: column.type,
    shouldHighlight:
      (canvasStore.selectedColumnInd === ind &&
        props.id === canvasStore.currentActiveNode.id) ||
      column.shouldHighlight,
  }));
});

const onClickChooseColumnIndex = async (index: number) => {
  if (!canvasStore.hasActiveNode) return;
  canvasStore.selectedColumnInd = -1;
  await nextTick();
  canvasStore.selectedColumnInd = index;
};
</script>

<template>
  <button
    v-for="(column, ind) in getColumns"
    :key="column.name"
    type="button"
    class="group flex w-full items-center px-2 py-1 font-black outline-none focus-visible:bg-blue-500"
    :class="{
      'hover:bg-blue-500': isActive,
      'bg-blue-500': column.shouldHighlight,
    }"
    @dblclick="onClickChooseColumnIndex(ind)"
  >
    <span class="mr-1 block flex-shrink-0 text-sm">
      <span
        v-if="column.keyConstraint === 'PK'"
        class="group-focus-visible:text-white"
        :class="{
          'text-rose-500': isDefault,
          'text-rose-500 group-hover:text-white': isActive,
          'text-white': column.shouldHighlight,
          'text-slate-300': isFaded,
        }"
      >
        PK
      </span>
      <span
        v-if="column.keyConstraint === 'FK'"
        class="group-focus-visible:text-white"
        :class="{
          'text-cyan-600': isDefault,
          'text-cyan-600 group-hover:text-white': isActive,
          'text-white': column.shouldHighlight,
          'text-slate-300': isFaded,
        }"
      >
        FK
      </span>
      <span v-if="column.keyConstraint === ''" class="text-transparent"
        >NT</span
      >
    </span>
    <span
      class="ml-1 mr-2 block w-full flex-grow truncate text-left text-sm group-focus-visible:text-white"
      :class="{
        'text-blue-950': isDefault,
        'group-hover:text-white': isActive,
        'text-slate-300': isFaded,
        'text-white': column.shouldHighlight,
      }"
      >{{ column.name }}</span
    >
    <span
      class="block w-full flex-grow truncate text-left text-sm group-focus-visible:text-white"
      :class="{
        'text-amber-600': isDefault,
        'text-amber-600 group-hover:text-white': isActive,
        'text-slate-300': isFaded,
        'text-white': column.shouldHighlight,
      }"
      >{{ column.type }}</span
    >
  </button>
</template>
