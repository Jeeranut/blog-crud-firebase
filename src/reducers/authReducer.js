import { 
    SIGN_IN_GOOGLE_SUCCESSFUL , 
    SIGN_IN_GOOGLE_FAILURE ,
    SIGN_IN_LOCAL_SUCCESSFUL ,
    SIGN_IN_LOCAL_FAILURE ,
    SIGN_OUT_SUCCESSFUL ,
    SIGN_UP_LOCAL_SUCCESSFUL ,
    SIGN_UP_LOCAL_FAILURE ,
    AUTH_SIGNIN ,
    AUTH_SIGNIN_REQUEST ,
    AUTH_SIGNIN_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    user : {} ,
    err : '' ,
    isLogged : false ,
    isLoading : false
}

export default function(state = INITIAL_STATE , action){
    switch(action.type){
        case SIGN_IN_GOOGLE_SUCCESSFUL :
        case SIGN_IN_LOCAL_SUCCESSFUL :
        case SIGN_UP_LOCAL_SUCCESSFUL :
        case AUTH_SIGNIN :
            return {
                ...state ,
                user : action.payload ,
                isLogged : true ,
                isLoading : false
            }
        case SIGN_IN_GOOGLE_FAILURE :
        case SIGN_IN_LOCAL_FAILURE :
        case SIGN_OUT_SUCCESSFUL :
        case SIGN_UP_LOCAL_FAILURE :
            return {
                ...state ,
                user : {} ,
                err : action.payload ,
                isLogged : false
            }
        case AUTH_SIGNIN_REQUEST :
            return {
                ...state ,
                isLoading : true
            }
        case AUTH_SIGNIN_FAILURE :
            return {
                ...state ,
                isLoading : false
            }
        default :
            return state;
    }
}