import { useCanvasStore } from '@stores/Canvas';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

export function useUpdateEdgePosition() {
  const canvasStore = useCanvasStore();
  const { calculateAllEdgesPosition, calculateActiveEdgesPosition } =
    useEdgePositionCalculator();
  const vueFlow = inject(vueFlowKey);

  vueFlow?.onNodeDragStop(() => {
    if (canvasStore.hasActiveNode) {
      calculateActiveEdgesPosition();
    } else {
      calculateAllEdgesPosition();
    }
  });
}
