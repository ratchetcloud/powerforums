import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ui from 'redux-ui';
import { hideIfNoPermission, CAN_CREATE_FORUM } from '../../../utils/permissionChecker';
import './createForumForm.css';


const renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
    <div className="form-group">
        <label className="mb-0" htmlFor={input.name}>{label}</label>
        <input {...input}
               placeholder={placeholder}
               id={input.name}
               type={type}
               className="form-control form-control-sm" />
        {touched && error && <span>{error}</span>}
    </div>
);

class CreateForumForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, onSubmit, ui} = this.props;
        const onSubmitHandler = (formValues) => {
            onSubmit(formValues);
            this.props.resetUI();
            reset();
        };

        if (!ui.editing) {
            return (
                <div className="mt-2">
                    <div className="open-btn">
                        <button onClick={() => this.props.updateUI({'editing': true})}>
                            Create new forum
                        </button>
                    </div>
                </div>
            );

        }else {
            return (
                <div className="create-forum-form">
                    <div className="meta">Create new forum</div>
                    {error && <strong>{error}</strong>}

                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Field name="title"
                               label="Title"
                               placeholder="Please enter forum title"
                               component={renderField}
                               type="text"/>

                        <Field name="description"
                               label="Description"
                               placeholder="Please enter forum description"
                               component={renderField}
                               type="text"/>

                        <div className="mt-3">
                            <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                                Create
                            </button>
                            &nbsp;
                            <button type="button" disabled={submitting}
                                    onClick={() => this.props.updateUI({'editing': false})}
                                    className="btn btn-secondary btn-sm">
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default hideIfNoPermission(CAN_CREATE_FORUM)
    (reduxForm({form: 'createForumForm', enableReinitialize: true})
        (ui({state: {
            editing: false
        }})
        (CreateForumForm)))