/*
 *  wrapper for api calls
 *  Properties
 */

import request from './request';

export default function Property() {
  const baseURL = 'properties';
  return {
    All: () => request(baseURL),
    Read: (id) => request(`${baseURL}/${id}`),
    Create: (data) => {
      const jsonBody = JSON.stringify(data);
      return request(baseURL,
        { method: 'POST',
          body: jsonBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    },
    Update: (id, data) => {
      const jsonBody = JSON.stringify(data);
      return request(`${baseURL}/${id}`,
        { method: 'PUT',
          body: jsonBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    },
    Delete: (id) => (
      request(`${baseURL}/${id}`,
        { method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
    ),
  };
}
