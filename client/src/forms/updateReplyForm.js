import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { nodeListFetch } from '../actions/nodeListActions'
import { nodeEditDisable } from '../actions/nodeActions'

import './updateReplyForm.css'
import '../client'

export const updateReplyFormSubmit = formValues => (dispatch, getState, client) => {
    // Make an API call (updateNode) using form values.
    return client.updateNode( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh node list.
            dispatch(nodeEditDisable())
            dispatch(nodeListFetch())
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({ _error: error.response.data.message })
        })
}

class UpdateReplyForm extends Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFormCancel = this.handleFormCancel.bind(this)
    }

    handleFormSubmit(formValues) {
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit({ ...formValues, ...{ _id: this.props.initialValues._id} })
    }

    handleFormCancel() {
        return this.props.handleFormCancel()
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props

        if (this.props.hasOwnProperty('commentLabel') && this.props.commentLabel === '') {
            var commentLabel = ''
        } else {
            var commentLabel = <div>{this.props.commentLabel}</div>
        }

        return (
            <div className="update-reply-form">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => this.handleFormSubmit(formValues))}>
                    {commentLabel}
                    <div>
                        <Field name="content"
                               component="textarea"
                               type="text"
                               placeholder="Please enter your answer" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Update reply</button>
                        <button type="button" disabled={submitting} onClick={this.handleFormCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
        return dispatch(updateReplyFormSubmit(formValues))
    },
    handleFormCancel: () => {
        dispatch(nodeEditDisable())
    }
})

UpdateReplyForm = reduxForm({ enableReinitialize: false }) (UpdateReplyForm)

UpdateReplyForm = connect(mapStateToProps, mapDispatchToProps) (UpdateReplyForm)

export default UpdateReplyForm