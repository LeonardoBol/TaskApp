import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Users from './Users';
import Tasks from './Tasks'

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    usersReducer : Users,
    tasksReducer : Tasks
});

export default reducers;