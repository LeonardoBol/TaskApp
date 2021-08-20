import Axios from '../configs/RequestInterceptors'

const UsersService = {}

//Listar Usuarios
UsersService.listUsers = () => Axios({
  url: '/users',
  method: 'get'
}).then(res => { return res; }).catch(err => { return err.response; });

//CrearUsuario
UsersService.createUser = (user) => Axios({
  url: '/users',
  method: 'post',
  data: user
}).then(res => { return res; }).catch(err => { return err.response; });

//Actualizar Usuario
UsersService.updateUser = (user) => Axios({
  url: '/users/' + user.id,
  method: 'put',
  data: user
}).then(res => { return res; }).catch(err => { return err.response; });

//Eliminar Usuario
UsersService.deleteUser = (user) => Axios({
  url: '/users/' + user.id,
  method: 'delete'
}).then(res => { return res; }).catch(err => { return err.response; });

//Traer mi Usuario Autenticado
UsersService.getAuthUser = () => Axios({
  url: '/auth-user',
  method: 'get'
}).then(res => { return res; }).catch(err => { return err.response; });


export default UsersService