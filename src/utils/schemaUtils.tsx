
interface Attribute {  // Attributes Schema
  key: string;
  type: string;
  name: string;
  cardView: boolean;
  gridView: boolean;
  unique: boolean;
  required: boolean;
  search: boolean;
  sort: boolean;
}

interface Schema {  //Common attributes for Schema
  id: string;
  name: string;
  description: string;
  schema: string;
  attributes: Attribute[];
}

// Function used to get all the files inside a directory
export const importFiles = (dir: any) => {
  var files: any = {};
  dir.keys().forEach((key: any) => (files[key] = dir(key)));
  return files;
};

// From all the files extract schema definition and construct object
export const loadSchemaFiles = (files: any) => {
  const gData: any = {};
  const dropdownValues = [];
  const defaultConfig = files['./Config.json']; // default viewtype
  for (const [key, value] of Object.entries<any>(files)) {
    if (key.includes("Schema")) {
      const fileName = `./${value?.name}Data.json`;
      dropdownValues.push(value?.name);
      gData[value?.name] = {
        schema: value?.attributes,
        data: files[fileName],
      };
    }
  }
  var result = {
    defaultview: defaultConfig.DefaultView,
    dropdownData: dropdownValues,
    bsData: gData
  }
  return result;

};

export function generateBusinessObjects(schema: Schema, data: any[]): any[] {
  const attributes = schema.attributes;

  const businessObjects: any[] = [];

  for (const item of data) {
    const businessObject: Record<string, any> = {
      id: item.id,
      title: item.title,
    };

    for (const attribute of attributes) {
      businessObject[attribute.key] = generateAttributeValue(attribute, item[attribute.key]);
    }

    businessObjects.push(businessObject);
  }

  return businessObjects;
}

function generateAttributeValue(attribute: Attribute, existingValue: any): any {
  if (attribute.type === 'string') {
    if (attribute.unique) {
      // Generate a unique string based on the attribute key and a unique identifier
      return `${attribute.key}-${uniqueId()}`;
    }
    return existingValue || ''; // Use the existing value or an empty string
  } else if (attribute.type === 'integer') {
    if (attribute.unique) {
      // Generate a unique integer based on a unique identifier
      return uniqueInt();
    }
    return existingValue || 0; // Use the existing value or 0
  }



  return null;
}
let idCounter = 0;
function uniqueId() {
  return `unique-${idCounter++}`;
}

let intCounter = 0;
function uniqueInt() {
  return intCounter++;
}
export function loadSchema(schemaName: string): any {
  const context = importFiles(require.context(`../data/${schemaName}Schema.json`));
  const data = require(context).default;
  console.log('... load data ', context, '... schemafiles ', data, '.schemaName .', schemaName);

  return data;
}