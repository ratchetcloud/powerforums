/**
 * Load node with given ID
 * @param nodeId: ID of node model
 */
export const load = (nodeId) => (dispatch, getState, APIClient) => {
    return APIClient.getNodeById(nodeId)
        .then(response => {
            dispatch(fetchFulfilled(response));
        })
        .catch(response => {
            dispatch(fetchRejected(response));
        });
};

const fetchFulfilled = node => ({
    type: 'EDITING_NODE_FETCH_FULFILLED',
    payload: node
});
const fetchRejected = error => ({
    type: 'EDITING_NODE_FETCH_REJECTED',
    payload: error
});


export const finishEditing = () => ({
    type: 'EDITING_FINISHED',
});

/**
 * Create a node
 * @param node: Set of properties of node
 */
export const createNode = (node) => (dispatch, getState, APIClient) => {
    return APIClient.createNode(node)
        .then(response => {
            dispatch(submissionFulfilled(response));
        })
        .catch(error => {
            dispatch(submissionRejected(error));
        });
};

/**
 * Update a node
 * @param node: Set of properties to update. (`_id` field is required.)
 */
export const updateNode = (node) => (dispatch, getState, APIClient) => {
    return APIClient.updateNode(node)
        .then(response => {
            dispatch(submissionFulfilled(response));
        })
        .catch(error => {
            dispatch(submissionRejected(error));
        });
};



const submissionFulfilled = node => ({
    type: 'EDITING_SUBMISSION_FULFILLED',
    payload: node
});

const submissionRejected = error => ({
    type: 'EDITING_SUBMISSION_REJECTED',
    payload: error
});