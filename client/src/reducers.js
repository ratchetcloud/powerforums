import { reducer as formReducer } from 'redux-form';
import { reducer as modalReducer } from 'redux-modal';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as uiReducer } from 'redux-ui';

import {authReducer} from './utils/authentication';
import {loginReducer} from './containers/Login/reducer';
import {nodeViewReducer} from './containers/NodeView/reducer';
import {nodeEditorReducer} from './containers/NodeEditor/reducer';
import {signUpReducer} from './containers/SignUp/reducer';

const allReducers = {
    modal: modalReducer,
    form: formReducer,
    loadingBar: loadingBarReducer,
    ui: uiReducer,
    auth: authReducer,
    login: loginReducer,
    nodeView: nodeViewReducer,
    nodeEditor: nodeEditorReducer,
    signUp: signUpReducer,
};
export default allReducers;