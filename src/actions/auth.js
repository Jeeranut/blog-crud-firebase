import { 
    SIGN_IN_GOOGLE_SUCCESSFUL , 
    SIGN_IN_GOOGLE , 
    SIGN_IN_GOOGLE_FAILURE ,
    SIGN_IN_LOCAL ,
    SIGN_IN_LOCAL_SUCCESSFUL ,
    SIGN_IN_LOCAL_FAILURE ,
    SIGN_OUT ,
    SIGN_OUT_SUCCESSFUL ,
    SIGN_OUT_FAILURE ,
    SIGN_UP_LOCAL ,
    SIGN_UP_LOCAL_SUCCESSFUL ,
    SIGN_UP_LOCAL_FAILURE ,
    AUTH_SIGNIN ,
    AUTH_SIGNIN_REQUEST ,
    AUTH_SIGNIN_FAILURE
} from '../actions/types' ;
import { signInWithGoogle , 
    signInWithEmailPassword , 
    signUpWithEmailAndPassword
} from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';

export const authSignin = (credentials) => (dispatch) => {
    dispatch({
        type : AUTH_SIGNIN ,
        payload : credentials
    })
}

export const authSigninRequest = () => (dispatch) => {
    dispatch({
        type : AUTH_SIGNIN_REQUEST
    })
}

export const authSigninFailure = () => (dispatch) => {
    dispatch({
        type : AUTH_SIGNIN_FAILURE
    })
}

export const signInGoogle = (callback) => async (dispatch) => {

    dispatch ({
        type : SIGN_IN_GOOGLE
    })

    const { err , user } = await signInWithGoogle();

    if(err){
        dispatch({
            type : SIGN_IN_GOOGLE_FAILURE ,
            payload : err
        })
    } else {
        // console.log("this is user detail :" , user.uid)
        dispatch({
            type : SIGN_IN_GOOGLE_SUCCESSFUL ,
            payload : {
                uid : user.uid ,
                displayName : user.displayName ,
                email : user.email ,
                photoURL : user.photoURL
            }
        })

        callback('/');
    }
}

export const signInEmailPassword = ({email , password} , callback) => async (dispatch) => {

    dispatch({
        type : SIGN_IN_LOCAL
    })

    const { err , user } = await signInWithEmailPassword({email , password});
    if (err){
        dispatch({
            type : SIGN_IN_LOCAL_FAILURE ,
            payload : err
        })
    } else if (user) {
        dispatch({
            type : SIGN_IN_LOCAL_SUCCESSFUL ,
            payload : {
                uid : user.uid ,
                displayName : user.displayName ,
                email : user.email ,
                photoURL : user.photoURL
            }
        })
        callback('/');
    }
    //history.push('/');
}

export const signUpWithEmailPassword = (credentials , callback) => async (dispatch) => {
    dispatch({
        type : SIGN_UP_LOCAL
    })
    const {err , user } = await signUpWithEmailAndPassword(credentials);
    console.log('auth75 : ' ,user);
    if(err){
        dispatch({
            type : SIGN_UP_LOCAL_FAILURE ,
            payload : err
        })
    }
    else if (user) {
        dispatch({
            type : SIGN_UP_LOCAL_SUCCESSFUL ,
            payload : {
                uid : user.uid ,
                displayName : user.displayName ,
                email : user.email ,
                photoURL : user.photoURL
            }
        })
        callback();
    }
    //console.log('auth.js 65 data : ' , credentials);

    // const { email , password , firstName , lastName , displayName } = credentials;
    // try {
    //     const { user } = await auth.createUserWithEmailAndPassword(email , password);
    //     console.log("Signup.js 29 user : " , user);
    //     await createUserProfileDoc(user , {firstName , lastName , displayName});

    //     dispatch({
    //         type : SIGN_UP_LOCAL_SUCCESSFUL ,
    //         payload : {
    //             uid : user.uid ,
    //             displayName : user.displayName ,
    //             email : user.email ,
    //             photoURL : user.photoURL
    //         }
    //     })
    // } catch (error) {
    //     console.error("Singup.js 39 error : " , error.message)
    // }
}

export const signOut = (callback) => (dispatch) => {
    dispatch({
        type : SIGN_OUT
    })
    try {
        auth.signOut();
        dispatch({
            type : SIGN_OUT_SUCCESSFUL
        })
    } catch (error) {
        console.log('auth138 : ' , error.message);
        dispatch({
            type : SIGN_OUT_FAILURE ,
            payload : error.message
        })
    }
    //history.push('/');
}