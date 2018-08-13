const initialState = {
    nodeId: undefined,
    node: null,
    children: [],
    pagination:  {
        currentPage: 0,
        perPage: 10
    },
    error: false
};

export const nodeViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NODE_SET_NODE_ID':
            return {...state, ...{ nodeId: action.payload, pagination:{ currentPage: 0, perPage: 10 } }};

        case 'NODE_FETCH_PENDING':
            return {...state, ...{ error: false }};

        case 'NODE_FETCH_FULFILLED':
            const {node, children, pagination} = action.payload;
            return {...state, ...{ node: node, children: Object.values(children), pagination: pagination, error: false }};

        case 'NODE_FETCH_REJECTED':
            return {...state, ...{ node: null, children: [], error: action.payload }};

        case 'NODE_PAGINATION_CHANGED':
            return {...state, ...{ pagination: action.payload }};

        case 'NODE_SUBMISSION_ERROR':
            return {...state, ...{ node: null, children: [], error: action.payload }};

        default:
            return {...state};
    }
}