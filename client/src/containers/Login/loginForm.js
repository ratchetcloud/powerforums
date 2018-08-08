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
            <div className="login container">
                <div className="login-box">
                    <h2>Login</h2>
                    <div style={{'color': 'red'}}>{errMessage}</div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className="form-group mb-1">
                            <Field name="email" component="input" type="text" className="form-control" />
                        </div>
                        <div>
                            <Field name="password" component="input" type="password" className="form-control" />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
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