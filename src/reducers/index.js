import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import postReducer from './postReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
    form : formReducer ,
    posts : postReducer ,
    user : userReducer ,
    auth : authReducer
})


