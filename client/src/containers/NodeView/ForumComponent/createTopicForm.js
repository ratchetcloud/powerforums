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
            dispatch(actions.reload());
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({_error: error.response.data.message});
        })
};

const renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
    <div className="form-group">
        <label className="mb-0" htmlFor={input.name}>{label}</label>
        <input {...input}
               placeholder={placeholder}
               id={input.name}
               type={type}
               required="required"
               className="form-control form-control-sm" />
        {touched && error && <span>{error}</span>}
    </div>
);

const renderTextareaField = ({ input, label, placeholder, meta: { touched, error } }) => (
    <div className="form-group">
        <label className="mb-0" htmlFor={input.name}>{label}</label>
        <textarea {...input}
                  id={input.name}
                  placeholder={placeholder}
                  required="required"
                  className="form-control form-control-sm" />
        {touched && error && <span>{error}</span>}
    </div>
);

class CreateTopicForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {opened: false};
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit({ ...{
            type: "Topic",
            parentId: this.props.parentId
        }, ...formValues });
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, currentUser} = this.props;

        if (!this.state.opened) {
            return (
                <div className="create-topic-form">
                    <button className="open-btn" onClick={() => this.setState({opened: true})}>
                        Post new topic as {currentUser.name}
                    </button>
                </div>
            )

        }else {
            return (
                <div className="create-topic-form">
                    <div className="meta">Post new topic as {currentUser.name}</div>

                    {error && <strong>{error}</strong>}
                    <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                        <Field name="title"
                               label="Title"
                               placeholder="Please enter topic title"
                               component={renderField}
                               type="text"/>

                        <Field name="content"
                               component={renderTextareaField}
                               label="Content"
                               placeholder="Please enter your content"/>

                        <div className="mt-3">
                            <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                                Post
                            </button>
                            &nbsp;
                            <button type="button" disabled={submitting}
                                    onClick={() => this.setState({opened: false})}
                                    className="btn btn-secondary btn-sm">
                                Close
                            </button>
                        </div>

                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    currentUser: state.login.currentUser,
});

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(createTopicFormSubmit(formValues))
    }
});

export default blurIfNoPermission(
    connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({form: 'createTopicForm'})
            (CreateTopicForm))
)