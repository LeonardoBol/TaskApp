import {
    UPLOAD_ATTACHMENTS,
    UPLOAD_ATTACHMENTS_SUCCESS,
    UPLOAD_ATTACHMENTS_ERROR,
    GET_ATTACHMENTS,
    GET_ATTACHMENTS_SUCCESS,
    GET_ATTACHMENTS_ERROR,
    DELETE_ATTACHMENTS,
    DELETE_ATTACHMENTS_SUCCESS,
    DELETE_ATTACHMENTS_ERROR
} from '../constants/Attachments'


export const uploadAttachment = attachment => {
    return {
        type: UPLOAD_ATTACHMENTS,
        payload: attachment
    }   
};

export const uploadAttachmentSuccess = attachment => {
    return {
        type: UPLOAD_ATTACHMENTS_SUCCESS,
        payload: attachment
    }   
};

export const uploadAttachmentError = () => {
    return {
        type: UPLOAD_ATTACHMENTS_ERROR,
    }   
};


export const getAttachment = attachment => {
    return {
        type: GET_ATTACHMENTS,
        payload: attachment
    }   
};

export const getAttachmentSuccess = attachment => {
    return {
        type: GET_ATTACHMENTS_SUCCESS,
        payload: attachment
    }   
};

export const getAttachmentError = () => {
    return {
        type: GET_ATTACHMENTS_ERROR,
    }   
};

export const deleteAttachment = attachment => {
    return {
        type: DELETE_ATTACHMENTS,
        payload: attachment
    }   
};

export const deleteAttachmentSuccess = attachment => {
    return {
        type: DELETE_ATTACHMENTS_SUCCESS,
        payload: attachment
    }   
};

export const deleteAttachmentError = () => {
    return {
        type: DELETE_ATTACHMENTS_ERROR,
    }   
};
