import { nodeListReducer } from './nodeList'
import { nodeReducer } from './node'
import { userListReducer } from './userList'
import { userReducer } from './user'
import { roleListReducer } from './roleList'
import { roleReducer } from './role'
import { reducer as formReducer } from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'

export const allReducers = {
    nodeList: nodeListReducer,
    node: nodeReducer,
    userList: userListReducer,
    user: userReducer,
    roleList: roleListReducer,
    role: roleReducer,
    modal: modalReducer,
    form: formReducer
}