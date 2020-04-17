import React, { Component } from 'react'
import './Signin.css'

export default class Signin extends Component {
    render() {
        return (
            <div id="logreg-forms">

                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
                
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: 'center'}}> Sign in</h1>
                    <div className="social-login">
                    <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign in with Facebook</span> </button>
                    <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign in with Google+</span> </button>
                    </div>
                    <p style={{textAlign: 'center'}}> OR</p>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt" /> Sign in</button>
                    <a href="#" id="forgot_pswd">Forgot password?</a>
                    <hr />
                    {/* <p>Don't have an account!</p>  */}
                    <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus" /> Sign up New Account</button>
                </form>
                <form action="/reset/password/" className="form-reset">
                    <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required autofocus />
                    <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                    <a href="#" id="cancel_reset"><i className="fas fa-angle-left" /> Back</a>
                </form>
                <form action="/signup/" className="form-signup">
                    <div className="social-login">
                    <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign up with Facebook</span> </button>
                    </div>
                    <div className="social-login">
                    <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign up with Google+</span> </button>
                    </div>
                    <p style={{textAlign: 'center'}}>OR</p>
                    <input type="text" id="user-name" className="form-control" placeholder="Full name" required autofocus />
                    <input type="email" id="user-email" className="form-control" placeholder="Email address" required autofocus />
                    <input type="password" id="user-pass" className="form-control" placeholder="Password" required autofocus />
                    <input type="password" id="user-repeatpass" className="form-control" placeholder="Repeat Password" required autofocus />
                    <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-user-plus" /> Sign Up</button>
                    <a href="#" id="cancel_signup"><i className="fas fa-angle-left" /> Back</a>
                </form>
            <br />
            </div>
        )
    }
}
