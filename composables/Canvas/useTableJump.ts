import { useSettingsStore } from '@stores/Settings';
import { vueFlowKey } from '@symbols/VueFlowSymbol';

export function useTableJump() {
  const settingsStore = useSettingsStore();
  const vueFlow = inject(vueFlowKey);

  const jumpIntoView = (nodeId: string) => {
    const Node = vueFlow?.findNode(nodeId);
    if (!Node) return;

    if (!settingsStore.enableTableJumpAnimation) {
      vueFlow?.fitView({
        maxZoom: settingsStore.zoomLevel,
        nodes: [nodeId],
      });
      return;
    }

    vueFlow?.fitView({
      maxZoom: settingsStore.zoomLevel,
      nodes: [nodeId],
      duration: 1500,
    });
  };

  return {
    jumpIntoView,
  };
}
