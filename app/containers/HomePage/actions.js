/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_PROPERTIES,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_PROPERTIES_ERROR,
  LOAD_MARKETS,
  LOAD_MARKETS_SUCCESS,
  LOAD_MARKETS_ERROR,
  LOAD_COUNTRIES,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_ERROR,
  ON_MAP_CLICK,
  MAP_SHOW_MARKER_INFO,
  MAP_CLOSE_MARKER_INFO,
  ON_PROPERTY_SAVE,
  ON_PROPERTY_SAVE_SUCCESS,
  ON_PROPERTY_SAVE_ERROR,
  SHOW_LOADING,
  HIDE_LOADING,
  ON_SHOW_ALERT_INFO,
  ON_CLOSE_ALERT_INFO,
  ON_OPEN_PROPERTY_ADD_MODAL_FORM,
  ON_CLOSE_PROPERTY_ADD_MODAL_FORM,
  ON_OPEN_PROPERTY_EDIT_MODAL_FORM,
  ON_CLOSE_PROPERTY_EDIT_MODAL_FORM,
  ON_HOME_LOADING,
} from './constants';

/**
 * Load the properties, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PROPERTIES
 */
export function loadProperties() {
  return {
    type: LOAD_PROPERTIES,
  };
}

/**
 * Dispatched when the properties are loaded by the request saga
 *
 * @param  {array} properties The properties data
 *
 * @return {object}      An action object with a type of LOAD_PROPERTIES_SUCCESS passing the properties
 */
export function propertiesLoaded(properties, markers) {
  return {
    type: LOAD_PROPERTIES_SUCCESS,
    properties,
    markers,
  };
}

/**
 * Dispatched when loading the properties fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PROPERTIES_ERROR passing the error
 */
export function propertiesLoadingError(error) {
  return {
    type: LOAD_PROPERTIES_ERROR,
    error,
  };
}

/**
 * Load the markets, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_MARKETS
 */
export function loadMarkets() {
  return {
    type: LOAD_MARKETS,
  };
}

/**
 * Dispatched when the markets are loaded by the request saga
 *
 * @param  {array} markets The markets data
 *
 * @return {object}      An action object with a type of LOAD_MARKETS_SUCCESS passing the markets
 */
export function marketsLoaded(markets) {
  return {
    type: LOAD_MARKETS_SUCCESS,
    markets,
  };
}

/**
 * Dispatched when loading the markets fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_MARKETS_ERROR passing the error
 */
export function marketsLoadingError(error) {
  return {
    type: LOAD_MARKETS_ERROR,
    error,
  };
}

/**
 * Load the markets, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_MARKETS
 */
export function loadCountries() {
  return {
    type: LOAD_COUNTRIES,
  };
}

/**
 * Dispatched when the markets are loaded by the request saga
 *
 * @param  {array} markets The markets data
 *
 * @return {object}      An action object with a type of LOAD_COUNTRIES_SUCCESS passing the markets
 */
export function countriesLoaded(countries) {
  return {
    type: LOAD_COUNTRIES_SUCCESS,
    countries,
  };
}

/**
 * Dispatched when loading the countries fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_COUNTRIES_ERROR passing the error
 */
export function countriesLoadingError(error) {
  return {
    type: LOAD_COUNTRIES_ERROR,
    error,
  };
}

/**
 * Dispatched when clicking on the Map
 *
 * @param  {integer} event { latLng : {} } latLng of type Position
 *
 * @return {object}       An action object with a type of ON_MAP_CLICK passing the event info
 */
export function onMapClick(event) {
  return {
    type: ON_MAP_CLICK,
    payload: {
      event,
    },
  };
}

/**
 * Dispatched when clicking on property marker on the Map
 *
 * @param  {integer} markerKey The markerKey
 *
 * @return {object}       An action object with a type of MAP_SHOW_MARKER_INFO passing the markerKey
 */
export function showMarkerInfo(markerKey) {
  return {
    type: MAP_SHOW_MARKER_INFO,
    payload: {
      markerKey,
    },
  };
}

/**
 * Dispatched when clicking on Map InfoWindow Close
 *
 * @param  {integer} markerKey The markerKey
 *
 * @return {object}       An action object with a type of MAP_CLOSE_MARKER_INFO passing the markerKey
 */
export function closeMarkerInfo(markerKey) {
  return {
    type: MAP_CLOSE_MARKER_INFO,
    payload: {
      markerKey,
    },
  };
}

export function onSaveProperty(values) {
  // Convert form values (Immutable data) to plain JS
  const data = values.toJS();
  return {
    type: ON_PROPERTY_SAVE,
    payload: {
      data,
    },
  };
}

export function onSavePropertySuccess(property) {
  return {
    type: ON_PROPERTY_SAVE_SUCCESS,
    payload: {
      property,
    },
  };
}

export function onSavePropertyError(data) {
  return {
    type: ON_PROPERTY_SAVE_ERROR,
    payload: {
      data,
    },
  };
}

export function showLoading(data) {
  return {
    type: SHOW_LOADING,
    payload: {
      data,
    },
  };
}

export function hideLoading(data) {
  return {
    type: HIDE_LOADING,
    payload: {
      data,
    },
  };
}

export function showAlertInfo(payload) {
  return {
    type: ON_SHOW_ALERT_INFO,
    payload,
  };
}

export function closeAlertInfo(data) {
  return {
    type: ON_CLOSE_ALERT_INFO,
    payload: {
      data,
    },
  };
}

export function onOpenPropertyAddModalForm() {
  return {
    type: ON_OPEN_PROPERTY_ADD_MODAL_FORM,
    payload: {
    },
  };
}

export function onClosePropertyAddModalForm() {
  return {
    type: ON_CLOSE_PROPERTY_ADD_MODAL_FORM,
    payload: {
    },
  };
}

export function onOpenPropertyEditModalForm(propertyId) {
  return {
    type: ON_OPEN_PROPERTY_EDIT_MODAL_FORM,
    payload: {
      propertyId,
    },
  };
}

export function onClosePropertyEditModalForm() {
  return {
    type: ON_CLOSE_PROPERTY_EDIT_MODAL_FORM,
    payload: {
    },
  };
}

export function onHomeLoading() {
  return {
    type: ON_HOME_LOADING,
    payload: {
    },
  };
}
