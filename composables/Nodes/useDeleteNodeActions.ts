import { vueFlowKey } from '@symbols/VueFlowSymbol';

export function useDeleteNodeActions() {
  const vueFlow = inject(vueFlowKey);
  const deleteNodeById = (nodeId: string) => {
    const Node = vueFlow?.findNode(nodeId);
    if (!Node) return;

    vueFlow?.setNodes(() => {
      return vueFlow?.getNodes.value.filter((node) => node.id !== nodeId);
    });
  };

  return {
    deleteNodeById,
  };
}
