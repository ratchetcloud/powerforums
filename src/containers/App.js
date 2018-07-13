import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import NodeList from './NodeList'
import RoleList from './RoleList'
import UserList from './UserList'
import CurrentUserInfo from './CurrentUserInfo'
import LoginForm from '../forms/loginForm'
import * as userActions from "../actions/userActions";
import { history } from '../stores/store'
import './App.css'

// Jihye: add User Register
import UserRegister from './UserRegister'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadUserFromLocal();
    }

    render() {
        const { currentUser, loading } = this.props;

        if (currentUser === false && loading === false) {
            // If there user is not authenticated, show LoginForm (whether error or not)
            return <LoginForm />

        } else if (currentUser === false && loading === true) {
            // If authentication request is pending, return nothing.
            return <div>Loading..</div>

        } else {
            return (
                    <div>
                        <h1>React/Redux User Interface</h1>
                        <CurrentUserInfo />

                        <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={NodeList} />
                            <Route path="/nodelist/:nodeId" component={NodeList} />
                            <Route path="/role" component={RoleList} />
                            <Route path="/user" component={UserList} />
                            <Route path="/register" component={UserRegister} />
                        </Switch>
                        </ConnectedRouter>
                    </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    loading: state.user.authentication.loading,
    currentUser: state.user.authentication.currentUser,
    //token: state.user.authentication.token,
    //error: state.user.authentication.error
})

const mapDispatchToProps = dispatch => ({
    loadUserFromLocal: () => {
        let token = sessionStorage.getItem('jwtToken');
        if (!token || token === '')
            return;

        dispatch(userActions.meFromToken(token));
    },
})

export default connect(mapStateToProps, mapDispatchToProps) (App)