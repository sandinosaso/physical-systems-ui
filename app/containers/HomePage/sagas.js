/**
 * Gets the properties from the Api
 */

import { take, call, put, cancel, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reset } from 'redux-form';

import api from 'utils/api';
import { getMapMarkers } from 'utils/map';

import { ON_HOME_LOADING, ON_PROPERTY_SAVE, ON_PROPERTY_UPDATE, ON_PROPERTY_DELETE } from './constants';
import { makeSelectNewMarkerInfo } from './selectors';
import {
  propertiesLoaded,
  propertiesLoadingError,
  countriesLoaded,
  countriesLoadingError,
  marketsLoaded,
  marketsLoadingError,
  showLoading,
  hideLoading,
  onSavePropertySuccess,
  onSavePropertyError,
  onUpdatePropertySuccess,
  onUpdatePropertyError,
  onDeletePropertySuccess,
  onDeletePropertyError,
} from './actions';

export function* getProperties() {
  try {
    // Call the appropiate API for getting the data
    const properties = yield call(api.Property().All);
    const markers = getMapMarkers(properties);
    console.log('Saga got properties:', properties);
    yield put(propertiesLoaded(properties, markers));
  } catch (err) {
    console.warn('Saga got properties Error:', err);
    yield put(propertiesLoadingError(err));
  }
}

export function* getCountries() {
  try {
    // Call the appropiate API for getting the data
    const countries = yield call(api.Country().All);
    console.log('Saga got countries:', countries);
    yield put(countriesLoaded(countries));
  } catch (err) {
    console.warn('Saga got properties Error:', err);
    yield put(countriesLoadingError(err));
  }
}

export function* getMarkets() {
  try {
    // Call the appropiate API for getting the data
    const countries = yield call(api.Market().All);
    console.log('Saga got countries:', countries);
    yield put(marketsLoaded(countries));
  } catch (err) {
    console.warn('Saga got properties Error:', err);
    yield put(marketsLoadingError(err));
  }
}


export function* saveProperty(action) {
  try {
    yield put(showLoading());
    const newMarkerInfo = yield select(makeSelectNewMarkerInfo());
    if (!newMarkerInfo) {
      yield put(onSavePropertyError({ message: 'Please select the Property location clicking on the Map.' }));
      return;
    }
    const data = { ...action.payload.data, latitude: newMarkerInfo.position.lat(), longitude: newMarkerInfo.position.lng() };

    console.log('going to save from saving property is: ', newMarkerInfo, data);
    const response = yield call(api.Property().Create, data);
    console.log('Response from saving property is: ', response);
    yield put(onSavePropertySuccess(response));
    yield put(reset('property-create-form'));
    // yield put(push('/payment/select'));
  } catch (err) {
    // If we got an error we do not want to leave the Form page
    yield put(onSavePropertyError(true));
  } finally {
    yield put(hideLoading());
  }
}

export function* updateProperty(action) {
  try {
    yield put(showLoading());
    const newMarkerInfo = yield select(makeSelectNewMarkerInfo());
    const { id: propertyId } = action.payload.data;
    let data = { ...action.payload.data };
    if (newMarkerInfo) {
      data = { ...action.payload.data, latitude: newMarkerInfo.position.lat(), longitude: newMarkerInfo.position.lng() };
    }
    console.log('going to update from saving property is: ', newMarkerInfo, data);
    const response = yield call(api.Property().Update, propertyId, data);
    console.log('Response from updating property is: ', response);
    yield put(onUpdatePropertySuccess(response));
    yield put(reset('property-create-form'));
  } catch (err) {
    // If we got an error we do not want to leave the Form page
    yield put(onUpdatePropertyError(true));
  } finally {
    yield put(hideLoading());
  }
}

export function* deleteProperty(action) {
  try {
    yield put(showLoading());
    const { propertyId } = action.payload;

    yield call(api.Property().Delete, propertyId);

    yield put(onDeletePropertySuccess(propertyId));
    yield put(reset('property-create-form'));
  } catch (err) {
    // If we got an error we do not want to leave the Form page
    yield put(onDeletePropertyError(true));
  } finally {
    yield put(hideLoading());
  }
}

function* fetchAllHomeContainerData() {
  // yield put(showLoading());
  // Parallel execution (blocking)
  yield [
    call(getProperties),
    call(getMarkets),
    call(getCountries),
  ];
  // yield put(onPaymentWrapperLoadSuccess());
  // yield put(hideLoading());
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onHomeLoadingSaga() {
  // Watches for LOAD_PROPERTIES actions and calls getProperties when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(ON_HOME_LOADING, fetchAllHomeContainerData);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* savePropertySaga() {
  const watcher = yield takeLatest(ON_PROPERTY_SAVE, saveProperty);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updatePropertySaga() {
  const watcher = yield takeLatest(ON_PROPERTY_UPDATE, updateProperty);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deletePropertySaga() {
  const watcher = yield takeLatest(ON_PROPERTY_DELETE, deleteProperty);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onHomeLoadingSaga,
  savePropertySaga,
  updatePropertySaga,
  deletePropertySaga,
];
