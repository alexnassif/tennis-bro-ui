import React, { Component } from 'react';


function getSocket() {
    const socketPath = "ws://localhost:8080/ws?name=alex";
    const chatSocket = new WebSocket(socketPath,); 
    return chatSocket;   
}

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            roomInput: "alex room",
            textMessage: "",
            users: [],
        };
        this.chatSocket = getSocket();
        console.log(this.chatSocket);
      
        this.joinRoom = this.joinRoom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChatMessage = this.handleChatMessage.bind(this);
        this.handleUserJoined = this.handleUserJoined.bind(this);
        this.handleUserLeft = this.handleUserLeft.bind(this);
        this.handleRoomJoined = this.handleRoomJoined.bind(this);
        this.findRoom = this.findRoom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }

    componentDidMount(){
      this.chatSocket.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
        this.chatSocket.addEventListener('message', (event) => { this.handleNewMessage(event) });
    }

    onWebsocketOpen(event) {
        console.log("connected to WS!");
    }

    handleNewMessage(event) {
      console.log(event.data);
      let data = event.data;
      data = data.split(/\r?\n/);

      for (let i = 0; i < data.length; i++) {
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
          default:
            break;
        }
      }
    }
    handleChatMessage(msg) {
      console.log("in chat meess");
      const room = this.findRoom(msg.target.id);
      if (typeof room !== "undefined") {
        room.messages.push(msg);
      }
    }
    handleUserJoined(msg) {
      this.state.users.push(msg.sender);
    }
    handleUserLeft(msg) {
      for (let i = 0; i < this.state.users.length; i++) {
        if (this.users[i].id == msg.sender.id) {
          this.users.splice(i, 1);
        }
      }
    }
    handleRoomJoined(msg) {
      const room = msg.target;
      room.name = room.private ? msg.sender.name : room.name;
      room["messages"] = [];
      this.state.rooms.push(room);
      console.log(this.state.rooms)
    }
    sendMessage() {
      if (this.state.textMessage !== "") {
        this.chatSocket.send(JSON.stringify({
          action: 'send-message',
          message: this.state.textMessage,
          target: {
            id: this.state.rooms[0].id,
            name: this.state.rooms[0].name
          }
        }));
        //room.newMessage = "";
      }
    }
    findRoom(roomName) {
        for (let i = 0; i < this.state.rooms.length; i++) {
          if (this.state.rooms[i].name === roomName) {
              return this.state.rooms[i];
          }
        }
    }

    joinRoom() {
      this.chatSocket.send(JSON.stringify({ action: 'join-room', message: this.state.roomInput }));
      this.roomInput = "";
    }
    leaveRoom(room) {
        this.chatSocket.send(JSON.stringify({ action: 'leave-room', message: room.name }));

        for (let i = 0; i < this.state.rooms.length; i++) {
          if (this.state.rooms[i].name === room.name) {
              this.state.rooms.splice(i, 1);
              break;
          }
        }
    }
    handleInputChange(e){
      this.setState({
        [e.target.name]:e.target.value
      });

      console.log(this.state.textMessage);
    }

    render(){
    return(   <div class="container h-100">
    <div class="row justify-content-center h-100">
      <div class="col-12 form" >
          <div class="input-group">
            <input
              class="form-control name"
              placeholder="Please fill in your (nick)name"
            />
            <div class="input-group-append">
              <span class="input-group-text send_btn" >
              
              </span>
            </div>
        </div>
      </div>

      <div class="col-12 room" >
        <div class="input-group">
          <input
            class="form-control name"
            placeholder="Type the room you want to join"
          />
          <div class="input-group-append">
            <span class="input-group-text send_btn" onClick={this.joinRoom}>
                join room
            </span>
          </div>
        </div>
      </div>

      <div class="chat" >
        <div class="card">
          <div class="card-header msg_head">
            <div class="d-flex bd-highlight justify-content-center">
              room name
              <span class="card-close" onClick={this.leaveRoom}>leave</span>
            </div>
          </div>
          <div class="card-body msg_card_body">
            <div class="d-flex justify-content-start mb-4">
              <div class="msg_cotainer">
                <span class="msg_name" >message sender name</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <textarea
                value={this.state.textMessage}
                name="textMessage"
                class="form-control type_msg"
                placeholder="Type your message..."
                onChange={this.handleInputChange}
              ></textarea>
              <div class="input-group-append">
                <span class="input-group-text send_btn" onClick={this.sendMessage}>send message</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
    }
}

export default Chat;