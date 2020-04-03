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

## Contributors
[//]: contributor-faces

<a href="https://github.com/iudex_"><img src="https://avatars2.githubusercontent.com/u/56843?s=400&u=598e754a7f053479c93a4ac061b5abfe0a6a7df1&v=4" title="iudex_" width="80" height="80"></a>
<a href="https://github.com/JoeScho"><img src="https://avatars1.githubusercontent.com/u/12475501?s=460&u=ea1487bb0b85777ae539a986d4254d6964d1c9d7&v=4" title="JoeScho" width="80" height="80"></a>

[//]: contributor-faces
