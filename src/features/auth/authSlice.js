import { createSlice } from "@reduxjs/toolkit";
import apiService, {
    getErrorApiState,
    getErrorMessage,
    getInitialApiState,
    getLoadingApiState,
    getSuccessApiState
} from "../../apiService";
import { push } from "connected-react-router";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        apiState: getInitialApiState()
    },
    reducers: {
        setIsLogged: (state) => {
            state.isLogged = true;
        },
        setIsNotLogged: (state) => {
            state.isLogged = false;
        },
        authLoading: (state, action) => {
            state.apiState = getLoadingApiState();
        },
        authDone: (state, action) => {
            state.apiState = getSuccessApiState(state);
            state.isLogged = true;
            console.log('done', state.apiState, state.isLogged);
        },
        authError: (state, action) => {
            state.apiState = getErrorApiState(state, action.payload);
            state.isLogged = false;
            console.log('error', state.apiState, state.isLogged);
        },
    }
});

export const authInit = ({nickname, password}) => dispatch => {
    dispatch(actions.authLoading());
    apiService.auth.login({nickname, password})
        .then(() => dispatch(actions.authDone()))
        .then(() => dispatch(push('/user')))
        .catch(error => dispatch(actions.authError(getErrorMessage(error))));
};

export const authCheck = () => dispatch => {
    apiService.auth.check()
        .then(() => dispatch(actions.setIsLogged()))
        .catch(() => dispatch(push('/auth')))
        .then(() => dispatch(actions.setIsNotLogged()))
};

export default authSlice.reducer;

export const selectApiState = state => state.auth.apiState;

export const selectIsLogged = state => state.auth.isLogged;

export const actions = authSlice.actions;
