const initialState = {
    node: null,
    children: [],
    pagination:  {
        currentPage: 0,
        perPage: 10
    },
    error: false,
    permissions: [], // TODO: load dynamically
};

export const nodeViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NODE_FETCH_PENDING':
            return {...state, ...{ error: false }};

        case 'NODE_FETCH_FULFILLED':
            const {node, children, pagination} = action.payload;
            return {...state, ...{ node: node, children: Object.values(children), pagination: pagination, error: false }};

        case 'NODE_FETCH_REJECTED':
            return {...state, ...{ node: null, children: [], error: action.payload }};

        case 'NODE_SUBMISSION_ERROR':
            return {...state, ...{ error: action.payload }};

        default:
            return {...state};
    }
}