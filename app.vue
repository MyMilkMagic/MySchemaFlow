<script lang="ts" setup>
import BaseSection from '@components/Base/BaseSection.vue';
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { useVueFlow } from '@vue-flow/core';

const toolbar = ref<InstanceType<typeof Toolbar>>();
const canvasWrapper = ref<HTMLDivElement>();
const calculateHeight = () => {
  if (!toolbar.value || !canvasWrapper.value) return;
  const { height } = toolbar.value.$el.getBoundingClientRect();
  const Height = window.innerHeight - height;
  Object.assign(canvasWrapper.value.style, {
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
    <div ref="canvasWrapper" class="flex h-[calc(100vh-68.6px)]">
      <BaseSection class="h-full w-full max-w-[230px] border-r-2">
        <p>Hello</p>
      </BaseSection>
      <CanvasBoard class="h-full w-full" />
      <BaseSection class="h-full w-full max-w-[300px] border-l-2">
        <p>Hello</p>
      </BaseSection>
    </div>
  </div>
</template>
