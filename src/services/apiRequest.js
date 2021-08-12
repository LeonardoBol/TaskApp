import Axios from 'axios';
import axios from 'axios';

const url = 'http://127.0.0.1:5000';//Localhost
const api_url = url + '/api';
let token = "";

if (process.browser)
{
  token = localStorage.getItem('token');
}

export default Axios.create({
  baseURL: api_url,
  headers: {
    'Authorization': 'Bearer ' + token,
    'responseType': 'application/json;charset=utf-8',
    "Access-Control-Allow-Origin": url,
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers,Origin, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': '*'
  }
});

//-------------------------------------------

export async function saveTask(taskData){

  console.log(taskData);
  try{
  
      const response = await axios({
        url: `${api_url}/task`,
        method: 'POST',
        data: taskData
      })
      return response 
  }
  catch(e){
    console.log(e)
  }
}


export async function getTasks(){
  try{
  
      const response = await axios({
        url: `${api_url}/tasks`,
        method: 'GET'
      })
     
      const send = await response.data.tasks;
      return send;
  }
  catch(e){
    console.log(e)
  }
}
