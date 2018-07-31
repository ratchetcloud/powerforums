import React, { Component } from 'react';
import LoginForm from '../forms/loginForm'
import {connect} from "react-redux";

class UserLogin extends Component {
    render(){
        const { currentUser, loading } = this.props;
        if (currentUser === false && loading === false) {
            // If there user is not authenticated, show LoginForm
            return <LoginForm />

        } else if (currentUser === false && loading === true) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>
        } else{
            // Already logined.
            this.props.history.push("/", null);
            return <div></div>
        }
    }
}


const mapStateToProps = state => ({
    loading: state.user.authentication.loading,
    currentUser: state.user.authentication.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (UserLogin)