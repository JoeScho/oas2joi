# oas2joi

Returns an object containing Joi schemas for every schema present in an Open API 3 Yaml document.

## Usage

```
npm i oas2joi
```

```
const oas2joi = require('oas2joi');
const Joi = require('@hapi/joi');

const schemas = oas2joi('./path/to/open-api.yml');

const someObject = {
  foo: 'bar'
};

const { error } = Joi.validate(someObject, schemas.someObject);
```
