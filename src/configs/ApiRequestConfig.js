import { env } from './EnvironmentConfig';
import Axios from 'axios';
import { AUTH_TOKEN } from 'redux/constants/Auth';

const url = env.API_ENDPOINT_URL;//Localhost
const api_url = url + '/api';

export default Axios.create({
  baseURL: api_url,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN),
    'responseType': 'application/json;charset=utf-8',
    "Access-Control-Allow-Origin": url,
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers,Origin, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': '*'
  }
});