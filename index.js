const Enjoi = require('enjoi');
const { getSchemas } = require('./lib/util');

const parseSchema = (schemaName, docSchemas) => {
  if (docSchemas[schemaName].allOf) {
    const ref = docSchemas[schemaName].allOf[0].$ref;
    const refName = ref.substring(ref.lastIndexOf("/") + 1, ref.length);

    if (docSchemas[schemaName].required) {
      docSchemas[schemaName].required.forEach(requiredProperty => {
        docSchemas[refName].required.push(requiredProperty);
      });
    }

    Object.assign(docSchemas[refName].properties, docSchemas[schemaName].properties)

    return Enjoi.schema(docSchemas[refName]);
  }

  return Enjoi.schema(docSchemas[schemaName]);
}

const createSchemas = filePath => {
  const docSchemas = getSchemas(filePath);

  const joiSchemas = {};

  Object.keys(docSchemas).forEach(schemaName => {
    joiSchemas[schemaName] = parseSchema(schemaName, docSchemas);
  });

  return joiSchemas;
}

module.exports = createSchemas;