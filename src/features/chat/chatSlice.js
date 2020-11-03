import { createSlice } from "@reduxjs/toolkit";
import apiService, {
    getInitialApiState,
} from "../../apiService";
import { selectIsLogged } from '../auth/authSlice';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        apiState: getInitialApiState(),
        currentChat: null,
        chats: [],
        messages: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        }
    }
});

export default chatSlice.reducer;

export const actions = chatSlice.actions;

export const chatCreate = ({title}) => dispatch => {
    apiService.chat.create({title})
        .then(() => dispatch(getMyChats()));
};

export const getMyChats = (currentUser) => (dispatch, getState) => {
    if (!currentUser) {
        currentUser = getState().user.currentUser;
    }
    if (!currentUser) {
        return;
    }
    apiService.chat.getMyChats(currentUser.id)
        .then(response => response.data)
        .then(chats => dispatch(actions.setChats(chats)));
};

export const getChatInfo = (chatId) => (dispatch, getState) => {
    if (!selectIsLogged(getState())) return;

    apiService.chat.getInfo(chatId)
        .then(response => response.data)
        .then(chat => dispatch(actions.setCurrentChat(chat)));
}

export const getMessages = (chatId) => (dispatch, getState) => {
    if (!selectIsLogged(getState())) return;

    apiService.message.getMessages(chatId)
        .then(response => response.data)
        .then(messages => dispatch(actions.setMessages(messages)));
}

export const sendMessage = ({ content, chatId }) => (dispatch, getState) => {
    apiService.message.create({ content, chatId })
        .then(() => dispatch(getMessages(chatId)));
};

export const selectMessages = state => state.chat.messages;

export const selectMyChats = state => state.chat.chats;

export const selectCurrentChat = state => state.chat.currentChat;
