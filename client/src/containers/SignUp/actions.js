export const signUpPending = () => ({
    type: 'SIGNUP_PENDING'
});

export const signUpFulfilled = () => ({
    // show popup about completion message
    type: 'SIGNUP_FULFILLED'
});

export const signUpRejected = data => ({
    type: 'SIGNUP_REJECTED',
    payload: data
});

export const signUpEnded = () => ({
    type: 'SIGNUP_ENDED'
});