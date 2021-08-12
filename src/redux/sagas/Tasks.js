import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects';
import {
    CREATE_TASK, GET_LIST_TASKS, GET_LIST_TASKS_SUCCESS,
    CREATE_TASK_SUCCESS, CREATE_TASK_ERROR, UPDATE_TASK_SUCCESS, UPDATE_TASK_ERROR, UPDATE_TASK,
    DELETE_TASK, UPDATE_STATUS_TASK
} from 'redux/constants/Tasks'
import {
    getTasksList,
    getTasksListSuccess,
    updateTaskSuccess,
    updateTaskError,
    deleteTaskSuccess,
    deleteTaskError,
    updateStatusTaskSuccess,
    updateStatusTaskError
} from '../actions/Tasks';
import {notification} from 'antd';
import TasksService from 'services/TasksService'
//Notification
const openNotificationWithIcon = (status, title, description) => {
    notification[status]({
        message: title,
        description:
            description,
    });
};
//----

export function* getTasksListSaga(action) {

    yield takeEvery(GET_LIST_TASKS, function* () {
        const tasks = yield call(TasksService.listTasks)
        yield put(getTasksListSuccess(tasks));
    });
}

export function* getListTasksSuccess() {
    yield takeLatest(GET_LIST_TASKS_SUCCESS, getTasksListSaga);
}

export function* createTaskSaga(action) {
    const task = action.payload;
    try {
        const response = yield call(TasksService.createTasks,task)
        yield put({type: CREATE_TASK_SUCCESS, task}) 
        openNotificationWithIcon('success', 'Operación exitosa',
        'Se ha creado la tarea con exito')
    } catch (e) {
        console.log("Ocurrio un error en Sagas Task: ", e)
        yield put({type: CREATE_TASK_ERROR, e})
        openNotificationWithIcon('error', 'Operación fallida',
        'Ocurrió un error  al crear la tarea');
    }
}

export function* createTaskData() {
    yield takeLatest(CREATE_TASK, createTaskSaga)
}

export function* updateTaskSaga(action) {
    const task = action.payload;
    try {
        yield call(TasksService.updateTasks, task)
        yield put(updateTaskSuccess(task))
    } catch (e) {
        console.log("Ocurrio un error en Sagas Task: ", e)
        yield put(updateTaskError())
    }
}

export function* updateTaskData() {
    yield takeLatest(UPDATE_TASK, updateTaskSaga)
}

export function* deleteTaskSaga(action) {
    const task = action.payload;
    try {
        yield call(TasksService.deleteTasks, task)
        yield put(deleteTaskSuccess(task))
    } catch (e) {
        console.log("Ocurrio un error en Sagas Task: ", e)
        yield put(deleteTaskError())
    }
}

export function* deleteTaskData() {
    yield takeLatest(DELETE_TASK, deleteTaskSaga)
}


export function* updateStatusTaskSaga(action) {
    const task = action.payload;
    try {
        yield call(TasksService.updateStatusTask, task)
        yield put(updateStatusTaskSuccess(task))
    } catch (e) {
        console.log("Ocurrio un error en Sagas Task: ", e)
        yield put(updateStatusTaskError())
    }
}

export function* updateStatusTaskData() {
    yield takeLatest(UPDATE_STATUS_TASK, updateStatusTaskSaga)
}


export default function* rootSaga() {
    yield all([
        fork(getTasksListSaga),
        fork(getListTasksSuccess),
        fork(createTaskData),
        fork(updateTaskData),
        fork(deleteTaskData),
        fork(updateStatusTaskData)
    ]);
}

