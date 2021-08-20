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

const initialState = {
    loading: false,
    attachment: null,
    attachments: []
}

const attachmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPLOAD_ATTACHMENTS:
            return {
                ...state,
                loading: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                attachment: action.payload
            }
        case UPLOAD_ATTACHMENTS_ERROR:
            return {
                ...state,
                loading: false,
            }
        case GET_ATTACHMENTS:
            return {
                ...state,
                loading: false,
            }
        case GET_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                attachments: action.payload
            }
        case GET_ATTACHMENTS_ERROR:
            return {
                ...state,
                loading: false,
            }
        case DELETE_ATTACHMENTS:
            return {
                ...state,
                loading: false,
            }
        case DELETE_ATTACHMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case DELETE_ATTACHMENTS_ERROR:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}

export default attachmentsReducer;