const initialState = {
    loading: false,
    error: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {...state, ...{ loading: true, error: false }};

        case 'LOGIN_FULFILLED':
            return {...state, ...{ loading: false, error: false }};

        case 'LOGIN_REJECTED':
            return {...state, ...{ loading: false, error: action.payload.message }};

        default:
            return {...state};
    }
}