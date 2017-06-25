import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProperties, makeSelectMarkers } from 'containers/HomePage/selectors';
import { FormattedMessage } from 'react-intl';
import { Button, Table } from 'react-bootstrap';

class PropertiesList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { properties, editPropertyHandler, deletePropertyHandler, messages } = this.props;
    return (<div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage {...messages.propertiesListHeaderName} /></th>
            <th><FormattedMessage {...messages.propertiesListHeaderMarket} /></th>
            <th><FormattedMessage {...messages.propertiesListHeaderCountry} /></th>
            <th><FormattedMessage {...messages.propertiesListHeaderCity} /></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {properties && properties.sort((a, b) => a.name > b.name).map((property) =>
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.name}</td>
              <td>{property.marketId}</td>
              <td>{property.countryId}</td>
              <td>{property.city}</td>
              <td>
                <Button bsStyle="link" onClick={() => deletePropertyHandler(property.id)}>
                  <span className="glyphicon glyphicon-search" aria-hidden="true" />
                  <span className="sr-only">Show</span>
                </Button>
              </td>
              <td>
                <Button bsStyle="link" onClick={() => editPropertyHandler(property.id)}>
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </Button>
              </td>
              <td>
                <Button bsStyle="link">
                  <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                  <span className="sr-only">Delete</span>
                </Button>
              </td>
            </tr>
        )}
        </tbody>
      </Table>
    </div>);
  }
}

PropertiesList.propTypes = {
  editPropertyHandler: React.PropTypes.func,
  deletePropertyHandler: React.PropTypes.func,
  properties: React.PropTypes.array,
  messages: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
  markers: makeSelectMarkers(),
});

export default connect(mapStateToProps, null)(PropertiesList);
