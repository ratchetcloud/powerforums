import {
    NAVIGATION_FETCH_PARENTANCETORLIST_PENDING, NAVIGATION_FETCH_PARENTANCETORLIST_FULFILLED, NAVIGATION_FETCH_PARENTANCETORLIST_REJECTED
} from '../constants/navigationActionTypes';

const initialState = {
    loading: false,
    error: false,
    parentNodeAncestorList: []
};

/**
 * Navigation bar reducer.
 */
export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_FETCH_PARENTANCETORLIST_PENDING:
            return Object.assign({}, state, { loading: true, loaded: false });
            break;
        case NAVIGATION_FETCH_PARENTANCETORLIST_FULFILLED:
            return Object.assign({}, state, { loading: false, loaded: true, parentNodeAncestorList: action.payload });
            break;
        case NAVIGATION_FETCH_PARENTANCETORLIST_REJECTED:
            return Object.assign({}, state, { loading: false, loaded: false, error: action.payload });
            break;
        default:
            return Object.assign({}, state);
    }
}