const initialState = {
    loading: false,
    currentUser: false,
    token: false,
    error: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {...state, ...{ loading: true, currentUser: false, token: false, error: false }};

        case 'LOGIN_FULFILLED':
            return {...state, ...{ loading: false, currentUser: action.payload.currentUser, token: action.payload.token, error: false }};

        case 'LOGIN_REJECTED':
            return {...state, ...{ loading: false, currentUser: false, error: action.payload.message }};

        case 'LOGOUT_PENDING':
            return {...state, ...{ loading: true, currentUser: false, error: false }};

        case 'LOGOUT_FULFILLED':
            return {...state, ...{ loading: false, currentUser: false, token: false, error: false }};

        case 'LOGOUT_REJECTED':
            return {...state, ...{ loading: false, currentUser: false, error: action.payload }};

        default:
            return {...state};
    }
}