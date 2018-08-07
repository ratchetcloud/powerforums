import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { store } from './store';
import App from './containers/App';

ReactDOM.render((
    <Provider store={store}>
    	<Router>
        	<App />
        </Router>
    </Provider>
), document.getElementById('root'));