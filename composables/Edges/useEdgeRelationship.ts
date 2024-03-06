import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { getActiveNodeRelations } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { inject, ref, watch } from 'vue';

export type TRelationList = {
  id: string;
  table: string;
  column: string;
  relation: string;
};

export function useEdgeRelationship() {
  const canvasStore = useCanvasStore();
  const VueFlow = inject(vueFlowKey);

  const relationList = ref<Array<TRelationList>>([]);
  const updateRelationList = () => {
    if (!VueFlow) return;

    const CurrentActiveEdges = getNodeRelationship(
      canvasStore.currentActiveNode,
      VueFlow.getEdges.value,
    );
    relationList.value = getActiveNodeRelations(
      CurrentActiveEdges,
      VueFlow.getNodes.value,
      canvasStore.currentActiveNode.id,
    );
  };

  updateRelationList();
  watch(() => [VueFlow, canvasStore.currentActiveNode], updateRelationList);

  return {
    relationList,
  };
}
