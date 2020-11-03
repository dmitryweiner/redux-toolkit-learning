import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatsList({list}) {
    return <ul>
        {list.map(chat => <li key={chat.id}>
            <Link to={`/chat/${chat.id}`}>{chat.title}</Link>
        </li>)}
    </ul>
}
