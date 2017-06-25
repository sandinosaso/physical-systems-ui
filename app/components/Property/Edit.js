import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_BOX, GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_CONTENT } from 'containers/App/constants';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GoogleMap from 'components/GoogleMap';
import ModalFormWrapper from '../Form/Modal';
import Form from '../Form';

import { onHomeLoading, showMarkerInfo, closeMarkerInfo, onMapClick, onSaveProperty, closeAlertInfo } from '../../containers/HomePage/actions';
import {
  makeSelectProperties, makeSelectLoading, makeSelectOpenPropertyKey,
  makeSelectMarkets, makeSelectCountries, makeSelectSelectedMarkerInfo,
  makeSelectAtLeastOneMarkerOpen, makeSelectAlertInfo,
} from '../../containers/HomePage/selectors';

const AddProperty = (props) => {
  const marketOptions = props.markets.map((market) => ({ name: market.name, value: market.id }));
  const countryOptions = props.countries.map((country) => ({ name: country.shortName, value: country.id }));

  const formFieldsRows = [
    {
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'Insert Name here',
          required: true,
        },
        {
          name: 'marketId',
          label: 'Market',
          type: 'select',
          options: marketOptions,
          placeholder: 'Select Market',
          required: true,
        },
      ],
    },
    {
      fields: [
        {
          name: 'address1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Insert Address here',
          required: true,
        },
        {
          name: 'address2',
          label: 'Address Line 2',
          type: 'text',
          placeholder: 'Address line 2',
          required: false,
        },
      ],
    },
    {
      fields: [
        {
          name: 'countryId',
          label: 'Country',
          type: 'select',
          options: countryOptions,
          placeholder: 'Select country',
          required: false,
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'City name',
          required: false,
        },
      ],
    },
    {
      fields: [
        {
          name: 'state',
          label: 'State',
          type: 'text',
          placeholder: 'State code (i.e NY)',
          required: false,
        },
        {
          name: 'postalCode',
          label: 'ZIP',
          type: 'text',
          placeholder: 'Postal code',
          required: false,
        },
      ],
    },
  ];

  return (
    <div>
      <ModalFormWrapper show={props.show} onHide={props.onCancelAction} title="Edit Property">
        <Grid fluid>
          <Row>
            <Col xs={12} md={6}>
              <Form
                initialValues={props.initialValues}
                onSubmit={props.onSubmit}
                onCancel={props.onCancelAction}
                formFieldsRows={formFieldsRows}
                alertInfo={props.alertInfo}
                handleAlertDismiss={props.onCloseAlertInfo}
              />
            </Col>
            <Col xs={12} md={6}>
              <div style={{ height: '400px' }}>
                <GoogleMap
                  options={{ draggable: true }}
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAP_API_KEY}`}
                  loadingElement={
                    <div style={{ height: '100%' }}>
                      Loading...
                    </div>
                  }
                  containerElement={
                    <div className={'mapContainer'} style={{ height: '100%' }} />
                  }
                  mapElement={
                    <div className={'mapElement'} style={{ height: '100%' }} />
                  }
                  onMapLoad={_.noop}
                  onMapClick={_.noop}
                  markers={props.markers.map((m) => {
                    const newMarker = { ...m, draggable: true };
                    newMarker.onDragStart = () => console.log('Starting drawing');
                    newMarker.onDragEnd = (e) => props.onMapClickHandler(e);
                    return newMarker;
                  })}
                  onMarkerRightClick={_.noop}
                  onMarkerClick={_.noop}
                  onMarkerClose={_.noop}
                  enableInfoBox={GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_BOX}
                  enableInfoContent={GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_CONTENT}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </ModalFormWrapper>
    </div>
  );
};

AddProperty.propTypes = {
  show: React.PropTypes.bool,
  initialValues: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  alertInfo: React.PropTypes.object,
  onCloseAlertInfo: React.PropTypes.func,
  onCancelAction: React.PropTypes.func,
  markers: React.PropTypes.array,
  markets: React.PropTypes.array,
  countries: React.PropTypes.array,
};


export function mapDispatchToProps(dispatch) {
  return {
    onHomeLoaded: () => dispatch(onHomeLoading()),
    onMarkerClick: (markerIndex) => dispatch(showMarkerInfo(markerIndex)),
    onMarkerClose: (markerIndex) => dispatch(closeMarkerInfo(markerIndex)),
    onMapClickHandler: (mapEvent) => dispatch(onMapClick(mapEvent)),
    onSave: (values) => dispatch(onSaveProperty(values)),
    onCloseAlertInfo: () => dispatch(closeAlertInfo({ show: false })),
  };
}

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
  markets: makeSelectMarkets(),
  countries: makeSelectCountries(),
  selectedMarkerKey: makeSelectOpenPropertyKey(),
  selectedMarkerInfo: makeSelectSelectedMarkerInfo(),
  loading: makeSelectLoading(),
  showMapOverlay: makeSelectAtLeastOneMarkerOpen(),
  alertInfo: makeSelectAlertInfo(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
