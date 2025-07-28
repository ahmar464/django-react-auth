// src/auth.js
export const saveUser = (accessToken, userRole) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userRole", userRole);
};

export const getUser = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");
  return token && role ? { token, role } : null;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};
