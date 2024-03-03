import { sortConstraintKeys } from '@utilities/CanvasHelper';
import { defineStore } from 'pinia';
import { klona } from 'klona/full';
import type { GraphNode, GraphEdge } from '@vue-flow/core';

export type TTableColumn = {
  name: string;
  type: string;
  isNull: boolean;
  isUnique: boolean;
  keyConstraint: 'PK' | 'FK' | string;
  shouldHighlight: boolean;
};
export type TActiveIndexColumn = {
  column: string;
  type: 'unique' | 'spatial' | 'fulltext' | null;
};
export type TNodeData = {
  table: {
    name: string;
    columns: TTableColumn[];
    indexes: Array<TActiveIndexColumn>;
  };
  states: {
    isActive: boolean;
    isFaded: boolean;
  };
};
export type TEdgeData = {
  connection: {
    source: {
      position: 'top' | 'right' | 'bottom' | 'left';
      nodeId: string;
    };
    target: {
      position: 'top' | 'right' | 'bottom' | 'left';
      nodeId: string;
    };
  };
  referenced: {
    isHandleActive: boolean;
    column: string;
  };
  referencing: {
    isHandleActive: boolean;
    column: string;
  };
  constraint: {
    onDelete:
      | 'CASCADE'
      | 'SET NULL'
      | 'RESTRICT'
      | 'NO ACTION'
      | 'SET DEFAULT'
      | string;
    onUpdate:
      | 'CASCADE'
      | 'SET NULL'
      | 'RESTRICT'
      | 'NO ACTION'
      | 'SET DEFAULT'
      | string;
  };
};
export type TNode = Omit<GraphNode, 'data'> & { data: TNodeData };
export type TEdge = Omit<GraphEdge, 'data'> & { data: TEdgeData };

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    currentActiveNode: {} as TNode | Record<string, never>,
    selectedColumnInd: -1,
  }),
  getters: {
    hasActiveNode(state) {
      return Object.keys(state.currentActiveNode).length !== 0;
    },
    activeNodeColumns(state) {
      if (!this.hasActiveNode) return [];
      return state.currentActiveNode.data.table.columns;
    },
    hasSelectedColumn(state) {
      return state.selectedColumnInd !== -1;
    },
    currentSelectedColumnData(state): Record<string, never> | TTableColumn {
      if (!this.hasActiveNode) return {};
      return state.currentActiveNode.data.table.columns[
        state.selectedColumnInd
      ];
    },
  },
  actions: {
    addColumnInActiveNode(data: TTableColumn) {
      const Columns = this.currentActiveNode.data.table.columns;

      const AddedObject = Object.assign(
        { shouldHighlight: false },
        klona(data),
      );
      Columns.push(AddedObject);
      this.currentActiveNode.data.table.columns = sortConstraintKeys(Columns);
    },
    deleteColumn(ind: number) {
      this.currentActiveNode.data.table.columns.splice(ind, 1);
    },
    cloneColumn(ind: number) {
      const Columns = this.currentActiveNode.data.table.columns;
      const SelectedColumn = Columns[ind];
      const NewObject = klona(SelectedColumn);
      NewObject.name = `${NewObject.name}_copy`;
      NewObject.keyConstraint = '';
      Columns.push(NewObject);
    },
  },
});
