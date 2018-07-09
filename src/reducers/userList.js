import {
    USERLIST_FETCH_PENDING, USERLIST_FETCH_FULFILLED, USERLIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE
} from '../constants/userListActionTypes';

const initialState = {
    usersLoading: false,
    usersLoaded: false,
    pagination:  {
        totalPage: 1,
        currentPage: 0,
        perPage: 10
    }
}

export const userListReducer = (state = initialState, action) => {
    switch(action.type) {
        // Depending on the action type.
        case PAGINATION_CHANGE_PAGE:
            return {...state, ...{pagination: {...state.pagination, ...{ currentPage: action.payload }}}};
            break;
        case PAGINATION_CHANGE_RESULTPERPAGE:
            return {...state, ...{pagination: {...state.pagination, ...{ perPage: action.payload }}}};
            break;
        case USERLIST_FETCH_PENDING:
            return {...state, ...{usersLoading: true, usersLoaded: false, users: []}};
            break;
        case USERLIST_FETCH_FULFILLED:
            return {...state, ...{usersLoading: false, usersLoaded: true, users: Object.values(action.payload.results), pagination: action.payload.pagination}};
            break;
        case USERLIST_FETCH_REJECTED:
            return {...state, ...{usersLoading: false, usersLoaded: false, users: [], error: action.payload}};
            break;
        default:
            return {...state};
    }
}