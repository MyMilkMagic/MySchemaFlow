<script lang="ts" setup>
type TProps = {
  disabled?: boolean;
  colorScheme?: 'primary' | 'danger';
};
withDefaults(defineProps<TProps>(), {
  disabled: false,
  colorScheme: 'primary',
});
</script>
<template>
  <button
    type="button"
    class="inline-flex h-[25px] w-[25px] rounded-full stroke-white p-2 outline-none transition-shadow"
    :class="{
      'bg-blue-500 ring-blue-500/50 hover:bg-blue-600/90 focus-visible:ring-4':
        colorScheme === 'primary' && !disabled,
      'bg-rose-500 ring-rose-500/50 hover:bg-rose-600/90 focus-visible:ring-4':
        colorScheme === 'danger' && !disabled,
      'cursor-not-allowed bg-slate-300 stroke-slate-700': disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
