<script lang="ts" setup>
type TProps = {
  disabled?: boolean;
};
withDefaults(defineProps<TProps>(), {
  disabled: false,
});
</script>
<template>
  <button
    type="button"
    class="flex h-[25px] w-[25px] items-center justify-center rounded-md p-1.5 outline-none"
    :class="{
      'bg-slate-300 stroke-slate-700 hover:bg-slate-400/60': !disabled,
      'cursor-not-allowed bg-slate-200 stroke-slate-500': disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
