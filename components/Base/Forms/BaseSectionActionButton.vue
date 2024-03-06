<script lang="ts" setup>
type TProps = {
  type?: 'primary' | 'danger';
};
withDefaults(defineProps<TProps>(), {
  type: 'primary',
});
</script>
<template>
  <button
    :class="{
      'bg-blue-500 hover:bg-blue-600/90 focus-visible:bg-blue-600/90 focus-visible:ring-blue-500/50':
        type === 'primary',
      'bg-rose-500 hover:bg-rose-600/90 focus-visible:bg-rose-600/90 focus-visible:ring-rose-500/50':
        type === 'danger',
    }"
    class="flex items-center justify-center rounded px-2 py-3 outline-none ring-0 transition-shadow focus-visible:ring-4"
    type="button"
  >
    <span class="mr-1.5 flex h-[10px] w-[10px] stroke-white">
      <slot name="icon"></slot>
    </span>
    <span class="text-xs font-semibold text-white">
      <slot></slot>
    </span>
  </button>
</template>
