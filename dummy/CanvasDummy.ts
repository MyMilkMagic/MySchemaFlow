import NodeDummy from '@dummy/NodeDummy';
import EdgesDummy from '@dummy/EdgesDummy';
import { v4 as uuidv4 } from 'uuid';

const createNodes = () => {
  const NodeKeys = Object.keys(NodeDummy);
  return NodeKeys.map((key, index) => {
    const Node = NodeDummy[key];
    const MappedColumns = Node.columns.map((col) => {
      if (col.type.includes('VARCHAR')) {
        return Object.assign(col, {
          type: `${col.type}(255)`,
        });
      }

      return col;
    });

    return {
      id: Node.id,
      type: 'custom',
      connectable: false,
      position: { x: 350 * index, y: 5 },
      data: {
        table: {
          name: Node.name,
          columns: MappedColumns,
          indexes: [],
        },
        states: {
          isActive: false,
          isFaded: false,
        },
      },
    };
  });
};

const createEdges = () => {
  return EdgesDummy.map((edge) => {
    return {
      id: uuidv4(),
      source: NodeDummy[edge.source.table].id,
      target: NodeDummy[edge.target.table].id,
      style: {
        strokeWidth: 2.5,
      },
      data: {
        referenced: {
          column: edge.source.column,
          isHandleActive: false,
        },
        referencing: {
          column: edge.target.column,
          isHandleActive: false,
        },
        constraint: {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        },
        cardinality: edge.cardinality,
      },
    };
  });
};

export const TestNodes = createNodes();
export const TestEdges = createEdges();
