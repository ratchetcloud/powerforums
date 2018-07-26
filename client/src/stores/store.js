import { applyMiddleware, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import reduxThunkMiddleware from "redux-thunk";
import { allReducers } from "../reducers";
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import client from '../client';

// Create a history of your choosing (we're using a browser history in this case).
export const history = createHistory();

// Create a logger middleware.
const loggerMiddleware = createLogger();

// Build the middleware for intercepting and dispatching navigation actions.
const routeMiddleware = routerMiddleware(history)

const apiUrl = 'http://localhost:3000';

// Create store.
export const store = createStore(
    combineReducers({...allReducers, ...{router: routerReducer}}),
    applyMiddleware(
        reduxThunkMiddleware.withExtraArgument(new client(apiUrl)),
        loggerMiddleware,
        routeMiddleware
    )
);