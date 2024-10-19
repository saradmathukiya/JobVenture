const isDevelopment = import.meta.env.DEV;
const BASE_URL = isDevelopment ? "/api" : import.meta.env.VITE_BASE_URL;

export const USER_API_END_POINT = `${BASE_URL}/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/v1/company`;
