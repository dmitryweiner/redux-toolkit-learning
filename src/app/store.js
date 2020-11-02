import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listReducer from '../features/list/store';
import registrationReducer from '../features/registration/registrationSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import chatReducer from '../features/chat/chatSlice';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const middleware = [
    ...getDefaultMiddleware({thunk: true}),
    routerMiddleware(history)
];

if (process?.env?.NODE_ENV !== 'test') {
    middleware.push(logger);
}

export default configureStore({
    reducer: {
        router: connectRouter(history),
        counter: counterReducer,
        list: listReducer,
        registration: registrationReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer
    },
    middleware
});
