import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listReducer from '../features/list/store';
import registrationReducer from '../features/registration/registrationSlice';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const middleware = [
    ...getDefaultMiddleware({thunk: true}),
    routerMiddleware(history)
];

export default configureStore({
  reducer: {
    router: connectRouter(history),
    counter: counterReducer,
    list: listReducer,
    registration: registrationReducer
  },
  middleware
});
