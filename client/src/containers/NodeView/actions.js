import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { push } from 'react-router-redux';
import { nodeUrl } from '../../utils/urls';

/**
 * Load node with given ID
 * @param nodeId: ID of node model
 */
export const load = (nodeId) => (dispatch, getState, APIClient) => {
    dispatch(_fetch(nodeId, 0, (getState().nodeView.pagination.perPage || 10)));
};

/**
 * Reload node. `load()` would be executed before call `reload()`
 * @param currentPage: (optional) Reload with custom currentPage
 * @param perPage: (optional) Reload with custom perPage
 */
export const reload = (currentPage=undefined, perPage=undefined) => (dispatch, getState, APIClient) => {
    const currentState = getState();
    let nodeId = currentState.nodeView.node._id;

    if (currentPage === undefined)
        currentPage = currentState.nodeView.pagination.currentPage;
    if (perPage === undefined)
        perPage = currentState.nodeView.pagination.perPage;

    dispatch(_fetch(nodeId, currentPage, perPage));
};


const _fetch = (nodeId, currentPage, perPage) => (dispatch, getState, APIClient) => {
    dispatch(showLoading());
    dispatch(fetchPending());

    // Save nodeData until all promise is fulfilled
    let nodeData;

    APIClient.getNodeById(nodeId)
        .then(response => {
            nodeData = response;
            return APIClient.getNodePaginatedChildren(nodeId, currentPage, perPage);
        })
        .then(response => {
            dispatch(fetchFulfilled(nodeData, response.results, response.pagination));
            dispatch(hideLoading());
        })
        .catch(response => {
            dispatch(fetchRejected(response));
            dispatch(hideLoading());
        });
};
const fetchPending = () => ({
    type: 'NODE_FETCH_PENDING'
});
const fetchFulfilled = (node, children, pagination) => ({
    type: 'NODE_FETCH_FULFILLED',
    payload: {
        node: node,
        children: children,
        pagination: pagination
    }
});
const fetchRejected = error => ({
    type: 'NODE_FETCH_REJECTED',
    payload: error
});


//---------------------------------------------
// Submission (Update/Delete/...) actions
//---------------------------------------------

const nodeSubmissionError = error => ({
    type: 'NODE_SUBMISSION_ERROR',
    payload: error
});

/**
 * Create a node
 * @param node: Set of properties of node
 */
export const createNode = (node) => (dispatch, getState, APIClient) => {
    return APIClient.createNode(node)
        .then(response => {
            // dispatch(push('/n/'+response._id));
            // dispatch(load(response._id));
            dispatch(reload());
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        });
};

/**
 * Update a node
 * @param node: Set of properties to update. (`_id` field is required.)
 */
export const updateNode = (node) => (dispatch, getState, APIClient) => {
    return APIClient.updateNode(node)
        .then(response => {
            dispatch(reload());
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        });
};

/**
 * Delete given node
 * @param nodeId: ID of node model
 * @param nextNodeId: If defined, goto given node after delete node
 */
export const deleteNode = (nodeId, nextNodeId=undefined) => (dispatch, getState, APIClient) => {
    return APIClient.deleteNode(nodeId)
        .then(response => {
            if (nextNodeId) {
                dispatch(push(nodeUrl(nextNodeId)));
                dispatch(load(nextNodeId));

            }else {
                dispatch(reload());
            }
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        });
};

/**
 * Set `sticky` property of node
 * @param nodeId: ID of node model
 * @param sticky: Boolean
 */
export const stickNode = (nodeId, sticky) => (dispatch, getState, APIClient) => {
    return APIClient.stickNode(nodeId, sticky)
        .then(response => {
            dispatch(reload());
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        });
};
