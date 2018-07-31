import {
    USER_DELETE_PENDING, USER_DELETE_FULFILLED, USER_DELETE_REJECTED,
    USER_LOGIN_PENDING, USER_LOGIN_FULFILLED, USER_LOGIN_REJECTED,
    USER_LOGOUT_PENDING, USER_LOGOUT_FULFILLED, USER_LOGOUT_REJECTED,
    USER_SIGNUP_PENDING, USER_SIGNUP_FULFILLED, USER_SIGNUP_REJECTED, USER_SIGNUP_ENDED
} from '../constants/userActionTypes';

const initialState = {
    error: false,
    userDeleting: false,
    userDeleted:  false,
    authentication: {
        loading: false,
        currentUser: false,
        token: false,
        error: false
    },
    signup: {
        loading: false,
        success: false,
        error: false
    }
};

/**
 * User reducer.
 */
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Depending on the action type.
        case USER_DELETE_PENDING:
            return {...state, ...{userDeleting: true, userDeleted: false}};
            break;
        case USER_DELETE_FULFILLED:
            return {...state, ...{userDeleting: false, userDeleted: true}};
            break;
        case USER_DELETE_REJECTED:
            return {...state, ...{userDeleting: false, userDeleted: false}};
            break;
        case USER_LOGIN_PENDING:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: true, currentUser: false, token: false, error: false }} }};
            break;
        case USER_LOGIN_FULFILLED:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: false, currentUser: action.payload.currentUser, token: action.payload.token, error: false }} }};
            break;
        case USER_LOGIN_REJECTED:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: false, currentUser: false, error: action.payload.message }} }};
            break;
        case USER_LOGOUT_PENDING:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: true, currentUser: false, error: false }} }};
            break;
        case USER_LOGOUT_FULFILLED:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: false, currentUser: false, token: false, error: false }} }};
            break;
        case USER_LOGOUT_REJECTED:
            return {...state, ...{ authentication: {...state.authentication, ...{ loading: false, currentUser: false, error: action.payload }} }};
            break;
        case USER_SIGNUP_PENDING:
            return {...state, ...{ signup: {...state.signup, ...{ loading: true, success:false, error: false }}}}
            break;
        case USER_SIGNUP_FULFILLED:
            return {...state, ...{ signup: {...state.signup, ...{ loading: false, success:true, error: false }} }};
            break;
        case USER_SIGNUP_REJECTED:
            return {...state, ...{ signup: {...state.signup, ...{ loading: false, success:false, error: action.payload }} }};
            break;
        case USER_SIGNUP_ENDED:
            return {...state, ...{ signup: {...state.signup, ...{ loading: false, success:false, error: false }} }};
            break;
        default:
            return {...state};
    }
}