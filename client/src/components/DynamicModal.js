import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

class MyModal extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        handleHide: PropTypes.func.isRequired
    }

    render() {
        const { show, handleHide, title, content, hideButtonLabel, primaryButtonLabel, externalHandleClose } = this.props

        return (
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleHide}>{hideButtonLabel}</Button>
                    <Button bsStyle="primary" onClick={externalHandleClose}>{primaryButtonLabel}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default class DynamicModal extends Component {
    render() {
        const { name } = this.props
        const WrappedMyModal = connectModal({ name })(MyModal)
        return <WrappedMyModal />
    }
}