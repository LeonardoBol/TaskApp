import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Users from './Users';
import Tasks from './Tasks'

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    Users(),
    Tasks()
  ]);
}
