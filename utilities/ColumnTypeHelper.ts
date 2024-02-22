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
