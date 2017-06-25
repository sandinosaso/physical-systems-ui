/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { pinSymbol } from 'utils/map';
import {
  LOAD_PROPERTIES_SUCCESS,
  LOAD_PROPERTIES,
  LOAD_PROPERTIES_ERROR,
  LOAD_MARKETS_SUCCESS,
  LOAD_MARKETS,
  LOAD_MARKETS_ERROR,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES,
  LOAD_COUNTRIES_ERROR,
  MAP_SHOW_MARKER_INFO,
  MAP_CLOSE_MARKER_INFO,
  ON_MAP_CLICK,
  ON_PROPERTY_SAVE_SUCCESS,
  ON_PROPERTY_SAVE_ERROR,
  ON_SHOW_ALERT_INFO,
  ON_CLOSE_ALERT_INFO,
  ON_OPEN_PROPERTY_ADD_MODAL_FORM,
  ON_CLOSE_PROPERTY_ADD_MODAL_FORM,
  ON_OPEN_PROPERTY_EDIT_MODAL_FORM,
  ON_CLOSE_PROPERTY_EDIT_MODAL_FORM,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  success: false,
  showingInfo: false,
  openPropertyKey: false,
  showPropertyAddModalForm: false,
  showPropertyEditModalForm: false,
  newMarker: false,
  appData: {
    markers: false,
    properties: false,
    markets: [],
    countries: [],
  },
  alertInfo: {
    show: false,
    type: 'info',
    title: '',
    message: '',
  },
});

function appReducer(state = initialState, action) {
  console.log('Action:', action);
  switch (action.type) {
    case LOAD_PROPERTIES:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['appData', 'properties'], false);
    case LOAD_PROPERTIES_SUCCESS:
      return state
        .setIn(['appData', 'properties'], action.properties)
        .setIn(['appData', 'markers'], action.markers)
        .set('loading', false);
    case LOAD_PROPERTIES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ON_PROPERTY_SAVE_SUCCESS:
      return state
        .set('error', false)
        .set('success', true)
        .set('loading', false)
        .set('newMarker', false)
        .updateIn(['appData', 'properties'], (properties) => {
          const newProperties = [...properties, action.payload.property];
          return newProperties;
        })
        .set('alertInfo', {
          show: true,
          type: 'success',
          title: 'Save success',
          message: 'The property was saved successfully.',
        });
    case ON_PROPERTY_SAVE_ERROR:
      return state
        .set('error', true)
        .set('success', false)
        .set('loading', false)
        .set('alertInfo', {
          show: true,
          type: 'danger',
          title: 'Error ocurred',
          message: 'There was an error while trying to save the property.',
        });
    case LOAD_MARKETS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['appData', 'markets'], false);
    case LOAD_MARKETS_SUCCESS:
      return state
        .setIn(['appData', 'markets'], action.markets)
        .set('loading', false);
    case LOAD_MARKETS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_COUNTRIES:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['appData', 'countries'], false);
    case LOAD_COUNTRIES_SUCCESS:
      return state
        .setIn(['appData', 'countries'], action.countries)
        .set('loading', false);
    case LOAD_COUNTRIES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ON_SHOW_ALERT_INFO:
      return state
        .set('alertInfo', action.payload);
    case ON_CLOSE_ALERT_INFO:
      return state
        .set('alertInfo', action.payload);
    case ON_MAP_CLICK:
      return state
        .set('newMarker', { position: action.payload.event.latLng, icon: pinSymbol('#060') });
    case MAP_SHOW_MARKER_INFO:
      return state
        .set('openPropertyKey', action.payload.markerKey);
    case MAP_CLOSE_MARKER_INFO:
      return state
        .set('openPropertyKey', false);
    case ON_OPEN_PROPERTY_ADD_MODAL_FORM:
      return state
        .set('showPropertyAddModalForm', true);
    case ON_CLOSE_PROPERTY_ADD_MODAL_FORM:
      return state
        .set('alertInfo', { ...state.alertInfo, show: false })
        .set('showPropertyAddModalForm', false);
    case ON_OPEN_PROPERTY_EDIT_MODAL_FORM:
      return state
        .set('showPropertyEditModalForm', true);
    case ON_CLOSE_PROPERTY_EDIT_MODAL_FORM:
      return state
        .set('alertInfo', { ...state.alertInfo, show: false })
        .set('showPropertyEditModalForm', false);
    default:
      return state;
  }
}

export default appReducer;
