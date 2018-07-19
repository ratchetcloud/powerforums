import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { nodeListFetch } from '../actions/nodeListActions'
import './CreateReportForm.css'
import '../client'
import {blurIfNoPermission} from "../utils/permissionChecker";

const CreateReportFormSubmit = formValues => (dispatch, getState, client) => {
console.log('CreateReportFormSubmit', formValues)
    // Make an API call (createNode) using form values.
    return client.createReport( formValues )
        .then(response => {
            // Node creation was successful, we want to refresh node list.
            dispatch(nodeListFetch())
        })
        .catch(error => {
            // Node creation failed, we want to display the error (redux-forms managing).
            throw new SubmissionError({_error: error.response.data.message})
        })
}

class CreateReportForm extends Component {
    constructor(props) {
        super(props)
        this.customFormSubmit = this.customFormSubmit.bind(this)
    }

    customFormSubmit(formValues) {
console.log('CreateReportForm, customFormSubmit', formValues)
        // Add "not user related" values to form, and trigger the submission with merged value set.
        return this.props.handleFormSubmit(Object.assign({ test: "testtesttest" }, formValues))
    }

    // <form onSubmit={this.props.handleFormSubmit(formValues => this.customFormSubmit(formValues))}>
    render() {
        const {error, pristine, reset, submitting} = this.props

        if(typeof this.props.externalSubmit != "undefined" && this.props.externalSubmit === true) {
            var showSubmitButton = ""
        } else {
            var showSubmitButton = <div><button type="submit" disabled={submitting}>Report</button></div>
        }

        return (
            <div className="create-report-form">
                {error && <strong>{error}</strong>}
                <form>
                    <div>Comment</div>
                    <div>
                        <Field name="content"
                               component="textarea"
                               type="text"
                               placeholder="Please give a reason for your report" />
                    </div>
                    {showSubmitButton}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    handleFormSubmit: formValues => {
console.log("mapDispatchToProps, handleFormSubmit, formValues", formValues)
        return dispatch(CreateReportFormSubmit(formValues))
    }
})

export default blurIfNoPermission(
    connect(mapStateToProps, mapDispatchToProps)
        (reduxForm({ enableReinitialize: false })
            (CreateReportForm))
)