import { createSlice } from "@reduxjs/toolkit";
import apiService, {
    getInitialApiState,
} from "../../apiService";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        apiState: getInitialApiState(),
        chats: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        }
    }
});

export default chatSlice.reducer;

export const actions = chatSlice.actions;

export const chatCreate = ({title}) => dispatch => {
    apiService.chat.create({title})
        .then(() => dispatch(chatsGetList()));
};

export const chatsGetList = (currentUser) => (dispatch, getState) => {
    if (!currentUser) {
        currentUser = getState().user.currentUser;
    }
    if (!currentUser) {
        return;
    }
    apiService.chat.getMyChats({userId: currentUser.id})
        .then(response => response.data)
        .then(chats => dispatch(actions.setChats(chats)));
};

export const selectMyChats = state => state.chat.chats;
