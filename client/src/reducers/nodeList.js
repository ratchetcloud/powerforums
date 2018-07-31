import {
    NODELIST_FETCH_PENDING, NODELIST_FETCH_FULFILLED, NODELIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE,
    PARENTNODE_CHANGE, PARENTNODE_FETCH_PENDING, PARENTNODE_FETCH_FULFILLED, PARENTNODE_FETCH_REJECTED
} from '../constants/nodeListActionTypes';

const rootNodeId = '000000000000000000000000';
const initialState = {
    parentNodeId: rootNodeId,
    parentNode: {},
    parentNodeLoading: false,
    parentNodeLoaded: false,
    nodesLoading: false,
    nodesLoaded: false,
    nodes: [],
    pagination:  {
        totalPage: 1,
        currentPage: 0,
        perPage: 10
    }
}

export const nodeListReducer = (state = initialState, action) => {
    switch(action.type) {
        // Depending on the action type.
        case NODELIST_FETCH_PENDING:
            return {...state, ...{nodesLoading: true, nodesLoaded: false, nodes: []}};
            break;
        case NODELIST_FETCH_FULFILLED:
            return {...state, ...{nodesLoading: false, nodesLoaded: true, nodes: Object.values(action.payload.results), pagination: action.payload.pagination}};
            break;
        case NODELIST_FETCH_REJECTED:
            return {...state, ...{nodesLoading: false, nodesLoaded: false, nodes: [], error: action.payload}};
            break;
        case PAGINATION_CHANGE_PAGE:
            return {...state, ...{pagination: { ...state.pagination, ...{ currentPage: action.payload }}}};
            break;
        case PAGINATION_CHANGE_RESULTPERPAGE:
            return {...state, ...{pagination: { ...state.pagination, ...{ perPage: action.payload }}}};
            break;
        case PARENTNODE_CHANGE:
            // TODO: better approach?
            return {...state, ...{parentNodeId: action.payload ? action.payload : rootNodeId}};
            break;
        case PARENTNODE_FETCH_PENDING:
            return {...state, ...{parentNodeLoading: true, parentNodeLoaded: false, parentNode: {}}};
            break;
        case PARENTNODE_FETCH_FULFILLED:
            return {...state, ...{parentNodeLoading: false, parentNodeLoaded: true, parentNode: action.payload}};
            break;
        case PARENTNODE_FETCH_REJECTED:
            return {...state, ...{parentNodeLoading: false, parentNodeLoaded: false, parentNode: {}, error: action.payload}};
            break;
        default:
            return {...state};
    }
}