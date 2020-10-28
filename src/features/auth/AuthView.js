import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authInit } from './authSlice';

export default function AuthView() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        console.log('Trying to login', {nickname, password});
        dispatch(authInit({nickname, password}));
        e.preventDefault();
    }

    return <>
        <h3>Авторизация</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Никнейм:
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Войти</button>
        </form>
    </>;
}
