import jwt from "jsonwebtoken";

export const meFromToken = (token) => (dispatch, getState, client) => {
    // If there is data on client sessionStorage, use that data
    // and dispatch userLoginFulfilled as if login is success
    let decoded = jwt.decode(token, {complete: true});
    dispatch(userLoginFulfilled(token, decoded.payload))
};

export const login = (username, password) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(loginPending());

    client.login(username, password).then(response => {
        // When API call is successful.

        // Save token on client so that login state remains after refresh
        sessionStorage.setItem('jwtToken', response.token);

        // Dispatch a fulfilled action.
        dispatch(userLoginFulfilled(response.token, response.currentUser))

    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(loginRejected(response))
    })
};

const loginPending = () => ({
    type: 'LOGIN_PENDING'
});

const userLoginFulfilled = (token, currentUser) => (dispatch, getState, client) => {
    // Set authorization header in API HTTP middleware.
    client.setAuthorizationToken(token);

    // Dispatch real action for reducers
    dispatch({
        type: 'LOGIN_FULFILLED',
        payload: {
            token: token,
            currentUser: currentUser
        }
    })
};

const loginRejected = data => ({
    type: 'LOGIN_REJECTED',
    payload: data
});

export const logout = () => (dispatch, getState, client) => {
    dispatch(logoutPending())

    sessionStorage.removeItem('jwtToken');
    client.setAuthorizationToken(false);

    dispatch(logoutFulfilled())
};

const logoutPending = () => ({
    type: 'LOGOUT_PENDING'
});

const logoutFulfilled = () => ({
    type: 'LOGOUT_FULFILLED'
});
