import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectProperties, makeSelectMarkets, makeSelectCountries } from 'containers/HomePage/selectors';
import { FormattedMessage } from 'react-intl';
import { Button, Table, Row, Col } from 'react-bootstrap';
import Modal from '../Form/Modal';


const ConfirmationModal = (props) => {
  const { show, propertyId, onAcceptAction, onCancelAction } = props;
  const acceptDeleteHandler = () => {
    onAcceptAction(propertyId);
    onCancelAction();
  };
  return (
    <Modal show={show} onHide={onCancelAction} title={<h3>Are you sure?</h3>}>
      <div>
        <p>This action can not be reverted.</p>
      </div>
      <Row className="modal-footer">
        <Col>
          <Button onClick={() => onCancelAction()}>Cancel</Button>
          <Button bsStyle="danger" onClick={acceptDeleteHandler}>YES, Delete</Button>
        </Col>
      </Row>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: React.PropTypes.bool,
  propertyId: React.PropTypes.number,
  onAcceptAction: React.PropTypes.func,
  onCancelAction: React.PropTypes.func,
};

class PropertiesList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(...args) {
    super(...args);
    this.state = {
      selectedPropertyId: null,
      showConfirmationModal: false,
    };
  }

  showConfirmationModal(propertyId) {
    this.setState({
      selectedPropertyId: propertyId,
      showConfirmationModal: true,
    });
  }

  closeConfirmationModal() {
    this.setState({
      selectedPropertyId: null,
      showConfirmationModal: false,
    });
  }

  /**
  **** TODO No need to loop through countires and markets just for showing their names => I should calculate this an be saved on the store
  **/
  render() {
    const { properties, countries, markets, editPropertyHandler, deletePropertyHandler, messages } = this.props;
    return (<div>
      <ConfirmationModal
        show={this.state.showConfirmationModal}
        propertyId={this.state.selectedPropertyId}
        onAcceptAction={() => deletePropertyHandler(this.state.selectedPropertyId)}
        onCancelAction={() => this.closeConfirmationModal()}
      />
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
          {properties && properties.map((property) =>
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>
                <Button bsStyle="link" onClick={() => editPropertyHandler(property.id)}>
                  <span>{property.name}</span>
                </Button>
              </td>
              <td>{markets.find((m) => m.id === property.marketId).name}</td>
              <td>{countries.find((c) => c.id === property.countryId).shortName}</td>
              <td>{property.city}</td>
              <td>
                <Button bsStyle="link">
                  <Link to={`properties/view/${property.id}`}>
                    <span className="glyphicon glyphicon-search" aria-hidden="true" />
                    <span className="sr-only">Show</span>
                  </Link>
                </Button>
              </td>
              <td>
                <Button bsStyle="link" onClick={() => editPropertyHandler(property.id)}>
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </Button>
              </td>
              <td>
                <Button bsStyle="link" onClick={() => this.showConfirmationModal(property.id)}>
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
  properties: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  markets: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  countries: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  messages: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
  markets: makeSelectMarkets(),
  countries: makeSelectCountries(),
});

export default connect(mapStateToProps, null)(PropertiesList);
