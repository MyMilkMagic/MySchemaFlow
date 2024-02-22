<script lang="ts" setup>
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';

const scrollbarEl = ref<HTMLDivElement>();
const instance = ref<OverlayScrollbars | null>(null);

defineExpose({
  instance,
});
onMounted(async () => {
  await nextTick();
  const Wrapper = toValue(scrollbarEl);
  if (!Wrapper) return;
  OverlayScrollbars.plugin(ClickScrollPlugin);
  instance.value = OverlayScrollbars(Wrapper, {
    scrollbars: { clickScroll: true },
  });
});

onUnmounted(() => {
  if (instance === null) return;
  instance.value?.destroy();
});
</script>
<template>
  <div ref="scrollbarEl">
    <slot></slot>
  </div>
</template>
