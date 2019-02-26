import axios from 'axios';

const apiUrl = 'http://localhost:8080/api';
const methods = ['get', 'post'];

function formatUrl(path) {
  return `${apiUrl}${path}`;
}

class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, data) => new Promise((resolve, reject) => {
          axios[method](formatUrl(path), data)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
      return this[method];
    });
  }
}

export default new ApiClient();
