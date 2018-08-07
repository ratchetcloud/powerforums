import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { blurIfNoPermission } from '../../../utils/permissionChecker';
import * as actions from '../actions';
import './createTopicForm.css';

export const createTopicFormSubmit = formValues => (dispatch, getState, APIClient) => {
    // Make an API call (createNode) using form values.
    return APIClient.createNode( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh node list.
            dispatch(actions.fetch())
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({_error: error.response.data.message})
        })
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

const renderTextareaField = ({ input, label, placeholder, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} placeholder={placeholder} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

class CreateTopicForm extends Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit({ ...{
            type: "Topic",
            sticky: false,
            parentId: this.props.parentId
        }, ...formValues })
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props

        return (
            <div className="create-topic-form">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                    <div>New Topic</div>
                    <div>
                        <Field name="title"
                               label="Title"
                               placeholder="Please enter topic title"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <Field name="description"
                               label="Description"
                               placeholder="Please enter topic description"
                               component={renderField}
                               type="text" />
                    </div>
                    <div>
                        <Field name="content"
                               component={renderTextareaField}
                               label="Message"
                               placeholder="Please enter your message" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Create topic</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //parentId: state.nodeList.parentNodeId
})

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(createTopicFormSubmit(formValues))
    }
})

export default blurIfNoPermission(
    connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({form: 'createTopicForm'})
            (CreateTopicForm))
)