import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './loginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        this.props.login(formValues.email, formValues.password);
    }

    render() {
        const { loginError, handleSubmit } = this.props;
        return (
            <div className="login container">
                <div className="login-box">
                    <h2>Login</h2>
                    {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}

                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className="form-group mb-1">
                            <Field name="email"
                                   component="input"
                                   type="text"
                                   required="required"
                                   className="form-control" />
                        </div>
                        <div>
                            <Field name="password"
                                   component="input"
                                   type="password"
                                   required="required"
                                   className="form-control" />
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

export default reduxForm({form: 'loginForm'})(LoginForm);