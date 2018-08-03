import { nodeListReducer } from './nodeList'
import { nodeReducer } from './node'
import { userReducer } from './user'
import { reducer as formReducer } from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'
import {nodeViewReducer} from '../containers/NodeView/reducer'; // TMP

export const allReducers = {
    nodeList: nodeListReducer,
    node: nodeReducer,
    user: userReducer,
    modal: modalReducer,
    form: formReducer,
    nodeView: nodeViewReducer, // TMP
}