import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useVueFlow } from '@vue-flow/core';
import type { TEdge, TTableColumn } from '@stores/Canvas';

export function useEdgeHighlight() {
  const canvasStore = useCanvasStore();
  const { activatePairNode } = useNodeStateHandler();
  const { onEdgeClick, onEdgeMouseEnter, onEdgeMouseLeave, setNodes } =
    useVueFlow();

  const highlightNodeColumnRelation = (edge: TEdge) => {
    const IsAllowedToHighlight =
      edge.sourceNode.data.states.isFaded ||
      edge.targetNode.data.states.isFaded;

    if (IsAllowedToHighlight) return;

    const ReferencingColumn = edge.data.referencing.column;
    const ReferencedColumn = edge.data.referenced.column;

    setNodes((nodes) => {
      return nodes.map((node) => {
        const columns: Array<TTableColumn> = node.data.table.columns;
        columns.forEach((col) => {
          if (
            (col.name === ReferencingColumn || col.name === ReferencedColumn) &&
            (edge.target === node.id || edge.source === node.id)
          ) {
            col.shouldHighlight = true;
          }
        });

        return node;
      });
    });
  };
  const unhighlightColumnRelationship = () => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        const columns: Array<TTableColumn> = node.data.table.columns;
        columns.forEach((col) => {
          col.shouldHighlight = false;
        });

        return node;
      });
    });
  };

  onEdgeClick((event) => {
    const currentEdge = event.edge;
    canvasStore.currentActiveNode = currentEdge.sourceNode;
    activatePairNode(event.edge);
  });

  onEdgeMouseEnter(({ edge }) => highlightNodeColumnRelation(edge));

  onEdgeMouseLeave(unhighlightColumnRelationship);
}
