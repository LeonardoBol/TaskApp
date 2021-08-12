import {
	GET_LIST_USERS_START,
	GET_LIST_USERS_SUCCESS,
	GET_LIST_USERS_ERROR,
	CREATE_USER_START,
	UPDATE_USER_START,
	DELETE_USER_START,
	GET_AUTH_USER_START,
	GET_AUTH_USER_SUCCESS,
	GET_AUTH_USER_ERROR
}

	from '../constants/Users';
import { AUTH_TOKEN } from '../constants/Auth';

const initState = {
	loading: false,
	message: '',
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN),
	createdState: false,
	users: [],
	user: null,
	auth_user: null,
	id_auth_user: null,
}

const usersReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_LIST_USERS_START:
			return {
				...state,
				loading: false,
				user: null
			}
		case GET_LIST_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.users
			}
		case GET_LIST_USERS_ERROR:
			console.log("Test");
			return {
				...state,
				loading: false,
				users: initState.users
			}
		case CREATE_USER_START:
			return {
				...state,
				loading: false,
				user: action.user
			}

		case UPDATE_USER_START:
			return {
				...state,
				loading: false,
				user: action.user
			}
		case DELETE_USER_START:
			return {
				...state,
				loading: false,
				user: action.user
			}
		case GET_AUTH_USER_START:
			return {
				...state
			}
		case GET_AUTH_USER_SUCCESS:
			return {
				...state,
				auth_user: action.auth_user.name,
				id_auth_user : action.auth_user.id
			}
		case GET_AUTH_USER_ERROR:
			return {
				...state,
				auth_user: null,
				id_auth_user: null
			}
		default:
			return state;
	}
}

export default usersReducer