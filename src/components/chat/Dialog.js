import React, {useEffect, useState} from 'react';


function Dialog({dialog, currentUser, setChat, setReceiver}) {
    const {User1, User2} = dialog;
    const [user, setUser] = useState(null);

    useEffect(() => {

        console.log(currentUser);
        if (User1.ID === parseInt(currentUser)) {
            setUser(User2);
            
        } else {
            setUser(User1);
        }
    }, [])

    function showChat() {
        setChat(false);
        setReceiver(user.ID)

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