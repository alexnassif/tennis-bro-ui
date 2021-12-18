import React, {Component} from 'react';
import MessageInput from './MessageInput';

import {useCookies} from "react-cookie";
import http from "../../http-axios"
import MessagesList from "./MessagesList";
import "../../styling/messages.css";


const Chat = ({messages, username}) => {
    //const [id] = useCookies(['user_id']);
    const [token, , deleteToken] = useCookies(['synkup-token']);
   const recipient = null;
    return <ChatBox messages={messages} username={username} token={token['tennisbro-token']} 
                    recipient={recipient}/>
}

function getSocket(token) {
    const socketPath = "ws://localhost:8080/ws?bearer=" + token;
    const chatSocket = new WebSocket(
        socketPath,
    );
    console.log(chatSocket);
    return chatSocket;
}


class ChatBox extends Component {
    constructor(props) {
        super(props);
        console.log(props.messages)
        this.state = {
            messages: props.messages,
        };

        this.chatSocket = getSocket();
        // this.fetchMessages = this.fetchMessages.bind(this);

    }

    componentDidMount() {
        //this.fetchMessages(this.props.username);
        const ctx = this;
        this.chatSocket.onmessage = (e) => {
            const id = JSON.parse(e.data).message;
            console.log(id, ' from onmessage')
            http.get(`http://127.0.0.1:8000/chatapi/message/${id}/`,
                {
                    headers: {
                        'Authorization': `Token ${this.props.token}`
                    }
                }
            ).then(function (response) {

                console.log(ctx.state.messages);
                let m = response.data;
                const mDate = new Date(m.timestamp);
                let message = {user: m.user, text: m.body, date: mDate.toDateString(), time: mDate.toLocaleTimeString(), recipient: m.recipient};
                ctx.setState((prevState) => ({messages: prevState.messages.concat(message)}));
            }).catch(function (err) {
                console.log(err)
            })


        };
    }

    render() {

        const {messages} = this.state;
        const messageInput = <MessageInput username={this.props.username} socket={this.chatSocket}/>;
        const messageAlign = this.state.messages.map((item, index) => {
            console.log(item)
                if (item.user.id === parseInt(this.props.userId)) {

                    return (

                        <li className="chat-right">
                            <div className="chat-hour">{item.date}</div>
                            <div className="chat-hour">{item.time}</div>
                            <div className="chat-text ">{item.text}</div>
                            <div className="chat-avatar">
                                <img src={item.user.profile_image?.file} alt="Retail Admin"/>
                                <div className="chat-name">Me</div>
                            </div>
                        </li>

                    )
                } else {
                    return (<li className="chat-left">
                            <div className="chat-avatar">{/*
                                "https://www.bootdey.com/img/Content/avatar/avatar3.png"*/}
                                <img src={item.user.profile_image?.file} alt="Retail Admin"/>
                                <div className="chat-name">{this.props.username}</div>
                            </div>
                            <div className="chat-text">{item.text}</div>
                            <div className="chat-hour">{item.date}</div>
                            <div className="chat-hour">{item.time}</div>

                        </li>
                    )
                }
            }
        );

        const messageList = (
            <div className="container">
                <div className="">
                    {messageAlign}
                </div>
            </div>
        );

        return (
            <div>

                {/*<MessagesList messages={messages} username={this.props.username} userId={this.props.userId}/>*/}
                <div className="chat-container row">
                    <ul className="chat-box chatContainerScroll">
                        {messageList}
                    </ul>

                </div>
                <div className="row">
                    {messageInput}
                </div>

            </div>
        );
    }
}


export default Chat;