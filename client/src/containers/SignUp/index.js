import React, { Component } from 'react';
import SignupUserForm from './signupUserForm'
import { NavLink } from 'react-router-dom'
import {connect} from "react-redux";
import { userSignupEnded } from '../../actions/userActions';


class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
        this.props.signupEnd() 
    }

    render(){
        const { loading, success } = this.props;
        if (loading === false && success === false) {
            // If there user is not authenticated, show LoginForm
            return (
                <div>
                    <SignupUserForm />
                </div>
            )

        } else if (loading === true && success === false) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>
        } else {
            // signup success
            return (
                <div>signup Success.<br />
                    <button>
                        <NavLink to="/">Go home</NavLink>
                    </button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    loading: state.user.signup.loading,
    success: state.user.signup.success,
});

const mapDispatchToProps = dispatch => ({
    signupEnd: () => {
       return dispatch(userSignupEnded())
    }
});


export default connect(mapStateToProps, mapDispatchToProps) (SignUp)
