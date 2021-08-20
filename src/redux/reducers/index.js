import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Users from './Users';
import Tasks from './Tasks'
import Attachments from './Attachments'

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    usersReducer : Users,
    tasksReducer : Tasks,
    attachmentsReducer: Attachments
});

export default reducers;