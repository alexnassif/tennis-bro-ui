import React, {Component} from 'react';
import MessageInput from './MessageInput';

import {useCookies} from "react-cookie";
import http from "../../http-axios"
import MessagesList from "./MessagesList";
import "../../styling/messages.css";


const Chat = ({messages, username, receiver}) => {
    //const [id] = useCookies(['user_id']);
    const [token, deleteToken] = useCookies(['tennisbro-token']);
   const recipient = receiver;
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
            recipient: props.recipient,
        };

        this.chatSocket = getSocket(props.token);
        this.sendPrivateMessage = this.sendPrivateMessage.bind(this);
        // this.fetchMessages = this.fetchMessages.bind(this);

    }

    componentDidMount() {
        //this.fetchMessages(this.props.username);
        this.chatSocket.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
        this.chatSocket.addEventListener('message', (event) => { this.handleNewMessage(event) });
        const ctx = this;
        
    }

    sendPrivateMessage(message1){
        if (message1 !== "") {
          this.chatSocket.send(JSON.stringify({
            action: 'private-message',
            message: message1,
            receiver: this.state.recipient,
          }));
          //room.newMessage = "";
        }
      }

    handleNewMessage(event) {
        console.log(event.data);
        let data = event.data;
        data = data.split(/\r?\n/);
  
        /*for (let i = 0; i < data.length; i++) {
          let msg = JSON.parse(data[i]);
          switch (msg.action) {
            case "send-message":
              this.handleChatMessage(msg);
              break;
            case "user-join":
              this.handleUserJoined(msg);
              break;
            case "user-left":
              this.handleUserLeft(msg);
              break;
            case "room-joined":
              this.handleRoomJoined(msg);
              break;
            case "private-message":
              console.log(msg);
              break;
            default:
              break;
          }
        }*/
      }

    onWebsocketOpen(event) {
        console.log("connected to WS!");
        console.log(this.state.target);
    }

    render() {

        const {messages} = this.state;
        const messageInput = <MessageInput username={this.props.username} socket={this.chatSocket} sendPrivateMessage={this.sendPrivateMessage}/>;
        const messageAlign = this.state.messages.map((item, index) => {
            console.log(item)
                if (item.user === this.props.username) {

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