import React from 'react'
import * as userActions from "../actions/userActions";
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import './loginForm.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        this.props.login(formValues.username, formValues.password);
    }

    render() {
        const { errMessage, handleSubmit } = this.props;
        return (
            <div className="login-box">
                <h2>Login</h2>
                <div style={{'color': 'red'}}>{errMessage}</div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Field name="username" component="input" type="text" /><br />
                    <Field name="password" component="input" type="password" /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errMessage: state.user.authentication.error
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        dispatch(userActions.userLogin(username, password))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({form: 'loginForm'})(LoginForm)
)