import React from 'react'
import { connect } from 'react-redux'
import Spinner from './Layouts/Spinner'

export default (ChildComponent) => {
    class ComposedComponent extends React.Component{

        // Our component just got rendered
        componentDidMount(){
            //console.log('requireAuth didMount : ' , this.props)
            if(!this.props.isLoading){
                this.shouldNavigateAway();
            }
        }

        // Our component just got updated
        componentDidUpdate(){
            if(!this.props.isLoading){
                this.shouldNavigateAway();
            }
        }


        shouldNavigateAway(){
            if(!this.props.isLogged){
                this.props.history.push('/signin');
            }
        }

        renderHelper(){
            if(this.props.isLoading){
                return (
                    <Spinner message="Loading..." />
                )
            } else {
                return <ChildComponent {...this.props} />;
            }
        }

        render(){
            return (
            //console.log(this.props);
                <div>
                    {this.renderHelper()}
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        isLogged : state.auth.isLogged ,
        isLoading : state.auth.isLoading
    })

    return connect(mapStateToProps)(ComposedComponent);
}