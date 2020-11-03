import React from 'react';
import Chat from './Chat';

export default function ChatList({list}) {
    return <ul>
        {list.map(chat => <Chat id={chat.id} title={chat.title} key={chat.id}/>)}
    </ul>;
}
