import {
	CREATE_TASK_SUCCESS, CREATE_TASK_ERROR,
	GET_LIST_TASKS, CREATE_TASK, GET_LIST_TASKS_SUCCESS,
	UPDATE_TASK, UPDATE_TASK_SUCCESS, UPDATE_TASK_ERROR, INSERT_TASK,
	DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_ERROR,
	UPDATE_STATUS_TASK, UPDATE_STATUS_TASK_SUCCESS, UPDATE_STATUS_TASK_ERROR,
	GET_FILTERED_TASKS, POST_FILTERED_TASKS, REFRESH_STATUS_TASK
} from "redux/constants/Tasks";
import { AUTH_TOKEN } from '../constants/Auth';

const initialState = {
	loading: false,
	message: '',
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN),
	createdState: false,
	tasks: [],
	uploading: false,
	tasksFiltered: [],
	task: {
		subject: '',
		project: '',
		priority_id: '1',
		status_id: '1',
		user_id: '1',
		start_date: '',
		end_date: '',
		description: ''
	}
}

const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_TASKS:
			return {
				...state,
				loading: true,
			}
		case GET_LIST_TASKS_SUCCESS:
			return {
				...state,
				loading: false,
				tasks: action.tasks,
			}
		case CREATE_TASK:
			return {
				...state,
				uploading: true,
			}
		case CREATE_TASK_SUCCESS:
			return {
				...state,
				message: 'success',
				uploading: false,
			}
		case CREATE_TASK_ERROR:
			return {
				...state,
				message: 'fail',
				uploading: false,
			}
		case INSERT_TASK:
			return {
				...state,
				task: {
					...state.task,
					...action.payload
				}
			}
		case UPDATE_TASK:
			return {
				...state,
				uploading: true,
			}
		case UPDATE_TASK_SUCCESS:
			return {
				...state,
				uploading: false,
				task: action.payload,
			}
		case UPDATE_TASK_ERROR:
			return {
				...state,
				message: 'Error',
				loading: false,
			}
		case DELETE_TASK:
			return {
				...state,
				uploading: true,
			}
		case DELETE_TASK_SUCCESS:
			return {
				...state,
				uploading: false,
			}
		case DELETE_TASK_ERROR:
			return {
				...state,
				message: 'Error',
				loading: false,
			}
		case UPDATE_STATUS_TASK:
			return {
				...state,
				uploading: true,
			}
		case UPDATE_STATUS_TASK_SUCCESS:
			return {
				...state,
				uploading: false,
			}
		case UPDATE_STATUS_TASK_ERROR:
			return {
				...state,
				message: 'Error',
				loading: false,
			}
		case POST_FILTERED_TASKS:
			return {
				...state,
				loading: false,
				tasksFiltered: action.payload
			}
		case REFRESH_STATUS_TASK: 
		    return {
				...state,
				tasks: action.payload
			}
		default:
			return state;
	}
}

export default tasksReducer;