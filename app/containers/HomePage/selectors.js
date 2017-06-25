/**
 * The global state selectors
 */

import { getMapMarkers } from 'utils/map';
import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');
const selectNewMarker = (state) => state.getIn(['home', 'newMarker']);
const selectEditingProperty = (state) => state.getIn(['home', 'editingProperty']);
const selectOpenPropertyKey = (state) => state.getIn(['home', 'openPropertyKey']);
const selectProperties = (state) => state.getIn(['home', 'appData', 'properties']);

const makeSelectLoading = () => createSelector(
  selectHome,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectHome,
  (globalState) => globalState.get('error')
);

const makeSelectSuccess = () => createSelector(
  selectHome,
  (globalState) => globalState.get('success')
);

const makeSelectProperties = () => createSelector(
  selectHome,
  (globalState) => globalState.getIn(['appData', 'properties'])
);

const makeSelectMarkets = () => createSelector(
  selectHome,
  (globalState) => globalState.getIn(['appData', 'markets'])
);

const makeSelectCountries = () => createSelector(
  selectHome,
  (globalState) => globalState.getIn(['appData', 'countries'])
);

const makeSelectMarkers = () => createSelector(
  [selectProperties, selectNewMarker, selectOpenPropertyKey],
  (properties, newMarker, openPropertyKey) => {
    const currentMarkers = getMapMarkers(properties, openPropertyKey);
    if (newMarker) return [...currentMarkers, newMarker];
    return currentMarkers;
  }
);

const makeSelectCurrentPropertyMarkers = () => createSelector(
  [selectEditingProperty],
  (property) => {
    const currentMarkers = property ? getMapMarkers([property]) : [];
    return currentMarkers;
  }
);

const makeSelectSelectedMarkerInfo = () => createSelector(
  [selectProperties, selectOpenPropertyKey],
  (properties, openPropertyKey) => {
    const markers = getMapMarkers(properties, openPropertyKey);
    const marker = markers ? markers.find((m) => m.showInfo) : false;
    return marker ? marker.infoContent : false;
  }
);

const makeSelectAtLeastOneMarkerOpen = () => createSelector(
    [selectProperties, selectOpenPropertyKey],
    (properties, openPropertyKey) => {
      const markers = getMapMarkers(properties, openPropertyKey);
      return markers.length > 0;
    }
);

const makeSelectAlertInfo = () => createSelector(
  selectHome,
  (globalState) => globalState.get('alertInfo')
);

const makeSelectNewMarkerInfo = () => createSelector(
  selectHome,
  (globalState) => globalState.get('newMarker')
);

const makeSelectShowAddPropertyModalForm = () => createSelector(
  selectHome,
  (globalState) => globalState.get('showPropertyAddModalForm')
);

const makeSelectShowEditPropertyModalForm = () => createSelector(
  selectHome,
  (globalState) => globalState.get('showPropertyEditModalForm')
);

const makeSelectOpenPropertyKey = () => createSelector(
  selectHome,
  (globalState) => globalState.get('openPropertyKey')
);

const makeSelectEditingProperty = () => createSelector(
  selectHome,
  (globalState) => globalState.get('editingProperty')
);


const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectHome,
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectProperties,
  makeSelectMarkets,
  makeSelectCountries,
  makeSelectMarkers,
  makeSelectOpenPropertyKey,
  makeSelectNewMarkerInfo,
  makeSelectSelectedMarkerInfo,
  makeSelectAtLeastOneMarkerOpen,
  makeSelectEditingProperty,
  makeSelectCurrentPropertyMarkers,
  makeSelectAlertInfo,
  makeSelectShowAddPropertyModalForm,
  makeSelectShowEditPropertyModalForm,
  makeSelectLocationState,
};
