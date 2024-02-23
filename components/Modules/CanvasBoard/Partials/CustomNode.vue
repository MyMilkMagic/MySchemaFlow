<script lang="ts" setup>
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  data: TNodeData;
}>();
</script>
<template>
  <div
    class="w-[350px] overflow-hidden rounded-xl border-2 border-slate-500 bg-white font-dm-mono"
  >
    <p
      class="truncate border-b-2 border-b-slate-500 px-2 py-2 text-center font-black text-blue-950"
    >
      {{ data.table.name }}
    </p>
    <button
      v-for="column in data.table.columns"
      :key="column.name"
      type="button"
      class="group flex w-full items-center px-2 py-1 font-black hover:bg-blue-500"
    >
      <span class="block flex-shrink-0 text-xl">
        <Icon
          v-if="column.keyConstraint === 'PK'"
          name="solar:key-bold-duotone"
          class="text-rose-500 group-hover:text-white"
        />
        <Icon
          v-if="column.keyConstraint === 'FK'"
          name="solar:key-bold-duotone"
          class="text-amber-500 group-hover:text-white"
        />
        <Icon
          v-if="column.keyConstraint === ''"
          name="solar:key-bold-duotone"
          class="text-transparent"
        />
      </span>
      <span
        class="ml-1 block w-full flex-grow truncate text-left text-sm text-blue-950 group-hover:text-white"
        >{{ column.name }}</span
      >
      <span
        class="block w-full flex-grow truncate text-left text-sm text-blue-500 group-hover:text-white"
        >{{ column.type }}</span
      >
    </button>
  </div>
</template>
