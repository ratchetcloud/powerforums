import {
    NODELIST_FETCH_PENDING, NODELIST_FETCH_FULFILLED, NODELIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE,
    PARENTNODE_CHANGE, PARENTNODE_FETCH_PENDING, PARENTNODE_FETCH_FULFILLED, PARENTNODE_FETCH_REJECTED
} from "../constants/nodeListActionTypes";

export const parentNodeChange = parentNodeId => ({
        type: PARENTNODE_CHANGE,
        payload: parentNodeId
})

export const paginationChangePage = pageNumber => ({
    type: PAGINATION_CHANGE_PAGE,
    payload: pageNumber
})

export const paginationChangeResultPerPage = perPage => ({
    type: PAGINATION_CHANGE_RESULTPERPAGE,
    payload: perPage
})

export const nodeListFetch = () => (dispatch, getState, client) => {
    // Get current State.
    const currentState = getState();

    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(nodeListFetchPending());

    // Make an API call (search) using current state parameters.
    client.getNodePaginatedChildren( currentState.nodeList.parentNodeId, currentState.nodeList.pagination.currentPage, currentState.nodeList.pagination.perPage ).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(nodeListFetchFulfilled(response));
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(nodeListFetchRejected(response));
    });
}

const nodeListFetchPending = () => ({
    type: NODELIST_FETCH_PENDING
})

const nodeListFetchFulfilled = data => ({
    type: NODELIST_FETCH_FULFILLED,
    payload: data
})

const nodeListFetchRejected = data => ({
    type: NODELIST_FETCH_REJECTED,
    payload: data
})

/**
 * Async root function to get the NodeList parent node information.
 * @param parentNodeId
 */
export const parentNodeFetch = () => (dispatch, getState, client) => {
    // Get current State.
    const currentState = getState();

    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(parentNodeFetchPending());

    // Make an API call (search) using current state parameters.
    client.getNodeById(currentState.nodeList.parentNodeId, 1, 1).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(parentNodeFetchFulfilled(response));
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(parentNodeFetchRejected(response));
    });
}

const parentNodeFetchPending = () => ({
    type: PARENTNODE_FETCH_PENDING
})

const parentNodeFetchFulfilled = data => ({
    type: PARENTNODE_FETCH_FULFILLED,
    payload: data
})

const parentNodeFetchRejected = data => ({
    type: PARENTNODE_FETCH_REJECTED,
    payload: data
})