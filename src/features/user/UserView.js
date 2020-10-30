import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, userInit } from './userSlice';
import { chatCreate, chatsGetList, selectMyChats } from '../chat/chatSlice';

export default function UserView() {
    const currentUser = useSelector(selectCurrentUser);
    const myChats = useSelector(selectMyChats);
    const dispatch = useDispatch();
    const [chatTitle, setChatTitle] = useState('');

    useEffect(() => {
        dispatch(userInit());
        // eslint-disable-next-line
   }, []);

    useEffect(() => {
        dispatch(chatsGetList(currentUser));
        // eslint-disable-next-line
    }, [currentUser]);

    function handleCreateChat() {
        if (chatTitle === '') return;
        dispatch(chatCreate({title: chatTitle}));
        setChatTitle('');
    }

    return <>
        <h3>Профиль пользователя</h3>
        {currentUser && <>
            Nickname: {currentUser.nickname}<br/>
            Registered at: {new Date(currentUser.createdAt).toLocaleString()}
        </>}
        <h4>Список чатов</h4>
        <ul>
            {myChats.map(chat => <li>{chat.id} {chat.title}</li>)}
        </ul>
        <h4>Создать чат</h4>
        <div>
            <label>
                Название чата:
                <input
                    type="text"
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                />
            </label>
        </div>
        <button onClick={handleCreateChat}>Создать чат
        </button>
    </>;
}
