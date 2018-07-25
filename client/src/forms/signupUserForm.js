import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { userListFetch } from '../actions/userListActions';
import './SignupUserForm.css';
import '../client';
import IntegrationReactSelect from './IntegrationReactSelect';

export const signupUserFormSubmit = formValues => (dispatch, getState, client) => {
    // Make an API call (createUser) using form values.
    return client.createUser( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh user list.
            dispatch(userListFetch())
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({_error: error.response.data.message})
        });
}

const renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

class SignupUserForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit(formValues);
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div className="signup-user-form">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                    <div>Create a new user</div>
                    <div>
                        <Field name="name"
                               label="Name"
                               placeholder="Please enter the user name"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <Field name="email"
                               label="Email"
                               placeholder="Please enter the user email"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <Field name="accountId"
                               label="Account Id"
                               placeholder="Please enter the user account Id"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <Field name="password"
                               label="Password"
                               placeholder="Please enter the password"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Create User</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(signupUserFormSubmit(formValues));
    }
});

SignupUserForm = reduxForm({form: 'signupUserForm'})(SignupUserForm);

SignupUserForm = connect(mapStateToProps, mapDispatchToProps)(SignupUserForm);

export default SignupUserForm;

