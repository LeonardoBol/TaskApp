import {
    UPLOAD_ATTACHMENTS,
    UPLOAD_ATTACHMENTS_SUCCESS,
    UPLOAD_ATTACHMENTS_ERROR,
    UPLOAD_ATTACHMENTS_CREATE,
    UPLOAD_ATTACHMENTS_CREATE_SUCCESS,
    UPLOAD_ATTACHMENTS_CREATE_ERROR,
    GET_ATTACHMENTS,
    GET_ATTACHMENTS_SUCCESS,
    GET_ATTACHMENTS_ERROR,
    DELETE_ATTACHMENTS,
    DELETE_ATTACHMENTS_SUCCESS,
    DELETE_ATTACHMENTS_ERROR
} from '../constants/Attachments'

const initialState = {
    loadingAtt: false,
    attachment: null,
    attachments: []
}

const attachmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPLOAD_ATTACHMENTS:
            return {
                ...state,
                loadingAtt: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loadingAtt: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_ERROR:
            return {
                ...state,
                loadingAtt: false,
            }
            case UPLOAD_ATTACHMENTS_CREATE:
            return {
                ...state,
                loadingAtt: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_CREATE_SUCCESS:
            return {
                ...state,
                loadingAtt: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_CREATE_ERROR:
            return {
                ...state,
                loadingAtt: false,
            }
        case GET_ATTACHMENTS:
            return {
                ...state,
                loadingAtt: false,
            }
        case GET_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loadingAtt: false,
                attachments: action.payload
            }
        case GET_ATTACHMENTS_ERROR:
            return {
                ...state,
                loadingAtt: false,
            }
        case DELETE_ATTACHMENTS:
            return {
                ...state,
                loadingAtt: false,
            }
        case DELETE_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loadingAtt: false,
            }
        case DELETE_ATTACHMENTS_ERROR:
            return {
                ...state,
                loadingAtt: false,
            }

        default:
            return state;
    }
}

export default attachmentsReducer;