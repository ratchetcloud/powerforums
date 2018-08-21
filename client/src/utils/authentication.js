import jwt from 'jsonwebtoken';

/**
 * If there is data on client sessionStorage, use that data
 * and dispatch SET_CURRENT_USER as if login is success
 *
 * @param token: JWT token for authorization
 */
export const loadUserFromLocal = () => (dispatch, getState, client) => {
    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '')
        return;

    let decoded = jwt.decode(token, {complete: true});
    dispatch(setAuthorization(token, decoded.payload));
};

/**
 * Set authorization with token and currentUser.
 * Token will be set to APIClient and sessionStorage as JWT.
 *
 * @param token: JWT token for authorization
 * @param currentUser: Decoded user information
 */
export const setAuthorization = (token, currentUser) => (dispatch, getState, client) => {
    sessionStorage.setItem('jwtToken', token);
    client.setAuthorizationToken(token);

    dispatch({
        type: 'SET_CURRENT_USER',
        payload: {
            token: token,
            currentUser: currentUser
        }
    });
};

/**
 * Unset authorization on APIClient and sessionStorage.
 * Same with logout feature.
 */
export const unsetAuthorization = () => (dispatch, getState, client) => {
    sessionStorage.removeItem('jwtToken');
    client.setAuthorizationToken(false);

    dispatch({
        type: 'UNSET_CURRENT_USER',
    });
};


const initialState = {
    currentUser: false,
    token: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {...state, ...{currentUser: action.payload.currentUser, token: action.payload.token}};

        case 'UNSET_CURRENT_USER':
            return {...state, ...{currentUser: false, token: false}};

        default:
            return {...state};
    }
};
