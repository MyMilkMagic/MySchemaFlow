<script lang="ts" setup>
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';

const scrollbarEl = ref<HTMLDivElement>();
let instance: OverlayScrollbars | null = null;

onMounted(async () => {
  await nextTick();
  const Wrapper = toValue(scrollbarEl);
  if (!Wrapper) return;
  OverlayScrollbars.plugin(ClickScrollPlugin);
  instance = OverlayScrollbars(Wrapper, {
    scrollbars: { clickScroll: true },
  });
});

onUnmounted(() => {
  if (instance === null) return;
  // instance.destroy();
});
</script>
<template>
  <div ref="scrollbarEl">
    <slot></slot>
  </div>
</template>
