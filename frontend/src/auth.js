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
};
