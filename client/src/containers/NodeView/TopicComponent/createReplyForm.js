import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { blurIfNotLogged } from '../../../utils/permissionChecker';

class CreateReplyForm extends Component {
    render() {
        const {error, handleSubmit, pristine, reset, submitting, currentUser, onSubmit} = this.props;

        const onSubmitHandler = (formValues) => {
            onSubmit(formValues);
            reset();
        };

        return (
            <div className="create-reply-form">
                {error && <strong>{error}</strong>}

                <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
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

export default blurIfNotLogged()(reduxForm({form: 'createReplyForm'})(CreateReplyForm));