const initialState = {
    loading: false,
    success: false,
    error: false
};

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_PENDING':
            return {...state, ...{ loading: true, success: false, error: false }};

        case 'SIGNUP_FULFILLED':
            return {...state, ...{ loading: false, success: true, error: false }};

        case 'SIGNUP_REJECTED':
            return {...state, ...{ loading: false, success: false, error: action.payload }};

        case 'SIGNUP_ENDED':
            return {...state, ...{ loading: false, success: false, error: false }};

        default:
            return {...state};
    }
}