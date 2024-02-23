import { useCanvasStore } from '@stores/Canvas';
import { useVueFlow } from '@vue-flow/core';

export function useNodeHighlight() {
  const canvasStore = useCanvasStore();
  const { onNodeClick, onPaneClick, onNodeDragStop } = useVueFlow();

  onNodeDragStop(({ node }) => {
    const ShouldHighlightNewNode =
      canvasStore.hasActiveNode && canvasStore.currentActiveNode.id !== node.id;

    if (ShouldHighlightNewNode) {
      canvasStore.currentActiveNode = Object.assign({}, {});
      canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
      return;
    }

    canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
  });

  onNodeClick(({ node }) => {
    canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
  });

  onPaneClick(() => {
    if (canvasStore.hasActiveNode) {
      canvasStore.currentActiveNode = Object.assign({}, {});
    }
  });
}
