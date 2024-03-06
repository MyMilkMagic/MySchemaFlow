import { useCanvasStore } from '@stores/Canvas';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, inject } from 'vue';

export type TRelationFormData = {
  referencingColumn: string;
  referencedTable: string;
  referencedColumn: string;
  constraint: {
    onDelete: string;
    onUpdate: string;
  };
  cardinality:
    | 'one-to-one'
    | 'one-to-many'
    | 'many-to-many'
    | 'many-to-one'
    | string;
};

export type TUpdateColumn = {
  originalName: string;
  newName: string;
};

export function useEdgeRelationActions() {
  const canvasStore = useCanvasStore();
  const { calculateActiveEdgesPosition, calculateAllEdgesPosition } =
    useEdgePositionCalculator();
  const { activateState } = useNodeStateHandler();
  const VueFlow = inject(vueFlowKey);

  const addRelation = async (relationData: TRelationFormData) => {
    if (!VueFlow) return;

    const ReferencedNode = findNodeByTableName(
      relationData.referencedTable,
      VueFlow.getNodes.value,
    );

    if (!ReferencedNode) return;

    const EdgeObj = {
      id: uuidv4(),
      source: ReferencedNode.id,
      target: canvasStore.currentActiveNode.id,
      style: {
        strokeWidth: 2.5,
      },
      data: {
        referenced: {
          isHandleActive: false,
          column: relationData.referencedColumn,
        },
        referencing: {
          isHandleActive: false,
          column: relationData.referencingColumn,
        },
        constraint: {
          onDelete: relationData.constraint.onDelete,
          onUpdate: relationData.constraint.onUpdate,
        },
        cardinality: relationData.cardinality,
      },
    };
    VueFlow.addEdges([EdgeObj]);
    await calculateActiveEdgesPosition();
    activateState();
  };

  const deleteRelation = () => {
    if (!VueFlow) return;
    VueFlow.setEdges((edges) => {
      return edges.filter(
        (edge) => edge.id !== canvasStore.currentActiveEdge.id,
      );
    });
    canvasStore.currentActiveEdge = Object.assign({}, {});
    activateState();
  };

  const deleteRelationByColumn = (columnName: string) => {
    if (!VueFlow) return;
    VueFlow.setEdges((edges) => {
      return edges.filter((edge) => {
        return (
          edge.data.referenced.column !== columnName ||
          edge.data.referencing.column !== columnName
        );
      });
    });
  };

  const updateRelation = async (relationData: TRelationFormData) => {
    if (!VueFlow) return;
    const ReferencedNode = findNodeByTableName(
      relationData.referencedTable,
      VueFlow.getNodes.value,
    );

    if (!ReferencedNode) return;
    const EdgeObj = {
      id: uuidv4(),
      source: ReferencedNode.id,
      target: canvasStore.currentActiveEdge.targetNode.id,
      style: {
        strokeWidth: 2.5,
      },
      data: {
        referenced: {
          isHandleActive: false,
          column: relationData.referencedColumn,
        },
        referencing: {
          isHandleActive: false,
          column: relationData.referencingColumn,
        },
        constraint: {
          onDelete: relationData.constraint.onDelete,
          onUpdate: relationData.constraint.onUpdate,
        },
        cardinality: relationData.cardinality,
      },
    };
    deleteRelation();
    VueFlow.addEdges([EdgeObj]);

    const Edges = VueFlow.getEdges.value;
    const LastInsertedEdge = Edges[Edges.length - 1]; // Retrieve the previously added edge

    // The Current active node will now be the referencing node
    canvasStore.currentActiveNode = LastInsertedEdge.targetNode;
    canvasStore.currentActiveEdge = LastInsertedEdge;

    await nextTick();
    activateState();
    await calculateAllEdgesPosition();
  };

  const updateColumnRelation = (data: TUpdateColumn) => {
    if (!VueFlow) return;
    VueFlow.setEdges((edges) => {
      return edges.map((edge) => {
        if (edge.data.referenced.column === data.originalName) {
          edge.data.referenced.column = data.newName;
        }

        if (edge.data.referencing.column === data.originalName) {
          edge.data.referencing.column = data.newName;
        }

        return edge;
      });
    });
  };

  return {
    addRelation,
    deleteRelation,
    deleteRelationByColumn,
    updateRelation,
    updateColumnRelation,
  };
}
