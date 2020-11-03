import { createSlice } from "@reduxjs/toolkit";
import apiService, {
    getInitialApiState
} from "../../apiService";
import { selectIsLogged } from '../auth/authSlice';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        apiState: getInitialApiState(),
        currentChat: null,
        chats: [],
        messages: [],
        participants: []
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
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
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
        .then(chat => {
            dispatch(actions.setCurrentChat(chat));
            return chat;
        })
        .then(chat => {
            const participantsIds = chat.participants;
            return Promise.all(
                participantsIds.map(id => apiService.user.getById(id).then(response => response.data))
            );
        })
        .then(participants => dispatch(actions.setParticipants(participants)));
}

export const getMessages = (chatId) => (dispatch, getState) => {
    if (!selectIsLogged(getState())) return;

    apiService.message.getMessages(chatId)
        .then(response => response.data)
        .then(messages => injectUserData(messages, selectParticipants(getState())))
        .then(messages => dispatch(actions.setMessages(messages)));
}

export const sendMessage = ({content, chatId}) => (dispatch, getState) => {
    apiService.message.create({content, chatId})
        .then(() => dispatch(getMessages(chatId)));
};

function injectUserData(messages, participants) {
    if (!participants || participants.lenght === 0) return messages;

    return messages.map(message => {
        const user = participants.find(user => user.id === message.userId);
        return {
            ...message,
            nickname: user ? user.nickname : ''
        };
    });
}

export const selectMessages = state => state.chat.messages;

export const selectMyChats = state => state.chat.chats;

export const selectCurrentChat = state => state.chat.currentChat;

export const selectParticipants = state => state.chat.participants;
