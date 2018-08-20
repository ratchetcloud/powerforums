const initialState = {
    node: null,
    error: false,
    nextNodeId: null,
};

export const nodeEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDITING_NODE_FETCH_FULFILLED':
            return {...state, ...{ node: action.payload, error: false }};

        case 'EDITING_NODE_FETCH_REJECTED':
            return {...state, ...{ node: null, error: action.payload }};

        case 'EDITING_FINISHED':
            return initialState;

        case 'EDITING_SUBMISSION_FULFILLED':
            return {...state, ...{ nextNodeId: action.payload._id }};

        case 'EDITING_SUBMISSION_REJECTED':
            return {...state, ...{ error: action.payload }};

        default:
            return {...state};
    }
}