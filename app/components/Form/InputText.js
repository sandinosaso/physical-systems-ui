import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const getValidationState = (meta) => {
  const { touched, error, warning } = meta;

  if (touched && error) {
    return 'error';
  }
  if (touched && warning) {
    return 'warning';
  }
  if (touched) {
    return 'success';
  }
  return null;
};

const FormTextInput = (props) => {
  const { label, input, placeholder, meta, required } = props;
  return (
    <FormGroup
      validationState={getValidationState(meta)}
    >
      <ControlLabel>{label}{!required && <small>(Optional)</small>}</ControlLabel>
      <FormControl type="text" placeholder={placeholder} {...input} />
    </FormGroup>
  );
};

FormTextInput.propTypes = {
  required: React.PropTypes.bool,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
};

export default FormTextInput;
