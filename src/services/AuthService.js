import Axios from '../configs/ApiRequestConfig';
import { env } from '../configs/EnvironmentConfig';

const AuthService = {}

/******Funciones de Cambio de Estado en la Aplicacion*******/

//Login
AuthService.login = (email, password) => Axios({
  url: `${env.API_ENDPOINT_URL}/api/login`,
  method: 'POST',
  data: {
    email: email,
    password: password
  }
}).then(res => {
  return res;
}).catch(err => {
  return err.response;
});

/***********Funciones sin Cambio de Estado en la Aplicacion */

//Olvide mi contraseña
export async function forgotPassword(email) {
  try {
    const response = await Axios({
      url: `${env.API_ENDPOINT_URL}/api/forgot-password`,
      method: 'PUT',
      data: {
        email: email
      }
    })
    return response;
  }
  catch (e) {
    //console.log(e);
  }
}

//Recuperacion de Contraseña
export async function restorePasswordService(password,resetToken) {
  
  try {
    const response = await Axios({
      url: `${env.API_ENDPOINT_URL}/api/create-new-password/${resetToken}`,
      method: 'PUT',
      data: {
        password: password
      }
    })
    return response;
  }
  catch (e) {
    //console.log(e);
  }
}


export default AuthService;