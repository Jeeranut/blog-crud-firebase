import React from 'react'
import { Link , BrowserRouter , Route , Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { auth , createUserProfileDoc } from '../firebase/firebase.utils';
import { authSignin , authSigninRequest , authSigninFailure } from '../actions/auth'
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Home from './Layouts/Home';
import Header from './Layouts/Header';
import PostCreate from './Posts/PostCreate';
import PostForm from './Posts/PostEdit';

class App extends React.Component {

    constructor(props){
        super(props);

        console.log('constructor props : ' , props)
        props.authSigninRequest();
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async (user) => {
            //console.log('beginning of authchange')
            if(user){
                //console.warn("This is from App.js line 16 : ",user);
                const userRef = await createUserProfileDoc(user);
                
                //console.log('before snapshot')
                userRef.onSnapshot((snapShot) => {
                    //console.warn("From App.js onSnapshot data : " , snapShot);
                    this.setState({ 
                        currentUser : {
                            id : snapShot.id ,
                            ...snapShot.data()
                        }
                    })
                    //console.warn('App35  : ' , this.state.currentUser);
                    this.props.authSignin(this.state.currentUser);
                })
            } else {
                console.warn(user);
                this.props.authSigninFailure();
                this.setState({ currentUser : user });
            }
        })

        this.state = {
            currentUser : null
        }
    }
    

    unsubscribeFromAuth = null;

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }

    render(){
        return (
            <BrowserRouter >
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/post/create" exact component={PostCreate} />
                    <Route path="/post/edit/:id" exact component={PostForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect(null , {authSignin , authSigninRequest , authSigninFailure})(App);
