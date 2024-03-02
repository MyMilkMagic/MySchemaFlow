import { sortConstraintKeys } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { inject } from 'vue';

export function useColumnKeySorter() {
  const VueFlow = inject(vueFlowKey);

  const sortPKFirst = () => {
    if (!VueFlow) return;
    VueFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        node.data.table.columns = sortConstraintKeys(node.data.table.columns);
        return node;
      });
    });
  };

  return {
    sortPKFirst,
  };
}
