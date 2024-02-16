<script lang="ts" setup>
import CustomNode from '@components/Modules/CanvasBoard/Partials/CustomNode.vue';
import { useNodeAutoLayout } from '~/composables/Nodes/useNodeAutoLayout';
import { TestNodes, TestEdges } from '@dummy/CanvasDummy';
import { VueFlow } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

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
          zoom: 0.5,
        }"
        :min-zoom="0.1"
        :max-zoom="1"
        :delete-key-code="null"
        :nodes-focusable="false"
        :selection-key-code="null"
        :multi-selection-key-code="null"
        class="h-screen w-full"
      >
        <template #node-custom="{ data }">
          <CustomNode :data="data" />
        </template>
      </VueFlow>
    </ClientOnly>
  </div>
</template>
