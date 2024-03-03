import { vueFlowKey } from '@symbols/VueFlowSymbol';
import { inject } from 'vue';
import type { TEdge, TTableColumn } from '@stores/Canvas';

export function useEdgeRelationshipHighlighter() {
  const VueFlow = inject(vueFlowKey);
  const highlightNodeColumnRelation = (edge: TEdge) => {
    const IsAllowedToHighlight =
      !VueFlow ||
      edge.sourceNode.data.states.isFaded ||
      edge.targetNode.data.states.isFaded;
    if (IsAllowedToHighlight) return;

    const ReferencingColumn = edge.data.referencing.column;
    const ReferencedColumn = edge.data.referenced.column;

    VueFlow.setNodes((nodes) => {
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
    if (!VueFlow) return;
    VueFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        const columns: Array<TTableColumn> = node.data.table.columns;
        columns.forEach((col) => {
          col.shouldHighlight = false;
        });

        return node;
      });
    });
  };

  return {
    highlightNodeColumnRelation,
    unhighlightColumnRelationship,
  };
}
