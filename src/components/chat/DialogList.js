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
        }
        ChatService.getDialogs(token['tennisbro-token']).then(
            function (response) {
                setDialogs(response.data);
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

    function setReceiver(u_id) {
        setRecipient(u_id);
        setChat(true);
    }


    return (
        <div className="container ">
            <div className="row">
                <div className="col-md-4">
                    <ul className="users">
                        {dialogs.map((dialog) => {
                                return (
                                    <Dialog key={dialog.id} dialog={dialog} currentUser={id['user_id']} setChat={setChat}
                                             setReceiver={setReceiver}/>
                                )
                            }
                        )}
                    </ul>
                </div>

                <div className="col-md-8">

                    {chat &&
                    <Chat username={userName['user_name']} receiver={recipient}/>
                    }

                </div>
            </div>
        </div>
    )

}

export default DialogList;