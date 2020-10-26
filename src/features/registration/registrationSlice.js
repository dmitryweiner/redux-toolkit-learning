import {createSlice} from "@reduxjs/toolkit";
import apiService, {getErrorApiState, getInitialApiState, getSuccessApiState} from "../../apiService";

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
            .then(response => dispatch(actions.registrationDone(response)));
    } catch (error) {
        dispatch(actions.registrationError(error));
    }
};
