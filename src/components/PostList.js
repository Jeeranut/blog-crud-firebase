import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  getPostsAndUsers } from '../actions/index'
import UserHeader from './UserHeader'

 class PostList extends Component {
    componentDidMount(){
        // this.props.getPosts();
        this.props.getPostsAndUsers();
    }

    renderList(){
        //console.log(this.props.posts);
        //const posts = this.props.posts
        return this.props.posts.map((post) => {
            return (
            <div className="item" key={post.id}>
                <i className="large middle aligned icon user" />
                <div className="content" >
                    <div className="description">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                    <UserHeader userId={post.userId} />
                </div>
            </div>
            )
        })
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
    posts : state.posts.posts
})

export default connect(mapStateToProps , {getPostsAndUsers})(PostList);