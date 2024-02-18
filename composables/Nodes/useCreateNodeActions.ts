import { useTableJump } from '@composables/Canvas/useTableJump';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { klona } from 'klona/full';
import { v4 as uuidv4 } from 'uuid';

export function useCreateNodeActions() {
  const vueFlow = inject(vueFlowKey);
  const { jumpIntoView } = useTableJump();

  const cloneNode = async (nodeId: string) => {
    const Node = vueFlow?.findNode(nodeId);
    if (!Node) return;

    const TableTotal = vueFlow?.getNodes.value.length ?? 0;
    const TableData = klona(Node.data.table);
    const TableName = `${TableData.name}_${TableTotal}`;
    const PositionX = Node.position.x;
    const PositionY = Node.position.y;
    const Width = Node.dimensions.width;
    const NewTable = {
      id: uuidv4(),
      type: 'custom',
      connectable: false,
      position: { x: PositionX + Width + 40, y: PositionY },
      data: {
        table: {
          name: TableName,
          columns: TableData.columns,
        },
        states: {
          isActive: false,
          isFaded: false,
        },
        style: {
          opacity: 1,
        },
      },
      zIndex: 99,
    };

    vueFlow?.addNodes([NewTable]);
    await nextTick();
    vueFlow?.updateNodeInternals();
    await nextTick();
    jumpIntoView(NewTable.id);
  };

  return {
    cloneNode,
  };
}
