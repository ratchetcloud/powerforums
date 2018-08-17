import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {blurIfNotLogged} from "../../utils/permissionChecker";

class NodeEditorForm extends React.Component {
    constructor(props) {
        super(props);
        this.content = '';
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formValues) {
        this.props.onSubmit({...formValues, ...{content: this.content}});
    }

    render() {
        const { tree, handleSubmit, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-group mb-2">
                    <Field name="tree"
                           placeholder={tree}
                           component="input"
                           type="text"
                           className="form-control form-control-sm"
                           readOnly />
                </div>

                <div className="form-group mb-2">
                    <Field name="title"
                           placeholder="Title"
                           component="input"
                           type="text"
                           required="required"
                           className="form-control form-control-sm" />
                </div>

                <CKEditor
                    editor={ClassicEditor}
                    data={this.content}
                    onChange={(event, editor) => {
                        this.content = editor.getData();
                    }}
                />

                <div className="mt-3 text-right">
                    <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                        Post
                    </button>
                </div>
            </form>
        )
    }
}

export default blurIfNotLogged()(reduxForm({form: 'nodeEditor'})(NodeEditorForm));