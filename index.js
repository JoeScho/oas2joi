const fs = require('fs');
const enjoi = require('enjoi');
const YAML = require('js-yaml');

function createSchemas(filePath) {
  const docSchemas = getSchemas(filePath);

  const joiSchemas = {};

  Object.keys(docSchemas).forEach((schemaName) => {
    joiSchemas[schemaName] = parseSchema(schemaName, docSchemas);
  });

  return joiSchemas;
}

function getSchemas(filePath) {
  const openapi = fs.readFileSync(filePath, 'utf8');
  const doc = YAML.safeLoad(openapi);

  const schemas = {};
  return doc.components.schemas;
}

function parseSchema(schemaName, docSchemas) {
  if (docSchemas[schemaName].allOf) {
    const ref = docSchemas[schemaName].allOf[0].$ref;
    const refName = ref.substring(ref.lastIndexOf("/") + 1, ref.length);

    if (docSchemas[schemaName].required) {
      docSchemas[schemaName].required.forEach((requiredProperty) => {
        docSchemas[refName].required.push(requiredProperty);
      });
    }

    Object.assign(docSchemas[refName].properties, docSchemas[schemaName].properties)

    return enjoi(docSchemas[refName]);
  }

  return enjoi(docSchemas[schemaName]);
}

module.exports = createSchemas;