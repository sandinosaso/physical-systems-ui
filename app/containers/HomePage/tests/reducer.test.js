import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadProperties,
  propertiesLoaded,
  propertiesLoadingError,
  onSavePropertySuccess,
  showMarkerInfo,
  closeMarkerInfo,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      success: false,
      showingInfo: false,
      appData: fromJS({
        properties: false,
        markers: false,
        markets: [],
        countries: [],
      }),
      alertInfo: {
        show: false,
        type: 'info',
        title: '',
        message: '',
      },
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadProperties action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['appData', 'properties'], false)
      .setIn(['appData', 'markers'], false);

    expect(appReducer(state, loadProperties())).toEqual(expectedResult);
  });

  it('should handle the propertiesLoaded action correctly', () => {
    const propertiesFixture = [
      {
        id: 1,
        name: '135 Lexington',
        desks: 120,
        Sf: 593,
        address1: '135 Lexington Ave, New York, 10016',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: null,
        latitude: '40.7430775',
        longitude: '-73.9840752',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 22,
        locationId: 1,
      },
    ];

    const markersFixture = [
      {
        position: {
          lat: 40.7430775,
          lng: -73.9840752,
        },
        infoContent: {
          name: '135 Lexington',
          address: '135 Lexington Ave, New York, 10016',
          market: 21,
        },
        showInfo: false,
        key: 1,
        defaultAnimation: 2,
      },
    ];

    const expectedResult = state
      .setIn(['appData', 'properties'], propertiesFixture)
      .setIn(['appData', 'markers'], markersFixture)
      .set('loading', false);

    const stateAfterAction = appReducer(state, propertiesLoaded(propertiesFixture, markersFixture));
    expect(stateAfterAction).toEqual(expectedResult);
  });

  it('should handle the showMarkerInfo action correctly', () => {
    const markersFixture = [
      {
        position: {
          lat: 40.7430775,
          lng: -73.9840752,
        },
        infoContent: {
          name: '135 Lexington',
          address: '135 Lexington Ave, New York, 10016',
          market: 21,
        },
        showInfo: false,
        key: 1,
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 40.7656285,
          lng: -73.9721097,
        },
        infoContent: {
          name: '8 62nd',
          address: '8 E 62nd St, New  York, 10065',
          market: 21,
        },
        showInfo: false,
        key: 2,
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 40.7108825,
          lng: -74.0109063,
        },
        infoContent: {
          name: '195 Broadway',
          address: '195 Broadway, New York,  10007',
          market: 21,
        },
        showInfo: false,
        key: 3,
        defaultAnimation: 2,
      },
    ];

    // Make a copy, same values as old markers and just close the second one
    const expectedResultMarkerOpen = [...markersFixture];
    const marker = expectedResultMarkerOpen[1];
    marker.showInfo = true;
    expectedResultMarkerOpen[1] = marker;

    const propertiesFixture = [
      {
        id: 1,
        name: '135 Lexington',
        desks: 120,
        Sf: 593,
        address1: '135 Lexington Ave, New York, 10016',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: null,
        latitude: '40.7430775',
        longitude: '-73.9840752',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 22,
        locationId: 1,
      },
      {
        id: 2,
        name: '8 62nd',
        desks: 8231,
        Sf: 3415,
        address1: '8 E 62nd St, New  York, 10065',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: '10018',
        latitude: '40.7656285',
        longitude: '-73.9721097',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 34,
        locationId: 2,
      },
      {
        id: 3,
        name: '195 Broadway',
        desks: 342,
        Sf: 1230400,
        address1: '195 Broadway, New York,  10007',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: null,
        latitude: '40.7108825',
        longitude: '-74.0109063',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 20,
        locationId: 3,
      },
    ];

    const expectedResult = state
      .setIn(['appData', 'properties'], propertiesFixture)
      .setIn(['appData', 'markers'], expectedResultMarkerOpen)
      .set('loading', false);

    state = appReducer(state, propertiesLoaded(propertiesFixture, markersFixture));

    const markerKey = 2;
    // Expect marker with key=2 to be showInfo=true
    expect(appReducer(state, showMarkerInfo(markerKey))).toEqual(expectedResult);
  });

  it('should handle the closeMarkerInfo action correctly', () => {
    const markersFixture = [
      {
        position: {
          lat: 40.7430775,
          lng: -73.9840752,
        },
        infoContent: {
          name: '135 Lexington',
          address: '135 Lexington Ave, New York, 10016',
          market: 21,
        },
        showInfo: true,
        key: 1,
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 40.7656285,
          lng: -73.9721097,
        },
        infoContent: {
          name: '8 62nd',
          address: '8 E 62nd St, New  York, 10065',
          market: 21,
        },
        showInfo: true,
        key: 2,
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 40.7108825,
          lng: -74.0109063,
        },
        infoContent: {
          name: '195 Broadway',
          address: '195 Broadway, New York,  10007',
          market: 21,
        },
        showInfo: true,
        key: 3,
        defaultAnimation: 2,
      },
    ];

    // Make a copy, same values as old markers and just close the second one
    const expectedResultMarkerOpen = [...markersFixture];
    const marker = expectedResultMarkerOpen[1];
    marker.showInfo = false;
    expectedResultMarkerOpen[1] = marker;

    const propertiesFixture = [
      {
        id: 1,
        name: '135 Lexington',
        desks: 120,
        Sf: 593,
        address1: '135 Lexington Ave, New York, 10016',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: null,
        latitude: '40.7430775',
        longitude: '-73.9840752',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 22,
        locationId: 1,
      },
      {
        id: 2,
        name: '8 62nd',
        desks: 8231,
        Sf: 3415,
        address1: '8 E 62nd St, New  York, 10065',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: '10018',
        latitude: '40.7656285',
        longitude: '-73.9721097',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 34,
        locationId: 2,
      },
      {
        id: 3,
        name: '195 Broadway',
        desks: 342,
        Sf: 1230400,
        address1: '195 Broadway, New York,  10007',
        address2: null,
        city: 'Manhattan',
        state: 'NY',
        postalCode: null,
        latitude: '40.7108825',
        longitude: '-74.0109063',
        countryId: 693,
        regionalCategory: 14,
        marketId: 21,
        submarketId: 20,
        locationId: 3,
      },
    ];

    const expectedResult = state
      .setIn(['appData', 'properties'], propertiesFixture)
      .setIn(['appData', 'markers'], markersFixture)
      .set('loading', false);

    state = appReducer(state, propertiesLoaded(propertiesFixture, markersFixture));

    const markerKey = 2;
    // Expect marker with key=2 to be showInfo=false
    expect(appReducer(state, closeMarkerInfo(markerKey))).toEqual(expectedResult);
  });


  it('should handle addProperty action correctly', () => {
    const propertiesFixture = false;
    const markersFixture = [];

    const newProperty = {
      id: 1,
      name: '135 Lexington',
      desks: 120,
      Sf: 593,
      address1: '135 Lexington Ave, New York, 10016',
      address2: null,
      city: 'Manhattan',
      state: 'NY',
      postalCode: null,
      latitude: '40.7430775',
      longitude: '-73.9840752',
      countryId: 693,
      regionalCategory: 14,
      marketId: 21,
      submarketId: 22,
      locationId: 1,
    };

    const expectedResult = state
      .setIn(['appData', 'properties'], propertiesFixture)
      .setIn(['appData', 'markers'], markersFixture)
      .set('loading', false)
      .set('success', true)
      .setIn(['alertInfo'], { message: 'The property was saved successfully.', show: true, type: 'success', title: 'Save success' });

    state = appReducer(state, propertiesLoaded(propertiesFixture, markersFixture));

    // Expect new property to be added
    expect(appReducer(state, onSavePropertySuccess(newProperty))).toEqual(expectedResult);
  });

  it('should handle the propertiesLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, propertiesLoadingError(fixture))).toEqual(expectedResult);
  });
});
