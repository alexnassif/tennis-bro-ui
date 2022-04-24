import React, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import ChatService from "./ChatService";
import Dialog from "./Dialog";
import Chat from "./ChatBox";
import http from "../../http-axios";
import UserService from '../services/UserService';


const DialogList = (props) => {
    const [token] = useCookies(['tennisbro-token']);
    const [id, setId] = useCookies(['user_id']);
    const [profileId] = useCookies(['profile_id']);
    const [dialogs, setDialogs] = useState([]);
    const [chat, setChat] = useState(false);
    const [userName, setUserName] = useCookies(['user_name']);

    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState("");

    useEffect(() => {

        if(props.location.state !== undefined){
            console.log(props.location.state.ID);
            //fetchMessages(props.location.state.user_ID);
        }
        ChatService.getDialogs(token['tennisbro-token']).then(
            function (response) {
                setDialogs(response.data);
                console.log(response.data);
            }
        ).catch(function (err) {
            console.log(err);
        })

        UserService.getUser(token['tennisbro-token']).then(
            function (response) {
                setId('user_id', response.data.id);
                setUserName('user_name', response.data.name);
            }
        ).catch(function (err) {
            console.log(err);
        })
    }, [])

    function fetchMessages(u_id) {
        setMessages([]);
        setRecipient(u_id);
        http.get(`/message-api/messages/${u_id}`, {
            headers: {
                'Authorization': `Bearer ${token['tennisbro-token']}`
            }
        }).then(
            function (response) {
                console.log(response.data);
                for (const m of response.data) {
                    const mDate = new Date(m.CreatedAt);
                    let message = {user: m.Sender.user_name, text: m.Body, date: mDate.toDateString(), time: mDate.toLocaleTimeString(), recipient: m.Recipient.user_name};
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
                    <Chat username={userName['user_name']} messages={messages} receiver={recipient}/>
                    }

                </div>
            </div>
        </div>
    )

}

export default DialogList;