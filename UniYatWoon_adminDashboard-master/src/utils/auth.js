export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  // keep parity with existing code which often stores `user`
  localStorage.removeItem('user');
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  setToken,
  getToken,
  removeToken,
  getAuthHeader,
};
