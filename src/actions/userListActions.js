import {
    USERLIST_FETCH_PENDING, USERLIST_FETCH_FULFILLED, USERLIST_FETCH_REJECTED,
    PAGINATION_CHANGE_PAGE, PAGINATION_CHANGE_RESULTPERPAGE
} from "../constants/userListActionTypes";

export const paginationChangePage = pageNumber => ({
    type: PAGINATION_CHANGE_PAGE,
    payload: pageNumber
})

export const paginationChangeResultPerPage = perPage => ({
    type: PAGINATION_CHANGE_RESULTPERPAGE,
    payload: perPage
})

export const userListFetch = () => (dispatch, getState, client) => {
    // Get current State.
    const currentState = getState();

    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(userListFetchPending());

    // Make an API call (search) using current state parameters.
    client.getUserPaginated(currentState.nodeList.pagination.currentPage, currentState.nodeList.pagination.perPage).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(userListFetchFulfilled(response));
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(userListFetchRejected(response));
    });
}

const userListFetchPending = () => ({
    type: USERLIST_FETCH_PENDING
})

const userListFetchFulfilled = data => ({
    type: USERLIST_FETCH_FULFILLED,
    payload: data
})

const userListFetchRejected = data => ({
    type: USERLIST_FETCH_REJECTED,
    payload: data
})