import {
    ROLE_DELETE_PENDING, ROLE_DELETE_FULFILLED, ROLE_DELETE_REJECTED
} from '../constants/roleActionTypes';

const initialState = {
    roleDeleting: false,
    roleDeleted:  false
};

/**
 * Role reducer.
 */
export const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        // Depending on the action type.
        case ROLE_DELETE_PENDING:
            return {...state, ...{roleDeleting: true, roleDeleted: false}};
            break;
        case ROLE_DELETE_FULFILLED:
            return {...state, ...{roleDeleting: false, roleDeleted: true}};
            break;
        case ROLE_DELETE_REJECTED:
            return {...state, ...{roleDeleting: false, roleDeleted: false}};
            break;
        default:
            return {...state};
    }
}