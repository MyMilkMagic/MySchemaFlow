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
    :class="{
      'stroke-slate-900 hover:bg-blue-50 hover:stroke-blue-500 focus-visible:bg-blue-50 focus-visible:stroke-blue-500':
        !disabled,
      'cursor-not-allowed stroke-slate-300': disabled,
    }"
    class="flex w-[25px] p-1.5 outline-none"
    type="button"
  >
    <slot></slot>
  </button>
</template>
