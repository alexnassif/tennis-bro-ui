import React, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import ChatService from "./ChatService";
import Dialog from "./Dialog";
import Chat from "./ChatBox";
import http from "../../http-axios";


const DialogList = (props) => {
    const [token] = useCookies(['synkup-token']);
    const [id] = useCookies(['user_id']);
    const [profileId] = useCookies(['profile_id']);
    const [dialogs, setDialogs] = useState([]);
    const [chat, setChat] = useState(false);
    const [userName, setUserName] = useState();

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        if(props.location.state !== undefined){
            setUserName(props.location.state.username);
            fetchMessages(props.location.state.username);
        }
        ChatService.getDialogs(token['synkup-token']).then(
            function (response) {
                setDialogs(response.data);
            }
        ).catch(function (err) {
            console.log(err);
        })
    }, [])

    function fetchMessages(username) {
        setMessages([]);
        http.get(`http://127.0.0.1:8000/chatapi/message/?target=${username}`, {
            headers: {
                'Authorization': `Token ${token['synkup-token']}`
            }
        }).then(
            function (response) {
                for (const m of response.data) {
                    const mDate = new Date(m.timestamp);
                    let message = {user: m.user, text: m.body, date: mDate.toDateString(), time: mDate.toLocaleTimeString(), recipient: m.recipient};
                    setMessages(messages => [...messages, message])
                }
                setChat(true);
            }
        ).catch(
            function (err) {
                console.log(err);
            }
        )
    }


    return (
        <div className="container ">
            <div className="row">
                <div className="col-md-4">
                    <ul className="users">
                        {dialogs.map((dialog) => {
                                return (
                                    <Dialog key={dialog.id} dialog={dialog} currentUser={id['user_id']} setChat={setChat}
                                            setUserName={setUserName} fetchMessages={fetchMessages}/>
                                )
                            }
                        )}
                    </ul>
                </div>

                <div className="col-md-8">

                    {chat &&
                    <Chat username={userName} messages={messages}/>
                    }

                </div>
            </div>
        </div>
    )

}

export default DialogList;