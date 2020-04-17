import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';

export default combineReducers({
    replaceMe : () => 'Hi there' ,
    posts : postReducer ,
    user : userReducer
})


