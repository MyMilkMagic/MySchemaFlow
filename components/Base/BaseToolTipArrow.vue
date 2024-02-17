<script lang="ts" setup>
type TProps = {
  placement: string;
};
defineProps<TProps>();
</script>
<template>
  <span
    class="absolute block border-[6px] border-transparent border-b-blue-500"
    :class="{
      'left-2/4 top-0 -translate-x-2/4 -translate-y-full':
        placement === 'bottom',
      'bottom-0 left-2/4 -translate-x-2/4 translate-y-full rotate-180':
        placement === 'top',
      'left-0 top-2/4 -translate-x-full -translate-y-2/4 -rotate-90':
        placement === 'right',
      'right-0 top-2/4 -translate-y-2/4 translate-x-full rotate-90':
        placement === 'left',
    }"
  />
</template>
