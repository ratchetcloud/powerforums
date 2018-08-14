import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { blurIfNotLogged } from '../../../utils/permissionChecker';
import './createTopicForm.css';

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
        this.state = {opened: false};
    }

    render() {
        // `onSubmit` is defined at ForumComponent/index.js,
        // `currentUser` is passed through `blurIfNoPermission`.
        // others are from `reduxForm`.
        const {error, handleSubmit, pristine, reset, submitting, currentUser, onSubmit} = this.props;
        const onSubmitHandler = (formValues) => {
            onSubmit(formValues);
            this.setState({opened: false});
        };

        if (!this.state.opened) {
            return (
                <div className="create-topic-form">
                    <button className="open-btn" onClick={() => this.setState({opened: true})}>
                        Post new topic as {currentUser.name}
                    </button>
                </div>
            );

        }else {
            return (
                <div className="create-topic-form">
                    <div className="meta">Post new topic as {currentUser.name}</div>

                    {error && <strong>{error}</strong>}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
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

export default blurIfNotLogged()(reduxForm({form: 'createTopicForm'})(CreateTopicForm))