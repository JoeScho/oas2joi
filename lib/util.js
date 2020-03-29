const SwaggerParser = require('swagger-parser');

const getSchemas = async filePath => {
  const doc = await SwaggerParser.dereference(filePath);

  return doc.components.schemas;
}

module.exports = { getSchemas };