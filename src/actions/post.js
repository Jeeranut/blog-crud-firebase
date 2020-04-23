import { 
    CREATE_POST , 
    CREATE_POST_SUCCESSFUL , 
    CREATE_POST_FAILURE ,
    FETCH_POSTS ,
    FETCH_POSTS_SUCCESSFUL ,
    FETCH_POSTS_FAILURE ,
    FETCH_POST ,
    FETCH_POST_SUCCESSFUL ,
    FETCH_POST_FAILURE,
    EDIT_POST,
    EDIT_POST_SUCCESSFUL ,
    DELETE_POST,
    DELETE_POST_SUCCESSFUL,
    DELETE_POST_FAILURE
} from "./types"
import { firestore } from '../firebase/firebase.utils'

export const fetchPosts = (posts) => (dispatch) => {
    dispatch({
        type : FETCH_POSTS_SUCCESSFUL ,
        payload : posts
    })
}

export const fetchPost = (id) => (dispatch) => {

    var docRef = firestore.collection("posts").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            dispatch({
                type : FETCH_POST_SUCCESSFUL ,
                payload : doc.data()
            })
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
            dispatch({
                type : FETCH_POST_FAILURE
            })
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        dispatch({
            type : FETCH_POST_FAILURE
        })
    });
}

export const editPost = (post , callback) => (dispatch) => {
    dispatch({
        type : EDIT_POST
    })

    const docRef = firestore.collection("posts").doc(post.id);

    docRef.update({
        title : post.title ,
        content : post.content 
    })
    .then(function(){
        //console.log("post61 Document successfully udpated !");
        dispatch({
            type : EDIT_POST_SUCCESSFUL
        });
        callback('/');
    })
    .catch(function(error){
        console.log('post65 Error updating document : ' ,error);    
    })
    
}

export const createPost = ({title , content} , callback) => (dispatch , getState) => {

    dispatch({
        type : CREATE_POST
    })

    //console.log('postaction14 getstate : ' , getState());
    const uid = getState().auth.user.id ;
    const createdAt = new Date();
    firestore.collection("posts").add({
        title ,
        content ,
        uid ,
        createdAt
    })
    .then(function(docRef) {
        //console.log("Document written with ID: ", docRef);
        dispatch({
            type : CREATE_POST_SUCCESSFUL 
        })
        callback('/');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        dispatch({
            type : CREATE_POST_FAILURE ,
            payload : error.message
        })
    });
}

export const deletePost = (id) => (dispatch) => {
    dispatch({
        type : DELETE_POST
    })

    const docRef = firestore.collection('posts').doc(id);
    docRef.delete().then(() => {
        console.log('Document successfully deleted !');
        dispatch({
            type : DELETE_POST_SUCCESSFUL
        })
    }).catch((error) => {
        console.log('Error removing document : ' , error);
        dispatch({
            type : DELETE_POST_FAILURE
        })
    })
}