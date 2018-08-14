import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from "react-redux";
import { signUpEnded } from './actions';
import SignUpForm from './form'
import Loading from "../../components/Loading";

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
            return <SignUpForm error={error} />;

        } else if (loading === true && success === false) {
            // If authentication request is pending, return nothing.
            return <Loading />;

        } else {
            // sign up success
            return (
                <div className="container text-center mt-5">
                    <h2>Welcome!</h2>
                    <p>
                        Sign-up is done successfully.
                    </p>
                    <p>
                        <NavLink to="/login" role="button" className="btn btn-primary">
                            Login
                        </NavLink>
                        &nbsp;
                        <NavLink to="/" role="button" className="btn btn-secondary">
                            Go home
                        </NavLink>
                    </p>
                </div>
            );
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
