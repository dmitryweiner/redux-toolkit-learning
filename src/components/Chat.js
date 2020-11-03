import React from 'react';
import { Link } from 'react-router-dom';

export default function Chat({ id, title }) {
    return <li>
        <Link to={`/chat/${id}`}>{title}</Link>
    </li>;
}
