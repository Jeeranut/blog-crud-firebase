import _  from 'lodash';
import jsonPlaceHolder from '../apis/jsonplaceholder';

export const getPostsAndUsers = () => async (dispatch , getState) => {
    await dispatch(getPosts());

    // const userIds = _.uniq(_.map(getState().posts.posts , 'userId'));
    // userIds.forEach(id => dispatch(getUser(id)));

    _.chain(getState().posts.posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(getUser(id)))
    .value()
}

export const getPosts = () => async (dispatch) => {
    const response = await jsonPlaceHolder.get('/posts');

    dispatch({ type : 'GET_POSTS' , payload : response.data });
}

export const getUser = (id) => async (dispatch) => {
    //console.log(id);
    const response = await jsonPlaceHolder.get(`/users/${id}`);

    dispatch({type : 'GET_USER' , payload : response.data});
}

// export const getUser = (id) => (dispatch) => {
//     _getUser(id , dispatch);
// }
// const _getUser = _.memoize(async (id , dispatch) => {
//     //console.log(id);
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({type : 'GET_USER' , payload : response.data});
// })