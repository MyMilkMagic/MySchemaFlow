import { useCanvasStore } from '@stores/Canvas';
import { useVueFlow } from '@vue-flow/core';

export function useNodeHighlight() {
  const canvasStore = useCanvasStore();
  const { onNodeClick, onPaneClick } = useVueFlow();

  onNodeClick(({ node }) => {
    canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
  });

  onPaneClick(() => {
    if (canvasStore.hasActiveNode) {
      canvasStore.currentActiveNode = Object.assign({}, {});
    }
  });
}
