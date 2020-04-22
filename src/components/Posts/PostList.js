import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPostsAndUsers } from '../../actions/index'
import UserHeader from './UserHeader'
import { firestore , convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchPosts } from '../../actions/post'

 class PostList extends Component {

    state = {
        posts : {}
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        // this.props.getPosts();
        //this.props.getPostsAndUsers();
        //console.log('postlist21 props : ' , this.props);

        const postRef = firestore.collection("posts");

        this.unsubscribeFromSnapshot = postRef.onSnapshot(async (snapshot) => {
            //console.log("Current data: ", convertCollectionSnapshotToMap(snapshot));           
            //console.log('PostList19 props : ' , this.props)

            const posts = await convertCollectionSnapshotToMap(snapshot);
            this.setState({posts : posts});
            //console.log(this.state)
            this.props.fetchPosts(this.state.posts);           
        });
        
    }

    componentWillUnmount(){
        this.unsubscribeFromSnapshot();
    }

    onDeleteClick = (e) => {
        //console.log('e from button : ' , e.target.id);

        const docRef = firestore.collection('posts').doc(e.target.id);
        docRef.delete().then(() => {
            console.log('Document successfully deleted !');
        }).catch((error) => {
            console.log('Error removing document : ' , error);
        })
    }

    renderList(){
        //console.log(this.props.posts.posts);
        if(this.props.posts.posts){
            //const posts = this.props.posts
            return this.props.posts.posts.map((post) => {
                //console.log(post);
                return (
                <div className="item" key={post.id} style={{padding : '10px'}}>
                    <i className="large middle aligned icon user" />
                    <div className="content" >
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                        <div>
                            <Link to={`/post/edit/${post.id}`} className="waves-effect waves-light btn">Edit</Link>
                            <button onClick={this.onDeleteClick} id={post.id} className="waves-effect deep-orange darken-2 btn" >Delete</button>
                        </div>
                        {/* <UserHeader userId={post.uid} /> */}
                    </div>
                </div>
                )
            })
        }
    }

    render() {
        return (
            <div className="ui relaxed divided list">
                {
                    this.renderList()
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts : state.posts
})

export default connect(mapStateToProps , {getPostsAndUsers , fetchPosts})(PostList);