import {
  LOAD_PROPERTIES,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_PROPERTIES_ERROR,
} from '../constants';

import {
  loadProperties,
  propertiesLoaded,
  propertiesLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadProperties', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_PROPERTIES,
      };

      expect(loadProperties()).toEqual(expectedResult);
    });
  });

  describe('propertiesLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_PROPERTIES_SUCCESS,
        properties: fixture,
      };

      expect(propertiesLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('propertiesLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_PROPERTIES_ERROR,
        error: fixture,
      };

      expect(propertiesLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
