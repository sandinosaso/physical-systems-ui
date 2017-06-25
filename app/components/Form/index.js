import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Row, Col, Button } from 'react-bootstrap';
import FormTextInput from './InputText';
import FormSelectInput from './Select';
import AlertDismissable from './Alert';

import { required } from '../../utils/validators';

const MyForm = (props) => {
  const { handleSubmit, formFieldsRows, valid, submitting, alertInfo, handleAlertDismiss, onCancel } = props;

  const formElements = {
    text: FormTextInput,
    select: FormSelectInput,
  };

  const formFieldsResult = formFieldsRows.map((formFieldRow) => {
    const { fields } = formFieldRow;

    return (
      <Row className="show-grid">
        {fields.map((formField) => (
          <Col xs={12} md={6}>
            <Field
              key={formField.name}
              component={formElements[formField.type]}
              name={formField.name}
              label={formField.label}
              type={formField.type}
              options={formField.type === 'select' ? formField.options : []}
              placeholder={formField.placeholder}
              required={formField.required}
              validate={formField.required ? [required('Please select at least one value')] : null}
            />
          </Col>
        ))}
      </Row>
    );
  });

  return (
    <div>
      <AlertDismissable visible={alertInfo.show} type={alertInfo.type} title={alertInfo.title} message={alertInfo.message} handleAlertDismiss={handleAlertDismiss} />
      <form onSubmit={handleSubmit}>
        {formFieldsResult}
        <Row className="modal-footer">
          <Col>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" bsStyle="primary" disabled={!valid || submitting}>Submit</Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

MyForm.propTypes = {
  formFieldsRows: React.PropTypes.array,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  valid: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  alertInfo: React.PropTypes.object,
  handleAlertDismiss: React.PropTypes.func,
};

const FormReduxWrapper = reduxForm(
  {
    form: 'property-create-form',
    enableReinitialize: true,
  }
)(MyForm);

export default FormReduxWrapper;
