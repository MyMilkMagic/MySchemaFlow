<script lang="ts" setup>
import CustomNode from '@components/Modules/CanvasBoard/Partials/CustomNode.vue';
import { useNodeAutoLayout } from '~/composables/Nodes/useNodeAutoLayout';
import { TestNodes, TestEdges } from '@dummy/CanvasDummy';
import { VueFlow } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { Background } from '@vue-flow/background';

const nodes = ref(TestNodes);
const edges = ref(TestEdges);
const { autoLayout } = useNodeAutoLayout();
const { onPaneReady } = useVueFlow();

onPaneReady(() => {
  autoLayout();
});
</script>

<template>
  <div class="h-screen">
    <ClientOnly>
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        :default-edge-options="{
          type: 'smoothstep',
        }"
        :default-viewport="{
          zoom: 1,
        }"
        :min-zoom="0.1"
        :max-zoom="1"
        :delete-key-code="null"
        :nodes-focusable="false"
        :selection-key-code="null"
        :multi-selection-key-code="null"
        class="h-screen w-full"
      >
        <MiniMap pannable zoomable />
        <Controls />
        <Background
          class="h-full"
          pattern-color="#171A22"
          :gap="20"
          variant="dots"
        />
        <template #node-custom="{ data }">
          <CustomNode :data="data" />
        </template>
      </VueFlow>
    </ClientOnly>
  </div>
</template>
