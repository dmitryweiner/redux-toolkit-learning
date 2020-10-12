import React from "react";
import {useDispatch} from "react-redux";
import {actionDelete, actionToggleDone} from "./store";

export default function ListItem({item}) {
    const dispatch = useDispatch();
    return (
        <div className="list-item">
            <input type="checkbox" checked={item.isDone} onChange={() => dispatch(actionToggleDone(item.id))}/>
            &nbsp;
            { item.value }
            &nbsp;
            <button onClick={() => dispatch(actionDelete(item.id))}>x</button>
        </div>
    );
}
