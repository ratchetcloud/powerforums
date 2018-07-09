import {
    ROLE_DELETE_PENDING, ROLE_DELETE_FULFILLED, ROLE_DELETE_REJECTED
} from '../constants/roleActionTypes';
import { roleListFetch } from "./roleListActions";

/**
 * Async function for deleting a role.
 */
export const roleDelete = roleId => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(roleDeletePending());

    client.deleteRole(roleId).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(roleDeleteFulfilled(response));
        dispatch(roleListFetch());
    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(roleDeleteRejected(response));
    });
}

const roleDeletePending = () => ({
    type: ROLE_DELETE_PENDING
})

const roleDeleteFulfilled = data => ({
    type: ROLE_DELETE_FULFILLED,
    payload: data
})

const roleDeleteRejected = data => ({
    type: ROLE_DELETE_REJECTED,
    payload: data
})