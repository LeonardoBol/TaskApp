import {
  GET_LIST_USERS_START,
  GET_LIST_USERS_SUCCESS,
  CREATE_USER_START,
  UPDATE_USER_START,
  DELETE_USER_START,
  GET_AUTH_USER_START,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_ERROR

} 
from '../constants/Users';

  export const getListUser = (users) => {
    return {
      type: GET_LIST_USERS_START,
      users: users
    }
  };

  export const getListUserSuccess = (users) => {
    return {
      type: GET_LIST_USERS_SUCCESS,
      users: users
    }
  };

  export const getListUserError = () => {
    return {
      type: GET_LIST_USERS_SUCCESS,
      users: []
    }
  };

  export const createUser = (user) => {
    return {
      type: CREATE_USER_START,
      user: user
    }
  };

  export const updateUser = (user) => {
    return {
      type: UPDATE_USER_START,
      user: user
    }
  };

  export const deleteUser = (user) => {
    return {
      type: DELETE_USER_START,
      user: user
    }
  };

  

  export const getAuthUser = () => {
    return {
      type: GET_AUTH_USER_START
    }
  };

  export const getAuthUserSuccess = (auth_user) => {
    return {
      type: GET_AUTH_USER_SUCCESS,
      auth_user: auth_user
    }
  };

  export const getAuthUserError = () => {
    return {
      type: GET_AUTH_USER_ERROR,
      auth_user: null
    }
  };
