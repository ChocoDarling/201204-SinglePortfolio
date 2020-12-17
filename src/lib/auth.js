import client from './axiosCreate';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', {
    username,
    password,
  });

export const register = ({ username, password, name, phone, email }) =>
  client.post('/api/auth/register', {
    username,
    password,
    name,
    phone,
    email,
  });

export const check = () => client.get('/api/auth/check ');

export const logout = () => client.post('/api/auth/logout');
