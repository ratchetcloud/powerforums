import {hideLoading, showLoading} from 'react-redux-loading-bar';
import * as authentication from '../../utils/authentication';

export const login = (username, password) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(showLoading());
    dispatch(loginPending());

    client.login(username, password)
        .then(response => {
            // Dispatch a fulfilled action.
            dispatch(authentication.setAuthorization(response.token, response.currentUser));
            dispatch(loginFulfilled());
            dispatch(hideLoading());

        })
        .catch(error => {
            dispatch(loginRejected(error.response.data));
            dispatch(hideLoading());
        })
};

const loginPending = () => ({
    type: 'LOGIN_PENDING'
});

const loginFulfilled = () => ({
    type: 'LOGIN_FULFILLED'
});

const loginRejected = error => ({
    type: 'LOGIN_REJECTED',
    payload: error
});
