import React from 'react'
import { connect } from 'react-redux'

import { createPost } from '../../actions/post'

class PostCreate extends React.Component {

    state = {
        title : '' ,
        content : '' 
    }

    onChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    onCreatePostClick = (e) => {
        e.preventDefault();
        
        this.props.createPost(this.state,(path) => {
            this.props.history.push(path);
        });
    }

    render (){
        return (
            <div className="container" style={{marginTop : '10px'}}>
                <form onSubmit={this.onCreatePostClick} className="ui form" style={{padding : '20px'}}>
                    <h2 className="ui header">Create Post</h2>
                    <div className="field">
                        <label htmlFor="title" >Title</label>
                        <input type="text" id="title" onChange={this.onChange} value={this.state.title} placeholder="Title" />
                    </div>
                    <div className="field">
                        <label htmlFor="content" >Content</label>
                        <input type="text" name="firstname" id="content" onChange={this.onChange} value={this.state.content} placeholder="Content" />
                    </div>

                    <button className="ui green button right labeled icon" type="submit" name="action">Posts
                        <i className="comment icon"></i>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null , { createPost })(PostCreate);