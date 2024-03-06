<script lang="ts" setup>
import CustomNode from '@components/Modules/CanvasBoard/Partials/CustomNode.vue';
import Controls from '@components/Modules/CanvasBoard/Partials/Controls.vue';
import Progress from '@components/Modules/CanvasBoard/Partials/Progress.vue';
import { useColumnKeySorter } from '@composables/Canvas/useColumnKeySorter';
import { useNodeAutoLayout } from '@composables/Nodes/useNodeAutoLayout';
import { useEdgeRelationshipHighlighter } from '@composables/Edges/useEdgeRelationshipHighlighter';
import { useUpdateEdgePosition } from '@composables/Edges/useUpdateEdgePosition';
import { TestNodes, TestEdges } from '@dummy/CanvasDummy';
import { VueFlow } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';

const nodes = ref(TestNodes);
const edges = ref(TestEdges);
const { autoLayout } = useNodeAutoLayout();
const { onPaneReady, onEdgeMouseEnter, onEdgeMouseLeave } = useVueFlow();
const { sortPKFirst } = useColumnKeySorter();
const { highlightNodeColumnRelation, unhighlightColumnRelationship } =
  useEdgeRelationshipHighlighter();

onPaneReady(() => {
  sortPKFirst();
  autoLayout();
});
onEdgeMouseEnter(({ edge }) => highlightNodeColumnRelation(edge));
onEdgeMouseLeave(unhighlightColumnRelationship);
useUpdateEdgePosition();
</script>

<template>
  <div class="h-full w-full border-slate-300">
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
        <Progress />
        <Background
          class="h-full"
          pattern-color="#171A22"
          :gap="20"
          variant="dots"
        />
        <template #node-custom="{ data, id }">
          <CustomNode :id="id" :data="data" />
        </template>
      </VueFlow>
    </ClientOnly>
  </div>
</template>
