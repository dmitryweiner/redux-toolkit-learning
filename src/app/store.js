import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listReducer from '../features/list/store';
import registrationReducer from '../features/registration/registrationSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const middleware = [
    ...getDefaultMiddleware({thunk: true}),
    logger,
    routerMiddleware(history)
];

export default configureStore({
    reducer: {
        router: connectRouter(history),
        counter: counterReducer,
        list: listReducer,
        registration: registrationReducer,
        auth: authReducer,
        user: userReducer,
    },
    middleware
});
