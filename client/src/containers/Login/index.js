import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './loginForm';
import {connect} from 'react-redux';
import * as userActions from './actions';

class Login extends Component {
    render() {
        const { currentUser, loading, error, login } = this.props;

        if (currentUser === false && loading === false) {
            // If there user is not authenticated, show LoginForm
            return <LoginForm loginError={error} login={login} />;

        }else if (currentUser === false && loading === true) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>;

        }else {
            // Already logged-in.
            return <Redirect to='/' />;
        }
    }
}


const mapStateToProps = state => ({
    loading: state.login.loading,
    currentUser: state.login.currentUser,
    error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(userActions.login(username, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (Login)