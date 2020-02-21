const Joi = require('@hapi/joi');

const oas2joi = require('../index');

describe('OpenAPI parser', () => {
  const schemas = oas2joi('./test/oas/open-api.yml');

  describe('Success', () => {
    it('should have created schemas', () => {
      expect(schemas).toHaveProperty('response');
      expect(schemas.response.isJoi).toEqual(true);
      expect(schemas).toHaveProperty('error');
      expect(schemas.error.isJoi).toEqual(true);
    });

    it('should allow the created schemas to be used for validation', () => {
      const obj = {
        demoRes1: 'A',
        demoRes2: 'abc123'
      };

      const { error } = schemas.response.validate(obj);
      expect(error).toEqual(null);
    });

    it('should allow the non-required properties to be missing', () => {
      const obj = {};

      const { error } = schemas.optional.validate(obj);
      expect(error).toEqual(null);
    });

    it('should have successfully created a schema from an `allOf` reference',
      () => {
        const obj = {
          demoRes1: 'A',
          demoRes2: 'abc123',
          demoErr1: 'abc123'
        };

        const { error } = schemas.error.validate(obj);
        expect(error).toEqual(null);
      });
  });

  describe('Failures', () => {
    it('should fail if the object does not match the schema', () => {
      const obj = {
        demoRes1: 'D',
        demoRes2: 'abc123',
      };

      const { error } = schemas.response.validate(obj);
      expect(error.details[0].message).toEqual(
        '"demoRes1" must be one of [A, B, C]');
    });

    it('should fail if the object has an extra property', () => {
      const obj = {
        demoRes1: 'A',
        demoRes2: 'abc123',
        demoErr1: 'abc123'
      };

      const { error } = schemas.response.validate(obj);
      expect(error.details[0].message).toEqual(
        '"demoErr1" is not allowed');
    });
  });
});
