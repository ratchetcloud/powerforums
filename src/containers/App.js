import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import NodeList from './NodeList'
import RoleList from './RoleList'
import UserList from './UserList'
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'
import CurrentUserInfo from './CurrentUserInfo'
import * as userActions from "../actions/userActions";
import { history } from '../stores/store'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.handleGoHome = this.handleGoHome.bind(this);
    }

    componentWillMount() {
        this.props.loadUserFromLocal();
    }

    handleGoHome() {
        history.push("/", null);
    }

    render() {
        return (
            <div>
                <h1 onClick={this.handleGoHome}>OpenForum</h1>
                <CurrentUserInfo history={history} />

                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={NodeList} />
                        <Route path="/nodelist/:nodeId" component={NodeList} />
                        <Route path="/role" component={RoleList} />
                        <Route path="/user" component={UserList} />
                        <Route path="/login" component={UserLogin} />
                        <Route path="/register" component={UserRegister} />
                    </Switch>
                </ConnectedRouter>
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

export default connect(mapStateToProps, mapDispatchToProps) (App)