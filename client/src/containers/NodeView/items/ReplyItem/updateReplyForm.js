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
                    <div className="form-group mb-2">
                        <Field name="content"
                               component="textarea"
                               type="text"
                               className="form-control"
                               placeholder="Please enter your answer" />
                    </div>
                    <div>
                        <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                            Update
                        </button>
                        &nbsp;
                        <button type="button" disabled={submitting} onClick={onCancel} className="btn btn-secondary btn-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
export default reduxForm({ enableReinitialize: false }) (UpdateReplyForm)