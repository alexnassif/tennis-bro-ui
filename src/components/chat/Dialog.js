import React, {useEffect, useState} from 'react';
import Chat from "./ChatBox";
import ChatService from "./ChatService";


function Dialog({dialog, currentUser, setChat, setUserName, fetchMessages}) {
    const {user1, user2} = dialog;
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user1.id === parseInt(currentUser)) {
            setUser(user2);
        } else {
            setUser(user1);
        }
    }, [])

    function showChat() {
        setChat(false);
        setUserName(user.username);
        fetchMessages(user.username)

    }

    return (
        <>
            {user &&
            <li className="person" data-chat="person1" onClick={() => showChat()}>
                <div className="user">
                    <img src={user.profile_image?.file} alt="https://www.bootdey.com/img/Content/avatar/avatar3.png"/>
                </div>
                <p className="name-time">
                    <span className="name">{user.username}</span>
                </p>
            </li>
            }</>
    );
}


export default Dialog;