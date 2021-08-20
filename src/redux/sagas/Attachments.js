import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import {
    UPLOAD_ATTACHMENTS,
    GET_ATTACHMENTS,
    DELETE_ATTACHMENTS
} from 'redux/constants/Attachments'
import {
   uploadAttachmentSuccess,
   uploadAttachmentError,
   getAttachmentSuccess,
   getAttachmentError,
   deleteAttachmentSuccess,
   deleteAttachmentError,
   deleteAttachment
} from '../actions/Attachments';
import {notification} from 'antd';
import AttachmentsService from 'services/Attachments'


//Notification
const openNotificationWithIcon = (status, title, description) => {
    notification[status]({
        message: title,
        description:
            description,
    });
};

// POST -------------
export function* uploadAttachmentsSaga(action) {
    const attachment = action.payload;
    try {
        console.log(attachment);
        const response = yield call(AttachmentsService.uploadAttachment, attachment)
        yield put(uploadAttachmentSuccess(attachment)) 
    } catch (e) {
        console.log("Ocurrio un error en Sagas Attachment: ", e)
        yield put(uploadAttachmentError())
        openNotificationWithIcon('error', 'Operación fallida',
        'Ocurrió un error al subir el adjunto');
    }
}

export function* uploadAttachmentsData() {
    yield takeLatest(UPLOAD_ATTACHMENTS, uploadAttachmentsSaga)
}

// GET ---------------
export function* getAttachmentsSaga(action) {
    
    try {
        const response = yield call(AttachmentsService.getAttachment)
        yield put(getAttachmentSuccess(response)) 
    } catch (e) {
        console.log("Ocurrio un error en Sagas Attachment: ", e)
        yield put(getAttachmentError())
        openNotificationWithIcon('error', 'Operación fallida',
        'Ocurrió un error al listar los adjuntos');
    }
}

export function* getAttachmentsData() {
    yield takeLatest(GET_ATTACHMENTS, getAttachmentsSaga)
}

// DELETE --------------
export function* deleteAttachmentsSaga(action) {
    
    try {
        yield call(AttachmentsService.deleteAttachment, action.payload)
        yield put(deleteAttachmentSuccess()) 
    } catch (e) {
        console.log("Ocurrio un error en Sagas Attachment: ", e)
        yield put(deleteAttachmentError())
        openNotificationWithIcon('error', 'Operación fallida',
        'Ocurrió un error al eliminar el adjunto');
    }
}

export function* deleteAttachmentsData() {
    yield takeLatest(DELETE_ATTACHMENTS, deleteAttachmentsSaga)
}


export default function* rootSaga() {
    yield all([
        fork(uploadAttachmentsData),
        fork(getAttachmentsData),
        fork(deleteAttachmentsData)
    ]);
}