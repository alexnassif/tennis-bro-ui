import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useCookies} from "react-cookie";
import "../../index.css";

function MessageInput(props) {
    const messageInput = useRef(null);
    const {username, socket} = props;
    const [token, setToken] = useCookies(['synkup-token']);

    function focusInput() {
        messageInput.current.focus();
    }

    function resetInput() {
        messageInput.current.value = '';
    }

    function sendMessage() {
        const message = messageInput.current.value;
        // socket.send(JSON.stringify({
        //   message,
        // }));

        props.sendPrivateMessage(message)
    }

    function handleSubmission() {
        sendMessage();
        resetInput();
    }

    useEffect(() => {
        focusInput();
    });

    return (
        <div className="form-group mt-2">
            <textarea className="md-textarea form-control mb-2" id="chat-message-input" type="text" ref={messageInput}/>
            
            <input id="chat-message-submit" type="button" className="button" value="Send" onClick={handleSubmission}/>
        </div>
    );
}

MessageInput.propTypes = {
    socket: PropTypes.instanceOf(WebSocket).isRequired,
};


export default MessageInput;