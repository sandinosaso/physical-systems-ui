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

const renderSelectField = (props) => {
  const { label, input, options, placeholder, meta } = props;
  return (
    <FormGroup
      validationState={getValidationState(meta)}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" placeholder={placeholder} {...input}>
        <option key="-1" value="">{placeholder}</option>
        {
          options.map((option) => (<option key={option.value} value={option.value}>{option.name}</option>))
        }
      </FormControl>
    </FormGroup>
  );
};

renderSelectField.propTypes = {
  input: React.PropTypes.object,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  options: React.PropTypes.array,
  meta: React.PropTypes.object,
};

export default renderSelectField;
