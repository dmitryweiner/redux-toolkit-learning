import axios from 'axios';

export function getLoadingApiState() {
    return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: ''
    };
}

export function getInitialApiState() {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: ''
    };
}

export function getSuccessApiState(apiState) {
    apiState.isSuccess = true;
    apiState.isLoading = false;
    return apiState;
}

export function getErrorApiState(apiState, error) {
    apiState.isSuccess = false;
    apiState.isLoading = false;
    apiState.isError = true;
    apiState.errorMessage = getErrorMessage(error);
    return apiState;
}

export function getErrorMessage(error) {
    let errorMessage = '';
    if (error.response) {
        // Request made and server responded
        errorMessage = error.response.data.error;
    } else {
        errorMessage = `Something wrong happened! ${error.message}`;
    }
    return errorMessage;
}

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    //withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    auth: {
        login: ({nickname, password}) => instance.post('/auth', {nickname, password}),
        logout: () => instance.delete('/auth'),
        check: () => instance.get('/auth')
    },
    user: {
        create: ({nickname, password}) => instance.post('/user', {nickname, password}),
        getCurrent: () => instance.get('/user'),
        getById: (id) => instance.get(`/user/${id}`),
    },
    chat: {
        create: ({title}) => instance.post('/chat', {title}),
        delete: (id) => instance.delete(`/chat/${id}`),
    },
    message: {
        create: ({content, chatId}) => instance.post('/message', {content, chatId}),
        delete: (id) => instance.delete(`/message/${id}`),
    }
}