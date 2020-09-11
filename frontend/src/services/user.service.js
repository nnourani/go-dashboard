import axios from 'axios';
import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  getAll
}

function login(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  return axios({
    method: 'POST',
    url: `${config.apiUrl}/api/v1/login`,
    data: formData
  }).then(user => { 
    if(user.data.token) {
       localStorage.setItem('user', JSON.stringify(user.data))
    }
    return user.data;
  })

}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}