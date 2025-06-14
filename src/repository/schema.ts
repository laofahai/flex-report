// Schema utility functions for inferring schema from sample data
export type SchemaField = {
  id: string;
  name: string;
  label?: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';
  children?: SchemaField[];
};

export function guessType(value: any): SchemaField['type'] {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') {
    // Try to detect date
    if (!isNaN(Date.parse(value))) return 'date';
    return 'string';
  }
  return 'string';
}

export function convertRowKeysToSchemaFields(row: any, parentPath: string = ''): SchemaField[] {
  if (!row || typeof row !== 'object') return [];
  return Object.keys(row).map(key => {
    const value = row[key];
    const type = guessType(value);
    let children = undefined;
    const id = parentPath ? `${parentPath}.${key}` : key;
    if (type === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
      children = convertRowKeysToSchemaFields(value, id);
    } else if (type === 'array' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
      children = convertRowKeysToSchemaFields(value[0], id);
    }
    return {
      id,
      name: key,
      type,
      children,
    };
  });
}

