import {
  CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_SUCCESS, GET_LIST_TASKS,
  GET_LIST_TASKS_SUCCESS, UPDATE_TASK_ERROR, UPDATE_TASK_SUCCESS, UPDATE_TASK, INSERT_TASK,
  DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_ERROR, UPDATE_STATUS_TASK, 
  UPDATE_STATUS_TASK_SUCCESS, UPDATE_STATUS_TASK_ERROR
} from "redux/constants/Tasks";

export const getTasksList = (tasks) => {
  return {
    type: GET_LIST_TASKS,
    tasks: tasks
  };
}

export const getTasksListSuccess = (tasks) => {
  return {
    type: GET_LIST_TASKS_SUCCESS,
    tasks: tasks
  }
};

export const createTask = task => {
  return {
    type: CREATE_TASK,
    payload: task
  }
}

export const createTaskSuccess = task => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: task,
  }
}

export const createTaskError = () => {
  return {
    type: CREATE_TASK_ERROR,
  }
}


export const updateTask = task => {
  return {
    type: UPDATE_TASK,
    payload: task
  }
}

export const updateTaskSuccess = task => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: task,
  }
}

export const updateTaskError = () => {
  return {
    type: UPDATE_TASK_ERROR,
  }
}

export const insertTask = task => {
  return {
    type: INSERT_TASK,
    payload: task
  }
}

export const deleteTask = task => {
  return {
    type: DELETE_TASK,
    payload: task
  }
}

export const deleteTaskSuccess = task => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: task
  }
}

export const deleteTaskError = () => {
  return {
    type: DELETE_TASK_ERROR,
  }
}

export const updateStatusTask = task => {
  return {
    type: UPDATE_STATUS_TASK,
    payload: task
  }
}

export const updateStatusTaskSuccess = task => {
  return {
    type: UPDATE_STATUS_TASK_SUCCESS,
    payload: task
  }
}

export const updateStatusTaskError = () => {
  return {
    type: UPDATE_STATUS_TASK_ERROR,
  }
}