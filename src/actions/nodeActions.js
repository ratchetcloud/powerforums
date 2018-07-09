import {
    NODE_EDIT_ALLOW, NODE_EDIT_DISABLE,
    NODE_DELETE_PENDING, NODE_DELETE_FULFILLED, NODE_DELETE_REJECTED,
    NODE_REPORT_PENDING, NODE_REPORT_FULFILLED, NODE_REPORT_REJECTED,
    NODE_STICK_PENDING, NODE_STICK_FULFILLED, NODE_STICK_REJECTED,
    NODE_FETCH_AUTHORDETAILS_PENDING, NODE_FETCH_AUTHORDETAILS_FULFILLED, NODE_FETCH_AUTHORDETAILS_REJECTED
} from '../constants/nodeActionTypes'
import { nodeListFetch } from "./nodeListActions"

/**
 * Async Actions for deleting a node.
 */
export const nodeDelete = nodeId => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(nodeDeletePending())

    // Make an API call (search) using current state parameters.
    client.deleteNode(nodeId).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(nodeDeleteFulfilled(response))
        dispatch(nodeListFetch())
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(nodeDeleteRejected(response))
    })
}

const nodeDeletePending = () => ({
    type: NODE_DELETE_PENDING
})

const nodeDeleteFulfilled = data => ({
    type: NODE_DELETE_FULFILLED,
    payload: data
})

const nodeDeleteRejected = data => ({
    type: NODE_DELETE_REJECTED,
    payload: data
})


/**
 * Async Action for setting a node sticky or unsticky.
 */
export const nodeStick = (nodeId, sticky) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(nodeStickPending())

    // Make an API call (search) using current state parameters.
    client.stickNode(nodeId, sticky).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(nodeStickFulfilled(response))
        dispatch(nodeListFetch())
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(nodeStickRejected(response))
    })
}

const nodeStickPending = () => ({
    type: NODE_STICK_PENDING
})

const nodeStickFulfilled = data => ({
    type: NODE_STICK_FULFILLED,
    payload: data
})

const nodeStickRejected = data => ({
    type: NODE_STICK_REJECTED,
    payload: data
})

/**
 * Actions for editing a node.
 */
export const nodeEditAllow = data => ({
    type: NODE_EDIT_ALLOW,
    payload: data
})

export const nodeEditDisable = () => ({
    type: NODE_EDIT_DISABLE
})

export const nodeEdit = (nodeId, sticky) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(nodeStickPending())

    // Make an API call (search) using current state parameters.
    client.editNode(nodeId, sticky).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(nodeStickFulfilled(response))
        dispatch(nodeListFetch())
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(nodeStickRejected(response))
    })
}

const nodeEditPending = () => ({
    type: NODE_STICK_PENDING
})

const nodeEditFulfilled = data => ({
    type: NODE_STICK_FULFILLED,
    payload: data
})

const nodeEditRejected = data => ({
    type: NODE_STICK_REJECTED,
    payload: data
})

export const nodeFetchAuthorDetails = authorId => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(nodeFetchAuthorDetailsPending())

    client.getUser(authorId).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(nodeFetchAuthorDetailsFulfilled(response))
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(nodeFetchAuthorDetailsRejected(response))
    })
}

const nodeFetchAuthorDetailsPending = () => ({
    type: NODE_FETCH_AUTHORDETAILS_PENDING
})

const nodeFetchAuthorDetailsFulfilled = data => ({
    type: NODE_FETCH_AUTHORDETAILS_FULFILLED,
    payload: data
})

const nodeFetchAuthorDetailsRejected = data => ({
    type: NODE_FETCH_AUTHORDETAILS_REJECTED,
    payload: data
})