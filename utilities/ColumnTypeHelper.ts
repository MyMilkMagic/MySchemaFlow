export const findIndexOfSelectedType = (
  list: Array<{ name: string; description: string }>,
  currentValue: string,
) => {
  return list.findIndex((list) => {
    // If ever user inputs VARCHAR(500), parenthesis will be removed
    const Value = currentValue.toLowerCase().split('(')[0];
    return list.name.toLowerCase() === Value;
  });
};

/**
 * This makes sure the column data type is in the uppercase format
 */
export const formatColumnDataType = (column: string) => {
  const TypeRegex = /^\s*(\w+)\s*/i;
  const VarcharLengthRegex = /VARCHAR\s*\(\s*(\d+)\s*\)/i;
  const MatchType = column.match(TypeRegex);
  const MatchLength = column.match(VarcharLengthRegex);

  if (MatchType) {
    const type = MatchType[1].toUpperCase();

    if (type === 'VARCHAR') {
      if (MatchLength) {
        return MatchLength[0];
      } else {
        return 'VARCHAR(255)';
      }
    }

    return type;
  }

  return column;
};
