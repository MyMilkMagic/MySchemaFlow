import { sqlDataTypes } from '@records/SQLTypes';
import { errors as errorsMsg } from '@lang/en';
import { isEmpty, isBoolean } from 'lodash';
import type { TTableColumn, TNode, TEdge } from '@stores/Canvas';
import type { TRelationFormData } from '@composables/Edges/useEdgeRelationActions';

export function validateColumns(
  data: Omit<TTableColumn, 'id' | 'shouldHighlight' | 'keyConstraint'> & {
    isPrimaryKey: boolean;
    originalColumnName?: string;
  },
  currentNode: TNode | Record<string, never>,
): Array<string> {
  const errors: Array<string> = [];

  // Validate column name
  if (isEmpty(data.name)) {
    errors.push(errorsMsg.validation.empty('Column name'));
  } else {
    if (
      data.originalColumnName &&
      !isUniqueColumn(data.name, data.originalColumnName, currentNode)
    ) {
      errors.push(errorsMsg.validation.unique('This column'));
    }

    if (
      !data.originalColumnName &&
      !isUniqueColumn(data.name, '', currentNode)
    ) {
      errors.push(errorsMsg.validation.unique('This column'));
    }
  }

  // Validate column type
  if (isEmpty(data.type)) {
    errors.push(errorsMsg.validation.empty('Column type'));
  } else if (!isValidDataType(data.type)) {
    errors.push(errorsMsg.validation.invalid('Data type'));
  }

  // Validate null and unique properties
  if (!isBoolean(data.isNull)) {
    errors.push(errorsMsg.validation.boolean('Null property'));
  }
  if (!isBoolean(data.isUnique)) {
    errors.push(errorsMsg.validation.boolean('Unique property'));
  }

  // Validate primary key uniqueness
  if (data.isPrimaryKey && columnsHasPrimaryKey(currentNode)) {
    errors.push('There should be only one primary key.');
  }

  return errors;
}

/**
 * Check if column is unique, meaning, it does not exist yet.
 */
export function isUniqueColumn(
  columnName: string,
  columnOriginalName: string,
  currentNode: Record<string, never> | TNode,
): boolean {
  if (isEmpty(currentNode)) return false;

  return currentNode.data.table.columns
    .filter((column) => column.name !== columnOriginalName)
    .every((column) => column.name !== columnName);
}

/**
 * Check if data has a valid data type column
 */
export function isValidDataType(dataType: string): boolean {
  const DataType = dataType.split('(')[0];
  return sqlDataTypes.some(
    (type) => type.name.toLowerCase() === DataType.toLowerCase(),
  );
}

/**
 * Check if column has a primary key
 */
export function columnsHasPrimaryKey(
  currentNode: TNode | Record<string, never>,
): boolean {
  if (isEmpty(currentNode)) return false;
  return currentNode.data.table.columns.some(
    (column) => column.keyConstraint === 'PK',
  );
}

/**
 * Validate table relationship constraints
 */
const validateConstraint = (
  constraint: TRelationFormData['constraint'],
  Errors: Array<string>,
  source?: TTableColumn,
  referencingColumn?: string,
) => {
  const validForeignKeyActions = [
    'NO ACTION',
    'CASCADE',
    'SET NULL',
    'SET DEFAULT',
    'RESTRICT',
  ];

  // If the user omits the constraint, default to NO ACTION
  constraint.onDelete = isEmpty(constraint.onDelete)
    ? 'NO ACTION'
    : constraint.onDelete;
  constraint.onUpdate = isEmpty(constraint.onUpdate)
    ? 'NO ACTION'
    : constraint.onUpdate;
  // Check if the referenced column is the same data type as the referencing column
  if (!validForeignKeyActions.includes(constraint.onDelete)) {
    Errors.push(`On delete action '${constraint.onDelete}' is invalid.`);
  }

  if (!validForeignKeyActions.includes(constraint.onUpdate)) {
    Errors.push(`On update action '${constraint.onUpdate}' is invalid.`);
  }
  // Default to NO ACTION if the user did not select any action

  if (constraint.onDelete === 'SET DEFAULT' && source?.isNull) {
    Errors.push(
      `Referencing column '${referencingColumn}' should not be nullable because 'SET DEFAULT' is selected.`,
    );
  }

  if (constraint.onDelete === 'SET NULL' && !source?.isNull) {
    Errors.push(
      `Referencing column '${referencingColumn}' should be nullable because 'SET NULL' is selected.`,
    );
  }

  return Errors;
};

/**
 * Validate necessary fields for establishing relationship between tables
 */
export const validateTableRelations = (
  data: TRelationFormData,
  currentActiveNode: TNode | Record<string, never>,
  nodes: Array<TNode>,
  edges: Array<TEdge>,
  action: string,
): Array<string> => {
  let Errors: Array<string> = [];
  let referencedNode: TNode | undefined = undefined;
  let source: TTableColumn | undefined = undefined;
  let target: TTableColumn | undefined = undefined;

  if (isEmpty(data.referencingColumn)) {
    Errors.push('Referencing column should not be empty.');
  } else {
    const TableName = currentActiveNode.data.table.name;
    const Columns = currentActiveNode.data.table.columns;
    source = Columns.find(
      (column: TTableColumn) => column.name === data.referencingColumn,
    );
    if (!source) {
      Errors.push(`Referencing column not found in '${TableName}' table.`);
    }
  }

  if (isEmpty(data.referencedTable)) {
    Errors.push('Referenced table should not be empty.');
  } else {
    referencedNode = nodes.find(
      (node) => node.data.table.name === data.referencedTable,
    );
    if (!referencedNode) {
      Errors.push(`Referenced table not found.`);
    }
  }

  if (isEmpty(data.referencedColumn)) {
    Errors.push('Referenced column should not be empty.');
  }

  if (referencedNode && !isEmpty(data.referencedColumn)) {
    const Columns = referencedNode.data.table.columns;
    target = Columns.find(
      (column: TTableColumn) => column.name === data.referencedColumn,
    );

    if (!target) {
      Errors.push(
        `Referenced column not found in '${data.referencedTable}' table.`,
      );
    }

    if (action === 'add') {
      const ExistingEdge = edges.find(
        (edge) =>
          edge.target === currentActiveNode.id &&
          edge.data.referencing.column === data.referencingColumn,
      );
      if (ExistingEdge) {
        Errors.push(
          `It's possible that '${data.referencingColumn}' has been utilized to form a relationship.`,
        );
      }
    }

    if (target?.type !== source?.type) {
      Errors.push(
        `Referencing column '${data.referencingColumn}' is not the same data type as referenced column '${data.referencedColumn}'.`,
      );
    }

    // pass the errors array
    Errors = validateConstraint(
      data.constraint,
      Errors,
      source,
      data.referencingColumn,
    );
  }

  const SupportedCardinalities = [
    'one-to-one',
    'one-to-many',
    'many-to-one',
    'many-to-many',
  ];

  if (isEmpty(data.cardinality)) {
    Errors.push('Cardinality should not be empty.');
  } else {
    if (!SupportedCardinalities.includes(data.cardinality)) {
      Errors.push('Cardinality is not supported.');
    }
  }

  return Errors.map((error) => `• ${error}`);
};
