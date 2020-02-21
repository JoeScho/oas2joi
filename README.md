# oas2joi

Returns an object containing Joi schemas for every schema present in an Open API 3 Yaml document.

## Usage

```
npm i oas2joi
```

```
const oas2joi = require('oas2joi');

const schemas = oas2joi('./test/oas/open-api.yml');

const someObject = {
  demoRes1: 'A',
  demoRes2: 'baz'
};

const { error } = schemas.response.validate(someObject));
```
