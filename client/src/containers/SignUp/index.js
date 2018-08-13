import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from "react-redux";
import { signUpEnded } from './actions';
import SignUpForm from './form'

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.signUpEnd();
    }

    render() {
        const { loading, success, error } = this.props;

        if (loading === false && success === false) {
            // If there user is not authenticated, show LoginForm
            return <SignUpForm error={error} />

        } else if (loading === true && success === false) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>

        } else {
            // sign up success
            return (
                <div>Sign up Success.<br />
                    <button>
                        <NavLink to="/">Go home</NavLink>
                    </button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    loading: state.signUp.loading,
    success: state.signUp.success,
    error: state.signUp.error,
});

const mapDispatchToProps = dispatch => ({
    signUpEnd: () => {
       return dispatch(signUpEnded());
    }
});


export default connect(mapStateToProps, mapDispatchToProps) (SignUp)
