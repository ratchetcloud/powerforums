import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import NodeList from './NodeList'
import RoleList from './RoleList'
import UserList from './UserList'
import UserLogin from './UserLogin'
import UserSignup from './UserSignup'
import CurrentUserInfo from './CurrentUserInfo'
import * as userActions from "../actions/userActions";
import { history } from '../stores/store'
import './App.css'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadUserFromLocal();
    }

    render() {
        return (
            <div>
                <h1>
                    <NavLink to="/">OpenForum</NavLink>
                </h1>
                <CurrentUserInfo history={history} />
                <Switch>
                    <Route exact path="/" component={NodeList} />
                    <Route path="/nodelist/:nodeId" component={NodeList} />
                    <Route path="/role" component={RoleList} />
                    <Route path="/user" component={UserList} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/signup" component={UserSignup} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    loadUserFromLocal: () => {
        let token = sessionStorage.getItem('jwtToken');
        if (!token || token === '')
            return;

        dispatch(userActions.meFromToken(token));
    },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App))