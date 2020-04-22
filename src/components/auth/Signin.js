import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { 
    signInGoogle , 
    signInEmailPassword , 
    signOut 
} from '../../actions/auth'

import './Signin.css'

class Signin extends Component {
    state = {
        email : '',
        password : ''
    }

    onChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    componentDidMount(){
        //console.log('Signin : ' , this.props);
    }

    onSigninWithEmailPassword = (e) => {
        e.preventDefault();

        const { email , password } = this.state;

        this.props.signInEmailPassword({email , password},(path) => {
            this.props.history.push(path);
        });
    }

    onSigninWithGoogle = () => {
        this.props.signInGoogle((path) => {
            this.props.history.push(path)
        });
    }

    onSignOut = () => {
        this.props.signOut();
    }

    render() {
        return (
            <div id="logreg-forms">

                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />

                <form onSubmit={this.onSigninWithEmailPassword} className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: 'center'}}> Sign in</h1>
                    <div className="social-login">
                    <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign in with Facebook</span> </button>
                    <button onClick={this.onSigninWithGoogle} className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign in with Google+</span> </button>
                    </div>
                    <p style={{textAlign: 'center'}}> OR</p>
                    <input onChange={this.onChange} value={this.state.email} type="email" id="email" className="form-control" placeholder="Email address" required autoFocus autoComplete="off" />
                    <input onChange={this.onChange} value={this.state.password} type="password" id="password" className="form-control" placeholder="Password" required />
                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt" /> Sign in</button>
                    <a href="#" id="forgot_pswd">Forgot password?</a>
                    <hr />
                    {/* <p>Don't have an account!</p>  */}
                    <Link to="/signup" className="btn btn-primary" style={{padding : 'auto'}} ><i className="fas fa-user-plus" /> Sign up New Account</Link>
                </form>

                <form action="/reset/password/" className="form-reset">
                    <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required autoFocus />
                    <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                    <a href="#" id="cancel_reset"><i className="fas fa-angle-left" /> Back</a>
                </form>

                <button onClick={this.onSignOut} className="btn btn-danger" >Sign Out</button>
            <br />
            </div>
        )
    }
}

export default connect(null , { signInGoogle , signInEmailPassword , signOut })(Signin);