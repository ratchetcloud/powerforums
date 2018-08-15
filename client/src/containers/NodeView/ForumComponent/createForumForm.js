import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { blurIfNoPermission, CAN_CREATE_FORUM } from "../../../utils/permissionChecker";
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
        this.state = {opened: false};
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, onSubmit} = this.props;
        const onSubmitHandler = (formValues) => {
            onSubmit(formValues);
            this.setState({opened: false});
            reset();
        };

        if (!this.state.opened) {
            return (
                <div className="create-forum-form">
                    <button className="open-btn" onClick={() => this.setState({opened: true})}>
                        Create new forum
                    </button>
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
                                    onClick={() => this.setState({opened: false})}
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

export default blurIfNoPermission(CAN_CREATE_FORUM)(reduxForm({form: 'createForumForm'})(CreateForumForm))