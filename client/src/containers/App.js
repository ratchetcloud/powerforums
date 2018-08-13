import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import LoadingBar from 'react-redux-loading-bar';

import Loading from '../components/Loading';
import CurrentUserInfo from '../components/CurrentUserInfo'
import * as loginActions from './Login/actions';
import './App.css'

// Each routes are loaded lazy
const NodeView = Loadable({
    loader: () => import(/* webpackChunkName: "node_list" */ './NodeView'),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "user_login" */ './Login'),
    loading: Loading,
});
const UserSignup = Loadable({
    loader: () => import(/* webpackChunkName: "user_signup" */ './SignUp'),
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
        const { currentUser } = this.props;

        return (
            <div className="app">
                <header>
                    <LoadingBar className="loading-bar" />
                    <div className="container-fluid">
                        <CurrentUserInfo currentUser={currentUser} onLogout={this.props.logout} />
                        <div className="logo-wrap">
                            <NavLink to="/">
                                <h1 className="logo"><span>PowerForums</span></h1>
                            </NavLink>
                        </div>
                    </div>
                </header>
                <Switch>
                    <Route exact path="/" component={NodeView} />
                    <Route path="/n/:nodeId" component={NodeView} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={UserSignup} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.login.currentUser,
});

const mapDispatchToProps = dispatch => ({
    loadUserFromLocal: () => {
        let token = sessionStorage.getItem('jwtToken');
        if (!token || token === '')
            return;

        dispatch(loginActions.meFromToken(token));
    },
    logout: () => {
        dispatch(loginActions.logout());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App))