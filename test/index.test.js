const { describe, it } = require('mocha');
const { expect } = require('chai');
const Joi = require('joi');

const oas2joi = require('../index');

describe('OpenAPI parser', () => {
  const schemas = oas2joi('./test/oas/open-api.yml');

  describe('Success', () => {
    it('should have created schemas', () => {
      expect(schemas).to.have.property('response');
      expect(schemas.response.isJoi).to.equal(true);
      expect(schemas).to.have.property('error');
      expect(schemas.error.isJoi).to.equal(true);
    });

    it('should allow the created schemas to be used for validation', () => {
      const obj = {
        demoRes1: 'A',
        demoRes2: 'abc123'
      };

      const { error } = Joi.validate(obj, schemas.response);
      expect(error).to.equal(null);
    });

    it('should have successfully created a schema from an `allOf` reference',
      () => {
        const obj = {
          demoRes1: 'A',
          demoRes2: 'abc123',
          demoErr1: 'abc123'
        };

        const { error } = Joi.validate(obj, schemas.error);
        expect(error).to.equal(null);
      });
  });

  describe('Failures', () => {
    it('should fail if the object does not match the schema', () => {
      const obj = {
        demoRes1: 'D',
        demoRes2: 'abc123',
        demoErr1: 'abc123'
      };

      const { error } = Joi.validate(obj, schemas.response);
      expect(error).to.not.equal(null);
      expect(error.details[0].message).to.equal(
        '"demoRes1" must be one of [A, B, C]');
    });
  });
});