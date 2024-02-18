<script lang="ts" setup>
type TProps = {
  isActive: boolean;
};
withDefaults(defineProps<TProps>(), {
  isActive: false,
});
</script>
<template>
  <button
    type="button"
    class="flex w-full items-center px-2 py-2 outline-none"
    :class="{
      'bg-blue-500 stroke-white text-white focus:bg-blue-500': isActive,
      'bg-white stroke-slate-700 text-slate-700 hover:bg-slate-100 focus:bg-slate-200':
        !isActive,
    }"
  >
    <span class="mr-1.5 block w-[12px]">
      <slot name="icon"></slot>
    </span>
    <span class="text-xs font-semibold">
      <slot name="text"></slot>
    </span>
  </button>
</template>
