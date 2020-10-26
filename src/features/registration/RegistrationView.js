import React, { useState } from "react";
import {registrationInit} from "./registrationSlice";
import {useDispatch} from "react-redux";

export default function RegistrationView() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        console.log('Trying to create user', {nickname, password});
        dispatch(registrationInit({nickname, password}));
        e.preventDefault();
    }

    return <>
        <h3>Регистрация</h3>
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
            <button type="submit">Зарегистрироваться</button>
        </form>
    </>;
}
