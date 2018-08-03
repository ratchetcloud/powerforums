import { userReducer } from './user'
import { reducer as formReducer } from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'
import {nodeViewReducer} from '../containers/NodeView/reducer'; // TMP

export const allReducers = {
    user: userReducer,
    modal: modalReducer,
    form: formReducer,
    nodeView: nodeViewReducer,
}