import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch } from 'react-router-dom'
import NodeList from './NodeList'
import RoleList from './RoleList'
import UserList from './UserList'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '../stores/store'
import './App.css'
import { userLogin } from '../actions/userActions'

// Jihye: add User Register
import UserRegister from './UserRegister'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.currentUser === false && this.props.loading === false && this.props.error === false) {
            // If there user is not authentified yet. Authenticate him.
            // TODO: move params as env variable? When we know where they are suppose to come from...
            this.props.authenticate('Remi', 'password')
            return <div></div>

        } else if (this.props.currentUser === false && this.props.loading === true) {
            // If authentication request is pending, return nothing.
            return <div></div>

        } else if (this.props.error !== false) {
            // If authentication request failed.
            return <div><p>Authentication error: {this.props.error}.</p></div>

        } else {
            return (
                <div>
                    <h1>React/Redux User Interface</h1>
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
    token: state.user.authentication.token,
    error: state.user.authentication.error
})

const mapDispatchToProps = dispatch => ({
    authenticate: (username, md5password) => {
        dispatch(userLogin(username, md5password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps) (App)