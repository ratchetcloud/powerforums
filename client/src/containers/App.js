import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Loadable from 'react-loadable';
import CurrentUserInfo from './CurrentUserInfo'
import * as userActions from '../actions/userActions';
import { history } from '../stores/store'
import './App.css'

const Loading = () => <div>Loading...</div>;

// Each routes are loaded lazy
const NodeList = Loadable({
   loader: () => import(/* webpackChunkName: "node_list" */ './NodeList'),
   loading: Loading,
});
const RoleList = Loadable({
    loader: () => import(/* webpackChunkName: "role_list" */ './RoleList'),
    loading: Loading,
});
const UserList = Loadable({
    loader: () => import(/* webpackChunkName: "user_list" */ './UserList'),
    loading: Loading,
});
const UserLogin = Loadable({
    loader: () => import(/* webpackChunkName: "user_login" */ './UserLogin'),
    loading: Loading,
});
const UserSignup = Loadable({
    loader: () => import(/* webpackChunkName: "user_signup" */ './UserSignup'),
    loading: Loading,
});


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
                    <NavLink to="/">PowerForums</NavLink>
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