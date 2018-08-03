import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import * as userActions from './actions';
import './loginForm.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        this.props.login(formValues.email, formValues.password);
    }

    render() {
        const { errMessage, handleSubmit } = this.props;
        return (
            <div className="login-box">
                <h2>Login</h2>
                <div style={{'color': 'red'}}>{errMessage}</div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <Field name="email" component="input" type="text" /><br />
                    <Field name="password" component="input" type="password" /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        dispatch(userActions.login(username, password))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({form: 'loginForm'})(LoginForm)
)