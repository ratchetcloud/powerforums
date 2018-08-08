const initialState = {
    nodeId: undefined,
    node: null,
    loading: false,
    loaded: false,
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
            return {...state, ...{ loading: true, loaded: false, node: null, children: [] }};

        case 'NODE_FETCH_FULFILLED':
            const {node, children, pagination} = action.payload;
            return {...state, ...{ loading: false, loaded: true, node: node, children: Object.values(children), pagination: pagination }};

        case 'NODE_FETCH_REJECTED':
            return {...state, ...{ loading: false, loaded: false, node: null, children: [], error: action.payload }};

        case 'NODE_PAGINATION_CHANGED':
            return {...state, ...{ pagination: action.payload }};

        case 'NODE_SUBMISSION_ERROR':
            return {...state, ...{ loading: false, loaded: false, node: null, children: [], error: action.payload }};

        default:
            return {...state};
    }
}