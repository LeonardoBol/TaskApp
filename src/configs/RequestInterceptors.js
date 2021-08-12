import axios from 'axios'
import history from '../history'
import { notification } from 'antd';
import { env } from './EnvironmentConfig';
import { AUTH_TOKEN } from 'redux/constants/Auth';

//Url Api
const url = env.API_ENDPOINT_URL;//Localhost
const baseApiUrl = url + "/api";

const service = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'responseType': 'application/json;charset=utf-8',
    "Access-Control-Allow-Origin": url,
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers,Origin, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': '*'
  },
  timeout: 60000
})

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(config => {
  let loginRoute = baseApiUrl + "/login";
  const jwtToken = localStorage.getItem(AUTH_TOKEN);

  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = 'Bearer ' + jwtToken;
  }

  if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
    history.push(ENTRY_ROUTE)
    window.location.reload();
  }
  return config;
}, error => {
  // Do something with request error here
  notification.error({
    message: 'Error'
  })
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {
  return response.data
}, (error) => {

  let notificationParam = {
    message: ''
  }

  // Remove token and redirect 
  if (error.response.status === 400 || error.response.status === 403) {
    notificationParam.message = 'Autenticacion fallida'
    notificationParam.description = 'Por favor iniciar sesión otra vez'
    localStorage.removeItem(AUTH_TOKEN)
    history.push(ENTRY_ROUTE)
    window.location.reload();
  }

  if (error.response.status === 404) {
    notificationParam.message = 'Pagina no encontrada'
  }

  if (error.response.status === 500) {
    notificationParam.message = 'Ha ocurrido un error en el servidor'
  }

  if (error.response.status === 508) {
    notificationParam.message = 'Tiempo de ejecución expirado'
  }

  notification.error(notificationParam)

  return Promise.reject(error);
});

export default service