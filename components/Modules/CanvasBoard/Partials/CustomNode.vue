<script lang="ts" setup>
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  data: TNodeData;
}>();

console.log(props.data);
</script>
<template>
  <div
    class="bg-white font-dm-mono border-2 border-blue-950 rounded-xl w-[400px] overflow-hidden"
  >
    <p
      class="px-2 py-2 text-blue-950 border-b-2 border-b-blue-950 font-black truncate text-center"
    >
      {{ data.table.name }}
    </p>
    <button
      v-for="column in data.table.columns"
      :key="column.name"
      type="button"
      class="flex px-2 py-1 font-black items-center w-full group hover:bg-blue-500"
    >
      <span class="text-xl block flex-shrink-0">
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
        class="block text-sm ml-1 text-left text-blue-950 flex-grow w-full truncate group-hover:text-white"
        >{{ column.name }}</span
      >
      <span
        class="block text-sm w-full flex-grow truncate group-hover:text-white text-blue-500 text-center"
        >{{ column.type }}</span
      >
    </button>
  </div>
</template>
