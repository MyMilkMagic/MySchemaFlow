export const errors = {
  validation: {
    empty: (field: string) => `${field} cannot be empty.`,
    unique: (field: string) => `${field} already exists.`,
    invalid: (field: string) => `${field} is invalid.`,
    boolean: (field: string) => `${field} must be a boolean.`,
  },
};
