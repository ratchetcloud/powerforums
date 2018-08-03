import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Loadable from 'react-loadable';
import Loading from '../components/Loading';
import CurrentUserInfo from '../components/CurrentUserInfo'
import * as userActions from '../actions/userActions';
import { history } from '../store'
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
            <div>
                <h1>
                    <NavLink to="/">PowerForums</NavLink>
                </h1>
                <CurrentUserInfo currentUser={currentUser} onLogout={this.props.logout} />
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
    currentUser: state.user.authentication.currentUser,
});

const mapDispatchToProps = dispatch => ({
    loadUserFromLocal: () => {
        let token = sessionStorage.getItem('jwtToken');
        if (!token || token === '')
            return;

        dispatch(userActions.meFromToken(token));
    },
    logout: () => {
        dispatch(userActions.userLogout());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App))