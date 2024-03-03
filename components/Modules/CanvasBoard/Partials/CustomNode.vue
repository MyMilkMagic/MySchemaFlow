<script lang="ts" setup>
import CustomNodeColumns from '@components/Modules/CanvasBoard/Partials/CustomNodeColumns.vue';
import CustomNodeHandler from '@components/Modules/CanvasBoard/Partials/CustomNodeHandler.vue';
import type { TNodeData } from '@stores/Canvas';

const props = defineProps<{
  id: string;
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
  <div class="relative w-[350px] font-dm-mono">
    <div
      class="overflow-hidden rounded-xl border-2 bg-white"
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
      <CustomNodeColumns
        :id="id"
        :data="data"
        :is-active="isActive"
        :is-faded="isFaded"
        :is-default="isDefault"
      />
    </div>
    <CustomNodeHandler :is-faded="isFaded" :node-id="id" />
  </div>
</template>
