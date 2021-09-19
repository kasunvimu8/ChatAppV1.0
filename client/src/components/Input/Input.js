import React from 'react';
import './Input.css';

function Input({message, setMessage, sendMessages}) {
    return (
        <form className="form">
            <input 
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessages(e) : null}
            />
            <button className="sendButton" onClick={(e) => sendMessages(e)} > Send </button>
        </form>
    )
}

export default Input

