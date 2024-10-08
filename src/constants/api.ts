export const API_URL = import.meta.env.VITE_API_URL;

const prefix = "/api/v1";
export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${prefix}/auth/signin`,
    SIGN_UP: `${prefix}/auth/signup`,
  },
  BIODATA: {
    GET_LIST_ADMIN: `${prefix}/biodata/admin`,
    DELETE_ADMIN: `${prefix}/biodata/admin/:id`,
    GET_DETAIL_ADMIN: `${prefix}/biodata/admin/:id`,
    UPDATE_ADMIN: `${prefix}/biodata/admin/update/:id`,
    GET_DETAIL_USER: `${prefix}/biodata/detail`,
    UPDATE_USER: `${prefix}/biodata/update`,
  },
  EDUCATION: {
    GET_LIST: `${prefix}/education/:id`,
    GET_DETAIL: `${prefix}/education/detail/:id`,
    CREATE: `${prefix}/education/:id`,
    UPDATE: `${prefix}/education/detail/:id`,
    DELETE: `${prefix}/education/detail/:id`,
  },
  TRAINING: {
    GET_LIST: `${prefix}/training/:id`,
    GET_DETAIL: `${prefix}/training/detail/:id`,
    CREATE: `${prefix}/training/:id`,
    UPDATE: `${prefix}/training/detail/:id`,
    DELETE: `${prefix}/training/detail/:id`,
  },
  JOB: {
    GET_LIST: `${prefix}/job/:id`,
    GET_DETAIL: `${prefix}/job/detail/:id`,
    CREATE: `${prefix}/job/:id`,
    UPDATE: `${prefix}/job/detail/:id`,
    DELETE: `${prefix}/job/detail/:id`,
  },
};
