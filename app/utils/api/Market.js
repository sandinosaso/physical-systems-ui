/*
 *  wrapper for api calls
 *  Markets
 */

import request from './request';

export default function Market() {
  const baseURL = 'markets';
  return {
    All: () => request(baseURL),
    Read: (id) => request(`${baseURL}/${id}`),
  };
}
