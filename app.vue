<script lang="ts" setup>
import BaseSectionWrapper from '@components/Base/BaseSectionWrapper.vue';
import CanvasBoard from '@components/Modules/CanvasBoard/CanvasBoard.vue';
import Toolbar from '@components/Modules/Toolbar/Toolbar.vue';
import Tables from '@components/Modules/Tables/Tables.vue';
import TableInformation from '@components/Modules/TableInformation/TableInformation.vue';
import BaseScrollbar from '@components/Base/BaseScrollbar.vue';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
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
      <BaseScrollbar class="h-full w-full max-w-[230px] border-r-2">
        <BaseSectionWrapper>
          <template #label>Tables</template>
          <div class="my-2">
            <Tables />
          </div>
        </BaseSectionWrapper>
        <BaseSectionWrapper>
          <template #label>History</template>
        </BaseSectionWrapper>
      </BaseScrollbar>
      <CanvasBoard class="h-full w-full" />
      <div class="h-full w-full max-w-[300px] border-l-2">
        <BaseSectionWrapper>
          <template #label>Table Information</template>
          <TableInformation />
        </BaseSectionWrapper>
      </div>
    </div>
  </div>
</template>
