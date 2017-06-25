/*
 *  wrapper for api calls
 *  Countries
 */

import request from './request';

export default function Country() {
  const baseURL = 'countries';
  return {
    All: () => request(baseURL),
    Read: (id) => request(`${baseURL}/${id}`),
  };
}
