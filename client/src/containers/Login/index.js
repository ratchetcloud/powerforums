import React, { Component } from 'react';
import LoginForm from './loginForm'
import {connect} from "react-redux";

class Login extends Component {
    render() {
        const { currentUser, loading, error } = this.props;

        if (currentUser === false && loading === false) {
            // If there user is not authenticated, show LoginForm
            return <LoginForm error={error} />;

        }else if (currentUser === false && loading === true) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>;

        }else {
            // Already logged-in.
            location.replace('/');
            return <div />;
        }
    }
}


const mapStateToProps = state => ({
    loading: state.login.loading,
    currentUser: state.login.currentUser,
    error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (Login)