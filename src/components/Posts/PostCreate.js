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
        
        this.props.createPost(this.state);
    }

    render (){
        return (
            <div className="container" style={{marginTop : '10px'}}>
                <form onSubmit={this.onCreatePostClick} className="white" style={{padding : '10px'}}>
                    <h5 className="grey-text text-darken-3">Create Post</h5>
                    <div className="input-field">
                        <label htmlFor="title" >Title</label>
                        <input type="text" id="title" onChange={this.onChange} value={this.state.title} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" >Content</label>
                        <input type="text" name="firstname" id="content" onChange={this.onChange} value={this.state.content} />
                    </div>

                    <button className="btn waves-effect waves-light" type="submit" name="action">Posts
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null , { createPost })(PostCreate);