export const API_URL = import.meta.env.VITE_API_URL;

const prefix = "/api/v1";
export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${prefix}/auth/signin`,
    SIGN_UP: `${prefix}/auth/signup`,
  },
};
