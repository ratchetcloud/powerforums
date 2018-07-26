import {
    ROLELIST_FETCH_PENDING, ROLELIST_FETCH_FULFILLED, ROLELIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE
} from "../constants/roleListActionTypes";

export const paginationChangePage = pageNumber => ({
    type: PAGINATION_CHANGE_PAGE,
    payload: pageNumber
})

export const paginationChangeResultPerPage = perPage => ({
    type: PAGINATION_CHANGE_RESULTPERPAGE,
    payload: perPage
})

export const roleListFetch = () => (dispatch, getState, client) => {
    // Get current State.
    const currentState = getState();

    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(roleListFetchPending());

    // Make an API call (search) using current state parameters.
    client.getRolePaginated(currentState.nodeList.pagination.currentPage, currentState.nodeList.pagination.perPage).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(roleListFetchFulfilled(response));
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(roleListFetchRejected(response));
    });
}

const roleListFetchPending = () => ({
    type: ROLELIST_FETCH_PENDING
})

const roleListFetchFulfilled = data => ({
    type: ROLELIST_FETCH_FULFILLED,
    payload: data
})

const roleListFetchRejected = data => ({
    type: ROLELIST_FETCH_REJECTED,
    payload: data
})