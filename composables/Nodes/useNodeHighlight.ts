import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useVueFlow } from '@vue-flow/core';

export function useNodeHighlight() {
  const canvasStore = useCanvasStore();
  const { resetState, activateState } = useNodeStateHandler();
  const { onNodeClick, onPaneClick, onNodeDragStop } = useVueFlow();

  onNodeDragStop(({ node }) => {
    const ShouldHighlightNewNode =
      canvasStore.hasActiveNode && canvasStore.currentActiveNode.id !== node.id;

    if (ShouldHighlightNewNode) {
      canvasStore.currentActiveNode = Object.assign({}, {}); // To explicitly inform vue that we are clearing object and will set a new one
      canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
      activateState();
      return;
    }

    canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
    activateState();
  });

  onNodeClick(({ node }) => {
    canvasStore.currentActiveNode = node; // No need to perform deep copy, changes need to be reflected live
    activateState();
  });

  onPaneClick(() => {
    if (canvasStore.hasActiveNode) {
      canvasStore.currentActiveNode = Object.assign({}, {});
      resetState();
    }
  });
}
