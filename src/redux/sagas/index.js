import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Users from './Users';
import Tasks from './Tasks';
import Attachments from './Attachments';

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    Users(),
    Tasks(),
    Attachments()
  ]);
}
