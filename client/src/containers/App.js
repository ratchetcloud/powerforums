import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import LoadingBar from 'react-redux-loading-bar';

import Loading from '../components/Loading';
import CurrentUserInfo from '../components/CurrentUserInfo';
import Error404 from '../components/Error404';
import * as authentication from '../utils/authentication';
import './App.css';


// Each routes are loaded lazy
const NodeView = Loadable({
    loader: () => import(/* webpackChunkName: "node_list" */ './NodeView'),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "user_login" */ './Login'),
    loading: Loading,
});
const UserSignUp = Loadable({
    loader: () => import(/* webpackChunkName: "user_signup" */ './SignUp'),
    loading: Loading,
});
const NodeEditor = Loadable({
    loader: () => import(/* webpackChunkName: "node_list" */ './NodeEditor'),
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
                    <Route path="/n/:nodeId/post" component={NodeEditor} />
                    <Route path="/n/:nodeId/edit" component={NodeEditor} />
                    <Route path="/n/:nodeId/" component={NodeView} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={UserSignUp} />
                    <Route component={Error404} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
    loadUserFromLocal: () => {
        dispatch(authentication.loadUserFromLocal());
    },
    logout: () => {
        dispatch(authentication.unsetAuthorization());
        // Force reload page for safe.
        // Currently there is no method to force reload component with action,
        // maybe unmount and then re-mount route component is solution to replace this method (TODO)
        location.reload();
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App))