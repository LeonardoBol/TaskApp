import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects';
import { AUTH_TOKEN } from '../constants/Auth';
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
} from '../constants/Users';

import { 
	getListUser,
	getListUserSuccess,
	getListUserError,
	getAuthUser,
	getAuthUserSuccess,
	getAuthUserError

} from "../actions/Users";
import UsersService from 'services/UsersService';

import {showAuthMessage} from "../actions/Auth";

//Listar Usuarios

export function* createUserStart() {
	yield takeEvery(CREATE_USER_START, function* (payload) {
		try
		{
			yield call(UsersService.createUser,payload.user);
			yield put(getListUser());
		}
		catch(err) 
		{
			yield put(getListUser());
		}
	});
}

export function* getUsersList() {
	yield takeEvery(GET_LIST_USERS_START, function* () {
		try
		{
			const users = yield call(UsersService.listUsers);

			if(users.status != undefined) //Ocurrio un error
			{
				if(users.status == 500)
				{
					yield put(getListUserError());
				}
			}
			else
			{
				yield put(getListUserSuccess(users));
			}
		}
		catch(err) 
		{
			yield put(getListUserError());
		}
	});
}

export function* getUsersListSuccess() {
	yield takeLatest(GET_LIST_USERS_SUCCESS, getUsersList);
}

export function* getUsersListError() {
	yield takeLatest(GET_LIST_USERS_ERROR, getUsersList);
}

export function* updateUserStart() {
	yield takeEvery(UPDATE_USER_START, function* (payload) {
		try
		{
			yield call(UsersService.updateUser,payload.user);
			yield put(getListUser());
		}
		catch(err) 
		{
			yield put(getListUser());
		}
	});
}

export function* deleteUserStart() {
	yield takeEvery(DELETE_USER_START, function* (payload) {
		try
		{
			yield call(UsersService.deleteUser,payload.user);
			yield put(getListUser());
		}
		catch(err) 
		{
			yield put(getListUser());
		}
	});
}

export function* getAuthUserStart() {
	yield takeEvery(GET_AUTH_USER_START, function* () {
		try
		{
			const auth_user = yield call(UsersService.getAuthUser);
			yield put(getAuthUserSuccess(auth_user));
		}
		catch(err) 
		{
			yield put(getAuthUserError());
		}
	});
}

export function* getAuthUserSuccessed() {
	yield takeLatest(GET_AUTH_USER_SUCCESS, getAuthUserStart);
}

export function* getAuthUserFailed() {
	yield takeLatest(GET_AUTH_USER_ERROR, getAuthUserStart);
}

export default function* rootSaga() {
	yield all([
		fork(createUserStart),
		fork(getUsersList),
		fork(getUsersListSuccess),
		fork(getUsersListError),
		fork(updateUserStart),
		fork(deleteUserStart),
		fork(getAuthUserStart),
		fork(getAuthUserSuccessed),
		fork(getAuthUserFailed),
	]);
}
