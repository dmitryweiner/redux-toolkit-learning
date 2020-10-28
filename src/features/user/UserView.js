import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, userInit } from './userSlice';

export default function UserView() {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInit())
    }, [dispatch]);

    return <>
        <h3>Профиль пользователя</h3>
        {currentUser && <>
            Nickname: {currentUser.nickname}<br/>
            Registered at: {new Date(currentUser.createdAt).toLocaleString()}
        </>}
        <h4>Список чатов</h4>
        <button onClick={() => {
        }}>Создать чат
        </button>
    </>;
}
