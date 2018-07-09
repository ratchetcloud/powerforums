import {
    ROLELIST_FETCH_PENDING, ROLELIST_FETCH_FULFILLED, ROLELIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE
} from '../constants/roleListActionTypes';

const initialState = {
    rolesLoading: false,
    rolesLoaded: false,
    pagination:  {
        totalPage: 1,
        currentPage: 0,
        perPage: 10
    }
}

export const roleListReducer = (state = initialState, action) => {
    switch(action.type) {
        // Depending on the action type.
        case PAGINATION_CHANGE_PAGE:
            return {...state, ...{pagination: {...state.pagination, ...{ currentPage: action.payload }}}};
            break;
        case PAGINATION_CHANGE_RESULTPERPAGE:
            return {...state, ...{pagination: {...state.pagination, ...{ perPage: action.payload }}}};
            break;
        case ROLELIST_FETCH_PENDING:
            return {...state, ...{rolesLoading: true, rolesLoaded: false, roles: []}};
            break;
        case ROLELIST_FETCH_FULFILLED:
            return {...state, ...{rolesLoading: false, rolesLoaded: true, roles: Object.values(action.payload.results), pagination: action.payload.pagination}};
            break;
        case ROLELIST_FETCH_REJECTED:
            return {...state, ...{rolesLoading: false, rolesLoaded: false, roles: [], error: action.payload}};
            break;
        default:
            return {...state};
    }
}