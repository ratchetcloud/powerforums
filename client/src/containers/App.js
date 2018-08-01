import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Loadable from 'react-loadable';
import CurrentUserInfo from '../components/CurrentUserInfo'
import * as userActions from '../actions/userActions';
import { history } from '../store'
import './App.css'

const Loading = () => <div>Loading...</div>;

// Each routes are loaded lazy
const NodeList = Loadable({
    loader: () => import(/* webpackChunkName: "node_list" */ './NodeList'),
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
        return (
            <div>
                <h1>
                    <NavLink to="/">PowerForums</NavLink>
                </h1>
                <CurrentUserInfo history={history} />
                <Switch>
                    <Route exact path="/" component={NodeList} />
                    <Route path="/nodelist/:nodeId" component={NodeList} />
                    <Route path="/login" component={Login} />
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