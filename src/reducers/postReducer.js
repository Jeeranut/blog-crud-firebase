import { 
    FETCH_POSTS_SUCCESSFUL ,
    FETCH_POSTS_FAILURE,
    FETCH_POST_SUCCESSFUL
 } from '../actions/types'

const initialState = {} ;

export default (state = initialState , action) => {
    switch(action.type){
        case FETCH_POSTS_SUCCESSFUL :
            //console.log(action.payload);
            return {
                ...state ,
                posts : action.payload
            };
        case FETCH_POST_SUCCESSFUL :
            return {
                ...state ,
                post : action.payload
            }
        default :
            return state ;
    }
}

// const initialState = {
//     isLoading : false ,
//     items : [] ,
//     item : {}
// }

// export default function(state = initialState , action) {
//     switch(action.type){
//         case FETCH_POST_REQUEST :
//             return {
//                 ...state,
//                 isLoading : true
//             }
//         case FETCH_POST_SUCCESS :
//             //console.dir('reducer : ' + action.payload );
//             return {
//                 ...state ,
//                 items : action.payload ,
//                 isLoading : false
//             }
//         case NEW_POST_SUCCESS :
//             return {
//                 ...state ,
//                 item : action.payload ,
//                 isLoading : false
//             }
//         // case NEW_POST_FAILURE :
//         //     return {
//         //         ...state ,
//         //         item : action.payload
//         //     }
//         default :
//             return state;
//     }

// }