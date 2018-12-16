const Enjoi = require('enjoi');

const { getSchemas } = require('./lib/util');
const createAllOfSchema = require('./lib/createAllOfSchema');

const parseSchema = (schemaName, docSchemas) => {
  if (docSchemas[schemaName].allOf) {
    return createAllOfSchema(schemaName, docSchemas);
  }

  return Enjoi.schema(docSchemas[schemaName]);
}

module.exports = filePath => {
  const docSchemas = getSchemas(filePath);

  const joiSchemas = {};

  Object.keys(docSchemas).forEach(schemaName => {
    joiSchemas[schemaName] = parseSchema(schemaName, docSchemas);
  });

  return joiSchemas;
}
