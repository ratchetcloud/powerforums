import {
    USER_DELETE_PENDING, USER_DELETE_FULFILLED, USER_DELETE_REJECTED,
    USER_LOGIN_PENDING, USER_LOGIN_FULFILLED, USER_LOGIN_REJECTED,
    USER_LOGOUT_PENDING, USER_LOGOUT_FULFILLED, USER_LOGOUT_REJECTED,
    USER_SIGNUP_PENDING, USER_SIGNUP_FULFILLED, USER_SIGNUP_REJECTED, USER_SIGNUP_ENDED
} from "../constants/userActionTypes"
import jwt from "jsonwebtoken";

export const meFromToken = (token) => (dispatch, getState, client) => {
    // If there is data on client sessionStorage, use that data
    // and dispatch userLoginFulfilled as if login is success
    let decoded = jwt.decode(token, {complete: true});
    dispatch(userLoginFulfilled(token, decoded.payload))
}

export const userLogin = (username, password) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(userLoginPending())

    client.login(username, password).then(response => {
        // When API call is successful.

        // Save token on client so that login state remains after refresh
        sessionStorage.setItem('jwtToken', response.token);

        // Dispatch a fulfilled action.
        dispatch(userLoginFulfilled(response.token, response.currentUser))

    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(userLoginRejected(response))
    })
}

const userLoginPending = () => ({
    type: USER_LOGIN_PENDING
})

const userLoginFulfilled = (token, currentUser) => (dispatch, getState, client) => {
    // Set authorization header in API HTTP middleware.
    client.setAuthorizationToken(token);

    // Dispatch real action for reducers
    dispatch({
        type: USER_LOGIN_FULFILLED,
        payload: {
            token: token,
            currentUser: currentUser
        }
    })
}

const userLoginRejected = data => ({
    type: USER_LOGIN_REJECTED,
    payload: data
})

export const userLogout = () => (dispatch, getState, client) => {
    dispatch(userLogoutPending())

    sessionStorage.removeItem('jwtToken');
    client.setAuthorizationToken(false);

    dispatch(userLogoutFulfilled())
}

const userLogoutPending = () => ({
    type: USER_LOGOUT_PENDING
})

const userLogoutFulfilled = () => ({
    type: USER_LOGOUT_FULFILLED
})


export const userSignupPending = () => ({
    type: USER_SIGNUP_PENDING
})

export const userSignupFulfilled = () => ({
    // show popup about completion message
    type: USER_SIGNUP_FULFILLED
})

export const userSignupRejected = data => ({
    type: USER_SIGNUP_REJECTED,
    payload: data
})

export const userSignupEnded = () => ({
    type: USER_SIGNUP_ENDED
})
/*

export const userDelete = userId => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(userDeletePending())

    client.deleteUser(userId).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(userDeleteFulfilled(response))
        dispatch(userListFetch())

    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(userDeleteRejected(response))
    })
}

const userDeletePending = () => ({
    type: USER_DELETE_PENDING
})

const userDeleteFulfilled = data => ({
    type: USER_DELETE_FULFILLED,
    payload: data
})

const userDeleteRejected = data => ({
    type: USER_DELETE_REJECTED,
    payload: data
})*/
