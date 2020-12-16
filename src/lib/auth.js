import client from './axiosCreate';

export const login = ({ id, password }) =>
  client.post('/api/auth/login', {
    id,
    password,
  });

export const register = ({ id, password, username, phone, email }) =>
  client.post('/api/auth/register', {
    id,
    password,
    username,
    phone,
    email,
  });

export const check = () => client.get('/api/auth/check ');

export const logout = () => client.post('/api/auth/logout');
