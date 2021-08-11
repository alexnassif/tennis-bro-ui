import React, { Component } from 'react';


function getSocket(token) {
    const socketPath = "ws://localhost:8080/ws?bearer=" + token;
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
            token: props.location.state.user_ID,
            target: props.location.state.ID
        };
        this.chatSocket = getSocket(this.state.token);
      
        this.joinRoom = this.joinRoom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChatMessage = this.handleChatMessage.bind(this);
        this.handleUserJoined = this.handleUserJoined.bind(this);
        this.handleUserLeft = this.handleUserLeft.bind(this);
        this.handleRoomJoined = this.handleRoomJoined.bind(this);
        this.findRoom = this.findRoom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.sendPrivateMessage = this.sendPrivateMessage.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }
    disconnect(e){
      e.preventDefault();
      this.chatSocket.close();
    }
    componentDidMount(){
      this.chatSocket.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
        this.chatSocket.addEventListener('message', (event) => { this.handleNewMessage(event) });
    }

    onWebsocketOpen(event) {
        console.log("connected to WS!");
        console.log(this.state.target);
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
          case "private-message":
            console.log(msg);
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
        if (this.users[i].id === msg.sender.id) {
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
    sendPrivateMessage(){
      if (this.state.textMessage !== "") {
        this.chatSocket.send(JSON.stringify({
          action: 'private-message',
          message: this.state.textMessage,
          receiver: this.state.target,
        }));
        //room.newMessage = "";
      }
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
      <div class="chat" >
        <div class="card">
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
                <span class="input-group-text send_btn" onClick={this.sendPrivateMessage}>send message</span
                >
              </div>
              <button type="button" class="btn btn-primary" onClick={(e) => this.disconnect(e)}>close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
    }
}

export default Chat;