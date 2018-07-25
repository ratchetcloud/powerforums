import {
    SHOW_MODAL, HIDE_MODAL
} from '../constants/ActionTypes';

const initialState = {
    type: null,
    props: {}
};

function modalReducer (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, type: action.payload.type, props: action.payload.props };
            break;
        case HIDE_MODAL:
            return initialState;
            break;
        default:
            return state;
    }
}

export default modalReducer;