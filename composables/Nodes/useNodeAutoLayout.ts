import { useSettingsStore } from '@stores/Settings';
import { useEdgePositionCalculator } from '~/composables/Edges/useEdgePositionCalculator';
import { autoLayoutNodes } from '~/utilities/CanvasHelper';
import { vueFlowKey } from '~/symbols/VueFlowSymbol';
import { inject } from 'vue';

export function useNodeAutoLayout() {
  const settingsStore = useSettingsStore();
  const { calculateAllEdgesPosition } = useEdgePositionCalculator();
  const VueFlow = inject(vueFlowKey);
  const autoLayout = () => {
    if (!VueFlow) return;

    const { nodes, edges } = autoLayoutNodes(
      VueFlow.getNodes.value,
      VueFlow.getEdges.value,
      settingsStore.currentOrientation,
    );
    VueFlow.setNodes(() => nodes);
    VueFlow.setEdges(() => edges);
    calculateAllEdgesPosition();
  };

  return {
    autoLayout,
  };
}
