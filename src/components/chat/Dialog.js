import React, {useEffect, useState} from 'react';
import Chat from "./ChatBox";
import ChatService from "./ChatService";


function Dialog({dialog, currentUser, setChat, setUserName, fetchMessages}) {
    const {User1, User2} = dialog;
    const [user, setUser] = useState(null);

    useEffect(() => {

        console.log(currentUser);
        if (User1.ID === parseInt(currentUser)) {
            console.log(User2);
            console.log(currentUser);
            setUser(User2);
            
        } else {
            console.log(User1);
            console.log(currentUser);
            setUser(User1);
        }
    }, [])

    function showChat() {
        setChat(false);
        fetchMessages(user.ID)

    }

    return (
        <>
            {user &&
            <li className="person" data-chat="person1" onClick={() => showChat()}>
                <div className="user">
                    <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png"/>
                </div>
                <p className="name-time">
                    <span className="name">{user.user_name}</span>
                </p>
            </li>
            }</>
    );
}


export default Dialog;