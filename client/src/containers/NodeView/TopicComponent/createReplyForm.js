import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { blurIfNoPermission } from "../../../utils/permissionChecker";
import * as actions from '../actions';

export const createReplyFormSubmit = formValues => (dispatch, getState, APIClient) => {
    // Make an API call (createNode) using form values.
    console.log(formValues);
    return APIClient.createNode( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh node list.
            dispatch(actions.reload());
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({ _error: error.response.data.message });
        })
}

class CreateReplyForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit(Object.assign({
                type: "Reply",
                parentId: this.props.parentId
        }, formValues));
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, currentUser} = this.props;

        return (
            <div className="create-reply-form">
                {error && <strong>{error}</strong>}

                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))} className="mt-5">
                    <div className="header mb-1">
                        <span className="meta">Reply as {currentUser.name}</span>
                    </div>

                    <div className="form-group mb-2">
                        <Field name="content"
                               component="textarea"
                               className="form-control"
                               rows="3"
                               required="required"
                               placeholder="Enter your reply" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                            Post reply
                        </button>&nbsp;
                        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-secondary btn-sm">
                            Clear Values
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.login.currentUser,
});

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(createReplyFormSubmit(formValues))
    }
});


export default blurIfNoPermission(
    connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({form: 'createReplyForm'})
            (CreateReplyForm))
)