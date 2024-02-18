import { vueFlowKey } from '@symbols/VueFlowSymbol';

export function useDeleteNodeActions() {
  const vueFlow = inject(vueFlowKey);
  const deleteNodeById = (nodeId: string) => {
    const Node = vueFlow?.findNode(nodeId);
    if (!Node) return;

    vueFlow?.removeNodes([Node]);
  };

  return {
    deleteNodeById,
  };
}
