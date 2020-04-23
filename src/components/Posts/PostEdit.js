import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost , editPost } from '../../actions/post'


class PostForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            title : '',
            content : '' 
        }
    }


    componentDidMount(){
        //console.log('postform14 state : ' , this.state)
        //console.log('postform15 props : ' , this.props);
        this.props.fetchPost(this.props.match.params.id);
    }

    //componentWillReceiveProps(nextProps){
    //    if(nextProps.post){
    //        //this.setState({ title : nextProps.post.title , content : nextProps.post.content })
    //    }
    //}

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post) {
            console.log('postform34 props was changed :' , this.props);
            this.setState({ title : this.props.post.title , content : this.props.post.content })
        }
    }


    onChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    onEditClick = (e) => {
        e.preventDefault();

        const post = {
            id : this.props.match.params.id ,
            title : this.state.title ,
            content : this.state.content
        }

        this.props.editPost(post,(path) => {
            this.props.history.push(path);
        })

    }

    render() {

        //console.log('postform28 props : ',this.props);
        return (
            <div className="container" style={{marginTop : '10px'}}>
                <form onSubmit={this.onEditClick} className="ui form" style={{padding : '20px'}}>
                        <h2 className="ui header">Edit Post</h2>
                        <div className="field">
                            <label htmlFor="title" >Title</label>
                            <input type="text" id="title" onChange={this.onChange} value={this.state.title} />
                        </div>
                        <div className="field">
                            <label htmlFor="content" >Content</label>
                            <input type="text" id="content" onChange={this.onChange} value={this.state.content} />
                        </div>
                        <button className="ui green button right labeled icon" type="submit" name="action">Posts
                            <i className="comment icon"></i>
                        </button>    
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state , ownProps) => ({
    post : state.posts.post
})

export default connect(mapStateToProps , {fetchPost , editPost})(PostForm);



