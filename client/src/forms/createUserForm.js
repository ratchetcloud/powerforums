import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { userListFetch } from '../actions/userListActions';
import './CreateUserForm.css';
import '../client';
import IntegrationReactSelect from './IntegrationReactSelect';

/*
const suggestions = [ { label: 'Afghanistan' }, { label: 'Aland Islands' }, { label: 'Albania' }, { label: 'Algeria' }, { label: 'American Samoa' }, { label: 'Andorra' }, { label: 'Angola' }, { label: 'Anguilla' },
    { label: 'Antarctica' }, { label: 'Antigua and Barbuda' }, { label: 'Argentina' }, { label: 'Armenia' }, { label: 'Aruba' }, { label: 'Australia' }, { label: 'Austria' }, { label: 'Azerbaijan' }, { label: 'Bahamas' },
    { label: 'Bahrain' }, { label: 'Bangladesh' }, { label: 'Barbados' }, { label: 'Belarus' }, { label: 'Belgium' }, { label: 'Belize' }, { label: 'Benin' }, { label: 'Bermuda' }, { label: 'Bhutan' }, { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' }, { label: 'Bosnia and Herzegovina' }, { label: 'Botswana' }, { label: 'Bouvet Island' }, { label: 'Brazil' }, { label: 'British Indian Ocean Territory' }, { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));
*/

export const createUserFormSubmit = formValues => (dispatch, getState, client) => {
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

//Jihye: for changing as basic register, separate permission and register / remove country selection
/*
const renderPermissions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>Add Permissions</button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
        {fields.map((permissions, index) =>
            <li key={index}>
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}/>
                <h4>Permission #{index + 1}</h4>
                <Field
                    name={`${permissions}.roleId`}
                    type="text"
                    component={renderField}
                    label="Role Id"/>
                <Field
                    name={`${permissions}.ForumId`}
                    type="text"
                    component={renderField}
                    label="Forum Id"/>
            </li>
        )}
    </ul>
)
*/

class CreateUserForm extends Component {
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
        console.log(this.props)
        return (
            <div className="create-user-form">
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
        return dispatch(createUserFormSubmit(formValues));
    }
});

CreateUserForm = reduxForm({form: 'createUserForm'})(CreateUserForm);

CreateUserForm = connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);

export default CreateUserForm;

