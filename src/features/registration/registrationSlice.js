import {createSlice} from "@reduxjs/toolkit";
import apiService, {getErrorApiState, getInitialApiState, getSuccessApiState} from "../../apiService";
import { push } from 'connected-react-router';

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        apiInstance: getInitialApiState(),
        user: null
    },
    reducers: {
        registrationDone: (state, action) => {
            state.apiInstance = getSuccessApiState(state.apiInstance);
            state.user = action.payload;
        },
        registrationError: (state, action) => {
            state.apiInstance = getErrorApiState(this.apiInstance, action.payload);
        }
    },
});

export const actions = registrationSlice.actions;

export default registrationSlice.reducer;

export const registrationInit = ({nickname, password}) => dispatch => {
    try {
        apiService.user.create({nickname, password})
            .then(response => response.data)
            .then(response => dispatch(actions.registrationDone(response)))
            .then(() => delay(1000))
            .then(() => dispatch(push('/auth')));
    } catch (error) {
        dispatch(actions.registrationError(error));
    }
};
