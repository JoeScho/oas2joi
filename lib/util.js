const { readFileSync } = require('fs');
const { safeLoad } = require('js-yaml');

const getSchemas = filePath => {
  const openapi = readFileSync(filePath, 'utf8');
  const doc = safeLoad(openapi);

  return doc.components.schemas;
}

module.exports = { getSchemas };