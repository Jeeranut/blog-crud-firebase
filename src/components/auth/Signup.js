import React, { Component } from 'react'
import { connect } from 'react-redux'

import { auth } from '../../firebase/firebase.utils'
import { signInGoogle , signUpWithEmailPassword , signOut } from '../../actions/auth'

import './Signin.css'

class Signup extends Component {
    state = {
        email : '',
        password : '',
        confirmPassword : '',
        displayName : '',
        firstName : '',
        lastName : ''
    }

    onChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    onSignupWithEmailPassword = async (e) => {
        e.preventDefault();
        
        console.log('Signup26 props : ' , this.props);
        if(this.state.password === this.state.confirmPassword){
            
            this.props.signUpWithEmailPassword(this.state , () => {
                this.props.history.push('/');
            })
            this.setState({
                email : '',
                password : '',
                confirmPassword : '',
                displayName : '',
                firstName : '',
                lastName : ''
            })
        } else {
            alert('Password is not match');
        }
    }

    onSigninWithGoogle = () => {
        this.props.signInGoogle();
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

                <form onSubmit={this.onSignupWithEmailPassword} className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: 'center'}}> Sign up</h1>
                    <div className="social-login">
                    <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign up with Facebook</span> </button>
                    <button onClick={this.onSigninWithGoogle} className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign up with Google+</span> </button>
                    </div>
                    <p style={{textAlign: 'center'}}> OR</p>
                    <input onChange={this.onChange} value={this.state.email} type="email" id="email" className="form-control" placeholder="Email address" required autoFocus autoComplete="off" />
                    <input onChange={this.onChange} value={this.state.displayName} type="text" id="displayName" className="form-control" placeholder="Display Name" required autoFocus  />
                    <input onChange={this.onChange} value={this.state.firstName} type="text" id="firstName" className="form-control" placeholder="First Name" required autoFocus />
                    <input onChange={this.onChange} value={this.state.lastName} type="text" id="lastName" className="form-control" placeholder="Last Name" required autoFocus />
                    <input onChange={this.onChange} value={this.state.password} type="password" id="password" className="form-control" placeholder="Password" required />
                    <input onChange={this.onChange} value={this.state.confirmPassword} type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required />
                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt" /> Sign up</button>
                    
                </form>
                {/* <button onClick={this.onSignOut} className="btn btn-danger" >Sign Out</button> */}
            <br />
            </div>
        )
    }
}

export default connect(null , { signInGoogle , signUpWithEmailPassword , signOut })(Signup);