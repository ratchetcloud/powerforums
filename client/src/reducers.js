import { reducer as formReducer } from 'redux-form'
import { reducer as modalReducer } from 'redux-modal'

import {loginReducer} from './containers/Login/reducer';
import {nodeViewReducer} from './containers/NodeView/reducer';
import {signUpReducer} from './containers/SignUp/reducer';

const allReducers = {
    modal: modalReducer,
    form: formReducer,
    login: loginReducer,
    nodeView: nodeViewReducer,
    signUp: signUpReducer,
};
export default allReducers;