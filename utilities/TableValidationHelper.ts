import { sqlDataTypes } from '@records/SQLTypes';
import { errors as errorsMsg } from '@lang/en';
import { isEmpty, isBoolean } from 'lodash';
import type { TTableColumn, TNode } from '@stores/Canvas';

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
