const isEmpty = (value) => value === undefined || value === null || value === '';

const required = (message) => (value) => {
  let result;
  if (Array.isArray(value)) {
    result = value.length > 0 ? undefined : message;
  } else if (isEmpty(value)) {
    result = message;
  }
  return result;
};

export {
  required,
};
