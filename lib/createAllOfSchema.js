const Enjoi = require('enjoi');

module.exports = (schemaName, docSchemas) => {
  const newSchema = {
    type: 'object',
    required: [],
    properties: {}
  };

  docSchemas[schemaName].allOf.forEach(element => {
    if (element.$ref) {
      const ref = element.$ref;
      const refName = ref.substring(ref.lastIndexOf("/") + 1, ref.length);

      // Set required elements from $ref
      if (docSchemas[refName].required) {
        docSchemas[refName].required.forEach(requiredElement => {
          newSchema.required.push(requiredElement);
        });
      }

      // Set properties from $ref
      // TODO: ensure property names are not overwritten, throw if so
      Object.assign(newSchema.properties, docSchemas[refName].properties)
    } else {
      if (element.required) {
        element.required.forEach(requiredElement => {
          newSchema.required.push(requiredElement);
        });
      }

      Object.assign(newSchema.properties, element.properties)
    }
  })

  return Enjoi.schema(newSchema);
}
