// src/auth.js
export const saveUser = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role ? { token, role } : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
