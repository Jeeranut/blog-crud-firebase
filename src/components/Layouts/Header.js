import React , { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './HeaderStyle.css'
import { signOut } from '../../actions/auth'

class Header extends React.Component {

    onSignoutClick = () => {
        this.props.signOut(()=> {
            console.log('Header12 : ',this.props);
        })
    }

    componentDidMount(){
        //console.log('Header 17 : ' , this.props);
    }

    renderLinks(){
        //console.log(this.props.authenticated);
        if(this.props.isLogged){
            return (
                <Fragment>
                    <Link className="ui inverted button" to="/post/create" >Create Post</Link>
                    <button onClick={this.onSignoutClick} className="ui inverted button" to="/signout" style={{background : 'red'}} >
                        Sign Out
                    </button>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Link className="ui inverted button" to="/signin" >Sign In</Link>
                    <Link className="ui inverted button" to="/signup" >Sign Up</Link>
                </Fragment>
            )
        }
    }

    render(){
        return (
            <div className="ui containter">
                <div className="ui large secondary inverted pointing menu"
                    style={{padding : '10px' , background : 'black'}}
                >
                    <Link className="ui inverted button" to="/" >Logo</Link>
                    <div className="right menu">
                        {this.renderLinks()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogged : state.auth.isLogged
})

export default connect(mapStateToProps, {signOut})(Header);