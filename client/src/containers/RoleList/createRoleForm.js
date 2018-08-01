import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import RFReactSelect from '../../components/RFReactSelect';
import { roleListFetch } from '../../actions/roleListActions';
import { PERMISSION_LIST } from '../../constants/permissions';
import {blurIfNoPermission} from "../../utils/permissionChecker";
import './createRoleForm.css';

const permissionSelect = PERMISSION_LIST.map(value => {
    return {value: value, label: value};
});

export const createRoleFormSubmit = formValues => (dispatch, getState, APIClient) => {
    // Make an API call (createRole) using form values.
    return APIClient.createRole( formValues )
        .then(response => {
            // Role creation was successful, we want to refresh role list.
            dispatch(roleListFetch());
        })
        .catch(error => {
            // Role creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({_error: error.response.data.message});
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
);

class CreateRoleForm extends Component {
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
            <div className="create-role-form">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                    <div>Create a new role</div>
                    <div>
                        <Field
                            name="name"
                            label="Name"
                            placeholder="Please enter the role name"
                            component={renderField}
                            type="text" />
                    </div>
                    <div>
                        <Field
                            name="permissions"
                            multi={true}
                            options={permissionSelect}
                            component={RFReactSelect} />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Create Role</button>
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
        return dispatch(createRoleFormSubmit(formValues));
    }
});

export default blurIfNoPermission(
    connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({form: 'createRoleForm'})
            (CreateRoleForm))
)