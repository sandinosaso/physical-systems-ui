/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';

import GoogleMap from 'components/GoogleMap';
import MarkerInfo from 'components/GoogleMap/MarkerInfo';
import PropertyAddForm from 'components/Property/Add';
import PropertyEditForm from 'components/Property/Edit';
import PropertiesList from 'components/Property/List';
import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_BOX, GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_CONTENT } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  onHomeLoading, showMarkerInfo, closeMarkerInfo,
  onMapClick, onSaveProperty, closeAlertInfo,
  onOpenPropertyAddModalForm, onClosePropertyAddModalForm,
  onOpenPropertyEditModalForm, onClosePropertyEditModalForm,
} from './actions';

import {
  makeSelectProperties, makeSelectMarkers, makeSelectLoading,
  makeSelectMarkets, makeSelectCountries, makeSelectSelectedMarkerInfo,
  makeSelectShowAddPropertyModalForm, makeSelectShowEditPropertyModalForm, makeSelectAlertInfo, makeSelectOpenPropertyKey,
} from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
    };
  }

  componentDidMount() {
    // Load dinamic data this component may need
    this.props.onHomeLoaded();
  }

  handleClickFromChildrenOfInfoBox = this.handleClickFromChildrenOfInfoBox.bind(this);

  handleClickFromChildrenOfInfoBox(e) {
    console.log('handleClickFromChildrenOfInfoBox!!');
    console.log(e);
  }

  render() {
    const {
      markers, markets, countries,
      onMapClickHandler, onMarkerClick,
      onMarkerClose, showPropertyAddModalForm, showPropertyEditModalForm,
      onSave, alertInfo, onCloseAlertInfo,
      selectedMarkerInfo, selectedMarkerKey,
      openPropertyAddModalForm, closePropertyAddModalForm,
      openPropertyEditModalForm, closePropertyEditModalForm,
    } = this.props;

    return (
      <div>
        <PageHeader><FormattedMessage {...messages.header} /> <small>Awesome</small></PageHeader>
        <Panel
          collapsible
          expanded={this.state.open}
          header={
            <h3 onClick={() => this.setState({ open: !this.state.open })} role="button">Properties List</h3> // eslint-disable-line jsx-a11y/no-static-element-interactions
          }
        >
          <PropertiesList messages={messages} editPropertyHandler={openPropertyEditModalForm} deletePropertyHandler={() => null} />
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={openPropertyAddModalForm}
          >
            <FormattedMessage {...messages.addProperty} />
          </Button>

          <MarkerInfo show={selectedMarkerInfo !== false} selectedMarkerInfo={selectedMarkerInfo} onClose={() => onMarkerClose(selectedMarkerKey)} />
          <PropertyEditForm
            show={showPropertyEditModalForm}
            onSubmit={onSave}
            alertInfo={alertInfo}
            onCloseAlertInfo={onCloseAlertInfo}
            onCancelAction={closePropertyEditModalForm}
            onMapClickHandler={onMapClickHandler}
            markers={markers}
            markets={markets}
            countries={countries}
          />
          <PropertyAddForm
            show={showPropertyAddModalForm}
            onSubmit={onSave}
            alertInfo={alertInfo}
            onCloseAlertInfo={onCloseAlertInfo}
            onCancelAction={closePropertyAddModalForm}
            onMapClickHandler={onMapClickHandler}
            markers={markers}
            markets={markets}
            countries={countries}
          />
        </Panel>
        <Panel expanded header={<h3>Map</h3>}>
          <Grid>
            <Row>
              <Col xs={12} md={12}>
                <div style={{ height: '600px' }}>
                  <GoogleMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAP_API_KEY}`}
                    loadingElement={
                      <div style={{ height: '100%' }}>
                        <FormattedMessage {...messages.loadingMap} />
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
                    markers={markers}
                    onMarkerRightClick={_.noop}
                    onMarkerClick={onMarkerClick}
                    onMarkerClose={onMarkerClose}
                    onClickFromChildrenOfInfoBox={this.handleClickFromChildrenOfInfoBox}
                    enableInfoBox={GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_BOX}
                    enableInfoContent={GOOGLE_MAP_ENABLE_SHOW_MARKER_INFO_CONTENT}
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}

HomePage.propTypes = {
  markers: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  markets: React.PropTypes.array,
  countries: React.PropTypes.array,
  onHomeLoaded: React.PropTypes.func,
  onMapClickHandler: React.PropTypes.func,
  onMarkerClick: React.PropTypes.func,
  onMarkerClose: React.PropTypes.func,
  openPropertyAddModalForm: React.PropTypes.func,
  closePropertyAddModalForm: React.PropTypes.func,
  openPropertyEditModalForm: React.PropTypes.func,
  closePropertyEditModalForm: React.PropTypes.func,
  onSave: React.PropTypes.func,
  onCloseAlertInfo: React.PropTypes.func,
  showPropertyAddModalForm: React.PropTypes.bool,
  showPropertyEditModalForm: React.PropTypes.bool,
  alertInfo: React.PropTypes.object,
  selectedMarkerInfo: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  selectedMarkerKey: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onHomeLoaded: () => dispatch(onHomeLoading()),
    onMarkerClick: (markerIndex) => dispatch(showMarkerInfo(markerIndex)),
    onMarkerClose: (markerIndex) => dispatch(closeMarkerInfo(markerIndex)),
    onMapClickHandler: (mapEvent) => dispatch(onMapClick(mapEvent)),
    openPropertyAddModalForm: () => dispatch(onOpenPropertyAddModalForm()),
    closePropertyAddModalForm: () => dispatch(onClosePropertyAddModalForm()),
    openPropertyEditModalForm: (propertyId) => dispatch(onOpenPropertyEditModalForm(propertyId)),
    closePropertyEditModalForm: () => dispatch(onClosePropertyEditModalForm()),
    onSave: (values) => dispatch(onSaveProperty(values)),
    onCloseAlertInfo: () => dispatch(closeAlertInfo({ show: false })),
  };
}

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
  markets: makeSelectMarkets(),
  countries: makeSelectCountries(),
  markers: makeSelectMarkers(),
  selectedMarkerKey: makeSelectOpenPropertyKey(),
  selectedMarkerInfo: makeSelectSelectedMarkerInfo(),
  loading: makeSelectLoading(),
  alertInfo: makeSelectAlertInfo(),
  showPropertyAddModalForm: makeSelectShowAddPropertyModalForm(),
  showPropertyEditModalForm: makeSelectShowEditPropertyModalForm(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
