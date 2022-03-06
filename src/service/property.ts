import { FromValues } from '@/interface/Property';
import extendRequest from '../utils/request';

export async function fetchAllPropertyList() {
  return await extendRequest('/properties/all', {
    method: 'get',
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export async function postProperty({ values }: { values: FromValues }) {
  return await extendRequest('/properties/add	', {
    method: 'post',
    data: values,
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}
