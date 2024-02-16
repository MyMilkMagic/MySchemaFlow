import { defineStore } from 'pinia';
import type { GraphNode, GraphEdge } from '@vue-flow/core';

export type TTableColumn = {
  id: number;
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
  }),
});
