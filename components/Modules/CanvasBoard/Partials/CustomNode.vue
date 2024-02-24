<script lang="ts" setup>
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  data: TNodeData;
}>();

const isFaded = computed(
  () => !props.data.states.isActive && props.data.states.isFaded,
);
const isActive = computed(
  () => props.data.states.isActive && !props.data.states.isFaded,
);
const isDefault = computed(
  () => !props.data.states.isActive && !props.data.states.isFaded,
);
</script>
<template>
  <div
    class="w-[350px] overflow-hidden rounded-xl border-2 bg-white font-dm-mono"
    :class="{
      'border-blue-600': isActive,
      'border-slate-500 hover:border-blue-600 [&:hover>p]:border-blue-600':
        isDefault,
      'border-slate-100': isFaded,
    }"
  >
    <p
      class="truncate border-b-2 px-2 py-2 text-center font-black"
      :class="{
        'border-b-slate-500 text-blue-950 group-hover:border-blue-600':
          isDefault,
        'border-blue-600': isActive,
        'text-slate-300': isFaded,
      }"
    >
      {{ data.table.name }}
    </p>
    <button
      v-for="column in data.table.columns"
      :key="column.name"
      type="button"
      class="group flex w-full items-center px-2 py-1 font-black"
      :class="{
        'hover:bg-blue-500': isActive,
      }"
    >
      <span class="block flex-shrink-0 text-xl">
        <Icon
          v-if="column.keyConstraint === 'PK'"
          name="solar:key-bold-duotone"
          :class="{
            'text-rose-500': isDefault,
            'text-rose-500 group-hover:text-white': isActive,
            'text-slate-300': isFaded,
          }"
        />
        <Icon
          v-if="column.keyConstraint === 'FK'"
          name="solar:key-bold-duotone"
          :class="{
            'text-amber-500': isDefault,
            'text-amber-500 group-hover:text-white': isActive,
            'text-slate-300': isFaded,
          }"
        />
        <Icon
          v-if="column.keyConstraint === ''"
          name="solar:key-bold-duotone"
          class="text-transparent"
        />
      </span>
      <span
        class="ml-1 mr-2 block w-full flex-grow truncate text-left text-sm"
        :class="{
          'text-blue-950': isDefault,
          'group-hover:text-white': isActive,
          'text-slate-300': isFaded,
        }"
        >{{ column.name }}</span
      >
      <span
        class="block w-full flex-grow truncate text-left text-sm"
        :class="{
          'text-amber-500': isDefault,
          'group-hover:text-white': isActive,
          'text-slate-300': isFaded,
        }"
        >{{ column.type }}</span
      >
    </button>
  </div>
</template>
