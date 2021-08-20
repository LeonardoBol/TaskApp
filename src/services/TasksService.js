import Axios from '../configs/RequestInterceptors'

const TasksService = {}

//Login
TasksService.listTasks = task => Axios({
  url: '/tasks/' + task.id_auth_user,
  method: 'GET'
}).then(res => {return res;}).catch(err => {return err.response;});

//CREATE TASK
TasksService.createTasks = task => Axios({
  url: `/task`,
  method: 'POST',
  data: task
}).then(res => res ).catch(err => err.response);

//UPDATE TASK
TasksService.updateTasks = task => Axios({
  url: `/task/` + task.id,
  method: 'PUT',
  data: task
}).then(res => { return res; }).catch(err => { return err.response; });

//DELETE TASK
TasksService.deleteTasks = task => Axios({
  url: `/task`,
  method: 'DELETE',
  data: task
}).then(res => { return res; }).catch(err => { return err.response; });

//UPDATE STATUS TASK
TasksService.updateStatusTask = task => Axios({
  url: `/statustask/` + task.id,
  method: 'PUT',
  data: task
}).then(res => { return res; }).catch(err => { return err.response; });
export default TasksService;