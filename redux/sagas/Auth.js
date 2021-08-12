import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess
} from "../actions/Auth";

import AuthService from 'services/AuthService';

//Login Sagas
export function* signInWithFBEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {
		try {
			const { email, password } = payload;
			const autentication = yield call(AuthService.login, email, password);
			
			if(autentication.data == "Unauthorized") {
				yield put(showAuthMessage("Usuario y/o contraseña incorrectos"));
			}
			else {
				if (autentication.data.message != undefined) {
					yield put(showAuthMessage(autentication.data.message));
				}
				else {
					localStorage.setItem(AUTH_TOKEN, autentication.data.token);
					yield put(authenticated(autentication.data.token));
				}
			}
		}
		catch (err) {
			console.log(err);
			yield put(showAuthMessage("Ha ocurrido un error en el servidor"));
		}
	});
}

//Cerrar Sesion
export function* signOut() {
	yield takeEvery(SIGNOUT, function* () {
		try {
			localStorage.removeItem(AUTH_TOKEN);
			yield put(signOutSuccess(undefined));
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(signInWithFBEmail),
		fork(signOut)
	]);
}
