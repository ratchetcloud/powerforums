// Actions

export const changePagination = (newPagination) => ({
   type: 'NODE_PAGINATION_CHANGED',
   payload: newPagination
});

export const setNodeID = (nodeId) => ({
    type: 'NODE_SET_NODE_ID',
    payload: nodeId
});

export const fetch = () => (dispatch, getState, APIClient) => {
    const currentState = getState();
    const nodeId = currentState.nodeView.nodeId;
    const currentPage = currentState.nodeView.pagination.currentPage;
    const perPage = currentState.nodeView.pagination.perPage;
    let nodeData;

    dispatch(fetchPending());

    APIClient.getNodeById(nodeId)
        .then(response => {
            nodeData = response;
            return APIClient.getNodePaginatedChildren(nodeId, currentPage, perPage);
        })
        .then(response => {
            dispatch(fetchFulfilled(nodeData, response.results, response.pagination));
        })
        .catch(response => {
            dispatch(fetchRejected(response));
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

///

const nodeSubmissionError = error => ({
    type: 'NODE_SUBMISSION_ERROR',
    payload: error
});

export const updateNode = (node) => (dispatch, getState, APIClient) => {
    APIClient.updateNode(node)
        .then(response => {
            dispatch(fetch());
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        })
};


export const deleteNode = (nodeId) => (dispatch, getState, APIClient) => {
    APIClient.deleteNode(nodeId)
        .then(response => {
            dispatch(fetch());
        })
        .catch(error => {
            dispatch(nodeSubmissionError(error));
        })
};
