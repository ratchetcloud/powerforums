import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions'

class CurrentUserInfo extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    handleLogin() {
        this.props.history.push('/login', null);
    }

    handleRegister() {
        this.props.history.push('/register', null);
    }

    render() {
        const { currentUser } = this.props;

        if (currentUser) {
            return (
                <div>
                    <span>Hi {currentUser.name}</span><br/>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            );

        }else{
            return (
                <div>
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleRegister}>Register</button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.authentication.currentUser
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(userActions.userLogout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserInfo)