import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions'

class CurrentUserInfo extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div>
                <span>Hi {currentUser.name}</span><br />
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
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