import {
    NODE_EDIT_ALLOW, NODE_EDIT_DISABLE,
    NODE_FETCH_AUTHORDETAILS_PENDING, NODE_FETCH_AUTHORDETAILS_FULFILLED, NODE_FETCH_AUTHORDETAILS_REJECTED,
    NODE_EDIT_PENDING, NODE_EDIT_FULFILLED, NODE_EDIT_REJECTED,
    NODE_DELETE_PENDING, NODE_DELETE_FULFILLED, NODE_DELETE_REJECTED,
    NODE_REPORT_PENDING, NODE_REPORT_FULFILLED, NODE_REPORT_REJECTED,
    NODE_STICK_PENDING, NODE_STICK_FULFILLED, NODE_STICK_REJECTED,
} from '../constants/nodeActionTypes';

const initialState = {
    nodeAuthorDetailsFetching: false,
    nodeAuthorDetailsFetched: false,
    nodeEditAllowed: false,
    nodeEditing: false,
    nodeEdited: false,
    nodeDeleting: false,
    nodeDeleted: false,
    nodeReporting: false,
    nodeReported: false,
    nodeSticking: false,
    nodeStuck: false,
    error: false,
    payload: false
}

export const nodeReducer = (state = initialState, action) => {
    switch (action.type) {
        // Depending on the action type.
        case NODE_FETCH_AUTHORDETAILS_PENDING:
            return {...state, ...{nodeAuthorDetailsFetching: true, nodeAuthorDetailsFetched: false}}
            break;
        case NODE_FETCH_AUTHORDETAILS_FULFILLED:
            return {...state, ...{nodeAuthorDetailsFetching: false, nodeAuthorDetailsFetched: true, payload: action.payload}}
            break;
        case NODE_FETCH_AUTHORDETAILS_REJECTED:
            return {...state, ...{nodeAuthorDetailsFetching: false, nodeAuthorDetailsFetched: false, error: action.payload}}
            break;
        case NODE_EDIT_ALLOW:
            return {...state, ...{nodeEditAllowed: action.payload}}
            break
        case NODE_EDIT_DISABLE:
            return {...state, ...{nodeEditAllowed: false}}
            break
        case NODE_EDIT_PENDING:
            return {...state, ...{nodeEditing: true, nodeEdited: false}}
            break
        case NODE_EDIT_FULFILLED:
            return {...state, ...{nodeEditing: false, nodeEdited: true, payload: action.payload}}
            break
        case NODE_EDIT_REJECTED:
            return {...state, ...{nodeEditing: false, nodeEdited: false, payload: action.payload}}
            break
        case NODE_DELETE_PENDING:
            return {...state, ...{nodeDeleting: true, nodeDeleted: false}}
            break
        case NODE_DELETE_FULFILLED:
            return {...state, ...{nodeDeleting: false, nodeDeleted: true, payload: action.payload}}
            break
        case NODE_DELETE_REJECTED:
            return {...state, ...{nodeDeleting: false, nodeDeleted: false, payload: action.payload}}
            break
        case NODE_REPORT_PENDING:
            return {...state, ...{nodeReporting: true, nodeReported: false}}
            break
        case NODE_REPORT_FULFILLED:
            return {...state, ...{nodeReporting: false, nodeReported: true, payload: action.payload}}
            break
        case NODE_REPORT_REJECTED:
            return {...state, ...{nodeReporting: false, nodeReported: false, payload: action.payload}}
            break
        case NODE_STICK_PENDING:
            return {...state, ...{nodeSticking: true, nodeStuck: false}}
            break
        case NODE_STICK_FULFILLED:
            return {...state, ...{nodeSticking: false, nodeStuck: true, payload: action.payload}}
            break
        case NODE_STICK_REJECTED:
            return {...state, ...{nodeSticking: false, nodeStuck: false, payload: action.payload}}
            break
        default:
            return {...state}
    }
}