import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { signUpPending, signUpFulfilled, signUpRejected } from './actions';
import './form.css';

export const signupUserFormSubmit = formValues => (dispatch, getState, APIClient) => {
    if (formValues.password !== formValues.passwordValidation){
        throw new SubmissionError({_error: "Check Password and Password Validation field"})
    }
    dispatch(signUpPending());

    return APIClient.signUpUser(formValues)
        .then(response => {
            dispatch(signUpFulfilled())
        })
        .catch(error => {
            dispatch(signUpRejected(error));
            throw new SubmissionError({_error: error.response.data.message});
        });
};

const renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
    <div className="form-group">
        <label htmlFor={input.name} className="mb-0">{label}</label>
        <input {...input} id={input.name} placeholder={placeholder} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
    </div>
);

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.signUp(formValues);
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div className="signup-user-form container mt-3">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                    <h2>Sign Up</h2>
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
                        <Field name="password"
                               label="Password"
                               placeholder="Please enter the password"
                               component={renderField}
                               type="password" />
                    </div>
                    <div>
                        <Field name="passwordValidation"
                               label="Password validation"
                               placeholder="Please reenter the password"
                               component={renderField}
                               type="password" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting} className="btn btn-primary">
                            Submit
                        </button>
                        &nbsp;
                        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-secondary">
                            Clear Values
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    signUp: formValues => {
        return dispatch(signupUserFormSubmit(formValues));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)
    (reduxForm({form: 'signupUserForm'})
        (SignUpForm));