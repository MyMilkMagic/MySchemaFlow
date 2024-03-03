<script lang="ts" setup>
type TProps = {
  colorScheme: 'success' | 'danger';
};
withDefaults(defineProps<TProps>(), {
  colorScheme: 'success',
});
</script>
<template>
  <p
    class="rounded p-2 text-xs font-semibold text-white"
    :class="{
      'bg-emerald-500': colorScheme === 'success',
      'bg-rose-500': colorScheme === 'danger',
    }"
  >
    <slot></slot>
  </p>
</template>
