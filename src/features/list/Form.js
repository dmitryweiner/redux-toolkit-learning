import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {actionAdd} from "./store";

export default function Form (){
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    function handleSave(event) {
        event.preventDefault();
        dispatch(actionAdd(value));
        setValue('');
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={ value }
                    onChange={
                        (event) => setValue(event.target.value)
                    }
                />
                <button
                    onClick={ handleSave }
                >
                    save
                </button>
            </form>
        </div>
    );
}