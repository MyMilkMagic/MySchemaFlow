<script lang="ts" setup>
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { useVueFlow } from '@vue-flow/core';

const toolbar = ref<InstanceType<typeof Toolbar>>();
const canvas = ref<InstanceType<typeof CanvasBoard>>();
const calculateHeight = () => {
  if (!toolbar.value || !canvas.value) return;
  const { height } = toolbar.value.$el.getBoundingClientRect();
  const Height = window.innerHeight - height;
  Object.assign(canvas.value.$el.style, {
    height: `${Height}px`,
  });
};
provide(vueFlowKey, useVueFlow());
onMounted(async () => {
  await nextTick();
  calculateHeight();
  window.addEventListener('resize', calculateHeight);
});
onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight);
});
</script>

<template>
  <div class="font-dm">
    <Toolbar ref="toolbar" />
    <CanvasBoard ref="canvas" />
  </div>
</template>
