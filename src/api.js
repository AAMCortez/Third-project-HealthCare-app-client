import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_HealthCare_API}/api`;

export const getAllPatients = () => {
   return axios.get(`${BASE_URL}/patients`);
};
export const getPatient = (id) => {
   return axios.get(`${BASE_URL}/patient/${id}`);
};
export const dischargePatient = (id) => {
   return axios.delete(`${BASE_URL}/patient/${id}`);
};
export const admitPatient = (patient) => {
   return axios.post(`${BASE_URL}/patient/admit`, patient)
};
export const login = (user) => {
   return axios.post(`${BASE_URL}/login`, user);
};
export const signup = (user) => {
   return axios.post(`${BASE_URL}/signup`, user);
};
export const verify = (token) => {
   return axios.get(`${BASE_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
   });
};
