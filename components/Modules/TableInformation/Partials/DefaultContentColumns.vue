<script lang="ts" setup>
import { useCanvasStore } from '@stores/Canvas';

const canvasStore = useCanvasStore();
</script>
<template>
  <div>
    <p
      v-if="canvasStore.activeNodeColumns.length !== 0"
      class="mb-1 text-xs font-bold text-blue-950"
    >
      Columns: {{ canvasStore.activeNodeColumns.length }}
    </p>
    <button
      v-for="column in canvasStore.activeNodeColumns"
      :key="column.name"
      class="group mb-1 flex w-full rounded-md bg-slate-200 px-2 py-2 text-[.6rem] font-extrabold outline-none last-of-type:mb-0 hover:bg-blue-100 focus-visible:bg-blue-100"
      type="button"
    >
      <span
        class="w-8/12 truncate text-left text-slate-700 group-hover:text-blue-500 group-focus-visible:text-blue-500"
      >
        {{ column.name }}</span
      >
      <span
        class="w-full truncate text-left text-slate-700 group-hover:text-blue-500 group-focus-visible:text-blue-500"
      >
        {{ column.type }}</span
      >
      <span
        v-if="column.keyConstraint === 'PK' || column.keyConstraint === 'FK'"
        class="w-2/12 text-blue-500"
        >{{ column.keyConstraint }}</span
      >
      <span v-else class="w-2/12"></span>
    </button>
  </div>
</template>
