import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import './updateReplyForm.css'


class UpdateReplyForm extends Component {
    render() {
        const {error, handleSubmit, submitting, onSubmit, onCancel} = this.props;

        return (
            <div className="update-reply-form">
                {error && <strong>{error}</strong>}
                <form onSubmit={handleSubmit(formValues => onSubmit(formValues))}>
                    <div>
                        <Field name="content"
                               component="textarea"
                               type="text"
                               placeholder="Please enter your answer" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting}>Update reply</button>
                        <button type="button" disabled={submitting} onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default reduxForm({ enableReinitialize: false }) (UpdateReplyForm)